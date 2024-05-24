const express = require("express");
const games = require("../GamesData.json");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Route to get all games or filter by title
app.get("/games", (req, res) => {
  try {
    const title = req.query.title;
    if (!title) {
      // If no search query is provided, send back all games
      res.json(games.games);
    } else {
      // If search query is provided, filter games based on the query
      const filteredGames = games.games.filter((game) =>
        game.title.toLowerCase().includes(title.toLowerCase())
      );
      res.json(filteredGames.length > 0 ? filteredGames : { message: "No games found" });
    }
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get a game by ID
app.get("/games/:id", (req, res) => {
  try {
    const id = req.params.id;
    const game = games.games.find((game) => game.id === id);
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    console.error("Error fetching game by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
