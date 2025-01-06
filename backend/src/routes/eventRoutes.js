import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Octokit } from '@octokit/rest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Initialize Octokit with your GitHub token
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

router.post('/submit-event', upload.array('photo_files'), async (req, res) => {
  try {
    const { datos, fotos, seccion } = req.body;
    const parsedDatos = JSON.parse(datos);
    const parsedFotos = JSON.parse(fotos);

    // Here you would typically save the event data to your database
    // For this example, we'll just log it
    console.log('Event Data:', parsedDatos);
    console.log('Photos:', parsedFotos);
    console.log('Section:', seccion);

    // Upload photos to GitHub
    for (const file of req.files) {
      const content = fs.readFileSync(file.path, { encoding: 'base64' });
      
      await octokit.repos.createOrUpdateFileContents({
        owner: 'your-github-username',
        repo: 'your-repo-name',
        path: `photos/${file.originalname}`,
        message: 'Upload event photo',
        content: content,
        branch: 'main'
      });

      // Delete the temporary file
      fs.unlinkSync(file.path);
    }

    res.status(200).json({ message: 'Event submitted successfully' });
  } catch (error) {
    console.error('Error submitting event:', error);
    res.status(500).json({ message: 'Error submitting event' });
  }
});

export default router;

