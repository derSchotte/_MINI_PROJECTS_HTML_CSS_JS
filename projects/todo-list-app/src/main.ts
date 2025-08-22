import './style.css'
import plus from '/assets/plus-solid-full.svg';
import trash from '/assets/trash-solid-full.svg';
import pen from '/assets/pen-solid-full.svg';

const listItem = "flex justify-between items-center px-6 py-2";
const iconSize = "w-[20px] h-[20px] ml-2";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="flex justify-center items-center h-screen">
    <div class="card w-6/12 bg-teal-50 rounded-2xl shadow-lg shadow-slate-900">
        <h1 class="text-2xl font-bold text-center p-6">Todo List</h1>
        <div class="flex justify-between items-center px-6 py-2 bg-teal-500/25 shadow-md shadow-teal-900/25">
          <input id="todo-input" class="outline-none border-0 h-[32px] flex-1 mr-4 text-xl text-slate-700" type="text" placeholder="Add a todo..."/>
          <button id="add-button" class="flex justify-center items-center w-[42px] h-[42px] rounded-[8px] bg-sky-400">
          <img class="w-[32px] h-[32px] cursor-pointer" src="${plus}" alt="add" />
          </button>
        </div>
        <ul id="todo-list" class="mt-3">
          
        </ul>
        <div class="flex justify-center items-center p-2 mt-3">
          <button id="clear-button" class="clear-button px-6 py-1 rounded-2xl border border-slate-500/75 bg-slate-500/25 hover:bg-slate-500/50">Clear All</button>
        </div>
    </div>
  </div>
`

const todoInput = document.querySelector<HTMLInputElement>("#todo-input")!;
const addButton = document.querySelector<HTMLButtonElement>("#add-button")!;
const todoList = document.querySelector<HTMLUListElement>("#todo-list")!;
const deleteButton = document.querySelector<HTMLButtonElement>("#delete-button")!;
const editButton = document.querySelector<HTMLButtonElement>("#edit-button")!;
const clearButton = document.querySelector<HTMLButtonElement>("#clear-button")!;

addButton.addEventListener("click", () => {
    const todo = todoInput.value.trim();
    if(!todo) return;

    // save to localStorage as object { text, done }
    const todos = localStorage.getItem("todos") || "[]";
    const todosArray = JSON.parse(todos);
    todosArray.push({ text: todo, done: false });
    localStorage.setItem("todos", JSON.stringify(todosArray));

    // reset input and re-render list to keep indices consistent
    todoInput.value = "";
    todoList.innerHTML = "";
    loadLocalStorage();
});

function loadLocalStorage() {
  const todos = localStorage.getItem("todos") || "[]";
  let todosArray = JSON.parse(todos);
  // migrate: if entries are strings, convert to objects
  if (Array.isArray(todosArray) && todosArray.some((t) => typeof t === "string")) {
    todosArray = todosArray.map((t: any) => typeof t === "string" ? { text: t, done: false } : t);
    localStorage.setItem("todos", JSON.stringify(todosArray));
  }
  // clear current list before rendering (defensive)
  todoList.innerHTML = "";
  (todosArray as Array<{ text: string; done: boolean }>).forEach((item, index: number) => {
    const div = document.createElement("div");
    div.className = listItem;
    const li = document.createElement("li");
    li.className = "cursor-pointer";
    li.textContent = item.text;
    if (item.done) li.classList.add("strike");
    div.appendChild(li);

    // click text to toggle done state (persisted)
    li.addEventListener("click", () => toggleTodoDone(index));
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "flex justify-between items-center";
    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", () => deleteTodoItem(index));
    deleteButton.id = "delete-button";
    deleteButton.innerHTML = `<img id=\"delete-icon\" class=\"${iconSize} cursor-pointer\" src=\"${trash}\" alt=\"delete\" />`;
    const editButton = document.createElement("button");
    editButton.addEventListener("click", () => editTodoItem(index));
    editButton.id = "edit-button";
    editButton.innerHTML = `<img id=\"edit-icon\" class=\"${iconSize} cursor-pointer\" src=\"${pen}\" alt=\"edit\" />`;
    buttonDiv.appendChild(deleteButton);
    buttonDiv.appendChild(editButton);
    div.appendChild(buttonDiv);
    todoList.appendChild(div);
  });
}

loadLocalStorage();

// delete this todo item (by index) and reload list
function deleteTodoItem(index: number) {
  const todos = localStorage.getItem("todos") || "[]";
  const todosArray = JSON.parse(todos);
  if (index >= 0 && index < todosArray.length) {
    todosArray.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todosArray));
    // Re-render to update indices and UI
    todoList.innerHTML = "";
    loadLocalStorage();
  }
}

// edit todo item in an popup window (by index)
function editTodoItem(index: number) {
  const todos = localStorage.getItem("todos") || "[]";
  let todosArray: Array<{ text: string; done: boolean }> = JSON.parse(todos);
  if (!todosArray[index]) return;
  const updated = window.prompt("Edit your todo:", String(todosArray[index].text));
  if (updated === null) return; // cancelled
  const newValue = updated.trim();
  if (!newValue) return; // ignore empty

  todosArray[index].text = newValue;
  localStorage.setItem("todos", JSON.stringify(todosArray));
  // Re-render the list to reflect the change
  todoList.innerHTML = "";
  loadLocalStorage();
}

function toggleTodoDone(index: number) {
  const todos = localStorage.getItem("todos") || "[]";
  const todosArray: Array<{ text: string; done: boolean }> = JSON.parse(todos);
  if (index < 0 || index >= todosArray.length) return;
  todosArray[index].done = !todosArray[index].done;
  localStorage.setItem("todos", JSON.stringify(todosArray));
  // Re-render to reflect new done state
  todoList.innerHTML = "";
  loadLocalStorage();
}
  