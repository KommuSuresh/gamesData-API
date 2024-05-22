const express = require("express");
const games = require("../GamesData.json");
const app = express();
const cors = require("cors");

app.use(cors());

// Route to get all games or filter by title
app.get("/games", (req, res) => {
  const title = req.query.title;
  if (!title) {
    // If no search query is provided, send back all games
    res.json(games.games);
  } else {
    // If search query is provided, filter games based on the query
    const filteredGames = games.games.filter((game) => {
      return game.title.toLowerCase().includes(title.toLowerCase());
    });
    res.json(filteredGames.length > 0 ? filteredGames : { message: "No games found" });
  }
});

// Route to get a game by ID
app.get("/games/id/:id", (req, res) => {
  const id = req.params.id;
  const game = games.games.find((game) => game.id === id);
  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

// Route to search games by title
app.get("/games/title/:title", (req, res) => {
  const title = req.params.title;
  if (!title) {
    res.status(400).json({ message: "Title parameter is missing" });
  } else {
    const filteredGames = games.games.filter((game) => {
      return game.title.toLowerCase().includes(title.toLowerCase());
    });
    res.json(filteredGames.length > 0 ? filteredGames : { message: "No games found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
