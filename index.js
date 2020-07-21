// I can add a new task

//when click add, call this function
function onInit() {
  document.querySelector("#add").addEventListener("click", function (event) {
    event.preventDefault();
    renderTodo();
  });

  function renderTodo() {
    //save input in var
    let input = document.querySelector("input").value;

    //create a proto of the todo
    let todo = {
      id: Math.random(),
      value: input,
      isDone: false,
    };

    //create a li el
    let li = document.createElement("li");

    //set li inner text
    li.innerText = todo.value;

    //create a span
    let span = document.createElement("span");

    //append span to li
    li.append(span);

    //create a checkbox
    let checkbox = document.createElement("input");

    //set type of input
    checkbox.type = "checkbox";

    //append checkbox to li
    li.append(checkbox);

    //select ul
    let ul = document.querySelector("ul");

    //append li to ul
    ul.append(li);
  }
}

onInit();
