let root = document.getElementById("root");
let header = document.getElementById("header");
let section = document.createElement("section");
section.classList.add("todo-app__main");
root.appendChild(header);
root.appendChild(section);

let inputbox = document.createElement("input");
inputbox.classList.add("todo-app__input");
inputbox.placeholder = "add your todos";
section.appendChild(inputbox);

let todolists = document.createElement("ul");
todolists.classList.add("todo-app__list");
todolists.id = "todo-list";
section.appendChild(todolists);

let footer = document.createElement("footer");
footer.classList.add("todo-app__footer");
footer.id = "todo-footer";
footer.style = "visibility: hidden";
root.appendChild(footer);

let total = document.createElement("div");
total.classList.add("todo-app__total");
total.innerHTML = "0 left";
footer.appendChild(total);

let view_buttons = document.createElement("ul");
view_buttons.classList.add("todo-app__view-buttons");
footer.appendChild(view_buttons);

let view_buttons_button1 = document.createElement("button");
view_buttons_button1.innerHTML = "All";
view_buttons.appendChild(view_buttons_button1);

let view_buttons_button2 = document.createElement("button");
view_buttons_button2.innerHTML = "Active";
view_buttons.appendChild(view_buttons_button2);

let view_buttons_button3 = document.createElement("button");
view_buttons_button3.innerHTML = "Completed";
view_buttons.appendChild(view_buttons_button3);

let clear = document.createElement("div");
clear.classList.add("todo-app__clean");
footer.appendChild(clear);

let clear_button = document.createElement("button");
clear_button.innerHTML = "Clear completed";
clear.style = "visibility: hidden";
clear.appendChild(clear_button);

var num = 0;
var counter = 0;
let uncompleted = [];
let completed = [];

inputbox.addEventListener('keypress', function(e){
  if(e.key === "Enter" && inputbox.value !== "")
  {
    uncompleted.push(inputbox.value);

    footer.style = "visibility: none";
    let todo = document.createElement("li");
    todo.classList.add("todo-app__item");

    let checkbox = document.createElement("div");
    checkbox.classList.add("todo-app__checkbox");

    let unknown = document.createElement("input");
    unknown.type = "checkbox";
    unknown.id = num;

    let unknown_label = document.createElement("label");
    unknown_label.htmlFor = num;

    checkbox.appendChild(unknown);
    checkbox.appendChild(unknown_label);

    todo.appendChild(checkbox);
    let detail = document.createElement("h1");
    detail.classList.add("todo-app__item-detail");
    todo.appendChild(detail);

    unknown_label.onclick = function(){
    if(this.previousElementSibling.checked !== true){
        this.parentElement.nextElementSibling.style = "text-decoration: line-through; opacity: 0.5;";
        clear.style = "visibility: none";
        counter--;
        total.innerHTML = counter + " left";
        let val = detail.innerHTML;
        let index = uncompleted.indexOf(val);
        uncompleted.splice(index, 1);
        completed.push(val);
      }
      else{
        this.parentElement.nextElementSibling.style = "text-decoration: none; opacity: 1;";
        counter++;
        total.innerHTML = counter + " left";
        let val2 = detail.innerHTML;
        let index2 = completed.indexOf(val2);
        completed.splice(index2, 1);
        uncompleted.push(val2);
        console.log(completed);

        if(completed.length === 0)
        {
          clear.style = "visibility: hidden";
        }
        else
        {
          clear.style = "visibility: none";
        }
      }
    }

    let image = document.createElement("img");
    image.src = "img/x.png";
    image.classList.add("todo-app__item-x");

    image.onclick = function(){
      this.parentElement.remove();
      counter--;
      total.innerHTML = counter + " left";
      if(counter === 0)
      {
        footer.style = "visibility: hidden";
      }
    }

    todo.appendChild(image);

    let text = inputbox.value;
    //console.log(text);
    detail.innerHTML = text;

    todolists.appendChild(todo);

    inputbox.value = "";

    counter++;

    total.innerHTML = counter + " left";
  }
  num++;
})

clear.onclick = function(){
  if(todolists.hasChildNodes())
  {
    var children = todolists.childNodes;
    const children_len = children.length;
    let hasToRemove = [];
    for(var i = 0; i < children_len; i++)
    {
      let check = children[i].childNodes[0].childNodes[0];
      if(check.checked === true)
      {
        hasToRemove.push(children[i]);
      }
    }

    for(var i = 0; i < hasToRemove.length; i++)
    {
      hasToRemove[i].remove();
    }
  }

  if(!todolists.hasChildNodes())
  {
    footer.style = "visibility: hidden";
  }
}

//All
view_buttons_button1.onclick = function(){
  var children = todolists.childNodes;
  const children_len = children.length;
  for(var i = 0; i < children_len; i++)
  {
    children[i].style.display = "";
  }
}

//Active
view_buttons_button2.onclick = function(){
  var children = todolists.childNodes;
  const children_len = children.length;
  for(var i = 0; i < children_len; i++)
  {
    let check = children[i].childNodes[0].childNodes[0];
    if(check.checked === true)
    {
      children[i].style.display = "none";
    }
    else
    {
      children[i].style.display = "";
    }
  }
}

//completed
view_buttons_button3.onclick = function(){
  var children = todolists.childNodes;
  const children_len = children.length;
  for(var i = 0; i < children_len; i++)
  {
    let check = children[i].childNodes[0].childNodes[0];
    if(check.checked === true)
    {
      children[i].style.display = "";
    }
    else
    {
      children[i].style.display = "none";
    }
  }
}