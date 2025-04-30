"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boardController_1 = require("../controllers/boardController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authMiddleware, boardController_1.boardController.createBoard);
router.get('/', authMiddleware_1.authMiddleware, boardController_1.boardController.getAllBoards);
router.get('/:id', authMiddleware_1.authMiddleware, boardController_1.boardController.getBoardById);
router.put('/:id', authMiddleware_1.authMiddleware, boardController_1.boardController.updateBoard);
router.delete('/:id', authMiddleware_1.authMiddleware, boardController_1.boardController.deleteBoard);
exports.default = router;
