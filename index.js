const bedrock = require('bedrock-protocol');

const client = bedrock.createClient({
    host: 'JasonMomoa3126.aternos.me',
    port: 14729,
    username: '24hrsSERVER',
    offline: true
});

client.on('text', (packet) => {
    console.log(`[Chat] ${packet.source_name}: ${packet.message}`);
});

console.log("Bot iniciado!");
