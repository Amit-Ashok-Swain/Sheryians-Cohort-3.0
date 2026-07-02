const forgotElements = {

    form:
        document.querySelector("#forgotPasswordForm"),

    identifier:
        document.querySelector("#identifier"),

    findAccount:
        document.querySelector("#findAccount"),

    securitySection:
        document.querySelector("#securitySection"),

    securityQuestion:
        document.querySelector("#securityQuestion"),

    securityAnswer:
        document.querySelector("#securityAnswer"),

    newPassword:
        document.querySelector("#newPassword"),

    confirmPassword:
        document.querySelector("#confirmPassword"),

    identifierError:
        document.querySelector("#identifierError"),

    securityAnswerError:
        document.querySelector("#securityAnswerError"),

    newPasswordError:
        document.querySelector("#newPasswordError"),

    confirmPasswordError:
        document.querySelector("#confirmPasswordError"),
    
    strengthProgress:
        document.querySelector("#strengthProgress"),

    strengthText:
        document.querySelector("#strengthText")

};

let selectedUser = null;

function findUser(identifier){

    const value =
        identifier.trim().toLowerCase();

    return appState.users.find(function(user){

        return (

            user.username.trim().toLowerCase() === value ||

            user.email.trim().toLowerCase() === value

        );

    });

}

function loadSecurityQuestion(){

    const identifier =
        forgotElements.identifier.value.trim();

    if(identifier === ""){

        forgotElements.identifierError.textContent =
            "Enter Username or Email.";

        forgotElements.identifier.classList.add("input-error");

        return;

    }

    console.log("Identifier:", identifier);
    console.log("Selected User:", selectedUser);

    forgotElements.identifierError.textContent = "";

    forgotElements.securityAnswerError.textContent = "";

    forgotElements.newPasswordError.textContent = "";

    forgotElements.confirmPasswordError.textContent = "";

    forgotElements.securityAnswer.classList.remove("input-error");

    forgotElements.newPassword.classList.remove("input-error");

    forgotElements.confirmPassword.classList.remove("input-error");


    selectedUser = findUser(identifier);

    if(!selectedUser){

    forgotElements.securitySection.classList.add(

        "hidden"

    );

    selectedUser = null;

    forgotElements.securityQuestion.value = "";

    forgotElements.securityAnswer.value = "";

    forgotElements.newPassword.value = "";

    forgotElements.confirmPassword.value = "";

    showToast(

        "Account not found.",

        "error"

    );

    return;

    }

    const questions = {

        school:
            "What was your first school name?",

        pet:
            "What was your first pet's name?",

        teacher:
            "Who was your favorite teacher?",

        city:
            "Which city were you born in?",

        mother:
            "What is your mother's maiden name?"

    };

    forgotElements.securityQuestion.value =

        questions[selectedUser.securityQuestion];

    forgotElements.securitySection.classList.remove(

        "hidden"

    );

    forgotElements.securityAnswer.focus();

    showToast(

        "Account Found",

        "success"

    );

}

function validateResetForm(){

    let valid = true;

    forgotElements.securityAnswer.classList.remove("input-error");

    forgotElements.newPassword.classList.remove("input-error");

    forgotElements.confirmPassword.classList.remove("input-error");

    forgotElements.securityAnswerError.textContent = "";

    forgotElements.newPasswordError.textContent = "";

    forgotElements.confirmPasswordError.textContent = "";

    if(

        forgotElements.securityAnswer.value.trim() === ""

    ){

        forgotElements.securityAnswerError.textContent =
            "Answer is required.";

        forgotElements.securityAnswer.classList.add("input-error");

        valid = false;

    }

if(

    !isStrongPassword(

        forgotElements.newPassword.value

    )

    ){

    forgotElements.newPasswordError.textContent =

        "Password must contain uppercase, lowercase, number and special character.";

    forgotElements.newPassword.classList.add(

        "input-error"

    );

    valid = false;

    }

    if(

    verifyPassword(

        selectedUser,

        forgotElements.newPassword.value

    )

    ){

        forgotElements.newPasswordError.textContent =

            "New password cannot be the same as the old password.";

        valid = false;

        forgotElements.newPassword.classList.add("input-error");

    }

    if(

        forgotElements.newPassword.value !==

        forgotElements.confirmPassword.value

    ){

        forgotElements.confirmPasswordError.textContent =

            "Passwords do not match.";

        valid = false;

        forgotElements.confirmPassword.classList.add("input-error");

    }

    return valid;

}

function updatePasswordStrength(){

    const password =
        forgotElements.newPassword.value;

    let score = 0;

    if(password.length >= 8) score++;

    if(/[A-Z]/.test(password)) score++;

    if(/[a-z]/.test(password)) score++;

    if(/[0-9]/.test(password)) score++;

    if(/[!@#$%^&*]/.test(password)) score++;

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

    forgotElements.strengthProgress.style.width =
        (score * 20) + "%";

    forgotElements.strengthProgress.style.background =
        colors[Math.max(score-1,0)];

    forgotElements.strengthText.textContent =
        labels[Math.max(score-1,0)];

}

function resetPassword(event){

    event.preventDefault();

    if(!validateResetForm()){

        return;

    }

    const enteredAnswer =

    forgotElements.securityAnswer.value

        .trim()

        .toLowerCase();

    const storedAnswer =

    selectedUser.securityAnswer

        .trim()

        .toLowerCase();

    if(enteredAnswer !== storedAnswer){

    forgotElements.securityAnswerError.textContent =

        "Incorrect security answer.";

    forgotElements.securityAnswer.classList.add(

        "input-error"

    );

    return;

    }

    selectedUser.password = hashPassword(

        forgotElements.newPassword.value

    );

    saveUsers(appState.users);

    forgotElements.form.reset();

    forgotElements.strengthProgress.style.width = "0%";

    forgotElements.strengthText.textContent = "Password Strength";

    forgotElements.securitySection.classList.add(

        "hidden"

    );

    if(

    appState.currentUser &&

    appState.currentUser.id === selectedUser.id

    ){

        appState.currentUser.password =

            selectedUser.password;

        localStorage.setItem(

            STORAGE_KEYS.CURRENT_USER,

            JSON.stringify(appState.currentUser)

        );

    }

    showToast(

        "Password Updated Successfully",

        "success"

    );

    setTimeout(function(){

        window.location.href = "login.html";

    },1500);

}

function initializeForgotPassword(){

    initializeStorage();

    initializeTheme();

    initializePasswordToggle();

    forgotElements.newPassword.addEventListener(

    "input",

    updatePasswordStrength

    );

    updatePasswordStrength();

    forgotElements.findAccount.addEventListener(

        "click",

        loadSecurityQuestion

    );

    forgotElements.form.addEventListener(

        "submit",

        resetPassword

    );

    const backButton =
    document.querySelector("#backButton");

    if(backButton){

        backButton.addEventListener(
            "click",
            function(){

                if(appState.currentUser){

                    window.location.href =
                        "index.html";

                }
                else{

                    window.location.href =
                        "login.html";

                }

            }
        );

    }

    console.log("Users:", appState.users);
}


initializeForgotPassword()
