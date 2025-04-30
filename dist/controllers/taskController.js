"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const taskService_1 = require("../services/taskService");
class TaskController {
    async createTask(req, res) {
        const { title, description, dueDate, position, listId, boardId } = req.body;
        const userId = req.user.id;
        if (!title || !listId || !boardId) {
            res.status(400).json({ message: "Title, listId and boardId are required" });
            return;
        }
        try {
            const task = await taskService_1.taskService.createTask(title, description, dueDate, position, listId, boardId, userId);
            res.status(201).json(task);
        }
        catch (error) {
            res.status(500).json({ message: "Error creating task", error });
            return;
        }
    }
    async getTasksByList(req, res) {
        const { listId } = req.params;
        const userId = req.user.id;
        if (!listId) {
            res.status(400).json({ message: "listId is required" });
            return;
        }
        try {
            const tasks = await taskService_1.taskService.getTasksByList(listId, userId);
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching tasks", error });
            return;
        }
    }
    async getTaskById(req, res) {
        const { taskId } = req.params;
        const userId = req.user.id;
        if (!taskId) {
            res.status(400).json({ message: "taskId is required" });
            return;
        }
        try {
            const task = await taskService_1.taskService.getTaskById(taskId, userId);
            if (!task) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            res.status(200).json(task);
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching task", error });
            return;
        }
    }
    async updateTask(req, res) {
        const { taskId } = req.params;
        const userId = req.user.id;
        const data = req.body;
        if (!taskId) {
            res.status(400).json({ message: "taskId is required" });
            return;
        }
        try {
            const task = await taskService_1.taskService.updateTask(taskId, data, userId);
            if (!task) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            res.status(200).json(task);
        }
        catch (error) {
            res.status(500).json({ message: "Error updating task", error });
            return;
        }
    }
    async moveTask(req, res) {
        const { taskId } = req.params;
        const userId = req.user.id;
        const { newPosition, newListId } = req.body;
        if (!taskId || !newPosition || !newListId) {
            res.status(400).json({ message: "taskId, newPosition and newListId are required" });
            return;
        }
        try {
            const task = await taskService_1.taskService.moveTask(taskId, newPosition, newListId, userId);
            if (!task) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            res.status(200).json(task);
        }
        catch (error) {
            res.status(500).json({ message: "Error moving task", error });
            return;
        }
    }
    async deleteTask(req, res) {
        const { taskId } = req.params;
        const userId = req.user.id;
        if (!taskId) {
            res.status(400).json({ message: "taskId is required" });
            return;
        }
        try {
            const task = await taskService_1.taskService.deleteTask(taskId, userId);
            if (!task) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            res.status(200).json({ message: "Task deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting task", error });
            return;
        }
    }
}
exports.taskController = new TaskController();
