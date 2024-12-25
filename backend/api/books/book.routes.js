import express from "express";
import { addBook, getAllBooks, getBookById, deleteBook, editBook } from "./book.controller.js";
import upload from "../../config/multer.js";

const router = express.Router();

router.post("/add", upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "cover", maxCount: 1 },
]), addBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.delete("/:id", deleteBook);
router.put("/:id", upload.fields([{ name: "pdf", maxCount: 1 }, { name: "cover", maxCount: 1 }]), editBook);

export default router;
