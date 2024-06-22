import { Request, Response, NextFunction } from 'express';
import User from '../users/user.schema';
import bcrypt from 'bcrypt';

interface AuthenticatedRequest extends Request {
    userId?: string;
}
export const authmiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        // Standard practice to use Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send('Operation not allowed, please authorize');
        }

        const token = authHeader.split(' ')[1]; // Assuming Bearer token
        const [id, email, password] = token.split(':');

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send('Operation not allowed, user not found');
        }

        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Operation not allowed, invalid credentials');
        }

        req.userId = id;
        next();
    } catch (error) {
        res.status(401).send('Operation not allowed');
    }
};
