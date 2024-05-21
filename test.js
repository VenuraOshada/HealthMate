// /**
//  * TODO(developer): Uncomment these variables before running the sample.
//  */
// const projectId = 'document-ai-422806';
// const location = 'us'; // Format is 'us' or 'eu'
// const processorId = '2244c1e7569ba77c'; // Create processor in Cloud Console
// const filePath = 'D:/Private Projects/Venura-App/API/prescription.png';



// const {DocumentProcessorServiceClient} =
//   require('@google-cloud/documentai').v1;

// // Instantiates a client
// // apiEndpoint regions available: eu-documentai.googleapis.com, us-documentai.googleapis.com (Required if using eu based processor)
// // const client = new DocumentProcessorServiceClient({apiEndpoint: 'eu-documentai.googleapis.com'});
// const client = new DocumentProcessorServiceClient();

// async function quickstart() {
//     console.log("helllo world")
//   // The full resource name of the processor, e.g.:
//   // projects/project-id/locations/location/processor/processor-id
//   // You must create new processors in the Cloud Console first
//   const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

//   // Read the file into memory.
//   const fs = require('fs').promises;
//   const imageFile = await fs.readFile(filePath);

//   // Convert the image data to a Buffer and base64 encode it.
//   const encodedImage = Buffer.from(imageFile).toString('base64');

//   const request = {
//     name,
//     rawDocument: {
//       content: encodedImage,
//       mimeType: 'image/png',
//     },
//   };

//   // Recognizes text entities in the PDF document
//   const [result] = await client.processDocument(request);
//   const {document} = result;

//   // Get all of the document text as one big string
//   const {text} = document;

//   // Extract shards from the text field
//   const getText = textAnchor => {
//     if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
//       return '';
//     }

//     // First shard in document doesn't have startIndex property
//     const startIndex = textAnchor.textSegments[0].startIndex || 0;
//     const endIndex = textAnchor.textSegments[0].endIndex;

//     return text.substring(startIndex, endIndex);
//   };

//   // Read the text recognition output from the processor
//   console.log('The document contains the following paragraphs:');
//   const [page1] = document.pages;
//   const {paragraphs} = page1;

//   for (const paragraph of paragraphs) {
//     const paragraphText = getText(paragraph.layout.textAnchor);
//     console.log(`Paragraph text:\n${paragraphText}`);
//   }
// }

// quickstart();

// const express = require('express');
// const multer = require('multer');
// //const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;

// // Replace with your Google Cloud project ID and credentials path
// const projectId = 'document-ai-422806';
// const location = 'us'; // Format is 'us' or 'eu'
// const processorId = '4e62b4bb2533d41b';
// //const credentialsPath = 'path/to/your/service-account-key.json'; // Replace with actual path

// //Configure Document AI client
// const {DocumentProcessorServiceClient} =
//   require('@google-cloud/documentai').v1;

//   const client = new DocumentProcessorServiceClient();

// // Configure Multer for image uploads
// const upload = multer({ dest: 'uploads/' }); // Optional: Specify a directory for storing uploads

// const app = express();

// // Endpoint to handle image upload
// app.post('/upload', upload.single('image'), async (req, res) => {
//     console.log("Endpoint Reached")
//   try {
//     const filePath = req.file.path; // Path to the uploaded image

//     // Read the image file
//     const fs = require('fs').promises;
//     const imageData = await fs.readFile(filePath);

//     // Convert image data to base64 and set MIME type
//     const encodedImage = Buffer.from(imageData).toString('base64');
//     const mimeType = 'image/jpeg'; // Assuming JPEG images

//     // Build the Document AI request object
//     const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;
//     const request = {
//       name,
//       rawDocument: {
//         content: encodedImage,
//         mimeType,
//       },
//     };

//     // Process the document using Document AI
//     const [result] = await client.processDocument(request);
//     const { document } = result;

//     console.log(document)
//     // Extract text from the document
//     const text = getText(document); // Replace with your logic to extract text (see below)

