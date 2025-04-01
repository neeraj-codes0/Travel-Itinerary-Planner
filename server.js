const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve front-end files

//SQLite3 DB
const db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) console.error('Error opening database:', err);
    else console.log('Connected to the SQlite database.');    
});

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS itineraries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    destination TEXT,
    start_date TEXT,
    end_date TEXT,
    checklist TEXT
  )
`);

// Insert itinerary
app.post('/api/itinerary', (req, res) => {
  const { destination, start_date, end_date, checklist } = req.body;
  db.run(
    `INSERT INTO itineraries (destination, start_date, end_date, checklist)
     VALUES (?, ?, ?, ?)`,
    [destination, start_date, end_date, checklist],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send({ id: this.lastID });
    }
  );
});

// Fetch itineraries
app.get('/api/itinerary', (req, res) => {
  db.all(`SELECT * FROM itineraries`, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
