// Imports
import * as url from 'url';
import path from 'path';
import express from 'express';
//hej vi har en ny funktion
// The absolute file path to this folder
const dirname = url.fileURLToPath(new URL('.', import.meta.url));

// A port to start the  web serve on
const port = 3002;

// KK a web server application
const app = express();

// Serve the content in the frontend folder
app.use(express.static('www'));

// Start the web server application
app.listen(port, () =>
  console.log(`Listening on http://localhost:${port}`));

// If a url does not correspond to any file then serve tehe index.html file
app.get('*', (req, res) => res.sendFile(path.join(dirname, 'www', 'index.html')));