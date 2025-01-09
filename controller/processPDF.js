const { PDFDocument } = require('pdf-lib');
const fs = require('fs-extra');
const mime = require('mime-types');

async function processPDF(inputPdfPath, standImagePath, outputPdfPath, metadata) {
  try {
    // Load the input PDF
    const pdfBytes = fs.readFileSync(inputPdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Detect image format (JPG, PNG, WebP)
    const mimeType = mime.lookup(standImagePath);
    if (!mimeType || !['image/png', 'image/jpeg', 'image/webp'].includes(mimeType)) {
      throw new Error(`Unsupported stamp image format. Detected type: ${mimeType}`);
    }

    // Embed the image based on its format
    const imageBytes = fs.readFileSync(standImagePath);
    let stampImage;
    if (mimeType === 'image/png') {
      stampImage = await pdfDoc.embedPng(imageBytes);
    } else if (mimeType === 'image/jpeg') {
      stampImage = await pdfDoc.embedJpg(imageBytes);
    } else if (mimeType === 'image/webp') {
      throw new Error('WebP format is not directly supported. Please upload a PNG or JPG.');
    }

    // Add the stamp to each page
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      page.drawImage(stampImage, {
        x: width - 120,
        y: height - 120,
        width: 100,
        height: 100,
      });
    });

    // Save the modified PDF
    const pdfBytesOut = await pdfDoc.save();
    fs.writeFileSync(outputPdfPath, pdfBytesOut);
    console.log(`Processed PDF saved to: ${outputPdfPath}`);
  } catch (error) {
    console.error('Error in processPDF:', error);
    throw error;
  }
}

module.exports = processPDF;
