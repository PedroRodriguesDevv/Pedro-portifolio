// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== NAVEGAÇÃO ATIVA =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== BOTÕES =====
document.getElementById('projectsBtn').addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('contactBtn').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('downloadCV').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'assets/docs/cv-pedro-rodrigues.pdf';
    link.download = 'CV-Pedro-Rodrigues.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// ===== PROJECT CARDS =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const project = card.dataset.project;
        const projects = {
            dojo: {
                name: 'DOJO-SYSTEM',
                desc: 'Sistema completo para academia com app mobile (React Native) e painel administrativo web. Backend com Java Spring Boot e PostgreSQL.',
                status: '🚧 Em desenvolvimento'
            },
            finance: {
                name: 'MY-FINANCE',
                desc: 'App mobile de controle financeiro pessoal. Desenvolvido com Angular, TypeScript, CSS e Bootstrap.',
                status: '🚧 Em desenvolvimento'
            },
            webhook: {
                name: 'WEBHOOK BOOT',
                desc: 'Sistema de pagamentos com integração webhook. Backend robusto com Java e Spring Boot. 100% funcional.',
                status: '✅ Finalizado'
            }
        };
        
        const data = projects[project];
        if (data) {
            alert(
                `🚀 ${data.name}\n\n` +
                `📌 ${data.desc}\n\n` +
                `📊 Status: ${data.status}\n\n` +
                `🔗 Em breve mais informações!`
            );
        }
    });
});

// ===== FORMULÁRIO DE CONTATO =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    if (name && email && message) {
        alert(`✅ Mensagem enviada com sucesso!\n\nOlá ${name}, em breve entrarei em contato.`);
        form.reset();
    } else {
        alert('⚠️ Por favor, preencha todos os campos.');
    }
});

// ============================================
// ===== MUSIC PLAYER CORRIGIDO =====
// ============================================

const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const progress = document.getElementById('musicProgress');
const artistEl = document.getElementById('musicArtist');
const titleEl = document.getElementById('musicTitle');
const thumbEl = document.getElementById('musicThumb');

// ✅ COLOQUE O NOME CORRETO DO SEU ARQUIVO AQUI
const playlist = [
    {
        title: 'Alien Boy',
        artist: 'Oliver Tree',
        thumb: '🎵',
        src: 'https://PedroRodriguesDevv.github.io/Pedro-portifolio/assets/music/Alien-Boy.mp3'  // ← MUDE PARA O NOME DO SEU ARQUIVO
    }
];

let currentTrack = 0;
let isPlaying = false;
let progressInterval = null;

function loadTrack(index) {
    const track = playlist[index];
    if (!track) return;
    
    artistEl.textContent = track.artist;
    titleEl.textContent = track.title;
    thumbEl.textContent = track.thumb;
    audio.src = track.src;
    audio.load();
    progress.style.width = '0%';
    
    console.log('🎵 Carregando:', track.title, '-', track.artist);
    console.log('📁 Caminho:', track.src);
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '▶';
        isPlaying = false;
        clearInterval(progressInterval);
        console.log('⏸ Pausado');
    } else {
        audio.play()
            .then(() => {
                console.log('▶ Tocando...');
                playBtn.textContent = '⏸';
                isPlaying = true;
                progressInterval = setInterval(() => {
                    if (audio.duration) {
                        const percent = (audio.currentTime / audio.duration) * 100;
                        progress.style.width = percent + '%';
                    }
                }, 500);
            })
            .catch((error) => {
                console.error('❌ Erro ao tocar:', error);
                alert('⚠️ Erro ao tocar música. Verifique:\n1. O arquivo existe em assets/music/\n2. O nome do arquivo está correto\n3. O arquivo é um MP3 válido');
            });
    }
}

function nextTrack() {
    if (playlist.length > 1) {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        if (isPlaying) {
            audio.play();
        }
    } else {
        audio.currentTime = 0;
        progress.style.width = '0%';
        if (isPlaying) {
            audio.play();
        }
    }
}

