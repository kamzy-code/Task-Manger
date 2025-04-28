import { Request, Response } from "express";
import boardService from "../services/boardService";

export interface BoardRequest extends Request{
    user?: { id: string };
};

