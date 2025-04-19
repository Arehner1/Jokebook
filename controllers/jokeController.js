// Import the Joke model 
const Joke = require('../models/jokeModel');

// GET /jokebook/categories
// Fetches all joke categories
exports.getCategories = (req, res) => {
  Joke.getCategories((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(row => row.name));
  });
};

// GET /jokebook/joke/:category?limit=
// Returns jokes from a specific category (with optional limit)
exports.getJokesByCategory = (req, res) => {
  const { category } = req.params;
  const limit = parseInt(req.query.limit);
  // Call model method to get jokes by category
  Joke.getJokesByCategory(category, limit, (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(404).json({ error: "Category not found or no jokes." });
    }
    res.json(rows);
  });
};

// GET /jokebook/random
// Returns a random joke from any category
exports.getRandomJoke = (req, res) => {
  Joke.getRandomJoke((err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
};

// POST /jokebook/joke/add
// Adds a new joke to a specified category
exports.addJoke = (req, res) => {
  const { category, setup, delivery } = req.body;
  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: "Missing category, setup, or delivery." });
  }
  // Call model method to insert the new joke
  Joke.addJoke(category, setup, delivery, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
