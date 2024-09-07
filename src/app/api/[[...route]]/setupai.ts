import { Hono } from "hono";
import { supabase } from "../../../../utils/supabase-server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono().post(
  "/get-setup",
  zValidator(
    "json",
    z.object({ prompt: z.string() }) // Validate only the prompt, not user ID
  ),
  async (c) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      return c.json({ error: "No authorization header" }, 401);
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !user) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    console.log(user); // Log the user object for debugging purposes

    const { prompt } = c.req.valid("json");
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return c.json({ error: "GEMINI_API_KEY is not set" }, 400);
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Ensure this model is correctly defined in the library
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json", // Ensure this is correct
    };

    const fullPrompt = `Generate a detailed setup guide for ${prompt}. 
        Provide the response in the following JSON format:
        {
          "title": "string",
          "description": "string",
          "steps": [
            {
              "stepNumber": number,
              "title": "string",
              "explanation": "string",
              "codeSnippet": "string or array of strings"
            }
          ]
        }
        Ensure all fields are filled out correctly and the response is valid JSON.`;

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(fullPrompt);

    if (result.response && result.response.text) {
      const parsedResponse = JSON.parse(result.response.text());
      console.log(parsedResponse);

      try {
        // Insert the generated guide into the guides table using Supabase
        const { data, error } = await supabase
          .from("guides")
          .insert({
            title: parsedResponse.title,
            description: parsedResponse.description,
            steps: parsedResponse.steps,
            user_id: user.id, // Use the authenticated user's ID
          })
          .select();

        if (error) {
          console.error("Supabase insert error:", error);
          throw error;
        }

        return c.json({ data: { guideId: data[0].id, ...parsedResponse } });
      } catch (error) {
        console.error("Supabase insert error:", error);
        return c.json(
          { error: "Failed to save setup guide to the database" },
          500
        );
      }
    } else {
      return c.json({ error: "Failed to generate setup guide" }, 400);
    }
  }
);

export default app;
