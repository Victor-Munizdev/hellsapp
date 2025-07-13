// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  console.log('Cliente conectado');

  ws.on('message', message => {
    console.log('Recebido:', message);

    // Você pode processar os dados aqui, por exemplo, salvar no banco ou validar
    try {
      const data = JSON.parse(message);
      if (data.tipo === 'localizacao') {
        console.log(`Motorista ${data.motorista_id} está em lat: ${data.latitude}, long: ${data.longitude}`);
        // Aqui você pode inserir lógica para salvar ou usar esses dados
      }
    } catch (err) {
      console.error('Erro ao analisar JSON:', err);
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });

  ws.on('error', err => {
    console.error('Erro na conexão:', err);
  });
});

console.log('Servidor WebSocket rodando na porta 8080');
