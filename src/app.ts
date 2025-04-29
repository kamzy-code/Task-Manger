import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoute";
import boardRoutes from "./routes/boardRoute";

dotenv.config();

const app = express();

app.use(express.json());

// Mount auth routes
app.use("/api/auth", authRoutes);

// Mount board routes
app.use("/api/boards", authRoutes);

app.get("/", (req, res) => {
    console.log("API is running...");
    res.send("API is running...");
});

export default app;
