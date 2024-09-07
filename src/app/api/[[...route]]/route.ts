import { Hono } from "hono";
import { handle } from "hono/vercel";
import test from "./test";
import setupai from "./setupai";
import getupguides from "./getguides";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const routes = app
  .route("/test", test)
  .route("/setupai", setupai)
  .route("/getguides", getupguides);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
