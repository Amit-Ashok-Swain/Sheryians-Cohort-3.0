// budget.js

const budgetElements = {

    budgetGrid: document.querySelector("#budgetGrid"),

    budgetModal: document.querySelector("#budgetModal"),

    budgetForm: document.querySelector("#budgetForm"),

    budgetCategory: document.querySelector("#budgetCategory"),

    budgetAmount: document.querySelector("#budgetAmount"),

    addBudgetButton: document.querySelector("#addBudgetButton"),

    closeBudgetModal: document.querySelector("#closeBudgetModal"),

    cancelBudget: document.querySelector("#cancelBudget"),

    totalBudgetAmount: document.querySelector("#totalBudgetAmount"),

    totalBudgetSpent: document.querySelector("#totalBudgetSpent"),

    totalBudgetRemaining: document.querySelector("#totalBudgetRemaining"),

    budgetUsage: document.querySelector("#budgetUsage"),

};

function openBudgetModal(){
    populateCategoryDropdown(
        budgetElements.budgetCategory
    );

    budgetElements.budgetModal.classList.add("show");

}

function closeBudgetModal(){

    budgetElements.budgetModal.classList.remove("show");

    budgetElements.budgetForm.reset();

    appState.currentBudgetEditId = null;

}

function calculateTotalBudget(){

    return appState.budgets.reduce(function(total,budget){

        return total + budget.amount;

    },0);

}

function calculateTotalSpent(){

    return appState.budgets.reduce(function(total,budget){

        return total + getBudgetSpent(
            budget.category
        );

    },0);

}

function calculateRemainingBudget(){

    return (
        calculateTotalBudget() -
        calculateTotalSpent()
    );

}

function calculateBudgetUsage(){

    const totalBudget =
        calculateTotalBudget();

    if(totalBudget === 0){
        return 0;
    }

    return Math.round(

        (calculateTotalSpent() / totalBudget) * 100

    );

}

function updateBudgetSummary(){

    const totalBudget =
        calculateTotalBudget();

    const totalSpent =
        calculateTotalSpent();

    const remaining =
        calculateRemainingBudget();

    const usage =
        calculateBudgetUsage();

    budgetElements.totalBudgetAmount.textContent =
        formatCurrency(totalBudget);

    budgetElements.totalBudgetSpent.textContent =
        formatCurrency(totalSpent);

    budgetElements.totalBudgetRemaining.textContent =
        formatCurrency(remaining);

    budgetElements.budgetUsage.textContent =
        usage + "%";

}

function getBudgetSpent(category){

    let spent = 0;

    appState.transactions.forEach(function(transaction){

        if(
            transaction.type === "Expense" &&
            transaction.category === category
        ){
            spent += transaction.amount;
        }

    });

    return spent;

}

function createBudgetCard(budget){

    const spent = getBudgetSpent(
        budget.category
    );

    const remaining =
        budget.amount - spent;

    const actualPercentage = Math.round(
        (spent / budget.amount) * 100
    );

    const progressPercentage = Math.min(
        actualPercentage,
        100
    );

    let progressColor = "#22C55E";

    if(actualPercentage >= 70){
        progressColor = "#F59E0B";
    }

    if(actualPercentage >= 100){
        progressColor = "#EF4444";
    }

    let status = "On Track";

    if(actualPercentage >= 70){
        status = "Warning";
    }

    if(actualPercentage >= 100){
        status = "Over Budget";
    }

    const remainingClass =
    remaining < 0
        ? "negative"
        : "positive";

    const card =
        document.createElement("div");

    card.className = "budget-card";

    card.innerHTML = `
    
        <div class="budget-card-header">

            <h3>

                ${budget.category}

            </h3>

            <div>

                <button
                    class="action-btn edit-budget"
                    data-id="${budget.id}">

                    ✏️

                </button>

                <button
                    class="action-btn delete-budget"
                    data-id="${budget.id}">

                    🗑

                </button>

            </div>

        </div>

        <div class="budget-details">

            <p>

                Budget

                <span>

                    ${formatCurrency(budget.amount)}

                </span>

            </p>

            <p>

                Spent

                <span>

                    ${formatCurrency(spent)}

                </span>

            </p>

            <p>

                Remaining

                <span class="${remainingClass}">

                    ${formatCurrency(remaining)}

                </span>

            </p>

        </div>

        <div class="budget-progress">

        <div class="budget-progress-fill" style=" width:${progressPercentage}%; background:${progressColor};">
        </div>

        </div>

        <div class="budget-footer">

            <span>

            ${actualPercentage}% Used

            </span>

            <span>

            ${status}

            </span>

        </div>

    `;

    return card;

}

