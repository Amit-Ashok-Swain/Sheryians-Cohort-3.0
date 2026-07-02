// dashboard.js 

const dashboardElements = {
    username: document.querySelector(".username"),
    logoutBtn: document.querySelector(".logout-btn"),
    balance: document.querySelector("#totalBalance"),
    income: document.querySelector("#totalIncome"),
    expense: document.querySelector("#totalExpense"),
    transactionCount: document.querySelector("#transactionCount"),
    navbarSearch: document.querySelector("#transactionSearch"),
    tableSearch: document.querySelector("#searchInput"),
    typeFilter: document.querySelector("#typeFilter"),
    categoryFilter: document.querySelector("#categoryFilter"),
    sortFilter: document.querySelector("#sortFilter"),
    clearFilters: document.querySelector("#clearFilters"),
    resetData: document.querySelector("#resetDashboardData"),
    profileButton: document.querySelector("#profileButton"),
    profileDropdown: document.querySelector("#profileDropdown"),
    navbarProfileImage: document.querySelector("#navbarProfileImage"),
};

function calculateDashboardSummary(){

    let income = 0;

    let expense = 0;

    appState.transactions.forEach(function(transaction){

        if(transaction.type === TRANSACTION_TYPES.INCOME){

            income += transaction.amount;

        }

        if(transaction.type === TRANSACTION_TYPES.EXPENSE){

            expense += transaction.amount;

        }  

    });

    return{

        income,

        expense,

        balance: income - expense,

        transactionCount: appState.transactions.length

    };

}

function resetApplication(){

    const confirmReset = confirm(
        "⚠️ This will erase all application data.\n\nThis action cannot be undone."
    );

    if(!confirmReset){
        return;
    }

    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.BUDGETS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

    appState.transactions = [];
    appState.budgets = [];

    appState.currentEditId = null;
    appState.currentBudgetEditId = null;

    appState.settings = {
        currency: SETTINGS.DEFAULT_CURRENCY,
        dateFormat: SETTINGS.DEFAULT_DATE_FORMAT
    };

    appState.filters = {
        ...DEFAULT_FILTERS
    };

    saveTransactions();
    saveBudgets();
    saveSettings();

    refreshApplication();

    loadTheme();

    showToast(
        "Application Reset Successfully",
        "success"
    );

}

// function updateDashboard(){
//     let income = 0;
//     let expense = 0;

//     appState.transactions.forEach(transaction => {
//          if(transaction.type === TRANSACTION_TYPES.INCOME){
//             income += transaction.amount;
//         }
//         else{
//             expense += transaction.amount;
//         }
//     });

// const balance = income - expense;

// dashboardElements.balance.textContent = formatCurrency(balance);
// dashboardElements.income.textContent = formatCurrency(income);
// dashboardElements.expense.textContent = formatCurrency(expense);
// dashboardElements.transactionCount.textContent = appState.transactions.length;
// }

function updateDashboard(){

    const summary = calculateDashboardSummary();

    if(
        !dashboardElements.balance ||
        !dashboardElements.income ||
        !dashboardElements.expense ||
        !dashboardElements.transactionCount
        ){
    return;
    }


    dashboardElements.balance.textContent =
        formatCurrency(summary.balance);

    dashboardElements.income.textContent =
        formatCurrency(summary.income);

    dashboardElements.expense.textContent =
        formatCurrency(summary.expense);
    
    dashboardElements.transactionCount.textContent =
        summary.transactionCount;

}

function handleSearch(event){

    updateFilters(function(){

        appState.filters.search =
            event.target.value;

    });

    if(event.target === dashboardElements.navbarSearch){

        if(dashboardElements.navbarSearch){
            dashboardElements.navbarSearch.value =
            event.target.value;
    }

    }

    if(event.target === dashboardElements.tableSearch){

        if(dashboardElements.tableSearch){
            dashboardElements.tableSearch.value =
            event.target.value;
        }
    }

}

function populateCategoryFilter(){
    const categories = [
        ...new Set(
            appState.transactions.map(
                transaction => transaction.category
            )
        )
    ];

    let options = `
        <option value="${FILTER_OPTIONS.ALL}">
            All Categories
        </option>
        `;

    categories.forEach(function(category){

        options += `
            <option value="${category}">
                ${category}
            </option>
        `;

    });
    dashboardElements.categoryFilter.innerHTML = options;
}

