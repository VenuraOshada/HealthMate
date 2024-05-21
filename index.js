const express = require('express');
const multer = require('multer');
const cors = require('cors'); // Import cors

const projectId = 'prescriptionscanner';
const location = 'us'; // Format is 'us' or 'eu'
const processorId = 'b95fb25d5f6f3b5e'; 
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;

const app = express();
const port = 3000; // You can change the port as needed

const upload = multer();

// Instantiates a Document AI client
const client = new DocumentProcessorServiceClient();

// Enable CORS for all routes
app.use(cors());

// Handle POST request containing the image
app.post('/process-image', upload.single('image'), async (req, res) => {
    try {
        const imageFile = req.file.buffer;
        const encodedImage = imageFile.toString('base64');

        // The full resource name of the processor
        const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

        // Create request object
        const request = {
            name,
            rawDocument: {
                content: encodedImage,
                mimeType: 'image/png',
            },
        };

        // Process the document
        const [result] = await client.processDocument(request);
        if (!result || !result.document || !result.document.text) {
            console.error('Error processing document. No valid result returned.');
            return res.status(500).send('Error processing document');
        }

        const { text } = result.document;
        console.log("Extracted Text:", text);

        // Send the extracted text as response
        res.send("Paragraphs: " + text);
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
