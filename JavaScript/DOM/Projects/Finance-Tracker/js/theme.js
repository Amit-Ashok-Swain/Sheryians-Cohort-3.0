// theme.js

const themeToggle =
    document.querySelector("#themeToggle");

const settingsThemeToggle =
    document.querySelector("#settingsThemeToggle");

const logo =
    document.querySelector("#logo");

const mobileLogo =
    document.querySelector("#mobileLogo");

function applyTheme(theme){

    appState.theme = theme;

    document.body.classList.toggle(
        "dark",
        theme === "dark"
    );

    if(themeToggle){

        themeToggle.checked =
            theme === "dark";

    }

    if(settingsThemeToggle){

        settingsThemeToggle.checked =
            theme === "dark";

    }
    const logoPath =
        theme === "dark"
            ? "./assets/images/logo-dark.png"
            : "./assets/images/logo-light.png";

    if(logo){

        logo.src = logoPath;

    }

    if(mobileLogo){

        mobileLogo.src = logoPath;

    }

    localStorage.setItem(
        STORAGE_KEYS.THEME,
        theme
    );

    // Update charts only on Dashboard
    if(typeof updateChart === "function"){

        updateChart();

    }

    // Update Settings UI only if it exists
    if(typeof refreshSettingsUI === "function"){

        refreshSettingsUI();

    }

}

function toggleTheme(event){

    const theme =
        event.target.checked
            ? "dark"
            : "light";

    applyTheme(theme);

    showToast(
        "Theme Updated",
        "success"
    );

}

function loadTheme(){

    const savedTheme =
        localStorage.getItem(STORAGE_KEYS.THEME) || "light";

    applyTheme(savedTheme);

}

function initializeTheme(){

    loadTheme();

    if(themeToggle){

        themeToggle.addEventListener(
            "change",
            toggleTheme
        );

    }

    if(settingsThemeToggle){

        settingsThemeToggle.addEventListener(
            "change",
            toggleTheme
        );

    }

}