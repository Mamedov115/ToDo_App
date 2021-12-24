const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const remove = document.querySelector("#btnDeleteAll");
const tasklist = document.querySelector("#task-list");
const list = document.querySelector("ul");
const icon = document.querySelector("i")
let items;


loaditems();
eventListener();

function eventListener() {
    form.addEventListener("submit", add);
    tasklist.addEventListener("click", deleteItem);
    remove.addEventListener("click", deleteAll);
    list.addEventListener("keyup", replace)

};

function loaditems() {
    items = getItemsFromLS()
    items.forEach(function (item) {
        create(item);
    })
}

function getItemsFromLS() {
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
}


function create(text) {
    //create li
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));
    li.setAttribute("contenteditable", "true")

    // create a
    const a = document.createElement("a");
    a.className = "delete-item float-right"
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    // add a to li
    li.appendChild(a);

    // add li to tasklist
    tasklist.appendChild(li);
}

function setItems(text) {
    items = getItemsFromLS();
    items.push(text)
    localStorage.setItem("items", JSON.stringify(items))
}


function add(event) {

    if (input.value === '') {
        alert("Task yazın!");
        event.preventDefault();
        return;

    };

    create(input.value);
    setItems(input.value);



    // clear input
    input.value = "";

    event.preventDefault();
};

function deleteItem(event) {
    // console.log(event.target)
    if (event.target.className === "fas fa-times") {
        let a = event.target.parentElement.parentElement;
        a.remove();
        event.preventDefault();

        deleteFromLs(event.target.parentElement.parentElement.textContent)
    }

};

function deleteFromLs(text) {
    items = getItemsFromLS();
    console.log(items)
    items.forEach(function (element, index) {
        if (text == element) {
            items.splice(index, 1)
        }
    })
    localStorage.setItem("items", JSON.stringify(items))
}

function deleteAll(event) {
    if (confirm("Are you sure?")) {
        tasklist.innerHTML = ""
        localStorage.clear()

    } else {
        event.preventDefault();
    }
};


function replace(event) {
    let target = event.target.childNodes[0].textContent;
    console.log(target)
    let datalist = list.children
    items = [];
    for (let i = 0; i < datalist.length; i++) {
        data = datalist[i].textContent;
        items.push(data);
    }
    localStorage.setItem("items", JSON.stringify(items))
}

