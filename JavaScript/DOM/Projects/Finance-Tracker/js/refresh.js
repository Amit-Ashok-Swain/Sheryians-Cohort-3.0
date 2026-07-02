// refresh.js

function commitStateChange(changeFn){

    changeFn();

    refreshApplication();

}

function refreshTransactions(){

    saveTransactions();

    renderTransactions();

    populateCategoryFilter();

}

function refreshBudgets(){

    saveBudgets();

    renderBudgets();

    updateBudgetSummary();

}

function refreshDashboard(){

    updateDashboard();

}

function refreshAnalytics(){

    updateAnalytics();

}

function refreshCharts(){

    updateChart();

}

function refreshSettingsUI(){

    updateSettings();

}

function refreshApplication(){

    refreshTransactions();

    refreshBudgets();

    refreshDashboard();

    refreshAnalytics();

    refreshCharts();

    refreshSettingsUI();

}