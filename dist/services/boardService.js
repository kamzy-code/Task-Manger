"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boardModel_1 = __importDefault(require("../models/boardModel"));
class BoardService {
    // Create a new board
    async createBoard(title, description, userID) {
        const newBoard = boardModel_1.default.create({
            title,
            description,
            createdBy: userID,
        });
        return newBoard;
    }
    // get all boards for a user
    async getAllBoards(userID) {
        const boards = await boardModel_1.default.find({ createdBy: userID });
        return boards;
    }
    // get a single board by ID
    async getBoardById(boardId, userId) {
        return boardModel_1.default.findOne({ _id: boardId, createdBy: userId });
    }
    // update a board by ID
    async updateBoard(boardId, userId, updateInfo) {
        const updatedBoard = await boardModel_1.default.findOneAndUpdate({ _id: boardId, createdBy: userId }, updateInfo, { new: true });
        return updatedBoard;
    }
    // delete a board by ID
    async deletBoard(boardId, userId) {
        const deletedBoard = await boardModel_1.default.findOneAndDelete({ _id: boardId, createdBy: userId });
        return deletedBoard;
    }
}
const boardService = new BoardService();
exports.default = boardService;
