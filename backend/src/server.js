import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { functions } from "./lib/inngest.js";
import { serve } from "inngest/express";
import { inngest } from "./lib/inngest.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cors((origin = ENV.CLIENT_URL), (credentials = true)));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("Hey there its get request");
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(
        `Server is running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`
      );
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
