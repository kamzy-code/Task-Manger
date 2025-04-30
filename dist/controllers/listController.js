"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listController = void 0;
const listService_1 = require("../services/listService");
class ListController {
    async createList(req, res) {
        const { title, position, boardId } = req.body;
        const userId = req.user.id;
        if (!title || !position || !boardId) {
            res.status(400).json({ message: "Title, position and boardId are required" });
            return;
        }
        try {
            const newList = await listService_1.listService.createList(title, position, boardId, userId);
            res.status(201).json(newList);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error creating list", error });
            return;
        }
    }
    async getListByBoard(req, res) {
        const { boardId } = req.params;
        const userId = req.user.id;
        try {
            const lists = await listService_1.listService.getListsByBoard(boardId, userId);
            if (!lists) {
                res.status(404).json({ message: "Lists not found" });
                return;
            }
            res.status(200).json(lists);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error getting lists", error });
            return;
        }
    }
    async getListById(req, res) {
        const { listId } = req.params;
        const userId = req.user.id;
        try {
            const list = await listService_1.listService.getListById(listId, userId);
            if (!list) {
                res.status(404).json({ message: "List not found" });
                return;
            }
            res.status(200).json(list);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error getting list", error });
            return;
        }
    }
    async updateList(req, res) {
        const { listId } = req.params;
        const userId = req.user.id;
        const data = req.body;
        try {
            const updatedList = await listService_1.listService.updateList(listId, data, userId);
            if (!updatedList) {
                res.status(404).json({ message: "List not found" });
                return;
            }
            res.status(200).json(updatedList);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error updating list", error });
            return;
        }
    }
    async deleteList(req, res) {
        const { listId } = req.params;
        const userId = req.user.id;
        try {
            const deletedList = await listService_1.listService.deleteList(listId, userId);
            if (!deletedList) {
                res.status(404).json({ message: "List not found" });
                return;
            }
            res.status(200).json(deletedList);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting list", error });
            return;
        }
    }
}
exports.listController = new ListController();