function prevTrack() {
    if (playlist.length > 1) {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrack);
        if (isPlaying) {
            audio.play();
        }
    } else {
        audio.currentTime = 0;
        progress.style.width = '0%';
    }
}

audio.addEventListener('ended', () => {
    console.log('⏹ Música terminou');
    playBtn.textContent = '▶';
    isPlaying = false;
    progress.style.width = '0%';
    clearInterval(progressInterval);
});

audio.addEventListener('error', (e) => {
    console.error('❌ Erro no áudio:', e);
    alert('⚠️ Erro ao carregar a música. Verifique:\n1. O arquivo existe em assets/music/\n2. O nome do arquivo está correto\n3. O arquivo é um MP3 válido');
});

playBtn.addEventListener('click', togglePlay);
document.getElementById('prevBtn').addEventListener('click', prevTrack);
document.getElementById('nextBtn').addEventListener('click', nextTrack);

document.querySelector('.mp-bar').addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    audio.currentTime = percent * audio.duration;
    progress.style.width = percent * 100 + '%';
});

loadTrack(0);

// 🔥 FORÇAR VOLUME MÁXIMO
audio.volume = 1.0;
console.log('🔊 Volume ajustado para 100%');

console.log('🎵 Music Player inicializado!');

// ===== CONTROLE DE VOLUME =====
const volumeBtn = document.getElementById('volumeBtn');

// Criar slider de volume
const sliderContainer = document.createElement('div');
sliderContainer.className = 'volume-slider-container';

const volumeSlider = document.createElement('input');
volumeSlider.type = 'range';
volumeSlider.className = 'volume-slider';
volumeSlider.min = 0;
volumeSlider.max = 1;
volumeSlider.step = 0.01;
volumeSlider.value = 1.0;

sliderContainer.appendChild(volumeSlider);

// Adicionar ao player (dentro do mp-controls)
const controlsContainer = document.querySelector('.mp-controls');
controlsContainer.style.position = 'relative';
controlsContainer.appendChild(sliderContainer);

// Abrir/fechar slider ao clicar no botão
volumeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sliderContainer.classList.toggle('active');
});

// 🔥 FECHAR AO CLICAR FORA (em qualquer lugar da página)
document.addEventListener('click', (e) => {
    // Verifica se o clique foi fora do slider e fora do botão
    if (!sliderContainer.contains(e.target) && e.target !== volumeBtn) {
        sliderContainer.classList.remove('active');
    }
});

// Controlar volume
volumeSlider.addEventListener('input', (e) => {
    const vol = parseFloat(e.target.value);
    audio.volume = vol;
    
    // Mudar ícone conforme o volume
    if (vol === 0) {
        volumeBtn.textContent = '🔇';
    } else if (vol < 0.5) {
        volumeBtn.textContent = '🔉';
    } else {
        volumeBtn.textContent = '🔊';
    }
});

// Volume inicial = 100%
audio.volume = 1.0;
console.log('🔊 Volume: 100%');

// ============================================
// ===== TERMINAL ANIMADO SEM SCROLL =====
// ============================================

const terminalBody = document.getElementById('terminalBody');

// Limpar terminal
terminalBody.innerHTML = '';

// Container para as mensagens
const messagesContainer = document.createElement('div');
messagesContainer.className = 'terminal-messages';
terminalBody.appendChild(messagesContainer);

// ===== MENSAGENS DE BOOT =====
const bootMessages = [
    { text: '> Carregando sistema...', type: 'line', delay: 400 },
    { text: '> Buscando localização... aguarde...', type: 'line', delay: 500 },
    { text: '> Localização encontrada: BRASIL', type: 'highlight', delay: 600 },
    { text: '> Você foi selecionado para contemplar', type: 'highlight', delay: 500 },
    { text: '> o meu portfólio', type: 'highlight', delay: 400 },
    { text: '> Bem-vindo ao sistema De PEDRO RODRIGUES', type: 'typing', delay: 700 },
    { text: '', type: 'spacer', delay: 300 },
    { text: '> Carregando informações do sistema...', type: 'line', delay: 500 },
    { text: '', type: 'spacer', delay: 400 },
];

