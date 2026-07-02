// modal.js 

const modalElements = {
    overlay: document.querySelector(".modal-overlay"),
    title: document.querySelector(".modal-title"),
    sidebarButton: document.querySelector(".sidebar-add-btn"),
    tableButton: document.querySelector(".add-btn-table"),
    saveButton: document.querySelector(".save-btn"),
    closeButton: document.querySelector(".close-modal"),
    cancelButton: document.querySelector(".cancel-btn"),
    form: document.querySelector("#transactionForm"),
    description: document.querySelector("#description"),
    amount: document.querySelector("#amount"),
    category: document.querySelector("#category"),
    income: document.querySelector("#income"),
    expense: document.querySelector("#expense"),
    date: document.querySelector("#date"),
    descriptionError: document.querySelector("#descriptionError"),
    amountError: document.querySelector("#amountError"),
    categoryError: document.querySelector("#categoryError"),
    typeError: document.querySelector("#typeError"),
    dateError: document.querySelector("#dateError")
};

function openModal() {
    if(appState.currentEditId === null){

    modalElements.date.max = getToday();

    modalElements.title.textContent = "Add Transaction";

    modalElements.saveButton.textContent = "Save Transaction";

    modalElements.form.reset();

    populateCategoryDropdown(
        modalElements.category
    );

    modalElements.income.checked = false;

    modalElements.expense.checked = false;

    }else{
        modalElements.title.textContent = "Edit Transaction";
        modalElements.saveButton.textContent = "Update Transaction";
    }
    modalElements.overlay.classList.add("show");
}

function closeModal() {
    modalElements.overlay.classList.remove("show");
}

function cancelModal(){
    modalElements.form.reset();
    modalElements.income.checked = false;
    modalElements.expense.checked = false;
    appState.currentEditId = null;
    modalElements.title.textContent = "Add Transaction";
    modalElements.saveButton.textContent = "Save Transaction";
    closeModal();
}

function showError(input, errorElement, message){
    input.classList.add("input-error");
    errorElement.textContent = message;
}

function clearError(input, errorElement){
    input.classList.remove("input-error");
    errorElement.textContent = "";
}

function clearErrors(){
    clearError(
        modalElements.description,
        modalElements.descriptionError
    );
    clearError(
        modalElements.amount,
        modalElements.amountError
    );
    clearError(
        modalElements.category,
        modalElements.categoryError
    );
    clearError(
        modalElements.income,
        modalElements.typeError
    );
    clearError(
        modalElements.date,
        modalElements.dateError
    );
}

function validateDescription(){
    if(modalElements.description.value.trim() === ""){
        showError(
            modalElements.description,
            modalElements.descriptionError,
            "Description is required."
        );
        return false;
    }
    clearError(
        modalElements.description,
        modalElements.descriptionError
    );
    return true;
}

function validateAmount(){
    const amount = Number(modalElements.amount.value)
    if(modalElements.amount.value === ""){
        showError(
            modalElements.amount,
            modalElements.amountError,
            "Amount is required."
        );
        return false;
    }
    if(amount <= 0){
        showError(
            modalElements.amount,
            modalElements.amountError,
            "Amount must be greater than zero."
        );
        return false;
    }
    clearError(
        modalElements.amount,
        modalElements.amountError
    );
    return true;
}

function validateCategory(){
    if(modalElements.category.value === ""){
        showError(
            modalElements.category,
            modalElements.categoryError,
            "Please select a category."
        );
        return false;
    }
    clearError(
        modalElements.category,
        modalElements.categoryError
    );
    return true;
}

function validateType(){
    if(
        !modalElements.income.checked &&
        !modalElements.expense.checked
    ){
        modalElements.typeError.textContent =
            "Select transaction type.";
        return false;
    }
    modalElements.typeError.textContent = "";
    return true;
}

function validateDate(){
    if(modalElements.date.value === ""){
        showError(
            modalElements.date,
            modalElements.dateError,
            "Please select a date."
        );
        return false;
    }
    clearError(
        modalElements.date,
        modalElements.dateError
    );
    return true;
}

// function validateForm() {
//     if (modalElements.description.value.trim() === "") {
//         alert("Description is required.");
//         return false;
//     }
//     if (modalElements.amount.value === "") {
//         alert("Amount is required.");
//         return false;
//     }
//     if (Number(modalElements.amount.value) <= 0) {
//         alert("Amount must be greater than 0.");
//         return false;
//     }
//     if (modalElements.category.value === "") {
//         alert("Please select a category.");
//         return false;
//     }
//     if (
//         !modalElements.income.checked &&
//         !modalElements.expense.checked
//     ) {
//         alert("Please select Income or Expense.");
//         return false;
//     }
//     if (modalElements.date.value === "") {
//         alert("Please select a date.");
//         return false;
//     }
//     return true;
// }

function validateForm(){
    const isDescriptionValid = validateDescription();
    const isAmountValid = validateAmount();
    const isCategoryValid = validateCategory();
    const isTypeValid = validateType();
    const isDateValid = validateDate();
    return (
        isDescriptionValid &&
        isAmountValid &&
        isCategoryValid &&
        isTypeValid &&
        isDateValid
    );
}

function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
            showToast("Please fix the highlighted fields.","error");
        return;
    }
    const transaction = {
        id: generateId(),
        description: modalElements.description.value.trim(),
        amount: Number(modalElements.amount.value),
        category: modalElements.category.value,
        type: modalElements.income.checked
            ? TRANSACTION_TYPES.INCOME
            : TRANSACTION_TYPES.EXPENSE,
        date: modalElements.date.value
    };
    if(appState.currentEditId !== null) updateTransaction(transaction);
    else createTransaction(transaction);
    modalElements.form.reset();
    clearErrors();
    modalElements.income.checked = false;
    modalElements.expense.checked = false;
    closeModal();
}

function initializeModal(){
    if(
        !modalElements.overlay ||
        !modalElements.form ||
        !modalElements.sidebarButton ||
        !modalElements.tableButton ||
        !modalElements.closeButton
    ){
        return;
    }
    modalElements.sidebarButton.addEventListener("click",openModal);
    modalElements.tableButton.addEventListener("click",openModal);
    modalElements.closeButton.addEventListener("click",closeModal);
    modalElements.cancelButton.addEventListener("click", cancelModal);
    modalElements.form.addEventListener("submit",handleSubmit);

    modalElements.overlay.addEventListener("click", function(event){
    if(event.target === modalElements.overlay){
        cancelModal();
    }
    });

    document.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
        cancelModal();
    }
    });

    modalElements.description.addEventListener(
    "input",
    validateDescription
    );

modalElements.amount.addEventListener(
    "input",
    validateAmount
    );

modalElements.category.addEventListener(
    "change",
    validateCategory
    );

modalElements.income.addEventListener(
    "change",
    validateType
    );

modalElements.expense.addEventListener(
    "change",
    validateType
    );

modalElements.date.addEventListener(
    "change",
    validateDate
    );

modalElements.form.reset();
populateCategoryDropdown(
    modalElements.category
);
clearErrors();

}