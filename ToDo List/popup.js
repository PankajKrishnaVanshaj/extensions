document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
  document.getElementById("add-task-btn").addEventListener("click", addTask);
});

function loadTasks() {
  chrome.storage.sync.get(["tasks"], function (result) {
    const tasks = result.tasks || [];

    if (!Array.isArray(tasks)) {
      chrome.storage.sync.set({ tasks: [] });
      return;
    }

    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    tasks.forEach(function (task, index) {
      const li = document.createElement("li");
      li.textContent = task;
      li.innerHTML += `
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn">Delete</button>
      `;
      list.appendChild(li);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll(".edit-btn").forEach(function (button) {
      button.addEventListener("click", function () {
        editTask(button);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(function (button) {
      button.addEventListener("click", function () {
        deleteTask(button);
      });
    });
  });
}

function addTask() {
  const input = document.getElementById("task-input");
  const task = input.value.trim();

  if (task !== "") {
    chrome.storage.sync.get(["tasks"], function (result) {
      const tasks = result.tasks || [];
      tasks.push(task);
      chrome.storage.sync.set({ tasks: tasks }, function () {
        input.value = "";
        loadTasks();
      });
    });
  }
}

function editTask(button) {
  const index = button.dataset.index;

  chrome.storage.sync.get(["tasks"], function (result) {
    const tasks = result.tasks || [];
    const editedTask = prompt("Edit Task:", tasks[index]);

    if (editedTask !== null) {
      tasks[index] = editedTask.trim();
      chrome.storage.sync.set({ tasks: tasks }, function () {
        loadTasks();
      });
    }
  });
}

function deleteTask(button) {
  const taskText = button.parentNode.firstChild.textContent.trim();

  if (taskText !== "") {
    chrome.storage.sync.get(["tasks"], function (result) {
      const tasks = result.tasks || [];
      const updatedTasks = tasks.filter((t) => t !== taskText);
      chrome.storage.sync.set({ tasks: updatedTasks }, function () {
        loadTasks();
      });
    });
  }
}
