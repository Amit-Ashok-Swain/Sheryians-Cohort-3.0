// auth.js

console.log("Auth JS Loaded");

const authElements = {

    registerForm:
        document.querySelector("#registerForm"),

    loginForm:
        document.querySelector("#loginForm"),

    firstName:
        document.querySelector("#firstName"),

    lastName:
        document.querySelector("#lastName"),

    username:
        document.querySelector("#username"),

    email:
        document.querySelector("#email"),

    password:
        document.querySelector("#password"),

    confirmPassword:
        document.querySelector("#confirmPassword"),

    securityQuestion:
        document.querySelector("#securityQuestion"),

    securityAnswer:
        document.querySelector("#securityAnswer"),

    rememberMe:
        document.querySelector("#rememberMe"),

    termsCheckbox:
        document.querySelector("#termsCheckbox"),

    registerBtn:
        document.querySelector("#registerBtn"),

    loginBtn:
        document.querySelector("#loginBtn"),

    togglePassword:
        document.querySelector("#togglePassword"),

    toggleConfirmPassword:
        document.querySelector("#toggleConfirmPassword"),

    strengthProgress:
        document.querySelector("#strengthProgress"),

    strengthText:
        document.querySelector("#strengthText"),

    loginIdentifier: 
        document.querySelector("#loginIdentifier"),

};


const MIN_PASSWORD_LENGTH = 8;

const PASSWORD_STRENGTH = {

    WEAK: "Weak",

    MEDIUM: "Medium",

    STRONG: "Strong"

};



function generateUserId(){

    if(crypto.randomUUID){
    return crypto.randomUUID();
    }

    return Date.now().toString();

}


function emailExists(email){

    const users = appState.users;

    return users.some(function(user){

        return (

            user.email.toLowerCase() ===

            email.toLowerCase()

        );

    });

}

function usernameExists(username){

    const users = appState.users;

    return users.some(function(user){

        return ( user.username.toLowerCase() === username.toLowerCase());

    });

}

function createUser(data){

    return{

        id:generateUserId(),

        firstName:data.firstName,

        lastName:data.lastName,

        username:data.username,

        email:data.email,

        password:hashPassword(data.password),

        securityQuestion:data.securityQuestion,

        securityAnswer:data.securityAnswer.trim().toLowerCase(),

        profileImage:"",

        createdAt:new Date().toISOString(),

        lastLogin:null,

        isActive:true,

        settings:{

            currency: SETTINGS.DEFAULT_CURRENCY,

            dateFormat: SETTINGS.DEFAULT_DATE_FORMAT,

            theme:"light"

        }

    };

}

function showError(elementId,message){

    const errorElement = document.querySelector(
        `#${elementId}Error`
    );

    if(errorElement){

        errorElement.textContent = message;

        errorElement.style.display = message ? "block" : "none";

    }

}

function clearErrors(){

    const errorMessages =
        document.querySelectorAll(".error");

    errorMessages.forEach(function(error){

        error.textContent = "";

        error.style.display = "none";

    });

}

function clearForm(){

    if(authElements.registerForm){

        authElements.registerForm.reset();

    }

    if(authElements.strengthProgress){

        authElements.strengthProgress.style.width = "0%";

    }

    if(authElements.strengthText){

        authElements.strengthText.textContent =
            "Password Strength";

    }

    if(authElements.securityQuestion){

    authElements.securityQuestion.selectedIndex = 0;

    }

}

function getFormData(){

return{

    firstName:
        authElements.firstName.value.trim(),

    lastName:
        authElements.lastName.value.trim(),

    username:
        authElements.username.value.trim(),

    email:
        authElements.email.value
            .trim()
            .toLowerCase(),

    password:
        authElements.password.value,

    confirmPassword:
        authElements.confirmPassword.value,

    securityQuestion:
        authElements.securityQuestion.value,

    securityAnswer:
        authElements.securityAnswer.value.trim(),

    termsAccepted:
        authElements.termsCheckbox.checked

};

}

