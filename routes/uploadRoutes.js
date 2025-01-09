const express = require('express');
const multer = require('multer');
const processPDF = require('../controller/processPDF');
const PdfModel = require('../model/DocumentModel');
const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');

const router = express.Router();
const upload = multer({ dest: 'uploads/temp/' });

router.post('/upload', upload.single('pdfFile'), async (req, res) => {
  const { name_of_center, date } = req.body;

  try {
    // Input validation
    if (!name_of_center || !date || !req.file) {
      return res.status(400).json({ error: 'name of center, date, and pdfFile are required.' });
    }

    // Input paths
    const inputPdfPath = req.file.path;

    // Locate the stamp image
    const standImagePath = path.resolve('public/stamp.png'); // Change file name as needed
    console.log('Stamp Image Path:', standImagePath);

    const mimeType = mime.lookup(standImagePath);
    if (!mimeType || !['image/png', 'image/jpeg', 'image/webp'].includes(mimeType)) {
      return res.status(500).json({ error: `Unsupported stamp image format: ${mimeType}` });
    }

    // Output directory
    const outputDir = path.join(__dirname, '../uploads', name_of_center, date);
    fs.ensureDirSync(outputDir);

    // Output file path
    const outputPdfPath = path.join(outputDir, 'processed.pdf');

    // Process the PDF (add stamp)
    await processPDF(inputPdfPath, standImagePath, outputPdfPath, { name_of_center, date });

    // Save metadata in MongoDB
    await PdfModel.create({
      name_of_center,
      date,
      originalPdfPath: inputPdfPath,
      processedPdfPath: outputPdfPath,
    });

    // Respond with success message and download link
    res.status(200).json({
      message: 'PDF processed successfully',
      downloadLink: `/uploads/${name_of_center}/${date}/processed.pdf`,
    });
  } catch (error) {
    console.error('Error during PDF processing:', error);
    res.status(500).json({ error: 'Error processing the PDF' });
  } finally {
    // Clean up temp file
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
});

module.exports = router;
