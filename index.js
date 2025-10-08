const express = require("express");
const cors = require("cors");
const { sequelize, Player } = require("./models/Player");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("API do EuroAstros funcionando!");
});

// Rota para retornar todas as cartas
app.get("/api/cards", async (req, res) => {
  try {
    const cards = await Player.findAll({
      attributes: ['name', 'price', 'imageURL', 'position', 'skill']
    });
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar cartas" });
  }
});

// Sincroniza o banco e inicia o servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});
