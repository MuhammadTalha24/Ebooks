import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import userRoutes from '../routes/user.routes.js'
import bookRoutes from '../routes/book.routes.js'
import cookieParser from "cookie-parser";
import dbConnection from '../database/dbConnection.js'
import path from 'path';

env.config()
const app = express()
const port = process.env.PORT



app.use(
    cors({
        origin: 'https://ebooks-frontend-zeta.vercel.app',  // Set this to your frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,  // Allow credentials (cookies)
    })
);
app.use('/uploads/covers', express.static(path.resolve('uploads', 'covers')));
app.use('/uploads/pdfs', express.static(path.resolve('uploads', 'pdfs')));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1/user', userRoutes)
app.use('/api/v1/book', bookRoutes)

dbConnection().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}).catch((err) => {
    console.log(err)
})
