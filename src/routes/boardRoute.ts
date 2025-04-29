import express from 'express';
import { boardController } from '../controllers/boardController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, boardController.createBoard);
router.get('/', authMiddleware, boardController.getAllBoards);
router.get('/:id', authMiddleware, boardController.getBoardById);   
router.put('/:id', authMiddleware, boardController.updateBoard);
router.delete('/:id', authMiddleware, boardController.deleteBoard);

export default router;