function validateRegisterForm(data){

    clearErrors();

    let isValid = true;

    if(data.firstName === ""){

        showError(
            "firstName",
            "First name is required."
        );

        isValid = false;

    }

    if(data.lastName === ""){

        showError(
            "lastName",
            "Last name is required."
        );

        isValid = false;

    }

    if(data.username === ""){

        showError(
            "username",
            "Username is required."
        );

        isValid = false;

    }

    if(emailExists(data.email)){

        showError(
            "email",
            "Email already exists."
        );

        isValid = false;

    }

    if(usernameExists(data.username)){

        showError(
            "username",
            "Username already exists."
        );

        isValid = false;

    }

    if(data.email === ""){

        showError(
            "email",
            "Email is required."
        );

        isValid = false;

    }

    if(data.password.length < MIN_PASSWORD_LENGTH){

        showError(
            "password",
            `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
        );

        isValid = false;

    }

    if(data.password !== data.confirmPassword){

        showError(
            "confirmPassword",
            "Passwords do not match."
        );

        isValid = false;

    }

    if(!data.termsAccepted){

        showError(
            "terms",
            "Please accept Terms & Conditions."
        );

        isValid = false;

    }

    if(data.securityQuestion === ""){

    showError(

        "securityQuestion",

        "Please select a security question."

    );

    isValid = false;

    }

    if(data.securityAnswer === ""){

        showError(

            "securityAnswer",

            "Security answer is required."

        );

        isValid = false;

    }

    return isValid;

}

function registerUser(data){

    const users = appState.users;

    const newUser = createUser(data);

    users.push(newUser);

    appState.users = users;

    saveUsers(appState.users);

}

function handleRegister(event){

    event.preventDefault();

    const data = getFormData();

    const isValid =
        validateRegisterForm(data);

    if(!isValid){

        return;

    }

    registerUser(data);

    clearForm();

    showToast(

        "Registration Successful",

        "success"

    );

    setTimeout(function(){

        window.location.href =
            "login.html";

    },1500);

}


function togglePassword(inputElement, buttonElement){

    if(inputElement.type === "password"){

        inputElement.type = "text";

        buttonElement.textContent = "🙈";

    }

    else{

        inputElement.type = "password";

        buttonElement.textContent = "👁";

    }

}

function initializePasswordToggle(){

    if(authElements.togglePassword){

        authElements.togglePassword.addEventListener(

            "click",

            function(){

                togglePassword(

                    authElements.password,

                    authElements.togglePassword

                );

            }

        );

    }

    if(authElements.toggleConfirmPassword){

        authElements.toggleConfirmPassword.addEventListener(

            "click",

            function(){

                togglePassword(

                    authElements.confirmPassword,

                    authElements.toggleConfirmPassword

                );

            }

        );

    }

}

function calculatePasswordStrength(password){

    let score = 0;

    if(password.length >= 8){

        score++;

    }

    if(/[A-Z]/.test(password)){

        score++;

    }

    if(/[a-z]/.test(password)){

        score++;

    }

    if(/[0-9]/.test(password)){

        score++;

    }

    if(/[!@#$%^&*(),.?":{}|<>]/.test(password)){

        score++;

    }

    return score;

}

function updatePasswordStrength(){

    if(!authElements.password){

        return;

    }

    const password =
        authElements.password.value;

    const score =
        calculatePasswordStrength(password);

    const progress =
        authElements.strengthProgress;

    const text =
        authElements.strengthText;

    progress.style.width = "0%";

    progress.style.background = "#ef4444";

    text.textContent = "Weak";

    if(score <= 1){

        progress.style.width = "20%";

        progress.style.background = "#ef4444";

        text.textContent = "Weak";

    }

    else if(score <= 3){

        progress.style.width = "60%";

        progress.style.background = "#f59e0b";

        text.textContent = "Medium";

    }

    else{

        progress.style.width = "100%";

        progress.style.background = "#22c55e";

        text.textContent = "Strong";

    }

}

function initializePasswordStrength(){

    if(!authElements.password){

        return;

    }

    authElements.password.addEventListener(

        "input",

        updatePasswordStrength

    );

}

function validatePasswordMatch(){

    if(

        !authElements.password ||

        !authElements.confirmPassword

    ){

        return;

    }

    if(

        authElements.confirmPassword.value === ""

    ){

        return;

    }

    if(

        authElements.password.value !==

        authElements.confirmPassword.value

    ){

        showError(

            "confirmPassword",

            "Passwords do not match."

        );

    }

    else{

        showError(

            "confirmPassword",

            ""

        );

    }

}

function initializePasswordMatch(){

    if(!authElements.confirmPassword){

        return;

    }

    authElements.confirmPassword.addEventListener(

        "input",

        validatePasswordMatch

    );

}

function findUser(identifier){

    const users = appState.users;

    return users.find(function(user){

        return (

            user.email.toLowerCase() ===
            identifier.toLowerCase()

            ||

            user.username.toLowerCase() ===
            identifier.toLowerCase()

        );

    });

}

function saveSession(user){

        appState.currentUser = {...user};

    if(  authElements.rememberMe && authElements.rememberMe.checked){

        localStorage.setItem(

            STORAGE_KEYS.CURRENT_USER,

            JSON.stringify(user)

        );

    }

    else{

        sessionStorage.setItem(

            STORAGE_KEYS.CURRENT_USER,

            JSON.stringify(user)

        );

    }

}

function handleLogin(event){

    console.log("🔥 handleLogin Fired");


    event.preventDefault();

    clearErrors();

    const identifier =

        authElements.loginIdentifier.value.trim();

    const password =

        authElements.password.value;

    if(identifier === ""){

        showError(

            "loginIdentifier",

            "Username or Email is required."

        );

        return;

    }

    if(password === ""){

        showError(

            "password",

            "Password is required."

        );

        return;

    }

    const user =

        findUser(identifier.trim());

    if(!user){

        showToast(

            "User not found.",

            "error"

        );

        return;

    }

    if(!verifyPassword(user,password)){

        showToast(

            "Incorrect password.",

            "error"

        );

        return;

    }

    user.lastLogin = new Date().toISOString();

    const users = appState.users;

    const index =
    users.findIndex(function(u){

        return u.id === user.id;

    });

    users[index] = user;

    appState.users = users;

    saveUsers(appState.users);

    saveSession(user);

    console.log("Saved Local", localStorage.getItem(STORAGE_KEYS.CURRENT_USER));

    console.log("Saved Session", sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER));

        showToast(
            "Login Successful",
            "success"
        );

    setTimeout(function(){

        window.location.href =
            "index.html";

    },500);

};

function initializeLogin(){

    console.log(authElements.loginForm);

    if(!authElements.loginForm){

        console.log("Login form NOT found");

        return;

    }

    console.log("Login form found");

    authElements.loginForm.addEventListener(
        "submit",
        handleLogin
    );

    initializePasswordToggle();

}

function initializeRegister(){

    if(!authElements.registerForm){

        return;

    }

    authElements.registerForm.addEventListener(

        "submit",

        handleRegister

    );

    initializePasswordToggle();

    initializePasswordStrength();

    initializePasswordMatch();

}

function getCurrentUser(){

    try{

        const rememberedUser =
            localStorage.getItem(
                STORAGE_KEYS.CURRENT_USER
            );

        if(rememberedUser){

            return JSON.parse(
                rememberedUser
            );

        }

        const sessionUser =
            sessionStorage.getItem(
                STORAGE_KEYS.CURRENT_USER
            );

        if(sessionUser){

            return JSON.parse(
                sessionUser
            );

        }

        return null;

    }

    catch(error){

        localStorage.removeItem(
            STORAGE_KEYS.CURRENT_USER
        );

        sessionStorage.removeItem(
            STORAGE_KEYS.CURRENT_USER
        );

        return null;

    }

}


function loadCurrentUser(){

    const user = getCurrentUser();

    appState.currentUser = user;

}


function isLoggedIn(){

    return getCurrentUser() !== null;

}

function logout(){

    localStorage.removeItem(
        STORAGE_KEYS.CURRENT_USER
    );

    sessionStorage.removeItem(
        STORAGE_KEYS.CURRENT_USER
    );

    appState.currentUser = null;

    showToast(
        "Logged Out Successfully",
        "success"
    );

    setTimeout(function(){

        window.location.href = "login.html";

    },500);

}

function protectRoute(){

    if(!appState.currentUser){

        window.location.replace("login.html");
        return false;

    }

    document.body.classList.remove("page-loading");

    return true;

}


function protectGuestRoute(){

    if(isLoggedIn()){

        console.log("Redirecting to Dashboard...");
        console.log(getCurrentUser());

        window.location.href = "index.html";

    }

}

function hashPassword(password){

    return btoa(password);

}

function verifyPassword(user,password){

    if(!user){

        console.error("verifyPassword(): user is null");

        return false;

    }

    return user.password === hashPassword(password);

}

function initializeSession(){

    loadCurrentUser();
}

function initializeAuth(){

    console.log("initializeAuth() called");


    initializeRegister();

    initializeLogin();

}




