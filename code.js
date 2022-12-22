/* Follow the instructions found in the description to complete the JavaScript functionality.*/
// localStorage.clear()
let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let userInputElement = document.getElementById("todoUserInput");
let backgroundcolors = ["#a2cffe", "#a6e7ff", "#d0fefe", "#e5edf1", "#aec9eb", "#efc5b5", "#d3b683", "#fdee73", "#aaffaa", "#95e3c0", "#aefd6c", "#64bfa4", "#ffa180", "#efc0fe", "#bf77f6"]
userInputElement.addEventListener("keydown", function(event) {
    // console.log(event.keyCode)
    // if (event.keyCode < 65 || event.keyCode > 90)
    if (event.key === "Enter") {
        onAddTodo()
    }
});

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let todoList = getTodoListFromLocalStorage();
console.log(todoList)
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    let spaceCount = 0
    let validCharactersCount = 0
    let validCharList = [" ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    console.log(userInputValue.length)
    for (let i of userInputValue) {
        // console.log(i.toLowerCase())
        if (i == " ") {
            spaceCount = spaceCount + 1
            // console.log(spaceCount)
        }
        for (let j of validCharList) {
            console.log(i)
            console.log(j)
            if (i.toLowerCase() === j) {
                validCharactersCount += 1
                break;
            }
        }
        console.log(validCharactersCount)
        console.log(userInputValue.length)
    }
    if (validCharactersCount < userInputValue.length) {
        alert("Enter Valid Text");
        return;
    }
    if (spaceCount === userInputValue.length) {
        alert("Enter Valid Text");
        return;
    }
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    if (todoList.length === 0) {
        todosCount = todosCount + 1;
    } else {
        // todosCount = 0
        for (let todo of todoList) {
            // console.log(todo.uniqueNo)
            if (todo.uniqueNo > todosCount) {
                todosCount = todo.uniqueNo + 1
            } else {
                todosCount = todosCount + 1;
            }
        }
        // todosCount = todoList[todoList.length-1].uniqueNo + 1;
    }
    let randomBackgroundColor = backgroundcolors[Math.floor(Math.random() * backgroundcolors.length)]
    console.log(randomBackgroundColor)
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        checkedStatus: false,
        color: randomBackgroundColor
    };
    todoList.unshift(newTodo);
    todoItemsContainer.textContent = ""
    for (let todo of todoList) {
        // console.log(todo)
        createAndAppendTodo(todo);
    }
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
};

function storeCheckedStatus(checkboxId, checkedstatus) {
    let todoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "checkbox" + eachTodo.uniqueNo;
        console.log(checkboxId)
        if (eachTodoId === checkboxId) {
            return true;
        } else {
            return false;
        }
    });
    todoList[todoIndex].checkedStatus = checkedstatus
    console.log(todoList[todoIndex].checkedStatus = checkedstatus)
    console.log(todoList[todoIndex])
    console.log(todoList)
    localStorage.setItem("todoList", JSON.stringify(todoList));
    // console.log(localStorage.getItem("todoList"))
}

function onTodoStatusChange(checkboxId, labelId, checkedstatus) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    if (checkedstatus === true) {
        labelElement.classList.add("checked");
    } else {
        labelElement.classList.remove("checked");
    }
    // console.log(checkboxId)
    console.log(todoList)
    console.log(checkboxId)
    console.log(checkedstatus)
    storeCheckedStatus(checkboxId, checkedstatus)
}

