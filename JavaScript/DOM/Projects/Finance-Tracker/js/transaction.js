// transaction.js

const transactionElements = {
    tableBody: document.querySelector("#transactionTableBody"),
};

function initializeTransactions(){

    if(!transactionElements.tableBody){
        return;
    }

    transactionElements.tableBody.addEventListener(
        "click",
        handleTableClick
    );

}


function createTransaction(transaction){
    commitStateChange(function(){

        appState.transactions.push(transaction);

    });
    showToast("Transaction Added","success");
}


function createTransactionRow(transaction) {
    const row = document.createElement("tr");
    const badgeClass =
    transaction.type === TRANSACTION_TYPES.INCOME
        ? "income"
        : "expense";
    row.innerHTML = `
    <td>${transaction.description}</td>
    <td>${transaction.category}</td>
    <td>
        <span class="badge ${badgeClass}">
            ${transaction.type}
        </span>
    </td>
    <td>${formatCurrency(transaction.amount)}</td>
    <td>${formatDate(transaction.date)}</td>
    <td>
        <button class="action-btn edit" data-id="${transaction.id}">
            ✏️
        </button>
        <button class="action-btn delete" data-id="${transaction.id}">
            🗑
        </button>
    </td>
    `;
    return row;
}


function handleTableClick(event){

    const button =
        event.target.closest("button");

    if(!button){
        return;
    }

    const id =
        Number(button.dataset.id);

    if(button.classList.contains("edit")){

        editTransaction(id);

        return;

    }

    if(button.classList.contains("delete")){

        deleteTransaction(id);

    }

}

function editTransaction(id){
    const transaction = appState.transactions.find(item => item.id === id);
     if(!transaction) return;
    appState.currentEditId = id;
    modalElements.description.value = transaction.description;
    modalElements.amount.value = transaction.amount;
    modalElements.category.value = transaction.category;
    modalElements.date.value = transaction.date;
    if(transaction.type===TRANSACTION_TYPES.INCOME) modalElements.income.checked=true;
    else modalElements.expense.checked=true;
    openModal();
}

function deleteTransaction(id){
    const confirmDelete = confirm("Are you sure you want to delete this transaction?");
    if(!confirmDelete)return;
    commitStateChange(function(){
        appState.transactions = appState.transactions.filter(transaction => transaction.id !== id);
    });
    showToast("Transaction Deleted","warning");
}

function updateTransaction(updatedTransaction){
    const index = appState.transactions.findIndex(transaction=> transaction.id===appState.currentEditId);
    if (index === -1) return;
    updatedTransaction.id = appState.currentEditId;
    commitStateChange(function(){
    appState.transactions[index] =
        updatedTransaction;
    appState.currentEditId = null;

    });
    showToast("Transaction Updated","info");
}

function renderTransactions(){
    if(!transactionElements.tableBody){
        return;
    }

    transactionElements.tableBody.innerHTML = "";
    const transactions = getFilteredTransactions();
    if (transactions.length === 0) {

        transactionElements.tableBody.innerHTML = `
            <tr class="empty-row">

                <td colspan="6">

                    <div class="empty-transactions">

                        <div class="empty-icon">

                            <i class="ri-inbox-line"></i>

                        </div>

                        <h3>No Transactions Found</h3>

                        <p>
                            Add your first transaction to start tracking your finances.
                        </p>

                    </div>

                </td>

            </tr>
        `;

        return;
    }
    transactions.forEach(transaction=>{transactionElements.tableBody.appendChild(createTransactionRow(transaction));
    });

    if(typeof populateCategoryFilter === "function"){

    populateCategoryFilter();

    }
}



