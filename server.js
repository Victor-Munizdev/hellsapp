const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

const server = https.createServer({
  cert: fs.readFileSync('/caminho/do/certificado/cert.pem'),
  key: fs.readFileSync('/caminho/do/certificado/key.pem')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Cliente conectado');
  ws.on('message', message => {
    console.log('Mensagem recebida:', message);
  });
});

server.listen(443, () => {
  console.log('Servidor rodando na porta 443');
});
