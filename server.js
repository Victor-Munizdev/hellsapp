const http = require("http");
const WebSocket = require("ws");

const server = http.createServer(); // NÃO https.createServer()

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.on("message", (msg) => {
    console.log("Mensagem recebida:", msg);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket rodando na porta ${PORT}`);
});
