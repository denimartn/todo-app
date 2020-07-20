// I can add a new task

//whe click add, call this function
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
    //attach the input to a li

    li.innerText = todo.value;
    //append the li to ul

    let ul = document.querySelector("ul");

    ul.append(li);
  }
}

onInit();
