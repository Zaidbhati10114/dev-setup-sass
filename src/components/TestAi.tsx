"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSetUpAi } from "@/features/ai/use-setup-ai";

import { useRouter } from "next/navigation";

const TestAi = () => {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const [aiResponse, setAiResponse] = useState<any>(null);

  const mutation = useSetUpAi();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { prompt: prompt },
      {
        onSuccess: (data) => {
          console.log(data);
          setAiResponse(data);
          console.log(aiResponse);
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={onSubmit} className="p-4 space-y-4">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full"
          placeholder="Enter your prompt here"
        />
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
      {mutation.isError && (
        <div className="p-4 text-red-500">Error: {mutation.error.message}</div>
      )}
      {aiResponse && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">{aiResponse.title}</h1>
          <p className="mb-4">{aiResponse.description}</p>
          {aiResponse.steps.map((step: any) => (
            <div key={step.stepNumber} className="mb-6">
              <h2 className="text-xl font-semibold">
                {step.stepNumber}. {step.title}
              </h2>
              <p className="my-2">{step.explanation}</p>
              <pre className="bg-gray-100 p-2 rounded">
                {step.codeSnippet.join("\n")}
              </pre>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TestAi;
