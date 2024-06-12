"use strict";
// const express = require("express");
// const cors = require('cors');
// const PORT = process.env.PORT || 4000;
// const dbConnect = require("./src/config/dbConnect");
// const userRouter = require('./src/features/users/user.router.js');
// const taskRouter = require('./src/features/tasks/task.router.js');
// const projectRouter = require('./src/features/projects/project.router.js')
// const authmiddleware = require('./src/features/Middlewares/authmiddleware.js');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/user', userRouter);
// app.use('/project', authmiddleware, projectRouter);
// app.use('/task', authmiddleware, taskRouter);
// app.get("/", async (req, res) => {
//     res.send('Backend is running successfully!')
// })
// // listen
// dbConnect().then(() => {
//     app.listen(PORT, async () => {
//         // feedback: fw16_644 - you can connect db at the top or before calling cors or other configuration
//         console.log(`Listening on port: http://localhost:${PORT}`);
//     })
// })
const express_1 = __importDefault(require("express"));
// import dotenv from "dotenv";
// dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
