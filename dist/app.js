"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const boardRoute_1 = __importDefault(require("./routes/boardRoute"));
const listRoutes_1 = __importDefault(require("./routes/listRoutes"));
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Mount auth routes
app.use("/api/auth", authRoute_1.default);
// Mount board routes
app.use("/api/boards", boardRoute_1.default);
// Mount list routes
app.use("/api/list", listRoutes_1.default);
// Mount task routes
app.use("/api/task", taskRoute_1.default);
app.get("/", (req, res) => {
    console.log("API is running...");
    res.send("API is running...");
});
exports.default = app;
