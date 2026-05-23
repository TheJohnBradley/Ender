/**
 * ENDER OS - LOCAL INITIALIZER & ENGINE
 * Matrix Sector: 2026-DeepSpace // Pure Local Standalone Framework
 */

(function() {
    // Structural runtime configuration - Fully decoupled from remote repositories
    window.ENDER_RUNTIME_CONFIG = {
        panelWidth: "650px",
        launchIconSrc: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDY0IDY0Ij48Y2lyY2xlIGN4PSIyOC4yMSIgY3k9IjMyIiByPSIyOCIgc3Ryb2tlPSIjMDBiZmZmIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMTguMjEsNDguODhsLTkuNDktOS40OSw0LTQsOS40OSw5LjQ5bDQtNEwxOC4yMSw0OC44OXoiIGZpbGw9IiMwMGJmZmYiLz48L3N2Zz4=",
        accentColor: "#00bfff", 
        warnColor: "#ff007f",   
        voidBackground: "rgba(8, 8, 14, 0.98)",
        modules: ["devConsole", "games"]
    };

    const _0x4f1a = {
        _zIdx: 100000,
        create(id, title, content, w = "400px", h = "300px") {
            if (document.getElementById(id)) return;
            const cfg = window.ENDER_RUNTIME_CONFIG;
            const e = document.createElement('div');
            e.id = id;
            e.style = `position:fixed;top:20%;left:30%;width:${w};height:${h};background:#111116;border:2px solid ${cfg.accentColor};border-radius:6px;box-shadow:0 12px 40px rgba(0,0,0,0.7);z-index:${this._zIdx++};display:flex;flex-direction:column;overflow:hidden;font-family:Consolas,monospace;color:#fff;`;
            e.innerHTML = `
                <div class="win-hdr" style="background:rgba(255,255,255,0.03);padding:10px;cursor:move;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;user-select:none;">
                    <span style="color:${cfg.accentColor};font-weight:bold;">${title}</span>
                    <div style="display:flex;gap:10px;">
                        <button class="w-min" style="background:none;border:none;color:#64748b;cursor:pointer;">_</button>
                        <button class="w-max" style="background:none;border:none;color:#64748b;cursor:pointer;">▢</button>
                        <button class="w-cls" style="background:none;border:none;color:${cfg.warnColor};cursor:pointer;font-weight:bold;">X</button>
                    </div>
                </div>
                <div class="win-bdy" style="flex-grow:1;position:relative;overflow:auto;background:#08080c;">${content}</div>
            `;
            document.body.appendChild(e);
            this._drag(e);
            this._hook(e);
        },
        _drag(e) {
            const h = e.querySelector('.win-hdr');
            let d = false, x, y;
            h.addEventListener('mousedown', (ev) => {
                if (ev.target.tagName === 'BUTTON') return;
                d = true; e.style.zIndex = this._zIdx++;
                x = ev.clientX - e.offsetLeft; y = ev.clientY - e.offsetTop;
                ev.preventDefault();
            });
            document.addEventListener('mousemove', (ev) => {
                if (!d) return;
                e.style.left = `${ev.clientX - x}px`; e.style.top = `${ev.clientY - y}px`;
            });
            document.addEventListener('mouseup', () => d = false);
        },
        _hook(e) {
            let m = false, r = {};
            const b = e.querySelector('.win-bdy');
            e.querySelector('.w-cls').onclick = () => e.remove();
            e.querySelector('.w-min').onclick = () => {
                if (b.style.display !== 'none') { b.style.display = 'none'; e.style.height = 'auto'; }
                else { b.style.display = 'block'; e.style.height = r.h || '300px'; }
            };
            e.querySelector('.w-max').onclick = () => {
                if (!m) {
                    r = { l: e.style.left, t: e.style.top, w: e.style.width, h: e.style.height };
                    e.style.top = e.style.left = '0px'; e.style.width = '100vw'; e.style.height = '100vh';
                    m = true;
                } else {
                    e.style.left = r.l; e.style.top = r.t; e.style.width = r.w; e.style.height = r.h;
                    m = false;
                }
            };
        }
    };

    window.EnderWindowSystem = _0x4f1a;

    function loadEnderOS() {
        if (document.getElementById('ender-matrix-panel')) return;

        const cfg = window.ENDER_RUNTIME_CONFIG;
        const panel = _0x7a3f(cfg);
        const icon = _0x1b2c(panel, cfg);
        _0x5c2e(panel);

        // === MODULE_LOAD_INJECTION_POINT ===
        _mountInlineConsole();
        _mountInlineGames();
        // === END_MODULE_LOAD_INJECTION_POINT ===

        setTimeout(() => {
            if (typeof window.initDeveloperConsole === "function") window.initDeveloperConsole(panel);
            if (typeof window.initGamesManager === "function") window.initGamesManager(panel);
        }, 200);

        document.body.appendChild(panel);
        document.body.appendChild(icon);
    }

    function _0x1b2c(panel, cfg) {
        const i = document.createElement('img');
        i.src = cfg.launchIconSrc;
        i.style = `position:fixed;top:20px;left:20px;width:60px;height:60px;z-index:999999;cursor:pointer;transition:transform 0.3s ease;filter:drop-shadow(0 0 8px ${cfg.accentColor});`;
        
        let o = false;
        i.onclick = () => {
            o = !o;
            panel.style.left = o ? "0px" : `-${cfg.panelWidth}`;
        };
        i.onmouseover = () => i.style.transform = 'scale(1.1) rotate(15deg)';
        i.onmouseout = () => i.style.transform = 'scale(1) rotate(0deg)';
        return i;
    }

    function _0x7a3f(cfg) {
        const p = document.createElement('div');
        p.id = "ender-matrix-panel";
        p.style = `position:fixed;top:0;left:-${cfg.panelWidth};width:${cfg.panelWidth};height:100vh;background-color:${cfg.voidBackground};border-right:2px solid ${cfg.accentColor};box-shadow:0 0 40px rgba(0,191,255,0.25);z-index:999998;transition:left 0.4s cubic-bezier(0.1,0.9,0.2,1);font-family:Consolas,monospace;color:#fff;padding:80px 20px 20px 20px;box-sizing:border-box;overflow-y:auto;`;
        
        const s = document.createElement('style');
        s.textContent = `
            .m-trig { background:rgba(255,255,255,0.03); border:1px solid rgba(0,191,255,0.15); color:#8a99ad; padding:8px 14px; cursor:pointer; border-radius:4px; font-family:inherit; transition:all 0.2s; }
            .m-trig.active { color:${cfg.accentColor}; background:rgba(0,191,255,0.12); border-color:${cfg.accentColor}; }
            .h-vec { display:none !important; }
        `;
        document.head.appendChild(s);

        p.innerHTML = `
            <h2 style="margin:0;font-size:24px;letter-spacing:2px;color:${cfg.accentColor};">ENDER OS GRID</h2>
            <p style="color:#475569;font-size:10px;margin:0 0 25px 0;text-transform:uppercase;">Distributed Core Grid Layer</p>
            <div style="margin-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:12px;display:flex;gap:8px;">
                <button class="m-trig active" id="t-dev">🛰️ Terminal</button>
                <button class="m-trig" id="t-gam">🎮 Simulations</button>
            </div>
            <div id="v-dev"></div>
            <div id="v-gam" class="h-vec"></div>
        `;
        return p;
    }

    function _0x5c2e(p) {
        const t = { d: p.querySelector('#t-dev'), g: p.querySelector('#t-gam') };
        const v = { d: p.querySelector('#v-dev'), g: p.querySelector('#v-gam') };
        const sw = (tg) => {
            Object.keys(t).forEach(k => { t[k].classList.remove('active'); v[k].classList.add('h-vec'); });
            t[tg].classList.add('active'); v[tg].classList.remove('h-vec');
        };
        t.d.onclick = () => sw('d'); t.g.onclick = () => sw('g');
    }

    // === MODULE_FUNCTIONS_INJECTION_POINT ===
    function _mountInlineConsole() {
window.initDeveloperConsole = function(panel) {
        const devView = panel.querySelector('#v-dev');
        if (!devView) return;
        const themeColor = window.ENDER_RUNTIME_CONFIG ? window.ENDER_RUNTIME_CONFIG.accentColor : "#00bfff";

        devView.innerHTML = `
            <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.05);border-radius:4px;padding:15px;font-family:inherit;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <span style="color:#64748b;font-size:11px;letter-spacing:1px;">GRID INTERACTION CONSOLE</span>
                </div>
                <div id="dev-log-stream" style="height:160px;overflow-y:auto;background:#050508;border:1px solid rgba(255,255,255,0.02);padding:10px;border-radius:4px;font-size:12px;color:#a7f3d0;line-height:1.5;margin-bottom:10px;box-sizing:border-box;">
                    <div>🛰️ [SYSTEM]: Environment terminal context operational.</div>
                </div>
                <div style="display:flex;background:#000;border:1px solid rgba(255,255,255,0.1);border-radius:4px;overflow:hidden;padding:4px 8px;align-items:center;">
                    <span style="color:${themeColor};font-size:12px;margin-right:6px;font-weight:bold;">$</span>
                    <input id="dev-terminal-input" type="text" style="background:transparent;border:none;color:#fff;outline:none;font-family:inherit;font-size:12px;flex-grow:1;" placeholder="Enter console vector directive..." />
                </div>
            </div>
        `;

        const stream = devView.querySelector('#dev-log-stream');
        const input = devView.querySelector('#dev-terminal-input');

        input.onkeydown = function(e) {
            if (e.key === "Enter" && input.value.trim() !== "") {
                const cmd = input.value.trim();
                const userLine = document.createElement('div');
                userLine.style.color = "#fff"; userLine.textContent = `> ${cmd}`;
                stream.appendChild(userLine);

                const responseLine = document.createElement('div');
                responseLine.style.color = themeColor;
                
                if (cmd === "help") {
                    responseLine.textContent = "↳ Core Vectors: system, clear, diagnostics, status";
                } else if (cmd === "clear") {
                    stream.innerHTML = ''; input.value = ''; return;
                } else if (cmd === "diagnostics") {
                    responseLine.textContent = "↳ Matrix Alignment: Correct. System Status: Nominal";
                } else if (cmd === "status") {
                    responseLine.textContent = "↳ Operating Matrix: Online [Sector: 2026-DeepSpace]";
                } else {
                    responseLine.textContent = `↳ Vector Directive Executed: "${cmd}"`;
                }
                stream.appendChild(responseLine);
                stream.scrollTop = stream.scrollHeight;
                input.value = '';
            }
        };
    };
}

    function _mountInlineGames() {
window.initGamesManager = function(p) {
        const c = p.querySelector('#v-gam'); if (!c) return;
        const accent = window.ENDER_RUNTIME_CONFIG ? window.ENDER_RUNTIME_CONFIG.accentColor : "#00bfff";
        
        c.innerHTML = `
            <div style="padding:15px;background:rgba(255,255,255,0.01);border:1px solid rgba(255,255,255,0.05);border-radius:4px;">
                <h4 style="margin:0 0 12px 0;color:${accent};font-size:14px;letter-spacing:1px;">SIMULATION GRID</h4>
                <div style="display:flex;gap:10px;">
                    <button id="l-mc" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:6px 12px;border-radius:4px;cursor:pointer;font-family:inherit;font-size:12px;">Boot Matrix Craft</button>
                    <button id="l-pn" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:6px 12px;border-radius:4px;cursor:pointer;font-family:inherit;font-size:12px;">Boot Wave Piano</button>
                </div>
            </div>
        `;

        c.querySelector('#l-mc').onclick = () => {
            window.EnderWindowSystem.create('w-mc', 'Simulation Grid: 2D Minecraft', `
                <div style="position:relative;width:100%;height:100%;">
                    <canvas id="c-mc" width="800" height="460" style="display:block;width:100%;height:100%;"></canvas>
                    <div style="position:absolute;top:10px;left:10px;color:rgba(255,255,255,0.6);font-size:11px;background:rgba(0,0,0,0.5);padding:6px;border-radius:4px;line-height:1.3;pointer-events:none;">
                        A/D | Left/Right - Move<br>W | Space - Jump<br>L-Click: Mine | R-Click: Build
                    </div>
                </div>
            `, '800px', '500px');
            _runMinecraftEngine();
        };

        c.querySelector('#l-pn').onclick = () => {
            window.EnderWindowSystem.create('w-pn', 'Audio Wave Generator Piano', `
                <div id="p-win" style="padding:15px; background:#111116; height:100%; box-sizing:border-box; display:flex; flex-direction:column; gap:10px; font-family:inherit; overflow:hidden;">
                    <div id="p-controls" style="display:flex; gap:15px; font-size:12px; background:rgba(255,255,255,0.02); padding:8px; border-radius:4px; border:1px solid rgba(255,255,255,0.05); align-items:center;"></div>
                    <div id="p-keyboard-host" style="position:relative; flex-grow:1; display:flex; background:#000; padding:5px; border-radius:4px; border:1px solid #222; min-height:120px;"></div>
                    <div id="p-playback" style="display:flex; gap:6px; background:rgba(255,255,255,0.01); padding:6px; border-radius:4px; flex-wrap:wrap; max-height:60px; overflow-y:auto;"></div>
                </div>
            `, '780px', '280px');
            _runPianoEngine();
        };
    };

    function _runMinecraftEngine() {
        const canvas = document.getElementById('c-mc'); if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const BS = 32, ROWS = 30, COLS = 150;
        const BLK = { SKY: 0, GRASS: 1, DIRT: 2, STONE: 3 };
        const world = [];

        for (let r = 0; r < ROWS; r++) {
            world[r] = [];
            for (let c = 0; c < COLS; c++) {
                const h = Math.floor(Math.sin(c * 0.1) * 3) + 12;
                world[r][c] = (r < h) ? BLK.SKY : (r === h) ? BLK.GRASS : (r < h + 4) ? BLK.DIRT : BLK.STONE;
            }
        }

        const p = { x: (COLS * BS) / 2, y: 100, w: 22, h: 44, vx: 0, vy: 0, spd: 4, jmp: 11, grd: false };
        const cam = { x: 0, y: 0, w: canvas.width, h: canvas.height };
        const keys = {};

        const _kd = (e) => { keys[e.key.toLowerCase()] = true; };
        const _ku = (e) => { keys[e.key.toLowerCase()] = false; };
        window.addEventListener('keydown', _kd); window.addEventListener('keyup', _ku);

        canvas.addEventListener('contextmenu', e => e.preventDefault());
        canvas.addEventListener('mousedown', (e) => {
            const r = canvas.getBoundingClientRect();
            const wx = e.clientX - r.left + cam.x, wy = e.clientY - r.top + cam.y;
            if (Math.hypot(wx - (p.x + p.w/2), wy - (p.y + p.h/2)) > 160) return;
            const tc = Math.floor(wx / BS), tr = Math.floor(wy / BS);
            if (tc < 0 || tc >= COLS || tr < 0 || tr >= ROWS) return;
            if (e.button === 0) world[tr][tc] = BLK.SKY;
            else if (e.button === 2 && world[tr][tc] === BLK.SKY) world[tr][tc] = BLK.DIRT;
        });

        function update() {
            p.vx = (keys['a'] || keys['arrowleft']) ? -p.spd : (keys['d'] || keys['arrowright']) ? p.spd : 0;
            if ((keys['w'] || keys[' ']) && p.grd) { p.vy = -p.jmp; p.grd = false; }
            p.vy += 0.5; if (p.vy > 12) p.vy = 12;

            p.x += p.vx;
            if (_coll(p.x, p.y)) p.x -= p.vx;
            p.y += p.vy;
            if (_coll(p.x, p.y)) {
                if (p.vy > 0) { p.y = Math.floor((p.y + p.h) / BS) * BS - p.h - 1; p.grd = true; }
                else { p.y = Math.floor(p.y / BS) * BS + BS; }
                p.vy = 0;
            } else if (p.vy !== 0) p.grd = false;

            cam.x += ((p.x - cam.w / 2) - cam.x) * 0.1;
            cam.x = Math.max(0, Math.min(COLS * BS - cam.w, cam.x));
        }

        function _coll(nx, ny) {
            const sc = Math.floor(nx / BS), ec = Math.floor((nx + p.w) / BS);
            const sr = Math.floor(ny / BS), er = Math.floor((ny + p.h) / BS);
            for (let r = sr; r <= er; r++) {
                for (let c = sc; c <= ec; c++) {
                    if (r >= 0 && r < ROWS && c >= 0 && c < COLS && world[r][c] !== BLK.SKY) return true;
                }
            }
            return false;
        }

        function render() {
            ctx.fillStyle = '#1e3a8a'; ctx.fillRect(0, 0, cam.w, cam.h);
            const cS = Math.max(0, Math.floor(cam.x / BS)), cE = Math.min(COLS - 1, Math.ceil((cam.x + cam.w) / BS));
            for (let r = 0; r < ROWS; r++) {
                for (let c = cS; c <= cE; c++) {
                    if (world[r][c] === BLK.SKY) continue;
                    ctx.fillStyle = world[r][c] === BLK.GRASS ? '#10b981' : world[r][c] === BLK.DIRT ? '#78350f' : '#4b5563';
                    ctx.fillRect(c * BS - cam.x, r * BS - cam.y, BS, BS);
                }
            }
            ctx.fillStyle = '#ef4444'; ctx.fillRect(p.x - cam.x, p.y - cam.y, p.w, p.h);
        }

        function loop() {
            if (!document.getElementById('c-mc')) { window.removeEventListener('keydown', _kd); window.removeEventListener('keyup', _ku); return; }
            update(); render(); requestAnimationFrame(loop);
        }
        loop();
    }

    function _runPianoEngine() {
        const ctrlHost = document.getElementById('p-controls');
        const keysHost = document.getElementById('p-keyboard-host');
        const playHost = document.getElementById('p-playback');
        if (!ctrlHost || !keysHost || !playHost) return;

        const piano = {
            audio: new (window.AudioContext || window.webkitAudioContext)(),
            wave: document.createElement("select"),
            pitch: document.createElement("input"),
            keymap: [
                {key: "`", caps_key: "~", type: "white", label: "`"}, {key: "Tab", caps_key: "Tab", type: "black", label: "⇥"},
                {key: "1", caps_key: "!", type: "white", label: "1"}, {key: "q", caps_key: "Q", type: "white", label: "Q"},
                {key: "2", caps_key: "@", type: "black", label: "2"}, {key: "w", caps_key: "W", type: "white", label: "W"},
                {key: "3", caps_key: "#", type: "black", label: "3"}, {key: "e", caps_key: "E", type: "white", label: "E"},
                {key: "r", caps_key: "R", type: "white", label: "R"}, {key: "5", caps_key: "%", type: "black", label: "5"},
                {key: "t", caps_key: "T", type: "white", label: "T"}, {key: "6", caps_key: "^", type: "black", label: "6"},
                {key: "y", caps_key: "Y", type: "white", label: "Y"}, {key: "u", caps_key: "U", type: "white", label: "U"},
                {key: "8", caps_key: "*", type: "black", label: "8"}, {key: "i", caps_key: "I", type: "white", label: "I"},
                {key: "9", caps_key: "(", type: "black", label: "9"}, {key: "o", caps_key: "O", type: "white", label: "O"},
                {key: "0", caps_key: ")", type: "black", label: "0"}, {key: "p", caps_key: "P", type: "white", label: "P"},
                {key: "[", caps_key: "{", type: "white", label: "["}, {key: "=", caps_key: "+", type: "black", label: "="},
                {key: "]", caps_key: "}", type: "white", label: "]"}, {key: "Backspace", caps_key: "Backspace", type: "black", label: "⌫"},
                {key: "\\", caps_key: "|", type: "white", label: "\\"}, {key: "ShiftLeft", caps_key: "ShiftLeft", type: "white", label: "⇧L"},
                {key: "a", caps_key: "A", type: "white", label: "A"}, {key: "z", caps_key: "Z", type: "white", label: "Z"},
                {key: "s", caps_key: "S", type: "white", label: "S"}, {key: "x", caps_key: "X", type: "white", label: "X"},
                {key: "d", caps_key: "D", type: "white", label: "D"}, {key: "c", caps_key: "C", type: "white", label: "C"},
                {key: "v", caps_key: "V", type: "white", label: "V"}, {key: "g", caps_key: "G", type: "black", label: "G"},
                {key: "b", caps_key: "B", type: "white", label: "B"}, {key: "h", caps_key: "H", type: "black", label: "H"},
                {key: "n", caps_key: "N", type: "white", label: "N"}, {key: "m", caps_key: "M", type: "white", label: "M"},
                {key: "k", caps_key: "K", type: "black", label: "K"}, {key: ",", caps_key: "<", type: "white", label: ","},
                {key: "l", caps_key: "L", type: "black", label: "L"}, {key: ".", caps_key: ">", type: "white", label: "."},
                {key: ";", caps_key: ":", type: "black", label: ";"}, {key: "/", caps_key: "?", type: "white", label: "/"},
                {key: "ShiftRight", caps_key: "ShiftRight", type: "white", label: "⇧R"}, {key: "Enter", caps_key: "Enter", type: "white", label: "↵"}
            ],
            disc: [[]],
            initialTime: 0,
            
            init() {
                ctrlHost.innerHTML = `<span>Wave:</span>`;
                ["sine", "triangle", "square", "sawtooth"].forEach(w => {
                    const opt = document.createElement("option"); opt.value = opt.textContent = w; this.wave.appendChild(opt);
                });
                this.wave.value = "triangle"; this.wave.style.background = "#1a1a24"; this.wave.style.color = "#fff";
                ctrlHost.appendChild(this.wave);

                ctrlHost.insertAdjacentHTML('beforeend', `<span style="margin-left:10px;">Octave Pitch:</span>`);
                this.pitch.type = "range"; this.pitch.min = 0; this.pitch.step = 12; this.pitch.max = 48; this.pitch.value = 24;
                ctrlHost.appendChild(this.pitch);

                keysHost.innerHTML = '';
                this.keymap.forEach((k) => {
                    const d = document.createElement("div");
                    d.className = k.type === "white" ? "p-white" : "p-black";
                    d.innerHTML = `<span style="pointer-events:none;">${k.label}</span>`;
                    k.dom = d; k.pressed = 0; keysHost.appendChild(d);

                    d.onmousedown = () => { this.triggerNoteDirect(k); };
                    d.onmouseup = d.onmouseleave = () => { d.classList.remove("piano-hit"); k.pressed = 0; };
                });

                this.renderPlaybackControls();
                window.addEventListener("keydown", this._kdHandler = (e) => this.keydown(e));
                window.addEventListener("keyup", this._kuHandler = (e) => this.keyup(e));
            },
            note(i, wave) {
                const vol = this.audio.createGain(); vol.connect(this.audio.destination);
                const osc = this.audio.createOscillator();
                osc.frequency.value = 440 * Math.pow(2, (i - 53) / 12);
                osc.type = wave; osc.connect(vol); osc.start();
                vol.gain.exponentialRampToValueAtTime(1 / Number.MAX_SAFE_INTEGER, this.audio.currentTime + 10);
                setTimeout(() => { osc.disconnect(); vol.disconnect(); }, 10000);
            },
            triggerNoteDirect(k) {
                const idx = this.keymap.indexOf(k);
                const val = idx + Number(this.pitch.value);
                k.dom.classList.add("piano-hit"); this.note(val, this.wave.value);
                if (this.disc[0].length === 0) this.initialTime = this.audio.currentTime;
                this.disc[0].push({ keyi: val, wave: this.wave.value, time: this.audio.currentTime - this.initialTime });
                this.renderPlaybackControls();
            },
            keydown(e) {
                if (!document.getElementById('p-win')) {
                    window.removeEventListener("keydown", this._kdHandler);
                    window.removeEventListener("keyup", this._kuHandler);
                    return;
                }
                const key = e.key.length === 1 ? e.key : e.code;
                const k = this.keymap.find(o => o.key === key || o.caps_key === key);
                if (k && k.pressed === 0) {
                    e.preventDefault(); k.pressed = 1; this.triggerNoteDirect(k);
                } else if (e.key === " ") {
                    this.disc[0] = []; this.renderPlaybackControls();
                }
            },
            keyup(e) {
                const key = e.key.length === 1 ? e.key : e.code;
                const k = this.keymap.find(o => o.key === key || o.caps_key === key);
                if (k) { k.pressed = 0; k.dom.classList.remove("piano-hit"); }
            },
            renderPlaybackControls() {
                playHost.innerHTML = '';
                const pBtn = document.createElement("button"); pBtn.className = "p-btn"; pBtn.textContent = "↻ Play Sequence";
                pBtn.disabled = this.disc[0].length === 0;
                pBtn.onclick = () => {
                    this.disc[0].forEach(n => {
                        setTimeout(() => {
                            this.note(n.keyi, n.wave);
                            const domi = n.keyi - Number(this.pitch.value);
                            if (domi >= 0 && domi < this.keymap.length) {
                                this.keymap[domi].dom.classList.add("piano-hit");
                                setTimeout(() => this.keymap[domi].dom.classList.remove("piano-hit"), 100);
                            }
                        }, n.time * 1000);
                    });
                };
                const cBtn = document.createElement("button"); cBtn.className = "p-btn"; cBtn.textContent = "✖ Clear";
                cBtn.disabled = this.disc[0].length === 0;
                cBtn.onclick = () => { this.disc[0] = []; this.renderPlaybackControls(); };
                playHost.appendChild(pBtn); playHost.appendChild(cBtn);
            }
        };
        piano.init();
    }
}
    })();
