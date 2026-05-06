const state = {
    currentUrl: "https://rickandmortyapi.com/api/character",
    next: null,
    prev: null,
    characters: [],
    filtered: [],
    loading: false,
    filter: "all" // ← persistencia del filtro
};

// -------------------------------
// REQUEST
// -------------------------------
async function requestData(url) {
    if (state.loading) return;

    state.loading = true;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Estado
        state.currentUrl = url;
        state.next = data.info.next;
        state.prev = data.info.prev;
        state.characters = data.results;

        // Aplicar filtro actual
        filterCharacters();

        updateButtons();
        syncFilterUI();

    } catch (error) {
        console.error(error);
    } finally {
        state.loading = false;
    }
}

// -------------------------------
// RENDER
// -------------------------------
function renderHtml(characters) {
    const element = document.getElementById("character");

    element.innerHTML = characters.map(character => `
        <li>
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <span>${character.gender}</span>
        </li>
    `).join('');
}

// -------------------------------
// BOTONES
// -------------------------------
function updateButtons() {
    const nextBtn = document.getElementById("loadMore");
    const prevBtn = document.getElementById("loadLess");

    nextBtn.disabled = !state.next;
    prevBtn.disabled = !state.prev;
}

// -------------------------------
// PAGINACIÓN
// -------------------------------
function loadMore() {
    if (state.next) requestData(state.next);
}

function loadPrev() {
    if (state.prev) requestData(state.prev);
}

// -------------------------------
// FILTRO (controlador)
// -------------------------------
function applyFilter() {
    const value = document.getElementById("genderFilter").value;
    state.filter = value;

    filterCharacters();
}

// -------------------------------
// FILTRO (lógica)
// -------------------------------
function filterCharacters() {
    if (state.filter === "all") {
        state.filtered = [...state.characters];
    } else {
        state.filtered = state.characters.filter(
            c => c.gender.toLowerCase() === state.filter.toLowerCase()
        );
    }

    renderHtml(state.filtered);
}

// -------------------------------
// SINCRONIZAR UI
// -------------------------------
function syncFilterUI() {
    document.getElementById("genderFilter").value = state.filter;
}

// -------------------------------
// INIT
// -------------------------------
requestData(state.currentUrl);