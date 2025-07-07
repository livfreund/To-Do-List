//inspo tutotial vid link: https://www.youtube.com/watch?v=b8sUhU_eq3g

//selecting elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//class names
const CHECK = "fa-check-circle"; //fa stands for font awesome which is referenced for the icons  
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//date
const options = { weekday: "long", month: "short", day: "numeric" }; //formatting the date correctly
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options); //.innerHTML allows you to get or chnage the HTML content inside an element on a webpage 

//to-do list state
//let instead of const because we plan on changing it 
//id is each object in the list's unique identifier -- like a finger print. works as a counter, each object with a dif number 
//having LIST capital signifies that this is important data -- holds entire to-do list array 
let LIST, id;

//load localStorage
let data = localStorage.getItem("TODO");
//if theres data tun it into a string (so js can work with it)
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else { 
  LIST = [];
  id = 0;
}

//load list to UI
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//clear localStorage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//add a to-do
function addToDo(toDo, id, done, trash) {
  if (trash) return;
  //? in js refers to a ternary operator. 
  //condition ? valueIfTrue : valueIfFalse
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  //need backticks for this next part bc it is html code. 
  const item = ` 
    <li class="item">
      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
      <p class="text ${LINE}">${toDo}</p>
      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
  `;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//add item with Enter key
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const toDo = input.value.trim();

    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }

    input.value = "";
  }
});

//mark complete
function completeToDo(element) {
  //lets us swicth betweeen a checked vs unchecked stlye with a click. if its not checked it will check it,
  //if it is checked, it will uncheck it if you click it - hence the toggle. 
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH); //puts the linethrough

  LIST[element.id].done = !LIST[element.id].done; //this flips the task's 'done' state in out data model 
}

//remove to-do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

//handle complete/delete clicks
list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.getAttribute("job");

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") {
    removeToDo(element);
  }

  localStorage.setItem("TODO", JSON.stringify(LIST));
});
