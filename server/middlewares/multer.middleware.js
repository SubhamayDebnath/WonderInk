import multer, { diskStorage } from 'multer';

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/avif' || 
        file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/webp'
    ) {
        cb(null, true); 
    } else {
        cb(new Error('Invalid file type. Only AVIF, JPEG, PNG, and WEBP are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default upload;
