import express from "express";
import { taskController } from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, taskController.createTask);
router.get("/list/:listId", authMiddleware, taskController.getTasksByList);
router.get("/:taskId", authMiddleware, taskController.getTaskById);
router.put("/:taskId", authMiddleware, taskController.updateTask);
router.put("/move/:taskId", authMiddleware, taskController.moveTask);
router.delete("/:taskId", authMiddleware, taskController.deleteTask);

export default router;
