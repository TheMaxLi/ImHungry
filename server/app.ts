import { Hono } from "hono";
import { logger } from "hono/logger";
import { restaurantsRoute } from "./routes/restaurants";
import { authRoute } from "./routes/auth";
import { serveStatic } from "hono/bun";
const app = new Hono();

app.use("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

app.get("*", logger());

app.get("/", (c) => {
  return c.json({ message: "kill yourself" });
});

const apiRoutes = app
  .basePath("/api")
  .route("/restaurants", restaurantsRoute)
  .route("/auth", authRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
