const bedrock = require('bedrock-protocol');

function conectarBot() {
  console.log("Tentando conectar o bot...");

  const client = bedrock.createClient({
    host: 'JasonMomoa3126.aternos.me',
    port: 14729,
    username: 'Jorge_oBOT',
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

  // Trata os erros de timeout sem fechar o processo do Node.js
  client.on('error', (err) => {
    console.log("Servidor offline ou inacessível:", err.message || err);
    // Fecha a conexão do cliente atual para poder abrir uma nova limpa
    try {
      client.close();
    } catch (e) {}
  });
}

// Inicia a primeira conexão
conectarBot();
