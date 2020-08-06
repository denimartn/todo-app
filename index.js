//arr for all
let all = [];
let currentView = "all";
function onInit() {
  document.querySelector("#add").addEventListener("click", function (event) {
    event.preventDefault();
    renderTodo();

    if (currentView === "active") {
      const active = all.filter((todo) => !todo.isDone);
      makeTodo(active);
    }

    document.querySelector("input").value = "";
  });

  document.querySelector("#all").addEventListener("click", function () {
    currentView = "all";
    makeTodo(all);
    document.querySelector(".input-wrapper").style.display = "block";
  });

  document.querySelector("#completed").addEventListener("click", function () {
    currentView = "completed";
    const completed = all.filter((todo) => todo.isDone);
    makeTodo(completed);
    document.querySelector(".input-wrapper").style.display = "none";
  });

  document.querySelector("#active").addEventListener("click", function () {
    currentView = "active";
    const active = all.filter((todo) => !todo.isDone);
    makeTodo(active);
    document.querySelector(".input-wrapper").style.display = "block";
  });
}

function makeTodo(arr) {
  let ul = document.querySelector("ul");

  ul.innerText = "";

  for (let todo of arr) {
    //create a li el
    let li = document.createElement("li");
    //set li inner text
    li.innerText = todo.value;

    //create span
    let span = document.createElement("span");

    //append span to li
    li.append(span);

    //create a checkbox
    let checkbox = document.createElement("input");
    //set type of input
    checkbox.type = "checkbox";
    // append it to item
    li.append(checkbox);

    //add click event to checkbox
    checkbox.addEventListener("click", function () {
      //change todo state
      todo.isDone = true;
      li.classList.add("line");
      checkbox.disabled = true;
    });

    if (todo.isDone) {
      li.classList.add("line");
      checkbox.disabled = true;
      checkbox.checked = true;
    }

    //append li to ul
    ul.append(li);
  }
}

function renderTodo() {
  //save input in var
  let input = document.querySelector("input").value;

  if (input.length === 0) {
    return;
  }

  //create a proto of the todo
  let todo = {
    id: Math.random(),
    value: input,
    isDone: false,
  };

  //push todo in all
  all.push(todo);

  //call makeTodo fn
  makeTodo(all);
}

onInit();
