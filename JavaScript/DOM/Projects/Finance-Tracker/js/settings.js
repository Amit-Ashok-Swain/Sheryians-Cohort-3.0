// settings.js

const settingsElements={

    dashboardPage: document.querySelector("#dashboardPage"),

    settingsPage: document.querySelector("#settingsPage"),

    dashboardButton: document.querySelector("#dashboardNav"),

    settingsButton: document.querySelector("#settingsNav"),

    currency: document.querySelector("#currencySelect"),

    dateFormat: document.querySelector("#dateFormat"),

    transactionCount: document.querySelector("#transactionCountSetting"),

    budgetCount: document.querySelector("#budgetCountSetting"),

    resetApplication: document.querySelector("#resetApplicationData"),

    currentThemeCard: document.querySelector("#currentThemeCard"),

    currentCurrencyCard:document.querySelector("#currentCurrencyCard"),

    currentDateCard: document.querySelector("#currentDateCard"),

    storageCount: document.querySelector("#storageCount"),

    storageUsed: document.querySelector("#storageUsed"),

    overviewStorageProgress: document.querySelector("#overviewStorageProgress"),

};


function showDashboard(event){
    if(event){
        event.preventDefault();
    }

    settingsElements.dashboardPage.classList.remove("hidden");

    settingsElements.settingsPage.classList.add("hidden");

    settingsElements.dashboardButton.classList.add("active");

    settingsElements.settingsButton.classList.remove("active");

    localStorage.setItem(
        STORAGE_KEYS.CURRENT_PAGE,
        "dashboard"
        );

}


function showSettings(event){
    if(event){
        event.preventDefault();
    }

    settingsElements.dashboardPage.classList.add("hidden");

    settingsElements.settingsPage.classList.remove("hidden");

    settingsElements.dashboardButton.classList.remove("active");

    settingsElements.settingsButton.classList.add("active");

    localStorage.setItem(
        STORAGE_KEYS.CURRENT_PAGE,
        STORAGE_KEYS.SETTINGS
        );

}

function updateStorageProgress(){

    const usedBytes =

        new Blob(

            [JSON.stringify(localStorage)]

        ).size;

    const limit = 5 * 1024 * 1024;

    const percentage =

        Math.min(

            (usedBytes / limit) * 100,

            100

        );

    settingsElements.overviewStorageProgress.style.width =

        percentage + "%";

}

function calculateStorageSize(){

    const data = JSON.stringify(localStorage);

    const bytes = new Blob([data]).size;

    if(bytes < 1024){

        return bytes + " Bytes";

    }

    if(bytes < 1024 * 1024){

        return (bytes / 1024).toFixed(2) + " KB";

    }

    return (bytes / 1024 / 1024).toFixed(2) + " MB";

}


function updateSettings(){

    if(!settingsElements.transactionCount){
        return;
    }

    settingsElements.transactionCount.textContent =
        appState.transactions.length;

    settingsElements.budgetCount.textContent =
        appState.budgets.length;

    settingsElements.currentCurrencyCard.textContent =
        appState.settings.currency;

    settingsElements.currentDateCard.textContent =
        appState.settings.dateFormat;

    // Synchronize dropdowns
    settingsElements.currency.value =
        appState.settings.currency;

    settingsElements.dateFormat.value =
        appState.settings.dateFormat;

    const size = calculateStorageSize();

    settingsElements.storageCount.textContent = size;

    settingsElements.storageUsed.textContent = size;

    settingsElements.currentThemeCard.innerHTML = `
        <i class="${
            appState.theme === "dark"
                ? "ri-moon-clear-fill"
                : "ri-sun-fill"
        }"></i>

        <span>
            ${
                appState.theme === "dark"
                    ? "Dark Mode"
                    : "Light Mode"
            }
        </span>
    `;

    updateStorageProgress();
}

function changeCurrency(){

    appState.settings.currency =

        settingsElements.currency.value;

    saveSettings();

    refreshApplication();

    showToast(

        "Currency Updated",

        "success"

    );

}

function changeDateFormat(){

    appState.settings.dateFormat =

        settingsElements.dateFormat.value;

    saveSettings();

    refreshApplication();

    showToast(

        "Date Format Updated",

        "success"

    );

}


function initializeSettings(){

    const page = localStorage.getItem(STORAGE_KEYS.CURRENT_PAGE);

        if(page===STORAGE_KEYS.SETTINGS){

        showSettings();

        }
        else{

        showDashboard();

        }

    settingsElements.dashboardButton.addEventListener(

        "click",

        showDashboard

    );

    settingsElements.settingsButton.addEventListener(

        "click",

        showSettings

    );

    settingsElements.currency.addEventListener(

        "change",

        changeCurrency

    );

    settingsElements.dateFormat.addEventListener(

        "change",

        changeDateFormat

    );

    settingsElements.resetApplication
    .addEventListener(

        "click",

        resetApplication

    );


    updateSettings();

}