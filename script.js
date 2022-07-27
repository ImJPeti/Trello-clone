let taskElements = document.querySelectorAll(".task")
let columnElements = document.querySelectorAll(".column")
let addButtonElements = document.querySelectorAll(".addBtn")

let dragElement;
let parentColumn;

addDragToTasks()

$("#closePopup").click(()=>{
    $("#popupBackground").hide()
})
$("#closePopup2").click(()=>{
    $("#popupBackground2").hide()
})
$("#saveBtn").click(()=>{

    let taskObj = {
        name: $("#taskName")[0].value,
        description: $("#taskDescription")[0].value
    }

    console.log(taskObj)

    createTask(parentColumn, taskObj)
    $("#popupBackground").hide()
})

function addDragToTasks(){
    for(let task of taskElements){
        task.addEventListener("dragstart", function(e){
            console.log("drag");
            console.log(e);
            dragElement = this;
        })
    }
}

for(let button of addButtonElements){
    button.addEventListener("click", function(e){
        

        if(e.target.className == ""){
            parentColumn = e.target.parentElement.parentElement;
        }
        else if(e.target.className == "addBtn"){
            parentColumn = e.target.parentElement;
        }
        
        showPopup()
        console.log(e);
    })
}

for(let column of columnElements){
    column.addEventListener("dragover", function(e){
        e.preventDefault()
        console.log("dragover")
        console.log(e)
    })
    column.addEventListener("drop", function(e){
        console.log("drop")
        console.log(e)
        console.log(dragElement)
        this.appendChild(dragElement)
    })
}

function createTask(parentElement, taskObj){
    $(parentElement).append(`
    <div class="task" draggable="true">
        ${taskObj.name}
    </div>`)
    console.log(parentElement)
    parentElement.lastChild.addEventListener("click",()=>{
        showPopup2(taskObj)
    })
    taskElements = document.querySelectorAll(".task")
    addDragToTasks()
}

function showPopup(){
    $("#popupBackground").show().css({
        "display":"flex"
    })
}
function showPopup2(taskObj){
    $("#popupBackground2").show().css({
        "display":"flex"
    })
    $("#showTaskName").html(`${taskObj.name}`)
    $("#showTaskDescription").html(`${taskObj.description}`)
}
function hidePopup(){
    $("#popupBackground").hide()
}