// ===== CONTEÚDO PRINCIPAL =====
const terminalContent = [
    { text: 'C:\\pedro.dev> system-info', type: 'cmd' },
    { text: '> Sistema Iniciado...', type: 'line' },
    { text: '> Carregando paixao por tecnologia', type: 'line' },
    { text: '> Motivação: 100%', type: 'line' },
    { text: '> Café: infinito ☕', type: 'line' },
    { text: '', type: 'spacer' },
    { text: '> Status:', type: 'section' },
    { text: '  [✓] Java & Spring Boot', type: 'status', status: 'ONLINE' },
    { text: '  [✓] React & TypeScript', type: 'status', status: 'ONLINE' },
    { text: '  [✓] PostgreSQL', type: 'status', status: 'ONLINE' },
    { text: '  [✓] Docker', type: 'status', status: 'ONLINE' },
    { text: '', type: 'spacer' },
    { text: '> Objetivo: Criar soluções que fazem a diferença', type: 'objective' },
    { text: '', type: 'spacer' },
    { text: 'C:\\pedro.dev>', type: 'prompt' },
];

let currentIndex = 0;
let isBootComplete = false;
const maxVisibleLines = 10; // Menos linhas visíveis = mais remoção

function addTerminalMessage(message, type, status) {
    const div = document.createElement('div');
    
    if (type === 'line') {
        div.className = 't-line';
        div.textContent = message;
    } else if (type === 'highlight') {
        div.className = 't-line-highlight';
        div.textContent = message;
    } else if (type === 'typing') {
        div.className = 't-line-typing';
        div.textContent = message;
    } else if (type === 'cmd') {
        div.className = 't-cmd';
        div.textContent = message;
    } else if (type === 'section') {
        div.className = 't-section';
        div.textContent = message;
    } else if (type === 'objective') {
        div.className = 't-objective';
        div.textContent = message;
    } else if (type === 'status') {
        div.className = 't-status';
        const keySpan = document.createElement('span');
        keySpan.className = 'key';
        keySpan.textContent = message;
        const statusSpan = document.createElement('span');
        let statusClass = 'online';
        if (status === '🚧 DEV') statusClass = 'dev';
        else if (status === '✅ DONE') statusClass = 'done';
        statusSpan.className = statusClass;
        statusSpan.textContent = status;
        div.appendChild(keySpan);
        div.appendChild(statusSpan);
    } else if (type === 'spacer') {
        div.style.height = '6px';
        div.className = 't-spacer';
    } else if (type === 'prompt') {
        div.className = 't-prompt-final';
        div.innerHTML = message + '<span class="t-cursor"></span>';
        messagesContainer.appendChild(div);
        return;
    }
    
    messagesContainer.appendChild(div);
    
    // REMOVER LINHAS ANTIGAS IMEDIATAMENTE
    const allLines = messagesContainer.querySelectorAll('.t-line, .t-line-highlight, .t-line-typing, .t-cmd, .t-status, .t-section, .t-objective');
    if (allLines.length > maxVisibleLines) {
        const toRemove = allLines.length - maxVisibleLines;
        for (let i = 0; i < toRemove; i++) {
            if (allLines[i]) {
                allLines[i].classList.add('fade-out');
                setTimeout(() => {
                    if (allLines[i] && allLines[i].parentNode) {
                        allLines[i].remove();
                    }
                }, 300);
            }
        }
    }
}

function showNextMessage() {
    let messages = isBootComplete ? terminalContent : bootMessages;
    
    if (currentIndex >= messages.length) {
        if (!isBootComplete) {
            isBootComplete = true;
            currentIndex = 0;
            setTimeout(showNextMessage, 500);
        }
        return;
    }
    
    const msg = messages[currentIndex];
    addTerminalMessage(msg.text, msg.type, msg.status);
    currentIndex++;
    
    let delay = msg.delay || 400;
    setTimeout(showNextMessage, delay);
}

// Iniciar
setTimeout(showNextMessage, 600);
console.log('💻 Terminal animado iniciado!');