import { Hono } from "hono";
import { supabase } from "../../../../utils/supabase-server";

const app = new Hono().get("/", async (c) => {
  const { data, error } = await supabase.from("notes").select();
  if (error) return c.json({ error: error.message }, 400);
  return c.json({ data: data });
});

export default app;
