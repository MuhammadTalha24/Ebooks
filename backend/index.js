import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import userRoutes from './api/users/user.routes.js'
import bookRoutes from './api/books/book.routes.js'
import cookieParser from "cookie-parser";
import dbConnection from './config/dbConnection.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config()
const app = express()
const port = process.env.PORT



app.use(
    cors({
        origin: 'https://eb-frontend-chi.vercel.app',  // Set this to your frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,  // Allow credentials (cookies)
    })
);


app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1/user', userRoutes)
app.use('/api/v1/book', bookRoutes)
app.get('/', (req, res) => {
    res.send('Welcome App');
})

dbConnection().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}).catch((err) => {
    console.log(err)
})
