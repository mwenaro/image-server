import multer, { StorageEngine } from 'multer';
import { promises as fsPromises } from 'fs';
import path from 'path';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

const uploadsDirectory = path.join(__dirname, 'uploads');

// Set up storage for multer
const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

async function removeFile(filename: string): Promise<boolean> {
  const filePath = path.join(uploadsDirectory, filename);
  try {
    await fsPromises.unlink(filePath);
    return true;
  } catch (err) {
    console.error(`Error removing file ${filename}:`, err);
    return false;
  }
}

async function replaceFile(oldFilename: string, newFile: MulterFile): Promise<string> {
  const oldFilePath = path.join(uploadsDirectory, oldFilename);

  // Delete the old file
  try {
    await fsPromises.unlink(oldFilePath);
  } catch (err) {
    console.error(`Error removing old file ${oldFilename}:`, err);
    throw new Error('Error replacing file.');
  }

  // Upload the new file
  const newFilename = Date.now() + path.extname(newFile.originalname);
  const newFilePath = path.join(uploadsDirectory, newFilename);

  try {
    await fsPromises.rename(newFile.path, newFilePath);
    return newFilePath;
  } catch (err) {
    console.error(`Error replacing file ${oldFilename}:`, err);
    throw new Error('Error replacing file.');
  }
}

export { upload, removeFile, replaceFile };
