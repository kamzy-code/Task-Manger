"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
// register a new user
const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        // check if user already exists
        const existingUser = await userModel_1.default.findOne({ email: email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        ;
        // Hash Password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // create new user
        const newUser = new userModel_1.default({
            username: username,
            email: email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
        return;
    }
    catch (error) {
        next(error);
        console.error(error);
        res.status(500).json({ message: "Server error" });
        return;
    }
    ;
};
exports.register = register;
// login a user
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // check if user exists
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "invalid credentials" });
            return;
        }
        ;
        // compare passwords
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "invalid credentials" });
            return;
        }
        ;
        // Generate a token
        const token = jsonwebtoken_1.default.sign({ userID: user.id }, JWT_SECRET, { expiresIn: "1d" });
        res.status(201).json({ token });
        return;
    }
    catch (error) {
        next(error);
        console.error(error);
        res.status(500).json({ message: "Server error" });
        return;
    }
    ;
};
exports.login = login;
// export default {register, login};
