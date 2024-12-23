import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        description: { type: String, required: true },
        genre: { type: String },
        pdfUrl: { type: String, required: true }, // Path to the PDF file
        coverUrl: { type: String, required: true }, // Path to the cover image
        uploadDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
