import type { Express } from "express";
import { createServer, type Server } from "http";
import { getTarotReading, getCardImage } from "./controllers/tarot.controller";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/tarot-reading", getTarotReading);
  app.get("/api/card-image/:filename", getCardImage);
  
  // Create a public folder for static images if it doesn't exist
  const publicDir = path.join(process.cwd(), "public");
  const imagesDir = path.join(publicDir, "images");
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }
  
  // Serve static files from the public directory
  app.use("/images", express.static(imagesDir));

  const httpServer = createServer(app);

  return httpServer;
}

// Using the built-in express module that's already imported in index.ts
// This is a safe reference that doesn't require us to modify package.json
import express from "express";
