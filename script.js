const taskInput = document.querySelector(".task-input");
const dueDateInput = document.querySelector(".dueDate-input");
const button = document.querySelector(".button");
const taskListContainer = document.querySelector(".task-list-container");
let items = JSON.parse(localStorage.getItem("todoList")) || [];
button.addEventListener("click", () => {
  if (taskInput.value === "" || dueDateInput.value === "") {
    console.log("nope");
  } else {
    const object = {
      task: `${taskInput.value}`,
      dueDate: `${dueDateInput.value}`,
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
    const element = document.createElement("div");
    element.classList = "task";
    element.innerHTML = `<span>${item.task}</span>
    <span>${item.dueDate} </span>
    <button class="delete-button" value="${index}">X</button>`;
    taskListContainer.appendChild(element);
  });

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      console.log(12);
      const indexToRemove = event.target.dataset.index;
      items.splice(indexToRemove, 1);
      localStorage.setItem("todoList", JSON.stringify(items));
      renderTasks();
    });
  });
}

renderTasks();
