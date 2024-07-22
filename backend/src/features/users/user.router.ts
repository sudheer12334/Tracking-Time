import express, { Request, Response } from 'express';
import User from './user.schema';
import { logError, logInfo } from '../../utils/logger';

const app = express.Router();

interface UserRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}

app.post('/signup', async (req: Request, res: Response) => {
    const { email,password } = req.body;
    try {
        logInfo(`Signup request received for email: ${email}`);

        const user = await User.findOne({ email });
        console.log(user);
        
        if (user) {
            logInfo(`User with email ${email} already exists.`);
            return res.status(404).send('Cannot create a user with existing email address.');
        }

        const newUser = await User.create(req.body);
        // feedback: fw18_0042 - always encode token, never send password back to the client
        const token = `${newUser.id}:${newUser.email}:${newUser.password}`;
        logInfo(`User created with email: ${email}`);
        return res.send({
            token
        });
    } catch (e) {
        logError('Error during signup process', e as Error);
        res.status(500).send((e as Error).message);
    }
});
app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // if(email==undefined||password==undefined) throw new Error();
        logInfo(`Login request received for email: ${email}`);

        const user = await User.findOne({ email, password });

        if (!user) {
            logInfo(`Authentication failed for email: ${email}`);
            return res.status(401).send({
                messageKey: "AUTH_LOGIN_FAILED"
            });
        }
        const token = Buffer.from(`${user.id}:${user.email}`).toString('base64');
        logInfo(`User authenticated successfully with email: ${email}`);
        return res.status(200).json({
            token,
            messageKey: "AUTH_LOGIN_SUCCESS"
        });
    } catch (e) {
        logError('Error during login process', e as Error);
        res.status(500).send({
            messageKey:"AUTH_LOGIN_ERROR"
        });
    }
});

export default app;
