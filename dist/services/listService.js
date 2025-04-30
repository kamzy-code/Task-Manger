"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listService = void 0;
const listModel_1 = require("../models/listModel");
class ListService {
    async createList(title, position, boardId, userID) {
        const list = await listModel_1.List.create({
            title,
            position,
            boardId,
            createdBy: userID
        });
        return list;
    }
    async getListsByBoard(boardID, userID) {
        const lists = await listModel_1.List.find({ boardID, createdBy: userID }).sort({ position: 1 });
        return lists;
    }
    async getListById(listID, userID) {
        const list = await listModel_1.List.findOne({ _id: listID, createdBy: userID });
        return list;
    }
    async updateList(listID, data, userID) {
        const list = await listModel_1.List.findOneAndUpdate({ _id: listID, createdBy: userID }, data, { new: true });
        return list;
    }
    async deleteList(listID, userID) {
        const list = await listModel_1.List.findOneAndDelete({ _id: listID, createdBy: userID });
        return list;
    }
}
exports.listService = new ListService();
