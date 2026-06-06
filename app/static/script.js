const historyKey = "zeamays-prediction-history";
const maxHistoryItems = 8;

const form = document.getElementById("prediction-form");
const departmentInput = document.getElementById("departement-value");
const departmentError = document.getElementById("departement-error");
const yearInput = document.getElementById("annee");
const submitButton = document.getElementById("btn-predire");
const resetButton = document.getElementById("reset-form");
const newPredictionButton = document.getElementById("new-prediction");
const emptyState = document.getElementById("empty-state");
const resultContent = document.getElementById("result-content");
const errorBox = document.getElementById("erreur-box");
const errorText = document.getElementById("erreur-texte");
const historyList = document.getElementById("history-list");
const historyEmpty = document.getElementById("history-empty");
const clearHistoryButton = document.getElementById("clear-history");

const scoreCard = document.getElementById("score-card");
const resultContext = document.getElementById("result-context");
const yieldValue = document.getElementById("rendement-valeur");
const levelBadge = document.getElementById("badge-niveau");
const averageValue = document.getElementById("stat-moyenne");
const deltaValue = document.getElementById("stat-ecart");
const adviceText = document.getElementById("conseil-texte");

function getHistory() {
    try {
        const parsed = JSON.parse(localStorage.getItem(historyKey) || "[]");
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveHistory(items) {
    localStorage.setItem(historyKey, JSON.stringify(items.slice(0, maxHistoryItems)));
}

function getRainfallValue() {
    const selected = form.querySelector('input[name="qualite_pluie"]:checked');
    return selected ? selected.value : "Normale";
}

function closeAllSelects() {
    document.querySelectorAll("[data-select].is-open").forEach((select) => {
        select.classList.remove("is-open");
        select.querySelector(".select-trigger")?.setAttribute("aria-expanded", "false");
    });
}

function setDepartment(value) {
    const select = document.querySelector("[data-select]");
    const label = select.querySelector("[data-select-label]");
    const options = select.querySelectorAll("[role='option']");

    departmentInput.value = value;
    label.textContent = value || "Choisir un département";

    options.forEach((option) => {
        const isSelected = option.dataset.value === value;
        option.classList.toggle("is-selected", isSelected);
        option.setAttribute("aria-selected", String(isSelected));
    });

    departmentError.textContent = "";
}

function setRainfall(value) {
    const radio = form.querySelector(`input[name="qualite_pluie"][value="${CSS.escape(value)}"]`);
    if (radio) {
        radio.checked = true;
    }
}

function setYear(value) {
    const min = Number(yearInput.min);
    const max = Number(yearInput.max);
    const next = Math.min(max, Math.max(min, Number(value) || 2024));
    yearInput.value = String(next);
}

function resetForm({ clearResult = false } = {}) {
    setDepartment("");
    setRainfall("Normale");
    setYear(2024);
    departmentError.textContent = "";
    errorBox.hidden = true;

    if (clearResult) {
        resultContent.hidden = true;
        emptyState.hidden = false;
    }
}

function setLoading(isLoading) {
    submitButton.disabled = isLoading;
    submitButton.querySelector("span").textContent = isLoading ? "Calcul en cours" : "Estimer le rendement";
}

function setResultTone(level, color) {
    const fallback = {
        Faible: "#cf3f36",
        Normal: "#d78324",
        Bon: "#1f7a4d",
    };
    const tone = color || fallback[level] || fallback.Normal;
    levelBadge.style.backgroundColor = tone;
    levelBadge.style.color = level === "Normal" ? "#1c1605" : "#ffffff";
    scoreCard.style.setProperty("--result-tone", tone);
}

function displayResult(payload, request) {
    emptyState.hidden = true;
    errorBox.hidden = true;
    resultContent.hidden = false;

    yieldValue.textContent = Number(payload.rendement).toFixed(2);
    levelBadge.textContent = payload.niveau;
    resultContext.textContent = `${request.departement} · ${request.annee}`;
    averageValue.textContent = Number(payload.moyenne_historique).toFixed(2);

    const delta = Number(payload.ecart_pct);
    deltaValue.textContent = `${delta > 0 ? "+" : ""}${delta.toFixed(1)}`;
    deltaValue.style.color = delta >= 0 ? "#1f7a4d" : "#cf3f36";
    adviceText.textContent = payload.conseil;
    setResultTone(payload.niveau, payload.couleur);
}

function addToHistory(request, response) {
    const item = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        createdAt: new Date().toISOString(),
        request,
        response,
    };
    const items = [item, ...getHistory()];
    saveHistory(items);
    renderHistory();
}

function formatDate(isoDate) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(isoDate));
}

