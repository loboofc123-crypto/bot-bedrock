const bedrock = require('bedrock-protocol');

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

  // Se o servidor cair ou o bot for desconectado, reconecta em 15 segundos
  client.on('close', () => {
    console.log("Desconectado do servidor. Tentando reconectar em 15 segundos...");
    setTimeout(conectarBot, 15000);
  });

  client.on('error', (err) => {
    console.log("Erro no bot:", err);
  });
}

conectarBot();
