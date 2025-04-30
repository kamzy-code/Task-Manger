import { Request, Response } from "express";
import boardService from "../services/boardService";

export interface AuthRequest extends Request{
    user?: { id: string };
};

class BoardController{
    async createBoard(req: AuthRequest, res :Response) {
        const {title, description} = req.body;

        if(!title) {
            res.status(400).json({ message: "Title is required" });
            return;
        };

        try {
            const board = await boardService.createBoard(title, description, req.user!.id);
            res.status(201).json(board);
            return;

        } catch (error) {
            res.status(500).json({ message: "Error creating board", error });
            return; 
        }
    }

    async getAllBoards(req: AuthRequest, res: Response) {
        
        const userId = req.user!.id;
        const boards = await boardService.getAllBoards(userId);

        res.status(200).json(boards);
        return;
    }

    async getBoardById (req: AuthRequest, res: Response){
        const boardId = req.params.id;

        const userId = req.user!.id;

        try {
            const board = await boardService.getBoardById(boardId, userId);
            if (!board) {
                res.status(404).json({message: "Board not found"});
                return;
            }
            res.status(200).json(board);
            return;
        } catch (error) {
            res.status(500).json({message: "Error getting board", error});
            return;
        }

    }

    async updateBoard (req: AuthRequest, res: Response){
        const {id} = req.params;
        const updateInfo = req.body;

        const userId = req.user!.id;
        try {
            const board = await boardService.updateBoard(id, userId, updateInfo);

            if(!board){
                res.status(404).json({message: "Board not found"});
                return;
            }

            res.status(200).json(board);
            return;
        } catch (error) {
            res.status(500).json({message: "Error updating board", error});
            return;
        }
    }

    async deleteBoard (req: AuthRequest, res: Response){
        const {id} = req.params;

        const userId = req.user!.id;

        try {
            const board = await boardService.deletBoard(id, userId);

            if(!board){
                res.status(404).json({message: "Board not found"});
                return;
            }
    
            res.status(200).json(board);
            return;
        } catch (error) {
            res.status(500).json({message: "Error deleting board", error});
            return;
        }
    }
}

export const boardController = new BoardController();