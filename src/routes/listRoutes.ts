import express from "express";
import {listController} from "../controllers/listController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, listController.createList);
router.get("/board/:boardId", authMiddleware, listController.getListByBoard); 
router.get("/:listId", authMiddleware, listController.getListById);
router.put("/:listId", authMiddleware, listController.updateList);
router.delete("/:listId", authMiddleware, listController.deleteList);

export default router;