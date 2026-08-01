const bedrock = require('bedrock-protocol');
const http = require('http');

// Servidor mínimo só para o Render manter o bot ligado
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => res.end('OK')).listen(PORT);

function conectar() {
  console.log("Bot iniciado!");

  const client = bedrock.createClient({
    host: 'JasonMomoa3126.aternos.me',
    port: 14729,
    username: '24hrsSERVER',
    offline: true
  });

  client.on('text', (packet) => {
    console.log(`[Chat] ${packet.source_name}: ${packet.message}`);
  });

  // Se for desconectado, aguarda 5 segundos e tenta de novo
  client.on('close', () => {
    console.log("Desconectado! Tentando reconectar em 5 segundos...");
    setTimeout(conectar, 5000);
  });

  // Se der erro na conexão, aguarda 5 segundos e tenta de novo
  client.on('error', (err) => {
    console.log("Erro na conexão! Tentando reconectar em 5 segundos...");
    try { client.close(); } catch (e) {}
    setTimeout(conectar, 5000);
  });
}

// Inicia a primeira conexão
conectar();
