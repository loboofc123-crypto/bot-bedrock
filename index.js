const bedrock = require('bedrock-protocol');
const express = require('express');

// --- Servidor Web Mínimo para o Render ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot do Minecraft Bedrock está ativo!');
});

app.listen(PORT, () => {
    console.log(`Servidor HTTP rodando na porta ${PORT}`);
});

// --- Evita que a aplicação caia por erros não tratados ---
process.on('uncaughtException', (err) => {
    console.error('Erro não tratado capturado:', err.message);
});

process.on('unhandledRejection', (reason) => {
    console.error('Rejeição não tratada capturada:', reason);
});

// --- Conexão do Bot com Reconexão Automática ---
function startBot() {
    console.log("Tentando conectar ao servidor Minecraft...");

    const client = bedrock.createClient({
        host: 'JasonMomoa3126.aternos.me',
        port: 14729,
        username: '24hrsSERVER',
        offline: true
    });

    client.on('text', (packet) => {
        console.log(`[Chat] ${packet.source_name}: ${packet.message}`);
    });

    client.on('error', (err) => {
        console.error('Erro no cliente:', err.message);
    });

    client.on('end', () => {
        console.log('Bot desconectado. Tentando reconectar em 30 segundos...');
        setTimeout(startBot, 30000);
    });
}

startBot();
