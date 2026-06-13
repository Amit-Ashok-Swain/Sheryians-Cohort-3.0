

const main = document.querySelector("main");

const divTop = document.createElement("div");
const divBottom = document.createElement("div");
main.append(divTop,divBottom);

divTop.classList.add("outer-div","div-top");
divBottom.classList.add("outer-div","div-bottom");

const divLeft = document.createElement("div");
const divCenter = document.createElement("div");
const divRight = document.createElement("div");
divBottom.append(divLeft,divCenter,divRight);

divLeft.classList.add("inner-div","div-left");
divCenter.classList.add("inner-div","div-center");
divRight.classList.add("inner-div","div-right");

console.log(main);


const selectDivTop = document.querySelector(".div-top")

const heading = document.createElement("h1");
const searchBox = document.createElement("div");
const inputBox = document.createElement("input");
const addTaskBtn = document.createElement("button");
selectDivTop.append(heading,searchBox);
searchBox.append(inputBox,addTaskBtn);

heading.classList.add("heading");
searchBox.classList.add("search-box");
inputBox.classList.add("input-box")
addTaskBtn.classList.add("btn");

heading.innerText = "My Tasks"
inputBox.placeholder = "Enter your task";
addTaskBtn.textContent = "Add Task";

const headingForDivLeft = document.createElement("h3");
headingForDivLeft.classList.add("sub-heading","sub-heading-left");

const headingForDivCenter = document.createElement("h3");
headingForDivCenter.classList.add("sub-heading","sub-heading-center");

const headingForDivRight = document.createElement("h3");
headingForDivRight.classList.add("sub-heading","sub-heading-right");

const selectDivBottomLeft = document.querySelector(".div-left");
selectDivBottomLeft.appendChild(headingForDivLeft);

const selectDivBottomCenter = document.querySelector(".div-center");
selectDivBottomCenter.appendChild(headingForDivCenter);

const selectDivBottomRight = document.querySelector(".div-right");
selectDivBottomRight.append(headingForDivRight);

headingForDivLeft.innerText = "To-Do";
headingForDivCenter.innerText = "In-Progress";
headingForDivRight.innerText = "Completed";

const inProgressTask = document.createElement("div");
inProgressTask.classList.add("in-progress-task");

selectDivBottomCenter.appendChild(inProgressTask);

const completedTask = document.createElement("div");
completedTask.classList.add("completed-task");

selectDivBottomRight.appendChild(completedTask);

const todoTask = document.createElement("div");
todoTask.classList.add("todo-task");
selectDivBottomLeft.appendChild(todoTask);

const btn = document.querySelector("button");

inputBox.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){
        btn.click();
    }

});

addTaskBtn.addEventListener("click", () => {

    const value = inputBox.value.trim();

    if (!value) return;

    const task = document.createElement("div");

    task.classList.add("task");

    task.innerHTML = `
        <h4 class="task-name">${value}</h4>

        <div class="task-actions">

            <button class="move-btn start-btn">
                Start
            </button>

            <div class="edit-delete">

                <button class="btn-edit">
                    <i class="ri-edit-2-fill"></i>
                </button>

                <button class="btn-delete">
                    <i class="ri-delete-bin-6-line"></i>
                </button>

            </div>

        </div>
    `;

    todoTask.appendChild(task);

    inputBox.value = "";
});

document.addEventListener("click", (e) => {

    if (e.target.closest(".btn-delete")) {
        e.target.closest(".task").remove();
    }

});

document.addEventListener("click", (e) => {

    if (e.target.closest(".btn-edit")) {

        const taskName = e.target
            .closest(".task")
            .querySelector(".task-name");

        const updatedTask = prompt(
            "Edit Task",
            taskName.textContent
        );

        if (updatedTask?.trim()) {

            taskName.textContent = updatedTask;

        }
    }

});

todoTask.addEventListener("click", (e) => {

    const moveBtn = e.target.closest(".move-btn");

    if (!moveBtn) return;

    const task = moveBtn.closest(".task");

    moveBtn.classList.remove("start-btn");
    moveBtn.classList.add("complete-btn");

    moveBtn.textContent = "Complete";

    inProgressTask.appendChild(task);

});

inProgressTask.addEventListener("click", (e) => {

    const moveBtn = e.target.closest(".move-btn");

    if (!moveBtn) return;

    const task = moveBtn.closest(".task");

    task.classList.add("completed");

    moveBtn.classList.remove("complete-btn");
    moveBtn.classList.add("done-btn");

    moveBtn.textContent = "Done";

    moveBtn.disabled = true;

    completedTask.appendChild(task);

});

