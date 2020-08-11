let all = [];
let currentView = "all";
function onInit() {
  getTodos();
  renderTodo(all);

  document.querySelector(".delete-all").style.display = "none";
  document.querySelector("#add").addEventListener("click", function (event) {
    event.preventDefault();
    makeTodo();

    if (currentView === "active") {
      let active = all.filter((todo) => !todo.isDone);
      renderTodo(active);
    }

    document.querySelector("input").value = "";
  });

  document.querySelector("#all").addEventListener("click", function () {
    currentView = "all";
    document.querySelector("#all").classList.add("active");
    document.querySelector("#active").classList.remove("active");
    document.querySelector("#completed").classList.remove("active");
    renderTodo(all);
    document.querySelector(".input-wrapper").style.display = "block";
    document.querySelector(".delete-all").style.display = "none";
  });

  document.querySelector("#completed").addEventListener("click", function () {
    currentView = "completed";
    document.querySelector("#all").classList.remove("active");
    document.querySelector("#active").classList.remove("active");
    document.querySelector("#completed").classList.add("active");
    let completed = all.filter((todo) => todo.isDone);
    renderTodo(completed);
    document.querySelector(".input-wrapper").style.display = "none";
    document.querySelector(".delete-all").style.display = "block";
  });

  document.querySelector("#active").addEventListener("click", function () {
    currentView = "active";
    document.querySelector("#all").classList.remove("active");
    document.querySelector("#active").classList.add("active");
    document.querySelector("#completed").classList.remove("active");
    let active = all.filter((todo) => !todo.isDone);
    renderTodo(active);
    document.querySelector(".input-wrapper").style.display = "block";
    document.querySelector(".delete-all").style.display = "none";
  });
}

function renderTodo(arr) {
  let ul = document.querySelector("ul");

  ul.innerText = "";

  for (let todo of arr) {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerText = todo.value;
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.append(checkbox);
    li.append(span);
    checkbox.addEventListener("click", function () {
      todo.isDone = true;
      checkbox.disabled = true;
    });

    if (todo.isDone) {
      checkbox.disabled = true;
      checkbox.checked = true;
    }

    ul.append(li);

    if (currentView === "completed") {
      const span = document.createElement("span");
      span.classList.add("delete-span");
      const deleteOne = document.createElement("button");
      deleteOne.type = "button";
      deleteOne.innerText = "X";
      span.append(deleteOne);
      deleteOne.classList.add("delete-one");
      li.append(span);
      deleteOne.addEventListener("click", function () {
        all = all.filter((item) => {
          return item.id !== todo.id;
        });
        ul.removeChild(li);
      });
    }

    document
      .querySelector(".delete-all")
      .addEventListener("click", function () {
        completed = all.filter((item) => {
          return item.isDone;
        });
        completed = [];
        all = all.filter((item) => !item.isDone);
        ul.innerText = "";
      });
  }
}

function makeTodo() {
  let input = document.querySelector("input").value;

  if (input.length === 0) {
    return;
  }

  let todo = {
    id: Math.random(),
    value: input,
    isDone: false,
  };

  all.push(todo);

  renderTodo(all);
}

function saveTodos() {
  let str = JSON.stringify(all);
  localStorage.setItem("todos", str);
}

function getTodos() {
  let str = localStorage.getItem("todos");
  all = JSON.parse(str);
  if (!all) {
    all = [];
  }
}

onInit();
window.addEventListener("beforeunload", function () {
  saveTodos();
});
