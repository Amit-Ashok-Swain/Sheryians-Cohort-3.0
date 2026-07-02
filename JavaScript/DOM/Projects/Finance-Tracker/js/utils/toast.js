/* utils/toast.js */

const toastContainer =
    document.querySelector("#toastContainer");

const toastIcons = {

    success:"✔",

    error:"✖",

    warning:"⚠",

    info:"ℹ"

};

function createToast(message,type){

    const toast =
        document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = `

        <span class="toast-icon">

            ${toastIcons[type]}

        </span>

        <span class="toast-message">

            ${message}

        </span>

    `;

    return toast;

}

function showToast(message,type="success"){

    if(!toastContainer){
        return;
    }

    const toast =
        createToast(message,type);

    toastContainer.appendChild(toast);

    const removeToast = function(){

        toast.classList.add("hide");

        setTimeout(function(){

            toast.remove();

        },300);

    };

    const timer =
        setTimeout(removeToast,3000);

    toast.addEventListener("click",function(){

        clearTimeout(timer);

        removeToast();

    });

}