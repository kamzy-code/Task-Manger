import { Request, Response, NextFunction} from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/userModel";
import dotenv from 'dotenv';

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET as string;

// register a new user
const register = async (req: Request, res: Response, next:NextFunction) : Promise<void> => {
    const{username, email, password} = req.body;

    try {

        // check if user already exists
        const existingUser = await User.findOne({email: email});
        if (existingUser){
            res.status(400).json({message: "User already exists"});
            return;
        };

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({message: "User registered successfully"});
        return;


    } catch (error) {
        next(error);
        console.error(error);
        res.status(500).json({message: "Server error"}); 
        return;
    };

};



// login a user
 const login = async (req: Request, res: Response, next:NextFunction) : Promise<void> =>{
    const {email, password} = req.body;

    try {
        // check if user exists
        const user = await User.findOne({email});
        if (!user){
           res.status(400).json({message:"invalid credentials"});
           return;
        };

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            res.status(400).json({message: "invalid credentials"});
            return;
        };

        // Generate a token
        const token = jwt.sign(
            {userID: user.id},
            JWT_SECRET,
            {expiresIn: "1d"},
        );

        res.status(201).json({token});
        return;
        
    } catch (error) {
        next(error);
        console.error(error);
        res.status(500).json({message: "Server error"});
        return;
    };

};

export {register, login};
// export default {register, login};