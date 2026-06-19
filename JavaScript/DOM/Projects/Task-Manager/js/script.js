const taskForm =
  document.querySelector(
    "#task-form"
  );

const taskTitle =
  document.querySelector(
    "#task-title"
  );

const taskCategory =
  document.querySelector(
    "#task-category"
  );

const searchInput =
  document.querySelector(
    "#search-task"
  );

const filterCategory =
  document.querySelector(
    "#filter-category"
  );

const clearAllButton =
  document.querySelector(
    "#clear-all-btn"
  );

const todoColumn =
  document.querySelector(
    "#todo-column"
  );

const progressColumn =
  document.querySelector(
    "#progress-column"
  );

const completedColumn =
  document.querySelector(
    "#completed-column"
  );

const archivedColumn =
  document.querySelector(
    "#archived-column"
  );

const taskTableBody =
  document.querySelector(
    "#task-table-body"
  );

const progressTableBody =
  document.querySelector(
    "#progress-table-body"
  );


const emptyState =
  document.querySelector(
    "#empty-state"
  );

const totalCount =
  document.querySelector(
    "#total-count"
  );

const pendingCount =
  document.querySelector(
    "#pending-count"
  );

const completedCount =
  document.querySelector(
    "#completed-count"
  );

const inprogressTotal =
  document.querySelector(
    "#inprogress-total"
  );

const todoTotal =
  document.querySelector(
    "#todo-total"
  );

const progressTotal =
  document.querySelector(
    "#progress-total"
  );

const completedTotal =
  document.querySelector(
    "#completed-total"
  );

const totalCardCount =
  document.querySelector(
    "#total-card-count"
  );

const overallProgress =
  document.querySelector(
    "#overall-progress"
  );

const progressCircle =
  document.querySelector(
    "#progress-circle"
  );

const demoInput =
  document.querySelector(
    "#demo-input"
  );

const attributeValue =
  document.querySelector(
    "#attribute-value"
  );

const propertyValue =
  document.querySelector(
    "#property-value"
  );

let tasks =
  loadTasksFromStorage();

const sampleTasks = [

  {
    id: 1001,
    title:
      "Learn DOM Manipulation",
    category:
      "Study",
    status:
      "completed",
    progress:
      100,
    dueDate:
      "2026-06-20"
  },

  {
    id: 1002,
    title:
      "Build Task Manager",
    category:
      "Project",
    status:
      "in-progress",
    progress:
      50,
    dueDate:
      "2026-06-25"
  },

  {
    id: 1003,
    title:
      "Practice Event Delegation",
    category:
      "Learning",
    status:
      "todo",
    progress:
      0,
    dueDate:
      "2026-06-30"
  }

];

if (
  tasks.length === 0
) {

  tasks =
    sampleTasks;

  saveTasksToStorage(
    tasks
  );
}

function generateId() {

  return (
    Date.now() +
    Math.floor(
      Math.random() * 1000
    )
  );
}

function generateDueDate() {

  const date =
    new Date();

  date.setDate(
    date.getDate() + 7
  );

  return date
    .toISOString()
    .split("T")[0];
}

function updateAttributeDemo() {

  if (
    !demoInput ||
    !attributeValue ||
    !propertyValue
  ) {
    return;
  }

  attributeValue.textContent =

    demoInput.getAttribute(
      "value"
    );

  propertyValue.textContent =
    demoInput.value;
}

if (
  demoInput
) {

  demoInput.addEventListener(
    "input",
    updateAttributeDemo
  );
}

function getFilteredTasks() {

  const searchTerm =

    searchInput
      ?.value
      .toLowerCase()
      .trim() || "";

  const selectedCategory =

    filterCategory
      ?.value || "all";

  return tasks.filter(
    task => {

      const matchesSearch =

        task.title
          .toLowerCase()
          .includes(
            searchTerm
          );

      const matchesCategory =

        selectedCategory ===
        "all"

          ? true

          : task.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );

    }
  );
}

function toggleEmptyState() {

  if (
    !emptyState
  ) {
    return;
  }

  const filteredTasks =
    getFilteredTasks();

  if (
    filteredTasks.length === 0
  ) {

    emptyState.classList.remove(
      "hidden"
    );
  }

  else {

    emptyState.classList.add(
      "hidden"
    );
  }
}

function demonstrateDOMMethods() {

  const demoNode =
    document.createElement(
      "div"
    );

  demoNode.textContent =
    "DOM Demo";

  document.body.append(
    demoNode
  );

  const beforeNode =
    document.createElement(
      "div"
    );

  beforeNode.textContent =
    "Before";

  demoNode.before(
    beforeNode
  );

  const afterNode =
    document.createElement(
      "div"
    );

  afterNode.textContent =
    "After";

  demoNode.after(
    afterNode
  );

  const replacement =
    document.createElement(
      "div"
    );

  replacement.textContent =
    "Replacement";

  demoNode.replaceWith(
    replacement
  );

  replacement.remove();
  beforeNode.remove();
  afterNode.remove();
}

updateAttributeDemo();

demonstrateDOMMethods();

console.log(
  "Script Part 1 Loaded"
);

