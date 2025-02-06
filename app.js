// const taskInput = document.querySelector(".task-input input");
// filters = document.querySelectorAll(".filters span");
// clearAll = document.querySelectorAll(".clear-btn");
// taskbox = document.querySelector(".task-box");

// let todos = JSON.parse(localStorage.getItem("task-list")) || [];

// function showTodolist() {
//   let liTag = "";
//   if (todos) {
//     todos.forEach((todo, id) => {
//       //   console.log(todo, id);
//       liTag += `
//               <li class="task">
//                         <label for="1">
//                             <input type="checkbox" onclick='updateStatus(this)" name="" id=${id}>
//                             <p>${todo.name}</p>
//                         </label>
//                         <div class="settings">
//                             <i class="uil uil-ellipsis-h"></i>
//                             <ul class="task-menu">
//                                 <li><i class="uil uil-pen">edit</i></li>
//                                 <li><i class="uil uil-trash">delete</i></li>
//                             </ul>
//                         </div>
//                     </li>
//               `;
//     });
//   }
//   taskbox.innerHTML = liTag || `<span>You don't have any task here</span>`;
// }

// showTodolist();

// function updateStatus(selectedTask) {
//   console.log(selectedTask);
// }
// taskInput.addEventListener("keyup", (e) => {
//   let userTask = taskInput.value.trim();
//   console.log(userTask);

//   if (e.key == "Enter" && userTask) {
//     if (!todos) {
//       todos = [];
//     }
//     let taskInfo = { name: userTask, status: "pending" };
//     todos.push(taskInfo);

//     taskInput.value = "";
//     localStorage.setItem("task-list", JSON.stringify(todos));

//     showTodolist();
//   }
// });

const taskInput = document.querySelector(".task-input input");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear-btn"); // Fixed here
const taskbox = document.querySelector(".task-box");

let editid;
let isEdittable = false;

let todos = JSON.parse(localStorage.getItem("task-list")) || [];

// step-7
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodolist(btn.id);
    console.log(btn);
  });
});

// step-2
function showTodolist(filter) {
  //   console.log(filter);
  let liTag = "";
  if (todos.length > 0) {
    todos.forEach((todo, id) => {
      let isChecked = todo.status === "completed" ? "checked" : "";

      if (filter == todo.status || filter == "all") {
        console.log(todo.status);
        liTag += `
          <li class="task">
              <label for="${id}">
                  <input type="checkbox" onclick="updateStatus(this)" id="${id}" ${isChecked}>
                  <p class="${isChecked}">${todo.name}</p>
              </label>
              <div class="settings">
                  <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                  <ul class="task-menu">
                      <li onclick="editTask(${id}, '${todo.name}')" ><i class="uil uil-pen"></i> Edit</li>
                      <li onclick="deleteTask(${id},'${filter}')"><i class="uil uil-trash"></i> Delete</li>
                  </ul>
              </div>
          </li>
      `;
      }
    });
  }
  taskbox.innerHTML = liTag || `<span>You don't have any tasks here</span>`;
}

showTodolist("all");

// step-4
function showMenu(selectedTask) {
  let menudiv = selectedTask.parentElement.lastElementChild;
  menudiv.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "I" || e.target !== selectedTask) {
      menudiv.classList.remove("show");
    }
  });
}

// step-3
function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.querySelector("p");
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("task-list", JSON.stringify(todos));
}

// step - 1;
taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key === "Enter" && userTask) {
    if (!isEdittable) {
      todos.push({ name: userTask, status: "pending" });
    } else {
      todos[editid].name = userTask;
      isEdittable = false;
    }
    taskInput.value = "";
    localStorage.setItem("task-list", JSON.stringify(todos));
    showTodolist("all");
  }
});

// step-5

function deleteTask(id, filter) {
  todos.splice(id, 1);
  localStorage.setItem("task-list", JSON.stringify(todos));
  showTodolist(filter);
}

// step-6

function editTask(id, name) {
  editid = id;
  isEdittable = true;
  taskInput.value = name;
  taskInput.focus();
}

// step-7
clearAll.addEventListener("click", () => {
  todos = [];
  localStorage.removeItem("task-list");
  showTodolist();
});
