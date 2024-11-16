import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Configure multer storage
const storage: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Define the upload directory
    },
    filename: (req, file, cb) => {
        const randomName = uuidv4(); // Generate a unique identifier for the file
        const fileExtension = file.originalname.split('.').pop(); // Extract file extension
        cb(null, `${randomName}.${fileExtension}`); // Create a new file name
    },
});

// Create an instance of multer with the configured storage
const upload = multer({ storage });

export default upload;