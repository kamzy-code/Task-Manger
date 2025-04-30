"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardController = void 0;
const boardService_1 = __importDefault(require("../services/boardService"));
;
class BoardController {
    async createBoard(req, res) {
        const { title, description } = req.body;
        if (!title) {
            res.status(400).json({ message: "Title is required" });
            return;
        }
        ;
        try {
            const board = await boardService_1.default.createBoard(title, description, req.user.id);
            res.status(201).json(board);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error creating board", error });
            return;
        }
    }
    async getAllBoards(req, res) {
        const userId = req.user.id;
        const boards = await boardService_1.default.getAllBoards(userId);
        res.status(200).json(boards);
        return;
    }
    async getBoardById(req, res) {
        const boardId = req.params.id;
        const userId = req.user.id;
        try {
            const board = await boardService_1.default.getBoardById(boardId, userId);
            if (!board) {
                res.status(404).json({ message: "Board not found" });
                return;
            }
            res.status(200).json(board);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error getting board", error });
            return;
        }
    }
    async updateBoard(req, res) {
        const { id } = req.params;
        const updateInfo = req.body;
        const userId = req.user.id;
        try {
            const board = await boardService_1.default.updateBoard(id, userId, updateInfo);
            if (!board) {
                res.status(404).json({ message: "Board not found" });
                return;
            }
            res.status(200).json(board);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error updating board", error });
            return;
        }
    }
    async deleteBoard(req, res) {
        const { id } = req.params;
        const userId = req.user.id;
        try {
            const board = await boardService_1.default.deletBoard(id, userId);
            if (!board) {
                res.status(404).json({ message: "Board not found" });
                return;
            }
            res.status(200).json(board);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting board", error });
            return;
        }
    }
}
exports.boardController = new BoardController();
