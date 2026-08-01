const bedrock = require('bedrock-protocol');
const http = require('http');

// Servidor de fachada pro Render ficar Live sem fechar
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => res.end('OK')).listen(PORT);

let bot = null;

function iniciarBot() {
  console.log("Tentando conectar ao Aternos...");

  try {
    bot = bedrock.createClient({
      host: 'JasonMomoa3126.aternos.me',
      port: 14729,
      username: '24hrsSERVER',
      offline: true,
      skipPing: true,
      concurrency: 1,
      connectTimeout: 90000,
      compressionThreshold: 0
    });

    bot.on('spawn', () => {
      console.log("🟢 BOT ENTROU NO SERVIDOR COM SUCESSO!");
    });

    bot.on('text', (packet) => {
      console.log(`[CHAT] ${packet.source_name || 'Servidor'}: ${packet.message}`);
    });

    bot.on('error', (err) => {
      console.log("Aguardando servidor/reconectando:", err.message);
      reconnect();
    });

    bot.on('close', () => {
      console.log("Conexão fechada. Reconectando em 5s...");
      reconnect();
    });

  } catch (e) {
    console.log("Erro de inicialização:", e.message);
    reconnect();
  }
}

function reconnect() {
  if (bot) {
    try { bot.close(); } catch(e) {}
    bot = null;
  }
  setTimeout(iniciarBot, 5000);
}

iniciarBot();
