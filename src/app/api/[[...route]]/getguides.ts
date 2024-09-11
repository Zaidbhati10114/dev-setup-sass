import { Hono } from "hono";
import { supabase } from "../../../../utils/supabase-server";

const app = new Hono()
  .get("/get-guides", async (c) => {
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

    try {
      // Fetch guides created by the authenticated user
      const { data: guides, error } = await supabase
        .from("guides")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Supabase fetch error:", error);
        return c.json(
          { error: "Failed to retrieve guides from the database" },
          500
        );
      }

      return c.json({ data: guides });
    } catch (error) {
      console.error("Supabase fetch error:", error);
      return c.json(
        { error: "Failed to retrieve guides from the database" },
        500
      );
    }
  })
  .get("/guide/:id", async (c) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      return c.json({ error: "No authorization header" }, 401);
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    const guideId = c.req.param("id");

    try {
      // Fetch the specific guide by ID
      const { data: guide, error } = await supabase
        .from("guides")
        .select("*")
        .eq("id", guideId)
        .eq("user_id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return c.json({ error: "Guide not found" }, 404);
        }
        console.error("Supabase fetch error:", error);
        return c.json(
          { error: "Failed to retrieve the guide from the database" },
          500
        );
      }

      return c.json({ data: guide });
    } catch (error) {
      console.error("Supabase fetch error:", error);
      return c.json(
        { error: "Failed to retrieve the guide from the database" },
        500
      );
    }
  })
  .delete("/:id", async (c) => {
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

    try {
      const { data: new_data, error } = await supabase
        .from("guides")
        .delete()
        .eq("id", c.req.param("id"))
        .eq("user_id", user.id)
        .single();

      if (error) {
        if (error) {
          return c.json({ error: "Not found" }, 404);
        }
        return c.json({ error: error }, 500);
      }

      return c.json({ new_data: { id: c.req.param("id") } }, 200);
    } catch (error) {
      console.error("Supabase delete error:", error);
      return c.json(
        { error: "Failed to delete guides from the database" },
        500
      );
    }
  });

export default app;