function renderBudgets(){

    if(!budgetElements.budgetGrid){

        return;

    }

    budgetElements.budgetGrid.innerHTML = "";

    if(appState.budgets.length === 0){

        budgetElements.budgetGrid.innerHTML = `

            <div class="empty-budget">

                <div class="empty-budget-icon">

                    💰

                </div>

                <h3>

                    No Budgets Added

                </h3>

                <p>

                    Create your first budget.

                </p>

            </div>

        `;

        return;

    }

    appState.budgets.forEach(function(budget){

        budgetElements.budgetGrid.appendChild(

            createBudgetCard(budget)

        );

    });

}

function handleBudgetGridClick(event){

    const id = Number(
        event.target.dataset.id
    );

    if(
        event.target.classList.contains(
            "edit-budget"
        )
    ){

        editBudget(id);

        return;

    }

    if(
        event.target.classList.contains(
            "delete-budget"
        )
    ){

        deleteBudget(id);

    }

}

function createBudget(budget){

    budget.id = generateId();

    commitStateChange(function(){

        appState.budgets.push(budget);

    });

    closeBudgetModal();

    showToast(
        "Budget Added",
        "success"
    );

}

function updateBudget(updatedBudget){

    const index =
        appState.budgets.findIndex(function(budget){

            return budget.id ===
                appState.currentBudgetEditId;

        });

    if(index === -1){
        return;
    }

    updatedBudget.id =
        appState.currentBudgetEditId;

    commitStateChange(function(){

        appState.budgets[index] =
            updatedBudget;

        appState.currentBudgetEditId = null;

    });

    closeBudgetModal();

    showToast(
        "Budget Updated",
        "info"
    );

}

function deleteBudget(id){

    const confirmDelete =
        confirm(
            "Delete this budget?"
        );

    if(!confirmDelete){
        return;
    }

    commitStateChange(function(){

    appState.budgets =
        appState.budgets.filter(function(budget){

            return budget.id !== id;

        });

    });

    showToast(
        "Budget Deleted",
        "warning"
    );

}

function editBudget(id){

    const budget =
        appState.budgets.find(function(item){

            return item.id === id;

        });

    if(!budget){
        return;
    }

    appState.currentBudgetEditId =
        budget.id;

    budgetElements.budgetCategory.value =
        budget.category;

    budgetElements.budgetAmount.value =
        budget.amount;

    openBudgetModal();

}

function handleBudgetSubmit(event){

    event.preventDefault();

    const category =
        budgetElements.budgetCategory.value;

    const amount =
        Number(
            budgetElements.budgetAmount.value
        );

    if(!category){

        showToast(
            "Select category",
            "warning"
        );
        return;
    }

    if(amount <= 0){

        showToast(
            "Enter valid amount",
            "warning"
        );

        return;

    }

    const existingBudget = appState.budgets.find(function(budget){

    return (
        budget.category === category &&
        budget.id !== appState.currentBudgetEditId
        );
    });

    if(existingBudget){
        showToast(
            "Budget already exists for this category",
            "warning"
        );
        return;
    }

    const budget = {

        category,

        amount

    };

    if(appState.currentBudgetEditId){

        updateBudget(budget);

    }
    else{

        createBudget(budget);

    }

}


function initializeBudget(){

    if(!budgetElements.budgetGrid){
        return;
    }

    budgetElements.addBudgetButton.addEventListener("click",function(){

    console.log("Button clicked");

    openBudgetModal();

    });

    // budgetElements.addBudgetButton.addEventListener(
    //     "click",
    //     openBudgetModal
    // );

    budgetElements.closeBudgetModal.addEventListener(
        "click",
        closeBudgetModal
    );

    budgetElements.cancelBudget.addEventListener(
        "click",
        closeBudgetModal
    );

    budgetElements.budgetForm.addEventListener(
        "submit",
        handleBudgetSubmit
    );

    budgetElements.budgetGrid.addEventListener(
    "click",
        handleBudgetGridClick
    );

    populateCategoryDropdown(
    budgetElements.budgetCategory
    );

    refreshApplication();

    console.log("Budget initialized");

    console.log(budgetElements);

}