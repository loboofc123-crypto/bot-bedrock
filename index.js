const bedrock = require('bedrock-protocol');
const http = require('http');

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
      version: '1.26.36.1' // <--- COLOQUE A VERSÃO EXATA DO SEU ATERNOS AQUI!
    });

    bot.on('spawn', () => {
      console.log("🟢 BOT ENTROU NO SERVIDOR COM SUCESSO!");
    });

    bot.on('text', (packet) => {
      console.log(`[CHAT] ${packet.source_name || 'Servidor'}: ${packet.message}`);
    });

    bot.on('error', (err) => {
      console.log("Erro no bot:", err.message);
      reconnect();
    });

    bot.on('close', () => {
      console.log("Desconectado. Reconectando em 5s...");
      reconnect();
    });

  } catch (e) {
    console.log("Erro:", e.message);
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
