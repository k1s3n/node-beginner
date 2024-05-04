// Imports
import * as url from 'url';
import path from 'path';
import express from 'express';
import pool from './db.js';
import fs from 'fs';

// Function to render posts as HTML
function renderPosts(posts) {
  // Sortera posterna efter högsta ID:et först
  posts.sort((a, b) => b.id - a.id);

  let html = '<h1>Blog</h1>';
  posts.forEach(post => {
    // Klipp innehållet om det är längre än 200 tecken
    const content = post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content;
    html += `<div class="post">`;
    html += `<h3 class="post-title">${post.title}</h3>`;
    html += `<p class="post-content">${content}</p>`;
    // Lägg till knapp för att visa hela innehållet om det klippts
    if (post.content.length > 200) {
      html += `<button class="read-more-text" data-content="${post.content}">Read more>></button>`;
    }
    html += `</div>`;
  });
  return html;
}

// The absolute file path to this folder
const dirname = url.fileURLToPath(new URL('.', import.meta.url));
// A port to start the  web serve on
const port = 3002;

// KK a web server application
const app = express();

// Assuming you have an Express app instance named 'app'
app.get('/blog', async (req, res) => {
  try {
    // Fetch data from the database
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM posts');
    connection.release();
    // Render the posts
    const renderedPosts = renderPosts(rows);
    // Send the rendered posts as HTML response
    res.send(renderedPosts);
  } catch (error) {
    console.error('Error fetching or rendering blog posts:', error);
    res.status(500).send('Internal server error');
  }
});

// Serve the content in the frontend folder
app.use(express.static('www'));

// Start the web server application
app.listen(port, () =>
  console.log(`Listening on http://localhost:${port}`));

// If a url does not correspond to any file then serve tehe index.html file
app.get('*', (req, res) => res.sendFile(path.join(dirname, 'www', 'index.html'))); 