import multer from 'multer';

const storage = multer.memoryStorage();
const file = multer({ storage: storage });

export default file;