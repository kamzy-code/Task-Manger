"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const taskModel_1 = require("../models/taskModel");
class TaskService {
    async createTask(title, description, dueDate, position, listId, boardId, userID) {
        const task = new taskModel_1.Task({
            title,
            description,
            dueDate,
            position: position ?? 0,
            listId,
            boardId,
            createdBy: userID
        });
        return await task.save();
    }
    async getTasksByList(listId, userID) {
        return await taskModel_1.Task.find({ listId, createdBy: userID }).sort({ position: 1 });
    }
    async getTaskById(taskId, userID) {
        return await taskModel_1.Task.findOne({ _id: taskId, createdBy: userID });
    }
    async updateTask(taskId, data, userId) {
        return await taskModel_1.Task.findOneAndUpdate({ _id: taskId, createdBy: userId }, data, { new: true });
    }
    async moveTask(taskId, newPosition, newListId, userId) {
        return await taskModel_1.Task.findOneAndUpdate({ _id: taskId, createdBy: userId }, { position: newPosition, listId: newListId }, { new: true });
    }
    async deleteTask(taskId, userId) {
        return await taskModel_1.Task.findOneAndDelete({ _id: taskId, createdBy: userId });
    }
}
exports.taskService = new TaskService();
