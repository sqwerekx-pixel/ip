const express = require('express');
const app = express();

app.set('trust proxy', true);

app.get('/', (req, res) => {
    // 1. Rejestracja adresu IP w logach
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[ZAREJESTROWANO IP] ${new Date().toISOString()} - IP: ${clientIp}`);

    // 2. Wyświetlenie strony YouTube i przekierowanie po 3 sekundach
    res.send(`
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>YouTube</title>
            <script>
                // Przekierowanie na filmik po 3 sekundach (3000 ms)
                setTimeout(() => {
                    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                }, 3000);
            </script>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    font-family: "Roboto", "Arial", sans-serif;
                    background-color: #ffffff;
                    color: #0f0f0f;
                    overflow-x: hidden;
                }
                
                /* Top Header Navbar */
                header {
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 16px;
                    position: fixed;
                    top: 0;
                    width: 100%;
                    background: #fff;
                    z-index: 100;
                }
                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    font-weight: bold;
                    font-size: 18px;
                }
                .menu-icon { font-size: 20px; cursor: pointer; }
                .yt-logo { display: flex; align-items: center; gap: 4px; }
                .play-btn {
                    background: red;
                    color: white;
                    border-radius: 4px;
                    padding: 2px 6px;
                    font-size: 12px;
                }
                .search-bar {
                    display: flex;
                    align-items: center;
                    width: 40%;
                    max-width: 600px;
                }
                .search-input {
                    width: 100%;
                    padding: 8px 16px;
                    border: 1px solid #ccc;
                    border-radius: 40px 0 0 40px;
                    outline: none;
                    font-size: 14px;
                }
                .search-btn {
                    padding: 8px 20px;
                    border: 1px solid #ccc;
                    border-left: none;
                    border-radius: 0 40px 40px 0;
                    background: #f8f8f8;
                    cursor: pointer;
                }

                /* Sidebar & Layout */
                .main-layout {
                    display: flex;
                    margin-top: 56px;
                }
                aside {
                    width: 210px;
                    padding: 12px;
                    font-size: 14px;
                    height: calc(100vh - 56px);
                    position: fixed;
                }
                .nav-item {
                    padding: 10px 12px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    cursor: pointer;
                    margin-bottom: 4px;
                }
                .nav-item.active { background: #f2f2f2; font-weight: bold; }
                .nav-item:hover { background: #e5e5e5; }

                /* Content Area */
                main {
                    margin-left: 210px;
                    padding: 16px 24px;
                    width: calc(100% - 210px);
                }
                
                /* Tags Row */
                .tags {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 24px;
                    overflow-x: auto;
                }
                .tag {
                    padding: 6px 12px;
                    background: #f2f2f2;
                    border-radius: 8px;
                    font-size: 14px;
                    white-space: nowrap;
                    font-weight: 500;
                }
                .tag.active { background: #0f0f0f; color: #fff; }

                /* Video Grid */
                .video-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 16px;
                }
                .card {
                    display: flex;
                    flex-direction: column;
                }
                .thumbnail {
                    width: 100%;
                    aspect-ratio: 16/9;
                    background-color: #e0e0e0;
                    border-radius: 12px;
                    position: relative;
                    background-size: cover;
                    background-position: center;
                }
                .duration {
                    position: absolute;
                    bottom: 8px;
                    right: 8px;
                    background: rgba(0,0,0,0.8);
                    color: white;
                    font-size: 12px;
                    padding: 2px 4px;
                    border-radius: 4px;
                }
                .details {
                    display: flex;
                    gap: 12px;
                    margin-top: 12px;
                }
                .avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: #bbb;
                }
                .info-title {
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 1.3;
                    margin-bottom: 4px;
                }
                .info-meta {
                    font-size: 12px;
                    color: #606060;
                }
            </style>
        </head>
        <body>

            <!-- Header -->
            <header>
                <div class="logo-container">
                    <span class="menu-icon">☰</span>
                    <div class="yt-logo"><span class="play-btn">▶</span> <strong>YouTube</strong><sup>PL</sup></div>
                </div>
                <div class="search-bar">
                    <input type="text" class="search-input" placeholder="Szukaj">
                    <button class="search-btn">🔍</button>
                </div>
                <div style="font-size: 14px; color: #065fd4; border: 1px solid #def; padding: 6px 12px; border-radius: 18px;">👤 Zaloguj się</div>
            </header>

            <div class="main-layout">
                <!-- Sidebar -->
                <aside>
                    <div class="nav-item active">🏠 Główna</div>
                    <div class="nav-item">🩳 Shorts</div>
                    <div class="nav-item">📺 Subskrypcje</div>
                    <hr style="margin: 12px 0; border: none; border-top: 1px solid #e5e5e5;">
                    <div class="nav-item">📁 Ty</div>
                    <div class="nav-item">🕒 Historia</div>
                </aside>

                <!-- Video Feed -->
                <main>
                    <!-- Category Filter Buttons -->
                    <div class="tags">
                        <span class="tag active">Wszystko</span>
                        <span class="tag">Gry</span>
                        <span class="tag">Grand Theft Auto Online</span>
                        <span class="tag">Na żywo</span>
                        <span class="tag">Podcasty</span>
                        <span class="tag">Obejrzane</span>
                    </div>

                    <!-- Video Items -->
                    <div class="video-grid">
                        
                        <!-- Video 1 (LSPDFR / Police Mod) -->
                        <div class="card">
                            <div class="thumbnail" style="background-image: url('https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg');">
                                <span class="duration">1:09:10</span>
                            </div>
                            <div class="details">
                                <div class="avatar"></div>
                                <div>
                                    <div class="info-title">MOST REALISTIC MODS FOR LSPDFR! TOP 5 2026</div>
                                    <div class="info-meta">Simulator Liam<br>14 tys. wyświetleń • 1 miesiąc temu</div>
                                </div>
                            </div>
                        </div>

                        <!-- Video 2 (Amazon Jungle) -->
                        <div class="card">
                            <div class="thumbnail" style="background-image: url('https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg');">
                                <span class="duration">27:00</span>
                            </div>
                            <div class="details">
                                <div class="avatar"></div>
                                <div>
                                    <div class="info-title">Sam Pośródku Amazońskiej Dżungli Przez 100 Godzin...</div>
                                    <div class="info-meta">elo mordo ✔<br>563 tys. wyświetleń • 1 dzień temu</div>
                                </div>
                            </div>
                        </div>

                        <!-- Video 3 (Shorts/Vlog) -->
                        <div class="card">
                            <div class="thumbnail" style="background-image: url('https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg');">
                                <span class="duration">12:45</span>
                            </div>
                            <div class="details">
                                <div class="avatar"></div>
                                <div>
                                    <div class="info-title">Walcz z prawdziwymi graczami. Dołącz teraz całkowicie za darmo.</div>
                                    <div class="info-meta">Sponsorowane • War Thunder</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>

        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Serwer działa'));
