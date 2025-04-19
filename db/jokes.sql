-- Create the categories table
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Create the jokes table
CREATE TABLE IF NOT EXISTS jokes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setup TEXT NOT NULL,
    delivery TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert initial categories
INSERT OR IGNORE INTO categories (name) VALUES 
('funnyJoke'),
('lameJoke');

-- Insert initial funny jokes
INSERT INTO jokes (setup, delivery, category_id) VALUES
('Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!', 1),
('What kind of tree fits in your hand?', 'A palm tree', 1),
('What is worse than raining cats and dogs?', 'Hailing taxis', 1);

-- Insert initial lame jokes
INSERT INTO jokes (setup, delivery, category_id) VALUES
('Which bear is the most condescending?', 'Pan-DUH', 2),
('What would the Terminator be called in his retirement?', 'The Exterminator', 2);
