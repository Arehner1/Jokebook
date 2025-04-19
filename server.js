const express = require('express');
const bodyParser = require('body-parser');
const jokeRoutes = require('./routes/jokeRoutes');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Parse JSON body
app.use(bodyParser.json());

// Mount API routes
app.use('/jokebook', jokeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
