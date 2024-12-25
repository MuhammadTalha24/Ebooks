import Book from './book.model';
import fs from 'fs'

export const addBook = async (req, res) => {
    const { title, author, description, genre } = req.body;

    if (!title || !author || !description || !genre) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.files || !req.files.pdf || !req.files.cover) {
        return res.status(400).json({ error: "Both PDF and cover image are required" });
    }

    try {
        const pdfUrl = req.files.pdf[0].path.replace(/\\/g, "/");
        const coverUrl = req.files.cover[0].path.replace(/\\/g, "/");

        const newBook = new Book({
            title,
            author,
            description,
            genre,
            pdfUrl,
            coverUrl,
        });

        await newBook.save();
        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).json({ error: "Error adding book" });
    }
};


export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: "Error fetching books" });
    }
};

export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: "Error fetching book" });
    }
};



export const deleteBook = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Delete the PDF file
        if (fs.existsSync(book.pdfUrl)) {
            fs.unlinkSync(book.pdfUrl);
        } else {
            console.warn(`PDF file not found: ${book.pdfUrl}`);
        }

        // Delete the cover image
        if (fs.existsSync(book.coverUrl)) {
            fs.unlinkSync(book.coverUrl);
        } else {
            console.warn(`Cover image file not found: ${book.coverUrl}`);
        }

        res.status(200).json({ message: "Book Deleted Successfully" });
    } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).json({ error: "Error deleting book" });
    }
};




export const editBook = async (req, res) => {
    const { title, author, description, genre } = req.body;
    const { id } = req.params;

    try {
        // Find the existing book by ID
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Update the book details
        if (title) book.title = title;
        if (author) book.author = author;
        if (description) book.description = description;
        if (genre) book.genre = genre;

        // Check if new PDF is uploaded and handle the replacement
        if (req.files && req.files.pdf) {
            // Delete the old PDF file
            if (fs.existsSync(book.pdfUrl)) {
                fs.unlinkSync(book.pdfUrl);
            }
            // Save the new PDF URL
            book.pdfUrl = req.files.pdf[0].path.replace(/\\/g, "/");
        }

        // Check if new cover image is uploaded and handle the replacement
        if (req.files && req.files.cover) {
            // Delete the old cover image file
            if (fs.existsSync(book.coverUrl)) {
                fs.unlinkSync(book.coverUrl);
            }
            // Save the new cover image URL
            book.coverUrl = req.files.cover[0].path.replace(/\\/g, "/");
        }

        // Save the updated book details
        await book.save();

        res.status(200).json({ message: "Book updated successfully", book });
    } catch (err) {
        console.error("Error updating book:", err);
        res.status(500).json({ error: "Error updating book" });
    }
};

