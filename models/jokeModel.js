const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/jokebook.db');;

// Export an object containing all database methods
module.exports = {
  // Fetch all available categories
  getCategories: (cb) => {
    db.all("SELECT name FROM categories", [], cb);
  },

  // Fetch jokes from a specific category,
  getJokesByCategory: (category, limit, cb) => {
    const query = `
      SELECT setup, delivery FROM jokes 
      JOIN categories ON jokes.category_id = categories.id 
      WHERE categories.name = ?
      ${limit ? 'LIMIT ?' : ''}
    `;
    const params = limit ? [category, limit] : [category];
    db.all(query, params, cb);
  },

  // Select one random joke from the entire jokes table
  getRandomJoke: (cb) => {
    const query = `
      SELECT setup, delivery FROM jokes 
      ORDER BY RANDOM() LIMIT 1
    `;
    db.get(query, [], cb);
  },

  // Add a new joke to a given category
  addJoke: (category, setup, delivery, cb) => {
    db.get("SELECT id FROM categories WHERE name = ?", [category], (err, row) => {
      if (err || !row) return cb(err || new Error("Category not found"));

      const categoryId = row.id;
      
      // Insert the new joke 
      db.run(
        "INSERT INTO jokes (setup, delivery, category_id) VALUES (?, ?, ?)",
        [setup, delivery, categoryId],
        function (err) {
          if (err) return cb(err);
          // After inserting, fetch all jokes in the same category to return updated list
          db.all(
            "SELECT setup, delivery FROM jokes WHERE category_id = ?",
            [categoryId],
            cb
          );
        }
      );
    });
  }
};
