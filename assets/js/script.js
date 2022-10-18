const todoForm = document.todoForm;
const todoInput = todoForm.todoInput;
const todoAdd = document.querySelector("input[type='submit']");
const todoLists = document.querySelector(".todo__lists");

const checkLocal = JSON.parse(localStorage.getItem("todo"));
let todoArr = (checkLocal != null) ? checkLocal : [];

// deleteTodo()
const deleteTodo = () => {
  const deleteBtn = document.querySelectorAll(".todo__lists--delete");

  deleteBtn.forEach((del) => {
    del.addEventListener("click", () => {
      const dataIndex = del.dataset.idx;

      todoArr.splice(dataIndex, 1);
      localStorage.setItem("todo", JSON.stringify(todoArr));

      showTodo();
    });
  });
};

// showTodo()
const showTodo = () => {
  const getLocalTodo = JSON.parse(localStorage.getItem("todo"));

  if (getLocalTodo != null) {
    let li = "";

    getLocalTodo.forEach((value, idx) => {
      li += `
          <li class="todo__lists--item">
            <span class="todo__lists--text">${value}</span>
            <span class="todo__lists--delete" data-idx="${idx}">delete</span>
          </li>
        `;
    });
    todoLists.innerHTML = li;

    if (todoLists.children.length != 0) deleteTodo();
  }
};

// initial call -- showTodo()
showTodo();

// form Event -- Add todo list
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value.trim();

  if (inputValue != "") {
    todoArr.push(inputValue);
    localStorage.setItem("todo", JSON.stringify(todoArr));

    todoInput.value = "";
    todoAdd.classList.remove("active");

    showTodo();
  }
});

// input event -- if input is empty, than "Add button" will not work
todoInput.addEventListener("keyup", () => {
  if (todoInput.value.trim() != "") {
    todoAdd.classList.add("active");
  } else {
    todoAdd.classList.remove("active");
  }
});