function getFilteredTransactions(){
    let transactions = [...appState.transactions];
    const search = appState.filters.search.toLowerCase();
    transactions = transactions.filter(transaction => {
        return (
            transaction.description
                .toLowerCase()
                .includes(search)
            ||
            transaction.category
                .toLowerCase()
                .includes(search)
            ||
            transaction.type
                .toLowerCase()
                .includes(search)
        );
    });

    if(appState.filters.type !== FILTER_OPTIONS.ALL){
        transactions = transactions.filter(transaction =>
            transaction.type ===
            appState.filters.type
        );
    }

    if(appState.filters.category !== FILTER_OPTIONS.ALL){
        transactions = transactions.filter(transaction =>
            transaction.category === appState.filters.category
        );
    }

    switch(appState.filters.sort){

        case SORT_OPTIONS.HIGHEST:
            transactions.sort(function(a,b){
                return b.amount - a.amount;
            });
            break;

        case SORT_OPTIONS.LOWEST:
            transactions.sort(function(a,b){
                return a.amount - b.amount;
            });
            break;

        case SORT_OPTIONS.OLDEST:
            transactions.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
            });
            break;

        case SORT_OPTIONS.NEWEST:
        default:
            transactions.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            });
    }
    return transactions;
}


function handleTypeFilter(){

    updateFilters(function(){

        appState.filters.type =
            dashboardElements.typeFilter.value;

    });

}

function handleCategoryFilter(){

    updateFilters(function(){

        appState.filters.category =
            dashboardElements.categoryFilter.value;

    });

}

function updateFilters(callback){

    callback();

    renderTransactions();

}

function handleSort(){

    updateFilters(function(){

        appState.filters.sort =
            dashboardElements.sortFilter.value;

    });

}

function clearFilters(){
    appState.filters = {...DEFAULT_FILTERS};
    dashboardElements.navbarSearch.value = DEFAULT_FILTERS.search;
    dashboardElements.tableSearch.value = DEFAULT_FILTERS.search;
    dashboardElements.typeFilter.value = DEFAULT_FILTERS.type;
    dashboardElements.categoryFilter.value =  DEFAULT_FILTERS.category;
    dashboardElements.sortFilter.value = DEFAULT_FILTERS.sort;
    refreshApplication();
    showToast(
        "Filters Cleared",
        "success"
    );
}


function initializeProfileDropdown(){

    if(
        !dashboardElements.profileButton
    ){
        return;
    }

    dashboardElements.profileButton.addEventListener(

        "click",

        function(){

            dashboardElements.profileDropdown.classList.toggle(

                "show"

            );

        }

    );

    document.addEventListener(

        "click",

        function(event){

            if(

                !dashboardElements.profileButton.contains(event.target)

                &&

                !dashboardElements.profileDropdown.contains(event.target)

            ){

                dashboardElements.profileDropdown.classList.remove(

                    "show"

                );

            }

        }

    );

}

function initializeDashboard() {
    updateDashboard();
    updateLoggedInUser();
    initializeProfileDropdown();
    
    if(dashboardElements.navbarSearch){
        dashboardElements.navbarSearch.addEventListener(
            "input",
            handleSearch
        );
    }

    if(dashboardElements.tableSearch){
        dashboardElements.tableSearch.addEventListener(
            "input",
            handleSearch
        );
    }
    if(dashboardElements.typeFilter){
    dashboardElements.typeFilter.addEventListener(
        "change",
        handleTypeFilter
        );
    }

    if(dashboardElements.categoryFilter){
    dashboardElements.categoryFilter.addEventListener(
        "change",
        handleCategoryFilter
        );
    }


    if(dashboardElements.sortFilter){
    dashboardElements.sortFilter.addEventListener(
        "change",
        handleSort
        );
    }

    if(dashboardElements.clearFilters){
    dashboardElements.clearFilters.addEventListener(
        "click",
        clearFilters
        );
    }
    
    if(dashboardElements.resetData){

    dashboardElements.resetData.addEventListener(

        "click",

        resetApplication

        );

    }

    if(dashboardElements.logoutBtn){

    dashboardElements.logoutBtn.addEventListener(

        "click",

        logout

        );

    }
}