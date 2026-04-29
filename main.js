let games = [];
let filteredGames = [];
let selectedCategory = 'All';
let searchQuery = '';

console.log('Unblocked Games 81: App Initializing...');

async function init() {
    try {
        const response = await fetch('./games.json');
        if (!response.ok) throw new Error('Failed to fetch games data');
        games = await response.json();
        console.log('Games loaded:', games.length);
        renderHome();
        setupSearch();
    } catch (error) {
        console.error('Initialization Error:', error);
        document.getElementById('mainContent').innerHTML = `
            <div class="text-center py-24 text-gray-500">
                <p>Failed to load games data. Please try again later.</p>
                <p class="text-xs mt-2">${error.message}</p>
            </div>
        `;
    }
}

function renderHome() {
    console.log('Rendering Home View');
    const mainContent = document.getElementById('mainContent');
    const template = document.getElementById('homeTemplate');
    if (!template) return;
    
    mainContent.innerHTML = '';
    mainContent.appendChild(template.content.cloneNode(true));

    renderCategories();
    applyFilters();
    if (window.lucide) {
        lucide.createIcons();
    }
}

function renderCategories() {
    const categoryBar = document.getElementById('categoryBar');
    if (!categoryBar) return;

    const categories = ['All', ...new Set(games.map(g => g.category))];
    
    categoryBar.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.className = `px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === cat
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-white/20'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
        }`;
        btn.onclick = () => {
            selectedCategory = cat;
            renderHome();
        };
        categoryBar.appendChild(btn);
    });
}

function applyFilters() {
    filteredGames = games.filter(game => {
        const nameMatches = game.name.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatches = selectedCategory === 'All' || game.category === selectedCategory;
        return nameMatches && categoryMatches;
    });

    const gameGrid = document.getElementById('gameGrid');
    const noResults = document.getElementById('noResults');
    
    if (!gameGrid) return;
    gameGrid.innerHTML = '';
    
    if (filteredGames.length === 0) {
        if (noResults) noResults.classList.remove('hidden');
    } else {
        if (noResults) noResults.classList.add('hidden');
        filteredGames.forEach(game => {
            const card = createGameCard(game);
            gameGrid.appendChild(card);
        });
    }
    
    if (window.lucide) lucide.createIcons();
}

function createGameCard(game) {
    const div = document.createElement('div');
    div.className = "group relative bg-[#15151a] rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer hover:-translate-y-2";
    div.onclick = () => playLevel(game);

    div.innerHTML = `
        <div class="aspect-video relative overflow-hidden bg-gray-900 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0"></div>
            <div class="z-10 flex flex-col items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                <i data-lucide="play" class="w-12 h-12 text-white fill-white/20 group-hover:scale-110 transition-transform duration-500"></i>
            </div>
            <div class="absolute top-3 left-3 px-2 py-1 rounded-md glass text-[10px] uppercase font-bold tracking-wider text-indigo-400 border border-indigo-400/20">
                ${game.category}
            </div>
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-2xl">
                    <i data-lucide="play" class="text-white w-6 h-6 fill-white ml-1"></i>
                </div>
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-bold text-gray-100 group-hover:text-indigo-400 transition-colors truncate">
                ${game.name}
            </h3>
            <p class="text-xs text-gray-500 line-clamp-1 mt-1 leading-relaxed">
                ${game.description}
            </p>
        </div>
    `;
    return div;
}

function playLevel(game) {
    console.log('Playing Game:', game.name);
    const mainContent = document.getElementById('mainContent');
    const template = document.getElementById('playerTemplate');
    if (!template) return;

    mainContent.innerHTML = '';
    mainContent.appendChild(template.content.cloneNode(true));

    document.getElementById('gameIframe').src = game.url;
    document.getElementById('playerGameTitle').textContent = game.name;
    document.getElementById('playerGameCategory').textContent = game.category;
    document.getElementById('playerGameDesc').textContent = game.description;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) lucide.createIcons();
    
    window.currentPlayingGame = game;
}

function showHome() {
    selectedCategory = 'All';
    searchQuery = '';
    renderHome();
    const searchBar = document.getElementById('searchBar');
    if (searchBar) searchBar.value = '';
}

function setupSearch() {
    const searchBar = document.getElementById('searchBar');
    if (!searchBar) return;
    
    searchBar.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (document.getElementById('gameGrid')) {
            applyFilters();
        }
    });
}

function popOut() {
    if (window.currentPlayingGame) {
        window.open(window.currentPlayingGame.url, '_blank');
    }
}

function toggleFullscreen() {
    const iframe = document.getElementById('gameIframe');
    if (!iframe) return;
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

document.addEventListener('DOMContentLoaded', init);
window.showHome = showHome;
window.popOut = popOut;
window.toggleFullscreen = toggleFullscreen;
