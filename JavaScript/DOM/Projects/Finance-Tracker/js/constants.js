// constants.js

const TRANSACTION_TYPES = {

    INCOME: "Income",

    EXPENSE: "Expense"

};

const UI_TEXT = {

    NO_DATA: "No Data",

    TRANSACTIONS: "Transactions"

};


const DEFAULT_FILTERS = {

    search:"",

    type:"All",

    category:"All",

    sort:"newest"

};

const FILTER_OPTIONS = {

    ALL: "All",

    NEWEST: "newest",

    OLDEST: "oldest",

    HIGHEST: "highest",

    LOWEST: "lowest"

};

const SORT_OPTIONS = {
    NEWEST: "newest",
    OLDEST: "oldest",
    HIGHEST: "highest",
    LOWEST: "lowest"
};

const STORAGE_KEYS = {

    TRANSACTIONS: "transactions",

    BUDGETS: "budgets",

    SETTINGS: "settings",

    THEME: "theme",

    CURRENT_PAGE: "currentPage",

    CURRENT_USER: "currentUser",

    USERS: "users"

};

const SETTINGS = {

    DEFAULT_CURRENCY: "INR",

    DEFAULT_DATE_FORMAT: "DD/MM/YYYY"

};

const BUDGET_STATUS = {
    ON_TRACK: "On Track",
    WARNING: "Warning",
    OVER_BUDGET: "Over Budget"
};

const CATEGORIES = [
    "Salary",
    "Food",
    "Shopping",
    "Travel",
    "Bills",
    "Health",
    "Entertainment",
    "Education",
    "Investment",
    "Groceries",
    "Utilities",
    "Insurance",
    "Other"
];