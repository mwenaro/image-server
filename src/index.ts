// app.ts
import express, { Request, Response } from 'express';
import path from 'path';
import { upload, removeFile, replaceFile } from './utils/upload';

const app = express();
const port = process.env.PORT || 5000;
// Add this line to serve the uploads directory statically
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload endpoint
app.post('/upload', upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
// console.log({req});
  const imagePath = `uploads/${req.file.filename}`;
  const fullUrl = `${req.protocol}://${req.get('host')}/${imagePath}`;

  res.json({ imagePath: fullUrl });
//   res.json({ imagePath: imagePath });
});

// Remove endpoint
app.delete('/remove/:filename', async (req: Request, res: Response) => {
  const filename: string = req.params.filename;

  try {
    const success: boolean = await removeFile(filename);
    if (success) {
      res.send(`File ${filename} removed successfully.`);
    } else {
      res.status(404).send(`File ${filename} not found.`);
    }
  } catch (err) {
    res.status(500).send('Error removing file.');
  }
});

// Replace endpoint
app.put('/replace/:filename', upload.single('image'), async (req: Request, res: Response) => {
  const oldFilename: string = req.params.filename;

  try {
    const newFilePath: string = await replaceFile(oldFilename, req.file!);
    res.json({ imagePath: newFilePath });
  } catch (err:any) {
    res.status(500).send(err.message);
  }
});

app.get("/", (req,res)=>{
res.json({msg: "Hello there"})
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
