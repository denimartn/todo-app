let all = [];
let currentView = "all";
let deleteAllbutton = document.querySelector(".delete-all");
let allButton = document.querySelector("#all");
let activeButton = document.querySelector("#active");
let completedButton = document.querySelector("#completed");
let inputWrapper = document.querySelector(".input-wrapper");

function onInit() {
  getTodosFromLocalstorage();
  // render saved todos after initialization
  renderTodos(all);

  // hide delete all button
  deleteAllbutton.classList.add("hide");
  // add click event on add button
  document.querySelector("#add").addEventListener("click", function (event) {
    event.preventDefault();
    // create a new todo after every submit
    makeTodo();
    //change rendering
    if (currentView === "active") {
      let active = all.filter((todo) => !todo.isDone);
      renderTodos(active);
    }
    //reset input
    document.querySelector("input").value = "";
  });

  allButton.addEventListener("click", function () {
    //update the current view
    currentView = "all";
    //dynamically change style after clicking on buttons
    allButton.classList.add("active");
    activeButton.classList.remove("active");
    completedButton.classList.remove("active");
    //render all todos
    renderTodos(all);
    //show input button
    inputWrapper.classList.add("show");
    //hide delete-all button
    deleteAllbutton.classList.add("hide");
  });

  document.querySelector("#completed").addEventListener("click", function () {
    //update the current view
    currentView = "completed";
    //dynamically change style after clicking on buttons
    allButton.classList.remove("active");
    activeButton.classList.remove("active");
    completedButton.classList.add("active");
    //get completed todos
    let completed = all.filter((todo) => todo.isDone);
    //render completed todos
    renderTodos(completed);
    //show input button
    inputWrapper.classList.add("hide");
    //hide delete-all button
    deleteAllbutton.classList.add("show");
  });

  activeButton.addEventListener("click", function () {
    //update the current view
    currentView = "active";
    //dynamically change css after clicking on buttons
    allButton.classList.remove("active");
    activeButton.classList.add("active");
    completedButton.classList.remove("active");
    //get active todos
    let active = all.filter((todo) => !todo.isDone);
    //render active todos
    renderTodos(active);
    //show input button
    inputWrapper.classList.add("show");
    //hide delete-all button
    deleteAllbutton.classList.add("hide");
  });
}

function renderTodos(arr) {
  //select the list
  let list = document.querySelector("ul");

  list.innerText = "";

  for (let todo of arr) {
    let item = document.createElement("li");
    let span = document.createElement("span");
    span.innerText = todo.value;
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    item.append(checkbox);
    item.append(span);
    //after click disable checkbox and update todo as done
    checkbox.addEventListener("click", function () {
      todo.isDone = true;
      checkbox.disabled = true;
    });

    if (todo.isDone) {
      checkbox.disabled = true;
      checkbox.checked = true;
    }
    //appen todo to list
    list.append(item);
    //check if the current view is completed
    if (currentView === "completed") {
      const span = document.createElement("span");
      span.classList.add("delete-span");
      //create a button to delete one todo
      const deleteOne = document.createElement("button");
      deleteOne.type = "button";
      deleteOne.innerText = "X";
      span.append(deleteOne);
      deleteOne.classList.add("delete-one");
      item.append(span);
      //get not deleted todos
      deleteOne.addEventListener("click", function () {
        all = all.filter((item) => {
          return item.id !== todo.id;
        });
        list.removeChild(item);
      });
    }

    deleteAllbutton
      //get completed todos
      .addEventListener("click", function () {
        completed = all.filter((item) => {
          return item.isDone;
        });
        //clear the completed list
        completed = [];
        //update all array
        all = all.filter((item) => !item.isDone);

        list.innerText = "";
      });
  }
}

function makeTodo() {
  //get input value
  let input = document.querySelector("input").value;

  //check if input is empty
  if (input.length === 0) {
    return;
  }
  //create a proto of the todo
  let todo = {
    id: Math.random(),
    value: input,
    isDone: false,
  };

  all.push(todo);

  renderTodos(all);
}

function saveTodosOnLocalstorage() {
  let str = JSON.stringify(all);
  localStorage.setItem("todos", str);
}

function getTodosFromLocalstorage() {
  let str = localStorage.getItem("todos");
  all = JSON.parse(str);
  if (!all) {
    all = [];
  }
}

onInit();

window.addEventListener("beforeunload", function () {
  saveTodosOnLocalstorage();
});
