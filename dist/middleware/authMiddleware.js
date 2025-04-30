"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    // 1. Get the token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1]; // Get the actual token after "Bearer"
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        // 2. Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log('Decoded JWT:', decoded); // Log the decoded token for debugging
        // 3. Attach user info to the request
        req.user = { id: decoded.userID }; // Attach user ID to the request object
        console.log('User ID:', req.user.id); // Log the user ID for debugging
        // 4. Move to the next middleware/controller
        next();
    }
    catch (error) {
        next(error);
        console.error('JWT Verification Error:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return;
    }
};
exports.authMiddleware = authMiddleware;
