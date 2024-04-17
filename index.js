// Imports
import * as url from 'url';
import path from 'path';
import express from 'express';
import pool from './db.js';

async function fetchDataFromDatabase() {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM posts');
    connection.release();
    console.log('Database connection successful');
    return rows; // Assuming rows is an array of objects containing your data
  } catch (error) {
    console.error('Error fetching data from database:', error);
    // Log the error message
    console.error('Error message:', error.message);
    return [];
  }
}
// Attempt to fetch data from the database
fetchDataFromDatabase();
export { fetchDataFromDatabase };
//hej vi har en ny funktion
// The absolute file path to this folder
const dirname = url.fileURLToPath(new URL('.', import.meta.url));
// A port to start the  web serve on
const port = 3002;

// KK a web server application
const app = express();

app.get('/blog', async (req, res) => {
  try {
    // Fetch data from the database
    const data = await fetchDataFromDatabase();

    // Render the HTML template with the fetched data
    res.send(`
      <html>
        <head>
          <title>Blog</title>
        </head>
        <body>
          <main class="glass-box animate__animated animate__slideInUp">
            <article>
              ${data.map(post => `
                <div class="post">
                  <h2>${post.title}</h2>
                  <p>${post.content}</p>
                </div>
              `).join('')}
            </article>
          </main>
        </body>
      </html>
    `);
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    res.status(500).send('Internal server error');
  }
});

// Assuming you have an Express app instance named 'app'

app.get('/posts', async (req, res) => {
  try {
    // Fetch data from the database
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM posts');
    connection.release();

    // Send the data as JSON in the response
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    // Send an error response if there's an issue
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the content in the frontend folder
app.use(express.static('www'));

// Start the web server application
app.listen(port, () =>
  console.log(`Listening on http://localhost:${port}`));

// If a url does not correspond to any file then serve tehe index.html file
app.get('*', (req, res) => res.sendFile(path.join(dirname, 'www', 'index.html'))); 