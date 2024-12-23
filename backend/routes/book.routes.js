import express from "express";
import { addBook, getAllBooks, getBookById, deleteBook, editBook } from "../controllers/book.controller.js";
import upload from "../utils/multer.js";
import { authMiddleware, authorizeEmail } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/add", authMiddleware, authorizeEmail, upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "cover", maxCount: 1 },
]), addBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.delete("/:id", authMiddleware, authorizeEmail, deleteBook);
router.put("/:id", authMiddleware, authorizeEmail, upload.fields([{ name: "pdf", maxCount: 1 }, { name: "cover", maxCount: 1 }]), editBook);

export default router;
