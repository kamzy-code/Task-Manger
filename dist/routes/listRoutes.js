"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listController_1 = require("../controllers/listController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, listController_1.listController.createList);
router.get("/board/:boardId", authMiddleware_1.authMiddleware, listController_1.listController.getListByBoard);
router.get("/:listId", authMiddleware_1.authMiddleware, listController_1.listController.getListById);
router.put("/:listId", authMiddleware_1.authMiddleware, listController_1.listController.updateList);
router.delete("/:listId", authMiddleware_1.authMiddleware, listController_1.listController.deleteList);
exports.default = router;
