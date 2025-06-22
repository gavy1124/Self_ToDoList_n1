/**
 * input 입력
 * +버튼 클릭   >>  할 일 추가
 * 삭제버튼 클릭    >>  할 일 삭제
 * 체크버튼 클릭    >>  할 일 밑줄
 *
 * 진행중-완료 탭 클릭  >>  할 일 정렬
 * 모두       탭 클릭   >> 할 일 모두 정렬
 */

let input = document.getElementById("input");
let addButton = document.getElementById("addButton");
let menus = document.querySelectorAll(".taskTabs div:not(#underLine)");
let list = [];
let mode = "all";
let todoList = [];
let filterList = [];
let even = '';

addButton.addEventListener("click", add);
input.addEventListener("click", function () {
    input.value = "";
});

for (let i = 0; i < menus.length; i++) {
    menus[i].addEventListener("click", function (e) {
        filter(e);
        even = e;
    });
}

function filter(e) {
    mode = e.target.id;
    filterList = [];

    if (mode == "all") {
        render();
    } else if (mode == "onGoing") {
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].isComplete == false) {
                filterList.push(todoList[i]);
            }
        }
    } else if (mode == "dones") {
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].isComplete == true) {
                filterList.push(todoList[i]);
            }
        }
    }
    render();
}



function add() {
    task = {
        id: generateID(),
        content: input.value,
        isComplete: false,
    };

    todoList.push(task);
    console.log(todoList);
    render();
}

function render() {
    if(mode == 'all'){
        list = todoList;
    }else if( mode == 'onGoing' || mode == 'dones'){
        list = filterList;
    }


    resultHTML = "";

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
                                <div class="done">${list[i].content}</div>
                                <div>
                                    <button onclick="chkButton('${list[i].id}')">Check</button>
                                    <button onclick="delButton('${list[i].id}')">Delete</button>
                                </div>
                            </div>`;
        } else {
            resultHTML += `<div class="task">
                                <div>${list[i].content}</div>
                                <div>
                                    <button onclick="chkButton('${list[i].id}')">Check</button>
                                    <button onclick="delButton('${list[i].id}')">Delete</button>
                                </div>
                            </div>`;
        }
    }

    document.getElementById("taskArea").innerHTML = resultHTML;
}

function chkButton(id) {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id == id) {
            todoList[i].isComplete = !todoList[i].isComplete;
            break;
        }
    }
    render();
}

function delButton(id) {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id == id) {
            todoList.splice(i, 1);
            break;
        }
    }
    // render();
    filter(even);
}

function generateID() {
    return Math.random().toString(36).substr(2, 16);
}

// let inputBox = document.getElementById("inputBox");
// let addButton = document.getElementById("addButton");
// let taskTabs = document.querySelectorAll(".taskTabs div:not(:first-child)");
// let taskList = [];
// let taskContent = "";
// let filterList = [];
// let mode = 'all';
// let even = '';
// addButton.addEventListener("click", addTask);
// inputBox.addEventListener("focus", function () {
//     inputBox.value = "";
// });

// for (let i = 0; i < taskTabs.length; i++) {
//     taskTabs[i].addEventListener("click", function (e) {
//         filter(e);
//         even = e;
//     });
// }

// function filter(e) {
//     mode = e.target.id;
//     filterList = [];
//     if (mode === "all") {
//         render();
//     } else if (mode === "onGoing") {
//         for (let i = 0; i < taskList.length; i++) {
//             if (taskList[i].isComplete == false) {
//                 filterList.push(taskList[i]);
//             }
//         }

//     }
//     if (mode === "done") {
//         for (let i = 0; i < taskList.length; i++) {
//             if (taskList[i].isComplete == true) {
//                 filterList.push(taskList[i]);
//             }
//         }
//     }
//     render();
// }

// function addTask() {
//     taskContent = inputBox.value;

//     let task = {
//         id: randomGenereate(),
//         taskContent: inputBox.value,
//         isComplete: false,
//     };

//     taskList.push(task);
//     render();
// }

// function render() {
//     let list = [];
//     if(mode === 'all'){
//         list = taskList;
//     }else if(mode === 'onGoing' || mode === 'done'){
//         list = filterList;
//     }

//     let resultHTML = ``;

//     for (let i = 0; i < list.length; i++) {
//         if (list[i].isComplete == true) {
//             resultHTML += `<div class="task">
//                         <div class="taskDone">${list[i].taskContent}</div>
//                         <div>
//                             <button onclick="toggleComplete('${list[i].id}')">체크</button>
//                             <button onclick="deleteTask('${list[i].id}')">삭제</button>

//                         </div>
//                     </div>`;
//         } else{
//             resultHTML += `<div class="task">
//                             <div>${list[i].taskContent}</div>
//                             <div>
//                                 <button onclick="toggleComplete('${list[i].id}')">체크</button>
//                                 <button onclick="deleteTask('${list[i].id}')">삭제</button>
//                             </div>
//                         </div>`;
//         }
//     }

//     document.getElementById("taskBoard").innerHTML = resultHTML;
// }

// function toggleComplete(id) {

//     for (let i = 0; i < taskList.length; i++) {
//         if (taskList[i].id == id) {
//             taskList[i].isComplete = !taskList[i].isComplete;
//             break;
//         }
//     }
//     render();
// }

// function deleteTask(id) {
//     console.log(id)
//     for (let i = 0; i < taskList.length; i++) {
//         if (taskList[i].id == id) {
//             taskList.splice(i, 1);
//             break;
//         }
//     }
//     // render();
//     filter(even);
// }

// function randomGenereate() {
//     return Math.random().toString(36).substr(2, 16);
// }

// let underLine = document.getElementById("underLine");
// let tabsMenus = document.querySelectorAll(".taskTabs div:not(:first-child)");

// tabsMenus.forEach(menu => menu.addEventListener("click", (e)=>indicator(e)));

// function indicator(e){
//     underLine.style.left = e.currentTarget.offsetLeft + "px";
//     underLine.style.width = e.currentTarget.offsetWidth + "px";
//     underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight+ "px";
// }
