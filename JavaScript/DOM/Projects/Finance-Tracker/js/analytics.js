// analytics.js

const analyticsElements = {
    highestIncome: document.querySelector("#highestIncome"),
    highestIncomeCategory: document.querySelector("#highestIncomeCategory"),
    highestExpense: document.querySelector("#highestExpense"),
    highestExpenseCategory: document.querySelector("#highestExpenseCategory"),
    mostUsedCategory: document.querySelector("#mostUsedCategory"),
    categoryCount: document.querySelector("#categoryCount"),
    averageExpense: document.querySelector("#averageExpense"),
    savingsRate: document.querySelector("#savingsRate"),
    healthScore: document.querySelector("#healthScore"),
    healthStatus: document.querySelector("#healthStatus"),
    averageIncome: document.querySelector("#averageIncome"),
    netCashFlow: document.querySelector("#netCashFlow"),
    largestTransaction: document.querySelector("#largestTransaction"),
    largestTransactionCategory: document.querySelector("#largestTransactionCategory"),
};

function getHighestIncome(){
    const incomes = appState.transactions.filter(function(transaction){
        return transaction.type === TRANSACTION_TYPES.INCOME;
    });
    if(incomes.length === 0){
        return null;
    }
    return incomes.reduce(function(highest,current){
        return current.amount > highest.amount
            ? current
            : highest;
    });
}

function getHighestExpense(){
    const expenses = appState.transactions.filter(function(transaction){
        return transaction.type === TRANSACTION_TYPES.EXPENSE;
    });
    if(expenses.length === 0){
        return null;
    }
    return expenses.reduce(function(highest,current){
        return current.amount > highest.amount
            ? current
            : highest;
    });
}

function getLargestTransaction(){
    if(appState.transactions.length === 0){
        return null;
    }
    return appState.transactions.reduce(function(largest,current){
        return current.amount > largest.amount
            ? current
            : largest;

    });
}

function getMostUsedCategory(){
    const categoryCount = {};
    appState.transactions.forEach(function(transaction){
    if(transaction.type !== TRANSACTION_TYPES.EXPENSE){
        return;
    }
        categoryCount[transaction.category] =
            (categoryCount[transaction.category] || 0) + 1;
    });
    let highestCategory = "-";
    let highestCount = 0;
    for(const category in categoryCount){
        if(categoryCount[category] > highestCount){
            highestCategory = category;
            highestCount = categoryCount[category];
        }
    }
    return {
        category:highestCategory,
        count:highestCount
    };
}


function getAverageExpense(){
    const expenses = appState.transactions.filter(function(transaction){
        return transaction.type === TRANSACTION_TYPES.EXPENSE;
    });
    if(expenses.length === 0){
        return 0;
    }
    const totalExpense = expenses.reduce(function(total,transaction){
        return total + transaction.amount;
    },0);
    return totalExpense / expenses.length;
}

function getAverageIncome(){
    const incomes = appState.transactions.filter(function(transaction){
        return transaction.type === TRANSACTION_TYPES.INCOME;
    });

    if(incomes.length === 0){
        return 0;
    }

    const totalIncome = incomes.reduce(function(total,transaction){
        return total + transaction.amount;
    },0);

    return totalIncome / incomes.length;
}

function calculateSavingsRate(){
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
    if(income === 0){
        return 0;
    }
    return Math.round(
        ((income-expense)/income)*100
    );
}

function calculateNetCashFlow(){
    let income = 0;
    let expense = 0;

    appState.transactions.forEach(function(transaction){
        if(transaction.type === TRANSACTION_TYPES.INCOME){
            income += transaction.amount;
        }
        else{
            expense += transaction.amount;
        }
    });
    return income - expense;
}

function calculateHealthScore(){
    const savings = calculateSavingsRate();
    if(savings >= 70){
        return {
            score:100,
            status:"Excellent"
        };
    }
    if(savings >= 50){
        return {
            score:80,
            status:"Good"
        };
    }
    if(savings >= 30){
        return {
            score:60,
            status:"Average"
        };
    }
    if(savings >= 10){
        return {
            score:40,
            status:"Needs Improvement"
        };
    }
    return{
        score:20,
        status:"Poor"
    };
}

function updateAnalytics(){

    const highestIncome = getHighestIncome();

    const highestExpense = getHighestExpense();

    const mostUsedCategory = getMostUsedCategory();

    const averageExpense = getAverageExpense();

    const averageIncome = getAverageIncome();

    const savingsRate = calculateSavingsRate();

    const health = calculateHealthScore();

    const largestTransaction = getLargestTransaction();

    const netCashFlow = calculateNetCashFlow();

    if(analyticsElements.highestIncome){
        analyticsElements.highestIncome.textContent =
            highestIncome
                ? formatCurrency(highestIncome.amount)
                : formatCurrency(0);
        }

    if(analyticsElements.highestIncomeCategory){    
        analyticsElements.highestIncomeCategory.textContent =
            highestIncome
                ? highestIncome.category
                : UI_TEXT.NO_DATA;
        }

if (analyticsElements.highestExpense) {
    analyticsElements.highestExpense.textContent =
        highestExpense
            ? formatCurrency(highestExpense.amount)
            : formatCurrency(0);
    }

    if(analyticsElements.highestExpenseCategory){
    analyticsElements.highestExpenseCategory.textContent =
        highestExpense
            ? highestExpense.category
            : UI_TEXT.NO_DATA;
    }

    if(analyticsElements.mostUsedCategory){
    analyticsElements.mostUsedCategory.textContent =
        mostUsedCategory.category;
    }

    if(analyticsElements.categoryCount){
    analyticsElements.categoryCount.textContent =
        `${mostUsedCategory.count} ${UI_TEXT.TRANSACTIONS}`;
    }

    if(analyticsElements.averageExpense){
    analyticsElements.averageExpense.textContent =
        formatCurrency(averageExpense);
    }

    if(analyticsElements.savingsRate){
    analyticsElements.savingsRate.textContent =
        savingsRate + "%";
    }

    if(analyticsElements.healthScore){
    analyticsElements.healthScore.textContent =
        health.score + "/100";
    }

    if(analyticsElements.healthStatus){
    analyticsElements.healthStatus.textContent =
        health.status;
    }

    if(analyticsElements.averageIncome){
    analyticsElements.averageIncome.textContent = formatCurrency(averageIncome);
    }

    if(analyticsElements.largestTransaction){
    analyticsElements.largestTransaction.textContent =
    largestTransaction
        ? formatCurrency(
            largestTransaction.amount
        )
        : formatCurrency(0);
    }

    if(analyticsElements.largestTransactionCategory){
    analyticsElements.largestTransactionCategory.textContent =
        largestTransaction
            ? largestTransaction.category
            : UI_TEXT.NO_DATA;
    }

    if(analyticsElements.netCashFlow){
    analyticsElements.netCashFlow.textContent =
        formatCurrency(netCashFlow);
    }
}

function initializeAnalytics(){

    updateAnalytics();

}

