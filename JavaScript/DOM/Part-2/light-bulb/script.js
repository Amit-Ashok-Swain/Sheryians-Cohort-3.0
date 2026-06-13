const bulb = document.querySelector(".light-bulb-top");
const btn = document.querySelector(".light-bulb-btn")

/*
let isLighten = true;

addEventListener("click",()=>{    
    if(isLighten){
        bulb.style.backgroundColor = "yellow";
        btn.style.backgroundColor = "red";
        btn.textContent = "OFF";
        isLighten = false;
    }else{
        bulb.style.backgroundColor = "transparent";
        btn.style.backgroundColor = "green";
        btn.textContent = "ON";
        isLighten = true;        
    }
});
*/

btn.addEventListener("click",()=>{
    let isOn = bulb.classList.toggle("light-up-bulb-top");
    if(isOn){
        btn.textContent = "OFF";
        btn.style.backgroundColor = "red";
    }else{
        btn.textContent = "ON";
        btn.style.backgroundColor = "green";
    }
})