import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDB";
import cookieParser from "cookie-parser";
import dalleRoutes from "./routes/imageRoutes";
import postRoutes from "./routes/postRoutes";
import authRoutes from "./routes/authRoutes";
import mongoose from "mongoose";

const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Cookie"
    ],
    // Add preflight handling
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// API routes
app.get("/", (req, res) => {
  res.send("AI Image Generator API is running!");
});
app.use("/dalle", dalleRoutes);
app.use("/post", postRoutes);
app.use("/auth", authRoutes);

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully, starting server...");

    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

export default app;
