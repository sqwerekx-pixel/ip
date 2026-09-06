const express = require('express');
const app = express();

app.set('trust proxy', true);

app.get('/', (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[NOWE WEJŚCIE] IP: ${clientIp}`);
    res.send(`<h1>Twoje IP to: ${clientIp}</h1>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Serwer działa'));