function createTask(
  title,
  category
) {

  const task = {

    id:
      generateId(),

    title,

    category,

    status:
      "todo",

    progress:
      0,

    dueDate:
      generateDueDate()

  };

  tasks.unshift(
    task
  );

  saveTasksToStorage(
    tasks
  );

  render();
}

if (
  taskForm
) {

  taskForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const title =
        taskTitle.value.trim();

      const category =
        taskCategory.value;

      if (
        !title ||
        !category
      ) {
        return;
      }

      createTask(
        title,
        category
      );

      taskForm.reset();
    }
  );
}

function getStatusBadge(
  status
) {

  const labels = {

    todo:
      "Todo",

    "in-progress":
      "In Progress",

    completed:
      "Completed",

    archived:
      "Archived"

  };

  return `
    <span
      class="
      status-badge
      ${status}
      "
    >
      ${labels[status]}
    </span>
  `;
}

function getProgressBar(
  progress
) {

  return `

    <div
      class="
      progress-wrapper
      "
    >

      <span>
        ${progress}%
      </span>

      <div
        class="
        progress-track
        "
      >

        <div
          class="
          progress-fill
          "
          style="
            width:
            ${progress}%
          "
        >
        </div>

      </div>

    </div>

  `;
}

function createTaskCard(
  task
) {

  const card =
    document.createElement(
      "div"
    );

  card.classList.add(
    "task-card"
  );

  card.dataset.id =
    task.id;

  card.dataset.status =
    task.status;

  card.dataset.category =
    task.category;

  const statusBadge =
    document.createElement(
      "div"
    );

  statusBadge.innerHTML =
    getStatusBadge(
      task.status
    );

  const title =
    document.createElement(
      "h4"
    );

  const textNode =
    document.createTextNode(
      task.title
    );

  title.append(
    textNode
  );

  const category =
    document.createElement(
      "p"
    );

  category.textContent =
    task.category;

  const dueDate =
    document.createElement(
      "small"
    );

  dueDate.textContent =
    `Due: ${task.dueDate}`;

  const progress =
    document.createElement(
      "div"
    );

  progress.innerHTML =
    getProgressBar(
      task.progress
    );

  const actions =
    document.createElement(
      "div"
    );

  actions.classList.add(
    "task-actions"
  );

  actions.innerHTML = `

    <button
      class="edit-btn"
    >
      Edit
    </button>

    ${
      task.status !==
      "archived"

      ? `
      <button
        class="complete-btn"
      >
        Next
      </button>
      `
      : ""
    }

    <button
      class="delete-btn"
    >
      Delete
    </button>

  `;

  card.append(
    statusBadge
  );

  card.append(
    title
  );

  card.append(
    category
  );

  card.append(
    dueDate
  );

  card.append(
    progress
  );

  card.append(
    actions
  );

  return card;
}

function renderKanban() {

  todoColumn.innerHTML =
    "";

  progressColumn.innerHTML =
    "";

  completedColumn.innerHTML =
    "";

  archivedColumn.innerHTML =
    "";

  const todoFragment =
    document.createDocumentFragment();

  const progressFragment =
    document.createDocumentFragment();

  const completedFragment =
    document.createDocumentFragment();

  const archivedFragment =
    document.createDocumentFragment();

  getFilteredTasks()
    .forEach(task => {

      const card =
        createTaskCard(
          task
        );

      if (
        task.status ===
        "todo"
      ) {

        todoFragment.append(
          card
        );
      }

      else if (
        task.status ===
        "in-progress"
      ) {

        progressFragment.append(
          card
        );
      }

      else if (
        task.status ===
        "completed"
      ) {

        completedFragment.append(
          card
        );
      }

      else {

        archivedFragment.append(
          card
        );
      }

    });

  todoColumn.append(
    todoFragment
  );

  progressColumn.append(
    progressFragment
  );

  completedColumn.append(
    completedFragment
  );

  archivedColumn.append(
    archivedFragment
  );
}

function renderListView() {

  taskTableBody.innerHTML =
    "";

  const fragment =
    document.createDocumentFragment();

  getFilteredTasks()
    .forEach(task => {

      const row =
        document.createElement(
          "tr"
        );

      row.innerHTML = `

        <td>
          ${task.title}
        </td>

        <td>
          ${task.category}
        </td>

        <td>
          ${getStatusBadge(
            task.status
          )}
        </td>

        <td>
          ${getProgressBar(
            task.progress
          )}
        </td>

        <td>
          ${task.dueDate}
        </td>
        <td>
    <div class="list-actions">

        <button
            class="action-btn edit-btn"
            data-id="${task.id}"
        >
            <i class="ri-pencil-line"></i>
            Edit
        </button>

        ${
            task.status !== "archived"
            ? `
            <button
                class="action-btn complete-btn"
                data-id="${task.id}"
            >
                <i class="ri-arrow-right-line"></i>
                Next
            </button>
            `
            : ""
        }

        <button
            class="action-btn delete-btn"
            data-id="${task.id}"
        >
            <i class="ri-delete-bin-line"></i>
            Delete
        </button>

    </div>
</td>
`
;

      fragment.append(
        row
      );

    });

  taskTableBody.append(
    fragment
  );
}


