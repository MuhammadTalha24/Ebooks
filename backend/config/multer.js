import multer from "multer";
import path from "path";
import fs from "fs";

// Define storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(process.cwd(), 'public', 'upload', file.fieldname === 'pdf' ? 'pdfs' : 'covers');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});


// Initialize Multer with storage configuration
const upload = multer({ storage });

export default upload;
