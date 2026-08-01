const bedrock = require('bedrock-protocol');
const http = require('http');

// Servidor HTTP para o Render ficar ativo
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot em execução\n');
}).listen(PORT);

function conectarBot() {
  console.log("Tentando conectar o bot...");

  const client = bedrock.createClient({
    host: 'JasonMomoa3126.aternos.me',
    port: 14729,
    username: '24hrsSERVER',
    offline: true,
    skipPing: true // Pula o ping inicial que o Aternos bloqueia!
  });

  client.on('join', () => {
    console.log("🟢 SUCESSO: Bot entrou no servidor!!");
  });

  client.on('text', (packet) => {
    console.log(`[Chat] ${packet.source_name}: ${packet.message}`);
  });

  client.on('close', () => {
    console.log("Desconectado. Tentando reconectar em 5 segundos...");
    setTimeout(conectarBot, 5000);
  });

  client.on('error', (err) => {
    console.log("Erro na conexão:", err.message || err);
    try {
      client.close();
    } catch (e) {}
    setTimeout(conectarBot, 5000);
  });
}

console.log("Bot iniciado!");
conectarBot();