function renderHistory() {
    const items = getHistory();
    historyList.innerHTML = "";
    historyEmpty.classList.toggle("is-visible", items.length === 0);
    clearHistoryButton.disabled = items.length === 0;

    items.forEach((item) => {
        const row = document.createElement("article");
        row.className = "history-row";

        const main = document.createElement("div");
        main.className = "history-main";
        main.innerHTML = `
            <strong>${item.request.departement}</strong>
            <span>${item.request.qualite_pluie} · ${item.request.annee}</span>
        `;

        const value = document.createElement("div");
        value.className = "history-value";
        value.textContent = `${Number(item.response.rendement).toFixed(2)} t/ha`;

        const meta = document.createElement("div");
        meta.className = "history-meta";
        meta.textContent = formatDate(item.createdAt);

        const actions = document.createElement("div");
        actions.className = "history-actions";
        actions.innerHTML = `
            <button class="history-action" type="button" data-action="replay" aria-label="Rejouer cette prédiction">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12a7 7 0 1 0 2.05-4.95L5 9.1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
                    <path d="M5 4.7V9.1h4.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
                </svg>
            </button>
            <button class="history-action" type="button" data-action="delete" aria-label="Supprimer cette prédiction">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 7h14M10 11v6M14 11v6M7 7l1 13h8l1-13M9 7V4h6v3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
                </svg>
            </button>
        `;

        actions.querySelector("[data-action='replay']").addEventListener("click", () => {
            setDepartment(item.request.departement);
            setRainfall(item.request.qualite_pluie);
            setYear(item.request.annee);
            displayResult(item.response, item.request);
            form.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        actions.querySelector("[data-action='delete']").addEventListener("click", () => {
            saveHistory(getHistory().filter((entry) => entry.id !== item.id));
            renderHistory();
        });

        row.append(main, value, meta, actions);
        historyList.append(row);
    });
}

async function predict(event) {
    event.preventDefault();

    const request = {
        departement: departmentInput.value,
        qualite_pluie: getRainfallValue(),
        annee: yearInput.value,
    };

    if (!request.departement) {
        departmentError.textContent = "Sélectionnez un département.";
        return;
    }

    setLoading(true);
    errorBox.hidden = true;

    try {
        const response = await fetch("/predire", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request),
        });

        const payload = await response.json();

        if (!payload.succes) {
            throw new Error(payload.erreur || "La prédiction a échoué.");
        }

        displayResult(payload, request);
        addToHistory(request, payload);
    } catch (error) {
        resultContent.hidden = true;
        emptyState.hidden = false;
        errorText.textContent = error.message || "Erreur de connexion au serveur.";
        errorBox.hidden = false;
    } finally {
        setLoading(false);
    }
}

function bindCustomSelects() {
    document.querySelectorAll("[data-select]").forEach((select) => {
        const trigger = select.querySelector(".select-trigger");
        const options = select.querySelectorAll("[role='option']");

        trigger.addEventListener("click", () => {
            const isOpen = select.classList.contains("is-open");
            closeAllSelects();
            select.classList.toggle("is-open", !isOpen);
            trigger.setAttribute("aria-expanded", String(!isOpen));
        });

        options.forEach((option) => {
            option.addEventListener("click", () => {
                setDepartment(option.dataset.value);
                closeAllSelects();
            });
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest("[data-select]")) {
            closeAllSelects();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllSelects();
        }
    });
}

function bindYearControls() {
    document.querySelectorAll("[data-year-step]").forEach((button) => {
        button.addEventListener("click", () => {
            setYear(Number(yearInput.value) + Number(button.dataset.yearStep));
        });
    });
}

function bindHistoryControls() {
    clearHistoryButton.addEventListener("click", () => {
        saveHistory([]);
        renderHistory();
    });
}

form.addEventListener("submit", predict);
resetButton.addEventListener("click", () => resetForm({ clearResult: false }));
newPredictionButton.addEventListener("click", () => {
    resetForm({ clearResult: true });
    form.scrollIntoView({ behavior: "smooth", block: "start" });
});

bindCustomSelects();
bindYearControls();
bindHistoryControls();
renderHistory();
