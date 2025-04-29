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

        if(!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        };

        const board = await boardService.createBoard(title, description, req.user!.id);
        res.status(201).json(board);
        return;
    }

    async getAllBoards(req: AuthRequest, res: Response) {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const userId = req.user.id;
        const boards = await boardService.getAllBoards(userId);

        res.status(200).json(boards);
        return;
    }

    async getBoardById (req: AuthRequest, res: Response){
        const boardId = req.params.id;
        if (!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        const userId = req.user.id;
        const board = await boardService.getBoardById(boardId, userId);
        if (!board) {
            res.status(404).json({message: "Board not found"});
            return;
        }

        res.status(200).json(board);
        return;

    }

    async updateBoard (req: AuthRequest, res: Response){
        const {id} = req.params;
        const updateInfo: object = req.body;

        if(!req.user){
           res.status(400).json({message: "Unauthorized"});
           return;
        }

        const userId = req.user.id;
        const board = boardService.updateBoard(id, userId, updateInfo);

        if(!board){
            res.status(404).json({message: "Board not found"});
            return;
        }

        res.status(200).json(board);
        return;
    }

    async deleteBoard (req: AuthRequest, res: Response){
        const {id} = req.params;

        if(!req.user){
           res.status(400).json({message: "Unauthorized"});
           return;
        }

        const userId = req.user.id;
        const board = boardService.deletBoard(id, userId);

        if(!board){
            res.status(404).json({message: "Board not found"});
            return;
        }

        res.status(200).json(board);
        return;
    }
}

export const boardController = new BoardController();