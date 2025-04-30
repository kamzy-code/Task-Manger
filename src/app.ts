import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoute";
import boardRoutes from "./routes/boardRoute";
import listRoutes from "./routes/listRoutes";
import taskRoutes from "./routes/taskRoute";


dotenv.config();

const app = express();

app.use(express.json());

// Mount auth routes
app.use("/api/auth", authRoutes);

// Mount board routes
app.use("/api/boards", boardRoutes);

// Mount list routes
app.use("/api/list", listRoutes);

// Mount task routes
app.use("/api/task", taskRoutes);

app.get("/", (req, res) => {
    console.log("API is running...");
    res.send("API is running...");
});

export default app;
