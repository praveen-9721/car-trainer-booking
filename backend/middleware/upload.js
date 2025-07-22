import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});

// Single file upload (optional)
export const uploadSingle = multer({ storage }).single('photo');

// Learner upload
export const uploadMultiple = multer({ storage }).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'nationalIdPhoto', maxCount: 1 },
]);

// ✅ Trainer upload (updated with all 3 fields)
export const uploadTrainerFiles = multer({ storage }).fields([
  { name: 'selfPhoto', maxCount: 1 },
  { name: 'licensePhoto', maxCount: 1 },
  { name: 'nationalIdPhoto', maxCount: 1 },
]);
