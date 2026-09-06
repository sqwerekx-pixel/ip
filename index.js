const express = require('express');
const app = express();

app.set('trust proxy', true);

app.get('/', (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[LOG IP] ${new Date().toISOString()} - IP: ${clientIp}`);

    res.send(`
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>YouTube</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background-color: #0f0f0f; color: #f1f1f1; font-family: "Roboto", Arial, sans-serif; overflow-x: hidden; }
                
                /* Top Header */
                header { position: fixed; top: 0; left: 0; right: 0; height: 56px; background: #0f0f0f; display: flex; justify-content: space-between; align-items: center; padding: 0 16px; z-index: 100; }
                .logo-container { display: flex; align-items: center; gap: 16px; font-weight: bold; font-size: 18px; cursor: pointer; }
                .search-container { display: flex; align-items: center; width: 40%; max-width: 600px; }
                .search-box { width: 100%; background: #121212; border: 1px solid #303030; border-radius: 40px 0 0 40px; padding: 8px 16px; color: white; font-size: 16px; outline: none; }
                .search-box:focus { border-color: #1c62b9; }
                .search-btn { background: #222222; border: 1px solid #303030; border-left: none; border-radius: 0 40px 40px 0; padding: 8px 20px; color: white; cursor: pointer; }
                .user-icon { width: 32px; height: 32px; background: #555; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; }

                /* Main Layout */
                .container { display: flex; margin-top: 56px; padding: 24px; gap: 24px; max-width: 1750px; margin-left: auto; margin-right: auto; }
                .main-content { flex: 1; }
                .sidebar { width: 400px; display: flex; flex-direction: column; gap: 12px; }

                /* Video Player Area */
                .player-box { width: 100%; aspect-ratio: 16 / 9; background: #000; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; }
                .spinner { width: 48px; height: 48px; border: 4px solid #333; border-top: 4px solid #f00; border-radius: 50%; animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .error-text { margin-top: 16px; color: #aaa; font-size: 14px; }

                /* Video Details */
                .video-title { font-size: 20px; font-weight: bold; margin-top: 12px; }
                .channel-row { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding-bottom: 12px; border-bottom: 1px solid #303030; }
                .channel-info { display: flex; align-items: center; gap: 12px; }
                .channel-avatar { width: 40px; height: 40px; background: #f00; border-radius: 50%; }
                .subscribe-btn { background: #f1f1f1; color: #0f0f0f; border: none; padding: 10px 16px; border-radius: 18px; font-weight: bold; cursor: pointer; }

                /* Recommended Videos List */
                .rec-item { display: flex; gap: 8px; cursor: pointer; }
                .rec-thumb { width: 168px; height: 94px; background: #272727; border-radius: 8px; flex-shrink: 0; position: relative; }
                .rec-details { display: flex; flex-direction: column; gap: 4px; }
                .rec-title { font-size: 14px; font-weight: 500; line-height: 1.2; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .rec-meta { font-size: 12px; color: #aaa; }

                @media (max-width: 1000px) {
                    .container { flex-direction: column; }
                    .sidebar { width: 100%; }
                }
            </style>
        </head>
        <body>
            <header>
                <div class="logo-container">
                    <span style="color:red; font-size:22px;">▶</span> YouTube
                </div>
                <div class="search-container">
                    <input type="text" class="search-box" placeholder="Szukaj">
                    <button class="search-btn">🔍</button>
                </div>
                <div class="user-icon">U</div>
            </header>

            <div class="container">
                <div class="main-content">
                    <div class="player-box">
                        <div class="spinner"></div>
                        <div class="error-text">Ładowanie strumienia wideo...</div>
                    </div>
                    <div class="video-title">Najnowsze materiały w jakości 4K</div>
                    <div class="channel-row">
                        <div class="channel-info">
                            <div class="channel-avatar"></div>
                            <div>
                                <div style="font-weight:bold;">Oficjalny Kanał</div>
                                <div style="font-size:12px; color:#aaa;">1,2 mln subskrybentów</div>
                            </div>
                        </div>
                        <button class="subscribe-btn">Subskrybuj</button>
                    </div>
                </div>

                <div class="sidebar">
                    <div class="rec-item">
                        <div class="rec-thumb"></div>
                        <div class="rec-details">
                            <div class="rec-title">Niesamowite ujęcia przyrody w jakości 8K HDR</div>
                            <div class="rec-meta">Natura TV • 240 tys. wyświetleń</div>
                        </div>
                    </div>
                    <div class="rec-item">
                        <div class="rec-thumb"></div>
                        <div class="rec-details">
                            <div class="rec-title">Szybki poradnik programowania i tworzenia stron</div>
                            <div class="rec-meta">CodeAcademy • 15 tys. wyświetleń</div>
                        </div>
                    </div>
                    <div class="rec-item">
                        <div class="rec-thumb"></div>
                        <div class="rec-details">
                            <div class="rec-title">Skrót najważniejszych wiadomości ze świata technologii</div>
                            <div class="rec-meta">TechNews • 89 tys. wyświetleń</div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Serwer działa'));