function onCheckedfunction(todoId) {
    let todoElement = document.getElementById(todoId);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    console.log(todoList[deleteElementIndex])
    console.log(todoList)
    if (todoList[deleteElementIndex].checkedStatus === true) {
        if (deleteElementIndex !== todoList.length - 1) {
            no_of_elements = todoList.length - 1
            let ObjectInThePosition = (todoList.splice(deleteElementIndex, 1));
            console.log(ObjectInThePosition)
            todoList.push(...ObjectInThePosition)
            // todoList.splice(no_of_elements-1, ...ObjectInThePosition)
            // storeCheckedStatus(checkboxId, checkedstatus)
            localStorage.setItem("todoList", JSON.stringify(todoList));
            todoItemsContainer.textContent = ""
            for (let todo of todoList) {
                createAndAppendTodo(todo);
            }
        }
    } else {
        if (deleteElementIndex !== 0) {
            no_of_elements = todoList.length - 1
            let ObjectInThePosition = (todoList.splice(deleteElementIndex, 1));
            console.log(ObjectInThePosition)
            todoList.unshift(...ObjectInThePosition)
            // todoList.splice(no_of_elements-1, ...ObjectInThePosition)
            // storeCheckedStatus(checkboxId, checkedstatus)
            localStorage.setItem("todoList", JSON.stringify(todoList));
            todoItemsContainer.textContent = ""
            for (let todo of todoList) {
                createAndAppendTodo(todo);
            }
        }
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    // console.log(deleteElementIndex)
    todoList.splice(deleteElementIndex, 1);
}

function onUpArrowTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    // console.log(deleteElementIndex)
    // [todoList[deleteElementIndex],todoList[deleteElementIndex-1]]=[todoList[deleteElementIndex-1],todoList[deleteElementIndex]]
    console.log(deleteElementIndex)
    console.log(todoList)
    // let ObjectBeforethePosition = todoList.splice(deleteElementIndex-1, 1);
    if (deleteElementIndex !== 0) {
        let ObjectInThePosition = (todoList.splice(deleteElementIndex, 1));
        console.log(ObjectInThePosition)
        // console.log(typeof(ObjectInThePosition))
        todoList.splice(deleteElementIndex - 1, 0, ...ObjectInThePosition)
        localStorage.setItem("todoList", JSON.stringify(todoList));
        todoItemsContainer.textContent = ""
        for (let todo of todoList) {
            createAndAppendTodo(todo);
        }
    }
}

function onDownArrowTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    // console.log(deleteElementIndex)
    // [todoList[deleteElementIndex],todoList[deleteElementIndex-1]]=[todoList[deleteElementIndex-1],todoList[deleteElementIndex]]
    console.log(deleteElementIndex)
    console.log(todoList)
    // let ObjectBeforethePosition = todoList.splice(deleteElementIndex-1, 1);
    if (deleteElementIndex !== todoList.length - 1) {
        let ObjectInThePosition = (todoList.splice(deleteElementIndex, 1));
        console.log(ObjectInThePosition)
        // console.log(typeof(ObjectInThePosition))
        todoList.splice(deleteElementIndex + 1, 0, ...ObjectInThePosition)
        localStorage.setItem("todoList", JSON.stringify(todoList));
        todoItemsContainer.textContent = ""
        for (let todo of todoList) {
            createAndAppendTodo(todo);
        }
    }
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let checkedstatus = todo.checkedStatus
    let backgroundColor = todo.color
    console.log(backgroundColor)

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;

    inputElement.addEventListener("click", function() {
        // console.log(Event.type)
        // console.log(inputElement.checked)
        if (inputElement.checked === true) {
            // console.log("SAI")
            checkedstatus = true
        } else {
            // console.log("SSS")
            checkedstatus = false
        }
        // console.log(checkedstatus)
        onTodoStatusChange(checkboxId, labelId, checkedstatus);
        onCheckedfunction(todoId)
    });
    // inputElement.onclick = function() {
    //     // console.log(inputElement.checked)
    //     if (inputElement.checked === true) {
    //         // console.log("SAI")
    //         checkedstatus = true
    //     } else {
    //         // console.log("SSS")
    //         checkedstatus = false
    //     }
    //     // console.log(checkedstatus)
    //     onTodoStatusChange(checkboxId, labelId, checkedstatus);
    //     onCheckedfunction(todoId)
    // };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    // console.log(randomBackgroundColor)
    labelContainer.style.backgroundColor = backgroundColor;
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);
    if (checkedstatus === true) {
        inputElement.checked = true
        labelElement.classList.add("checked");
    }

    let UpArrowIconContainer = document.createElement("div");
    UpArrowIconContainer.classList.add("UpArrow-icon-container");
    labelContainer.appendChild(UpArrowIconContainer);

    let UpArrowIcon = document.createElement("i");
    UpArrowIcon.classList.add("fa-solid", "fa-arrow-up", "delete-icon");

    UpArrowIconContainer.appendChild(UpArrowIcon);

    UpArrowIcon.onclick = function() {
        onUpArrowTodo(todoId);
    };

    let DownArrowIconContainer = document.createElement("div");
    DownArrowIconContainer.classList.add("DownArrow-icon-container");
    labelContainer.appendChild(DownArrowIconContainer);

    let DownArrowIcon = document.createElement("i");
    DownArrowIcon.classList.add("fa-solid", "fa-arrow-down", "delete-icon");

    DownArrowIconContainer.appendChild(DownArrowIcon);

    DownArrowIcon.onclick = function() {
        onDownArrowTodo(todoId);
    };

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    // console.log(todo)
    createAndAppendTodo(todo);
}
