import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Em módulos ES não existe __dirname, então ele é recriado aqui
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do EJS e da pasta de templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Dados iniciais armazenados em memória
const times = [
  { id: 1, nome: "Grêmio", estadio: "Arena", cidade: "Porto Alegre" },
  { id: 2, nome: "Internacional", estadio: "Beira-Rio", cidade: "Porto Alegre" },
  { id: 3, nome: "Flamengo", estadio: "Maracanã", cidade: "Rio de Janeiro" },
  { id: 4, nome: "Corinthians", estadio: "Neo Química Arena", cidade: "São Paulo" },
];

// GET / -> página inicial com mensagem de boas-vindas
app.get("/", (req, res) => {
  res.render("index", {
    mensagem: "Bem-vindo ao Catálogo de Times!",
  });
});

// GET /times -> lista de times
app.get("/times", (req, res) => {
  res.render("times", { times });
});

// GET /times/:id -> detalhes de um time
app.get("/times/:id", (req, res) => {
  // req.params sempre traz texto, por isso a conversão para número
  const id = Number(req.params.id);
  const time = times.find((t) => t.id === id);

  if (!time) {
    return res.status(404).send("Time não encontrado");
  }

  res.render("detalhe", { time });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
