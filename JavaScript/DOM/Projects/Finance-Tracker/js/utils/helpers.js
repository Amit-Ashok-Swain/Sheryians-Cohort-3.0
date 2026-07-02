/* utils/helpers.js */

function generateId(){

    return Date.now() + Math.floor(Math.random() * 1000);

}
function capitalize(text){

    if(!text){
        return "";
    }

    return text.charAt(0).toUpperCase() +
        text.slice(1);

}

function sleep(milliseconds){

    return new Promise(function(resolve){

        setTimeout(resolve,milliseconds);

    });

}
function isEmpty(value){

    return (
        value === null ||
        value === undefined ||
        value === ""
    );

}

function deepClone(object){

    return JSON.parse(
        JSON.stringify(object)
    );

}


function randomNumber(min,max){

    return Math.floor(

        Math.random() * (max-min+1)

    ) + min;

}

function debounce(callback,delay){

    let timer;

    return function(){

        const context = this;

        const args = arguments;

        clearTimeout(timer);

        timer = setTimeout(function(){

            callback.apply(context,args);

        },delay);

    };

}


function throttle(callback,delay){

    let shouldWait = false;

    return function(){

        if(shouldWait){
            return;
        }

        callback.apply(this,arguments);

        shouldWait = true;

        setTimeout(function(){

            shouldWait = false;

        },delay);

    };

}


function copyToClipboard(text){

    navigator.clipboard.writeText(text);

}

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


function downloadFile(blob,fileName){

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}

function getToday(){

    return new Date()
        .toISOString()
        .split("T")[0];

}

function updateLoggedInUser(){

    if(!appState.currentUser){

        return;

    }

    const username =
        document.querySelector(".username");

    const profileImage =
        document.querySelector("#navbarProfileImage");

    if(username){

        username.textContent =
            appState.currentUser.firstName;

    }

    if(profileImage){

        profileImage.src =
            appState.currentUser.profileImage ||

            "./assets/images/default-avatar.png";

    }

}

function populateCategoryDropdown(selectElement){

    if(!selectElement){
        return;
    }

    selectElement.innerHTML = `
        <option value="">
            Select Category
        </option>
    `;

    CATEGORIES.forEach(function(category){

        const option = document.createElement("option");

        option.value = category;

        option.textContent = category;

        selectElement.appendChild(option);

    });

}

function initializeMobileSidebar(){

    const menuToggle = document.querySelector("#menuToggle");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    if(!menuToggle || !sidebar || !overlay){
        return;
    }

    const navLinks = document.querySelectorAll(".nav-item");

    function closeSidebar(){

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("ri-close-line");

        icon.classList.add("ri-menu-line");

        sidebar.classList.remove("open");

        overlay.classList.remove("show");

        document.body.classList.remove("menu-open");

    }

    menuToggle.addEventListener("click",()=>{

        sidebar.classList.toggle("open");

        overlay.classList.toggle("show");

        document.body.classList.toggle("menu-open");

        const icon = menuToggle.querySelector("i");

        icon.classList.toggle("ri-menu-line");

        icon.classList.toggle("ri-close-line");

    });

    overlay.addEventListener("click",closeSidebar);

    window.addEventListener("resize",()=>{

        if(window.innerWidth>768){

            sidebar.classList.remove("open");

            overlay.classList.remove("show");

            document.body.classList.remove("menu-open");

        }

    });

    navLinks.forEach(link=>{

        link.addEventListener("click",()=>{

            if(window.innerWidth<=768){

                closeSidebar();

            }

        });

    });

}