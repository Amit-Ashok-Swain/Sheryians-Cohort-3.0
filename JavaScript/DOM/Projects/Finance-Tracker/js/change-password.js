// change-password.js

const changePasswordElements = {

    form: document.querySelector("#changePasswordForm"),

    currentPassword: document.querySelector("#currentPassword"),

    newPassword: document.querySelector("#newPassword"),

    confirmPassword: document.querySelector("#confirmPassword"),

    currentPasswordError: document.querySelector("#currentPasswordError"),

    newPasswordError: document.querySelector("#newPasswordError"),

    confirmPasswordError: document.querySelector("#confirmPasswordError"),

    strengthProgress: document.querySelector("#strengthProgress"),

    strengthText: document.querySelector("#strengthText"),

    cancelButton: document.querySelector("#cancelPassword"),

    backButton: document.querySelector("#backToDashboard")

};

function clearPasswordErrors(){

    changePasswordElements.currentPasswordError.textContent = "";

    changePasswordElements.newPasswordError.textContent = "";

    changePasswordElements.confirmPasswordError.textContent = "";

    changePasswordElements.currentPassword.classList.remove("input-error");

    changePasswordElements.newPassword.classList.remove("input-error");

    changePasswordElements.confirmPassword.classList.remove("input-error");

}

function updatePasswordStrength(){

    const password =
        changePasswordElements.newPassword.value;

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

    if(/[!@#$%^&*]/.test(password)){

        score++;

    }

    const colors = [

        "#EF4444",

        "#F97316",

        "#EAB308",

        "#3B82F6",

        "#22C55E"

    ];

    const labels = [

        "Very Weak",

        "Weak",

        "Fair",

        "Good",

        "Strong"

    ];

    changePasswordElements.strengthProgress.style.width =
        (score * 20) + "%";

    changePasswordElements.strengthProgress.style.background =
        colors[Math.max(score-1,0)];

    changePasswordElements.strengthText.textContent =
        labels[Math.max(score-1,0)];

}

function changePassword(event){

    event.preventDefault();

    clearPasswordErrors();

    const currentPassword =
        changePasswordElements.currentPassword.value.trim();
    
    const isPasswordCorrect = 
        verifyPassword(
        appState.currentUser,
        currentPassword
        );

console.log("Current User:", appState.currentUser);

console.log("Entered Password:", currentPassword);

console.log("Stored Password:", appState.currentUser.password);

console.log("Password Correct:", isPasswordCorrect);

    const newPassword =
        changePasswordElements.newPassword.value.trim();

    const confirmPassword =
        changePasswordElements.confirmPassword.value.trim();

    let isValid = true;

    // Current Password

    if(currentPassword === ""){

        showPasswordError(

            changePasswordElements.currentPassword,

            changePasswordElements.currentPasswordError,

            "Current password is required."

        );

        isValid = false;

    }else if(!isPasswordCorrect){

    showPasswordError(

        changePasswordElements.currentPassword,

        changePasswordElements.currentPasswordError,

        "Incorrect current password."

    );

    isValid = false;

    }

    // New Password

    if(newPassword === ""){

        showPasswordError(

            changePasswordElements.newPassword,

            changePasswordElements.newPasswordError,

            "New password is required."

        );

        isValid = false;

    }
    else if(newPassword.length < 8){

        showPasswordError(

            changePasswordElements.newPassword,

            changePasswordElements.newPasswordError,

            "Minimum 8 characters."

        );

        isValid = false;

    }
    else if(newPassword === currentPassword){

        showPasswordError(

            changePasswordElements.newPassword,

            changePasswordElements.newPasswordError,

            "New password cannot be the same as the current password."

        );

        isValid = false;

    }

    // Confirm Password

    if(confirmPassword === ""){

        showPasswordError(

            changePasswordElements.confirmPassword,

            changePasswordElements.confirmPasswordError,

            "Please confirm your password."

        );

        isValid = false;

    }
    else if(confirmPassword !== newPassword){

        showPasswordError(

            changePasswordElements.confirmPassword,

            changePasswordElements.confirmPasswordError,

            "Passwords do not match."

        );

        isValid = false;

    }

    if(!isValid){

        return;

    }

    saveNewPassword(newPassword);

}

function saveNewPassword(password){

    appState.currentUser.password =
        hashPassword(password);

    const index =
        appState.users.findIndex(function(user){

            return user.id ===
                appState.currentUser.id;

        });

    appState.users[index] =
        deepClone(appState.currentUser);

    saveUsers(appState.users);

    if(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)){

        localStorage.setItem(

            STORAGE_KEYS.CURRENT_USER,

            JSON.stringify(appState.currentUser)

        );

    }

    if(sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER)){

        sessionStorage.setItem(

            STORAGE_KEYS.CURRENT_USER,

            JSON.stringify(appState.currentUser)

        );

    }

    showToast(

        "Password Updated Successfully",

        "success"

    );

    setTimeout(function(){

        window.location.href =
            "profile.html";

    },800);

}

function initializePasswordToggle(){

    document
        .querySelectorAll(".toggle-password")
        .forEach(function(button){

            button.addEventListener("click",function(){

                const input =
                    button.previousElementSibling;

                input.type =
                    input.type === "password"
                    ? "text"
                    : "password";

            });

        });

}



function showPasswordError(input,error,message){

    input.classList.add("input-error");

    error.textContent = message;

}



function initializeChangePassword(){

    initializeStorage();

    initializeSession();

    protectRoute();

    initializeTheme();

    console.log("Current User:", appState.currentUser);

    changePasswordElements.form.addEventListener(
        "submit",
        changePassword
    );

    changePasswordElements.cancelButton.addEventListener(
        "click",
        function(){

            window.location.href = "profile.html";

        }
    );

    initializePasswordToggle();

    changePasswordElements.newPassword.addEventListener(
        "input",
        updatePasswordStrength
    );

    changePasswordElements.confirmPassword.addEventListener(

    "input",

    function(){

        if(

            changePasswordElements.confirmPassword.value === ""

        ){

            changePasswordElements.confirmPasswordError.textContent = "";

            changePasswordElements.confirmPassword.classList.remove(

                "input-error"

            );

            return;

        }

        if(

            changePasswordElements.confirmPassword.value !==

            changePasswordElements.newPassword.value

        ){

            showPasswordError(

                changePasswordElements.confirmPassword,

                changePasswordElements.confirmPasswordError,

                "Passwords do not match."

            );

        }
        else{

            changePasswordElements.confirmPasswordError.textContent = "";

            changePasswordElements.confirmPassword.classList.remove(

                "input-error"

            );

        }

    }

    );  

    if(changePasswordElements.backButton){

    changePasswordElements.backButton.addEventListener(

        "click",

        function(){

            window.location.href = "index.html";

        }

    );

    }

}

initializeChangePassword();

