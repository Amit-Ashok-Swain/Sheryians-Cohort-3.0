// storage.js

const appState = {
    transactions: [],
    users: [],
    currentUser: null,
    theme: "light",
    budgets: [],
    currentEditId: null,
    currentBudgetEditId:null,
    settings:{
        currency:SETTINGS.DEFAULT_CURRENCY,
        dateFormat:SETTINGS.DEFAULT_DATE_FORMAT
    },
    filters:{
        search:"",
        type:"All",
        category:"All",
        sort:"newest"
    }
};

function saveTransactions(){
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS,JSON.stringify(appState.transactions));
}

function loadTransactions(){
    try{
        const stored =
        localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
        if(stored){
            appState.transactions =
            JSON.parse(stored);
        }
    }
    catch(error){
        appState.transactions = [];
        localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
        showToast("Corrupted storage cleared.","warning");
    }
}

function saveBudgets(){

    localStorage.setItem(STORAGE_KEYS.BUDGETS,
        JSON.stringify(appState.budgets)
    );

}

function loadBudgets(){

    try{

        const budgets =
            localStorage.getItem(STORAGE_KEYS.BUDGETS);

        return budgets
            ? JSON.parse(budgets)
            : [];

    }

    catch(error){

        localStorage.removeItem(STORAGE_KEYS.BUDGETS);

        return [];

    }

}

function saveSettings(){

    localStorage.setItem(

        STORAGE_KEYS.SETTINGS,

        JSON.stringify(appState.settings)

    );

}

function saveUsers(users){

    localStorage.setItem(

        STORAGE_KEYS.USERS,

        JSON.stringify(users)

    );

}

function loadUsers(){

    try{

        const users = localStorage.getItem(
            STORAGE_KEYS.USERS
        );

        return users
            ? JSON.parse(users)
            : [];

    }
    catch(error){

        localStorage.removeItem(
            STORAGE_KEYS.USERS
        );

        return [];

    }

}

function loadSettings(){

        try{

            const settings =
                localStorage.getItem(
                    STORAGE_KEYS.SETTINGS
                );

            if(settings){

                appState.settings = {

                    ...appState.settings,

                    ...JSON.parse(settings)

                };

            }

        }
        catch(error){

            localStorage.removeItem(
                STORAGE_KEYS.SETTINGS
            );

        }

}

console.log(appState);

function initializeStorage(){
    loadTransactions();
    appState.users = loadUsers();
    appState.budgets = loadBudgets();
    if(!Array.isArray(appState.transactions)){
        appState.transactions = [];
    }
    if(!Array.isArray(appState.budgets)){
        appState.budgets = [];
    }
    if(!Array.isArray(appState.users)){
    appState.users = [];
    }

    loadSettings();
    console.log("Storage Initialized");
}