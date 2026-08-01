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

// --- Prevenção de Crashes ---
process.on('uncaughtException', (err) => {
    console.error('Erro não tratado:', err.message);
});

process.on('unhandledRejection', (reason) => {
    console.error('Rejeição não tratada:', reason);
});

// --- Conexão Direta (Sem Ping UDP) ---
function startBot() {
    console.log("Conectando ao servidor Aternos...");

    const client = bedrock.createClient({
        host: 'JasonMomoa3126.aternos.me',
        port: 14729,
        username: '24hrsSERVER',
        offline: true,
        skipPing: true // Ignores O PING UDP QUE DAVA TIMEOUT NO RENDER!
    });

    client.on('join', () => {
        console.log('✅ Bot entrou com sucesso no servidor!');
    });

    client.on('text', (packet) => {
        console.log(`[Chat] ${packet.source_name}: ${packet.message}`);
    });

    client.on('error', (err) => {
        console.error('Erro no cliente:', err.message);
    });

    client.on('end', (reason) => {
        console.log(`Bot desconectado (${reason}). Tentando reconectar em 15 segundos...`);
        setTimeout(startBot, 15000);
    });
}

startBot();