//     res.json({ message: 'Success!', text });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error processing image' });
//   }
// });

// // Function to extract text from the response (replace with your actual logic)
// function getText(document) {
//   // Implement your logic to extract text from the Document AI response (document object)
//   // This example assumes paragraphs are present and returns their text content
//   const text = [];
//   const [page1] = document.pages;
//   const { paragraphs } = page1;
//   for (const paragraph of paragraphs) {
//       text.push(paragraph.layout.textAnchor.content); // Replace with appropriate property
//     }
//     console.log("text ectracted" + text)
//   return text.join('\n');
// }

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server listening on port ${port}`));

// const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;
// const fs = require('fs');

// /**
//  * Runs the sample document through Document AI to get key/value pairs and
//  * confidence scores.
//  */
// async function processDocument(projectId, location, processorId, filePath, mimeType) {
//     // Instantiates a client
//     const documentaiClient = new DocumentProcessorServiceClient();

//     // The full resource name of the processor, e.g.:
//     // projects/project-id/locations/location/processor/processor-id
//     // You must create new processors in the Cloud Console first
//     const resourceName = documentaiClient.processorPath(projectId, location, processorId);

//     // Read the file into memory.
//     const imageFile = fs.readFileSync(filePath);

//     // Convert the image data to a Buffer and base64 encode it.
//     const encodedImage = Buffer.from(imageFile).toString('base64');

//     // Load Binary Data into Document AI RawDocument Object
//     const rawDocument = {
//         content: encodedImage,
//         mimeType: mimeType,
//     };

//     // Configure ProcessRequest Object
//     const request = {
//         name: resourceName,
//         rawDocument: rawDocument
//     };

//     // Use the Document AI client to process the sample form
//     const [result] = await documentaiClient.processDocument(request);

//     return result.document;
// }

// /**
//  * Run the codelab.
//  */
// async function main() {
//     const projectId = 'document-ai-422806';
//     const location = 'us'; // Format is 'us' or 'eu'
//     const processorId = '2244c1e7569ba77c'; // Should be a Hexadecimal string

//     // Supported File Types
//     // https://cloud.google.com/document-ai/docs/processors-list#processor_form-parser
//     filePath = 'D:/Private Projects/Venura-App/API/prescription.png'; // The local file in your current working directory
//     mimeType = 'image/png';

//     const document = await processDocument(projectId, location, processorId, filePath, mimeType);
//     console.log("Document Processing Complete");

//     // Print the document text as one big string
//     console.log(`Text: ${document.text}`);
// }

// main(...process.argv.slice(2)).catch(err => {
//     console.error(err);
//     process.exitCode = 1;
// });


/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const express = require('express');
// const multer = require('multer');
// const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1beta3;

// const app = express();
// const port = 3000; // You can change the port as needed

// const projectId = 'document-ai-422806';
// const location = 'us'; // Format is 'us' or 'eu'
// const processorId = '2244c1e7569ba77c'; // Create processor in Cloud Console

// const client = new DocumentProcessorServiceClient();

// // Multer storage configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// async function processDocument(imageFile) {
//     try {
//         const encodedImage = Buffer.from(imageFile).toString('base64');

//         const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

//         const request = {
//             name,
//             rawDocument: {
//                 content: encodedImage,
//                 mimeType: 'image/png',
//             },
//         };

//         const [result] = await client.processDocument(request);

//         console.log('Document processing complete.');

//         const { document } = result;
//         const { text } = document;
//         console.log(`Full document text: ${JSON.stringify(text)}`);
//         console.log(`There are ${document.pages.length} page(s) in this document.`);

//         return text;
//     } catch (error) {
//         console.error('Error processing image:', error);
//         throw error;
//     }
// }

// app.post('/process-image', upload.single('image'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send('No file uploaded.');
//         }

//         const imageFile = req.file.buffer;
//         const text = await processDocument(imageFile);

//         res.send({ text });
//     } catch (error) {
//         console.error('Error processing image:', error);
//         res.status(500).send('Error processing image');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });

