import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthRequest extends Request {
    user?: { id: string };
  }

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    
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
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    // 3. Attach user info to the request
    req.user = { id: decoded.id };
    // 4. Move to the next middleware/controller
    next();
    }
    catch (error) {
        next(error);
        console.error('JWT Verification Error:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return;
    }
}