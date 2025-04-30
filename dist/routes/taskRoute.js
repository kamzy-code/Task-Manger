"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, taskController_1.taskController.createTask);
router.get("/list/:listId", authMiddleware_1.authMiddleware, taskController_1.taskController.getTasksByList);
router.get("/:taskId", authMiddleware_1.authMiddleware, taskController_1.taskController.getTaskById);
router.put("/:taskId", authMiddleware_1.authMiddleware, taskController_1.taskController.updateTask);
router.put("/move/:taskId", authMiddleware_1.authMiddleware, taskController_1.taskController.moveTask);
router.delete("/:taskId", authMiddleware_1.authMiddleware, taskController_1.taskController.deleteTask);
exports.default = router;
