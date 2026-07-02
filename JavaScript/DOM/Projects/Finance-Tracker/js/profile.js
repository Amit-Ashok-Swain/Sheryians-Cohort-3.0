// profile.js

const profileElements = {

    form: document.querySelector("#profileForm"),

    profileImage: document.querySelector("#profileImage"),

    imageInput: document.querySelector("#imageInput"),

    uploadImage: document.querySelector("#uploadImage"),

    removeImage: document.querySelector("#removeImage"),

    firstName: document.querySelector("#firstName"),

    lastName: document.querySelector("#lastName"),

    username: document.querySelector("#username"),

    email: document.querySelector("#email"),

    createdAt: document.querySelector("#createdAt"),

    lastLogin: document.querySelector("#lastLogin"),

    accountStatus: document.querySelector("#accountStatus"),

    editButton: document.querySelector("#editProfile"),

    saveButton: document.querySelector("#saveProfile"),

    cancelButton: document.querySelector("#cancelProfile"),

    changePasswordButton: document.querySelector("#changePasswordButton"),

};

let originalUser = null;

function loadProfile(){

    if(!appState.currentUser){

        window.location.href = "login.html";

        return;

    }

    originalUser = deepClone(appState.currentUser);

    renderProfile();

}

function renderProfile(){

    const user = appState.currentUser;

    profileElements.firstName.value = user.firstName;

    profileElements.lastName.value = user.lastName;

    profileElements.username.value = user.username;

    profileElements.email.value = user.email;

    profileElements.createdAt.textContent =
        formatFullDate(user.createdAt);

    profileElements.lastLogin.textContent =
        user.lastLogin
            ? formatFullDate(user.lastLogin)
            : "Never";

    profileElements.accountStatus.textContent =
        user.isActive
            ? "Active"
            : "Inactive";

    profileElements.profileImage.src =

        user.profileImage ||

        "./assets/images/default-avatar.png";

}



function enableEditing(){

    profileElements.firstName.readOnly = false;

    profileElements.lastName.readOnly = false;

    profileElements.username.readOnly = false;

    profileElements.email.readOnly = false;

    profileElements.editButton.classList.add("hidden");

    profileElements.saveButton.classList.remove("hidden");

    profileElements.cancelButton.classList.remove("hidden");

}

function disableEditing(){

    profileElements.firstName.readOnly = true;

    profileElements.lastName.readOnly = true;

    profileElements.username.readOnly = true;

    profileElements.email.readOnly = true;

    profileElements.editButton.classList.remove("hidden");

    profileElements.saveButton.classList.add("hidden");

    profileElements.cancelButton.classList.add("hidden");

}

function cancelProfile(){

    appState.currentUser = deepClone(originalUser);

    renderProfile();

    disableEditing();

}

function usernameExists(username){

    return appState.users.some(function(user){

        return (

            user.username.toLowerCase() === username.toLowerCase()

            &&

            user.id !== appState.currentUser.id

        );

    });

}

function emailExists(email){

    return appState.users.some(function(user){

        return (

            user.email.toLowerCase() === email.toLowerCase()

            &&

            user.id !== appState.currentUser.id

        );

    });

}

function saveProfile(event){

    event.preventDefault();

    const firstName =
        profileElements.firstName.value.trim();

    const lastName =
        profileElements.lastName.value.trim();

    const username =
        profileElements.username.value.trim();

    const email =
        profileElements.email.value.trim();

    if(firstName === ""){

        showToast(
            "First Name is required.",
            "error"
        );

        return;

    }

    if(lastName === ""){

        showToast(
            "Last Name is required.",
            "error"
        );

        return;

    }

    if(username === ""){

    showToast(

        "Username is required.",

        "error"

    );

    return;

    }

    if(usernameExists(username)){

        showToast(

            "Username already exists.",

            "error"

        );

        return;

    }

    if(!isValidEmail(email)){

        showToast(

            "Please enter a valid email.",

            "error"

        );

        return;

    }

    if(emailExists(email)){

        showToast(

            "Email already exists.",

            "error"

        );

        return;

    }

    appState.currentUser.firstName = firstName;

    appState.currentUser.lastName = lastName;

    appState.currentUser.username = username;

    appState.currentUser.email = email;

    updateCurrentUser();

    originalUser = deepClone(appState.currentUser);

    updateLoggedInUser();

    disableEditing();

    renderProfile();

    showToast(
        "Profile Updated Successfully",
        "success"
    );

}

function openImagePicker(){

    profileElements.imageInput.click();

}

function uploadProfileImage(event){

    const file = event.target.files[0];

    if(!file){

        return;

    }

    if(!file.type.startsWith("image/")){

        showToast(

            "Please select a valid image.",

            "error"

        );

        return;

    }

    if(file.size > 2 * 1024 * 1024){

        showToast(

            "Image size should be less than 2 MB.",

            "warning"

        );

        return;

    }

    const reader = new FileReader();

    reader.onload = function(e){

        profileElements.profileImage.src = e.target.result;

        appState.currentUser.profileImage = e.target.result;

        updateCurrentUser();

        updateLoggedInUser();

        originalUser = deepClone(appState.currentUser);

        showToast(

            "Profile Image Updated",

            "success"

        );

    };

    reader.readAsDataURL(file);
    profileElements.imageInput.value = "";

}

function removeProfileImage(){

    const confirmDelete = confirm(

        "Remove profile picture?"

    );

    if(!confirmDelete){

        return;

    }

    profileElements.profileImage.src =

        "./assets/images/default-avatar.png";

    appState.currentUser.profileImage = "";

    updateCurrentUser();

    updateLoggedInUser();

    profileElements.imageInput.value = "";

    originalUser = deepClone(appState.currentUser);

    showToast(

        "Profile Image Removed",

        "success"

    );

}



function updateCurrentUser(){

    const index = appState.users.findIndex(function(user){

        return user.id === appState.currentUser.id;

    });

    if(index === -1){

        return;

    }

    appState.users[index] = deepClone(appState.currentUser);

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

}

function initializeProfile(){

    if(!profileElements.form){

        return;

    }

    initializeStorage();

    initializeSession();

    protectRoute();

    initializeTheme();

    loadProfile();

    disableEditing();

    profileElements.editButton.addEventListener(
        "click",
        enableEditing
    );

    profileElements.cancelButton.addEventListener(
        "click",
        cancelProfile
    );

    profileElements.form.addEventListener(
        "submit",
        saveProfile
    );

    profileElements.uploadImage.addEventListener(
        "click",
        openImagePicker
    );

    profileElements.imageInput.addEventListener(
        "change",
        uploadProfileImage
    );

    profileElements.removeImage.addEventListener(
        "click",
        removeProfileImage
    );

    if(profileElements.changePasswordButton){

    profileElements.changePasswordButton.addEventListener(

        "click",

        function(){

            window.location.href =
                "change-password.html";

        }

    );

    }

    const backButton =

    document.querySelector("#backToDashboard");

    if(backButton){

        backButton.addEventListener(

            "click",

            function(){

                window.location.href =

                    "index.html";

            }

        );

    }

}