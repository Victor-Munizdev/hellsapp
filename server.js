const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Armazenar dados em memória (substitua por DB real depois)
let localizacoes = [];

// Middleware
app.use(cors());
app.use(express.json());

// Rota para receber localização do motorista (POST)
app.post('/api/localizacao', (req, res) => {
  const { motorista_id, latitude, longitude, timestamp } = req.body;
  if (!motorista_id || !latitude || !longitude) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }
  // Salva a localização
  localizacoes.push({ motorista_id, latitude, longitude, timestamp: timestamp || Date.now() });

  // Para não crescer sem controle, mantemos só as últimas 100 localizações
  if (localizacoes.length > 100) localizacoes.shift();

  res.json({ status: 'ok' });
});

// Rota para obter as localizações (GET)
app.get('/api/localizacoes', (req, res) => {
  res.json(localizacoes);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
