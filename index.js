const bedrock = require('bedrock-protocol');
const http = require('http');

// Servidor de fachada para o Render não fechar a aplicação
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot Minecraft rodando!\n');
}).listen(PORT, () => {
  console.log(`Servidor HTTP de manter vivo rodando na porta ${PORT}`);
});

function conectarBot() {
  console.log("Tentando conectar o bot...");

  const client = bedrock.createClient({
    host: 'JasonMomoa3126.aternos.me',
    port: 14729,
    username: '24hrsSERVER',
    offline: true
  });

  client.on('join', () => {
    console.log("Bot entrou no servidor com sucesso!");
  });

  client.on('text', (packet) => {
    console.log(`[Chat] ${packet.source_name}: ${packet.message}`);
  });

  client.on('close', () => {
    console.log("Desconectado do servidor. Tentando reconectar em 5 segundos...");
    setTimeout(conectarBot, 5000);
  });

  client.on('error', (err) => {
    console.log("Servidor offline ou inacessivel:", err.message || err);
    try {
      client.close();
    } catch (e) {}
    // Tenta de novo em 5 segundos
    setTimeout(conectarBot, 5000);
  });
}

// Inicia o bot
conectarBot();