function renderProgressView() {

  progressTableBody.innerHTML =
    "";

  const fragment =
    document.createDocumentFragment();

  getFilteredTasks()
    .forEach(task => {

      const row =
        document.createElement(
          "tr"
        );

      row.innerHTML = `

        <td>
          ${task.title}
        </td>

        <td>
          ${getStatusBadge(
            task.status
          )}
        </td>

        <td>
          ${getProgressBar(
            task.progress
          )}
        </td>

        <td>
          ${task.category}
        </td>

      `;

      fragment.append(
        row
      );

    });

  progressTableBody.append(
    fragment
  );
}
function updateStatistics() {

  const total =
    tasks.length;

  const todo =
    tasks.filter(
      task =>
        task.status ===
        "todo"
    ).length;

  const inProgress =
    tasks.filter(
      task =>
        task.status ===
        "in-progress"
    ).length;

  const completed =
    tasks.filter(
      task =>
        task.status ===
        "completed"
    ).length;

  totalCount.textContent =
    total;

  pendingCount.textContent =
    todo;

  completedCount.textContent =
    completed;

  inprogressTotal.textContent =
    inProgress;

  todoTotal.textContent =
    todo;

  progressTotal.textContent =
    inProgress;

  completedTotal.textContent =
    completed;

  totalCardCount.textContent =
    total;

  const percentage =

    total === 0

      ? 0

      : Math.round(
          (
            completed /
            total
          ) * 100
        );

  overallProgress.textContent =
    `${percentage}%`;

  progressCircle.style.background = `
    conic-gradient(
      #22c55e
      ${percentage * 3.6}deg,
      var(--bg-primary)
      0deg
    )
  `;
}

function deleteTask(
  taskId
) {

  tasks =
    tasks.filter(
      task =>
        task.id !== taskId
    );

  saveTasksToStorage(
    tasks
  );

  render();
}

function editTask(
  taskId
) {

  const task =
    tasks.find(
      task =>
        task.id === taskId
    );

  if (!task) {
    return;
  }

  const updatedTitle =
    prompt(
      "Edit Task",
      task.title
    );

  if (
    !updatedTitle ||
    !updatedTitle.trim()
  ) {
    return;
  }

  task.title =
    updatedTitle.trim();

  saveTasksToStorage(
    tasks
  );

  render();
}

function moveTaskForward(
  taskId
) {

  const task =
    tasks.find(
      task =>
        task.id === taskId
    );

  if (!task) {
    return;
  }

  if (
    task.status ===
    "todo"
  ) {

    task.status =
      "in-progress";

    task.progress =
      50;
  }

  else if (
    task.status ===
    "in-progress"
  ) {

    task.status =
      "completed";

    task.progress =
      100;
  }

  else if (
    task.status ===
    "completed"
  ) {

    task.status =
      "archived";
  }

  saveTasksToStorage(
    tasks
  );

  render();
}

document.addEventListener(
  "click",
  event => {

    const taskCard =
      event.target.closest(
        ".task-card"
      );

    const taskId =
      Number(
        taskCard?.dataset.id
      );

    if (
      event.target.classList.contains(
        "delete-btn"
      )
    ) {

      const rowId =
        Number(
          event.target.dataset.id
        );

      deleteTask(
        taskId ||
        rowId
      );
    }

    if (
      event.target.classList.contains(
        "edit-btn"
      )
    ) {

      const rowId =
        Number(
          event.target.dataset.id
        );

      editTask(
        taskId ||
        rowId
      );
    }

    if (
      event.target.classList.contains(
        "complete-btn"
      )
    ) {

      const rowId =
        Number(
          event.target.dataset.id
        );

      moveTaskForward(
        taskId ||
        rowId
      );
    }

  }
);

searchInput.addEventListener(
  "input",
  render
);

filterCategory.addEventListener(
  "change",
  render
);

clearAllButton.addEventListener(
  "click",
  () => {

    const confirmed =
      confirm(
        "Delete all tasks?"
      );

    if (
      !confirmed
    ) {
      return;
    }

    tasks = [];

    saveTasksToStorage(
      tasks
    );

    render();

  }
);

const viewButtons =
  document.querySelectorAll(
    ".view-btn"
  );

const viewContainers =
  document.querySelectorAll(
    ".view-container"
  );

viewButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        const view =
          button.dataset.view;

        viewButtons.forEach(
          btn =>
            btn.classList.remove(
              "active"
            )
        );

        button.classList.add(
          "active"
        );

        viewContainers.forEach(
          container =>
            container.classList.remove(
              "active-view"
            )
        );

        document
          .querySelector(
            `#${view}-view`
          )
          .classList.add(
            "active-view"
          );

      }
    );

  }
);

function render() {

  renderKanban();

  renderListView();

  renderProgressView();

  updateStatistics();

  toggleEmptyState();
}


function initializeApp() {

  render();

  updateAttributeDemo();

  console.log(
    "DOM Explorer Loaded"
  );

  console.log(
    "Tasks:",
    tasks.length
  );
}


initializeApp();