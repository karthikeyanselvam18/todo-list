const taskInput = document.querySelector(".task-input");
const dueDateInput = document.querySelector(".dueDate-input");
const button = document.querySelector(".button");
const radio = document.querySelector(".radio-button");
const taskListContainer = document.querySelector(".task-list-container");
let items = JSON.parse(localStorage.getItem("todoList")) || [];
button.addEventListener("click", () => {
  if (taskInput.value === "" || dueDateInput.value === "") {
    console.log("nope");
  } else {
    const object = {
      task: taskInput.value,
      dueDate: dueDateInput.value,
      isDone: false,
    };
    items.push(object);
    localStorage.setItem("todoList", JSON.stringify(items));
    renderTasks();
  }
  // localStorage.removeItem("todoList");
});
function renderTasks() {
  taskListContainer.innerHTML = "";
  items.forEach((item, index) => {
    const isDone = item.isDone
      ? "radio-button-selected.png"
      : "radio-button.png";
    const isStriked = item.isDone ? "text-decoration: line-through;" : "";
    const element = document.createElement("div");
    element.classList = "task";
    element.innerHTML = `<img class="radio-button" data-index="${index}" src="${isDone}" alt="" />
    <div style="${isStriked}"><span>${item.task}</span> <span>${item.dueDate}</span></div>
    <button class="delete-button" data-index="${index}">X</button>`;
    taskListContainer.appendChild(element);
  });

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      const indexToRemove = event.target.dataset.index;
      items.splice(indexToRemove, 1);
      localStorage.setItem("todoList", JSON.stringify(items));
      renderTasks();
    });
  });

  const radioButtons = document.querySelectorAll(".radio-button");
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("click", (event) => {
      const indexToCheck = event.target.dataset.index;
      items[indexToCheck].isDone = !items[indexToCheck].isDone;
      localStorage.setItem("todoList", JSON.stringify(items));
      renderTasks();
      console.log(items);
    });
  });
}

renderTasks();
