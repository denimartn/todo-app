//arr for all
let all = [];

function onInit() {
  document.querySelector("#add").addEventListener("click", function (event) {
    event.preventDefault();
    renderTodo();
  });

  document.querySelector("#all").addEventListener("click", function () {
    makeTodo(all);
  });

  document.querySelector("#completed").addEventListener("click", function () {
    const completed = all.filter((todo) => todo.isDone);
    makeTodo(completed);
  });

  document.querySelector("#active").addEventListener("click", function () {
    const active = all.filter((todo) => !todo.isDone);
    makeTodo(active);
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

    //add click event to checkbox
    checkbox.addEventListener("click", function () {
      //change todo state
      todo.isDone = true;
    });

    //set type of input
    checkbox.type = "checkbox";

    //usa checlbox solo se todo non è done
    if (!todo.isDone) {
      //append checkbox to li
      li.append(checkbox);
    } else {
      //create a button
      let del = document.createElement("button");
      //set the inner text of del
      del.innerText = "x";
      //set del type
      del.type = "button";

      //append del to li
      li.append(del);
      //click del should remove todo from all
      del.addEventListener("click", function () {
        all = all.filter((item) => {
          item.id !== todo.id;
        });
        ul.removeChild(li);
      });
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
