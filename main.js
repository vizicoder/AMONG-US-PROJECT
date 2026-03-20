const player = document.getElementById("player");
const startBtn = document.getElementById("startBtn");
const taskUI = document.getElementById("taskUI");

let tasks = [task1, task2, task3];
let currentTask = 0;

startBtn.onclick = () => {
  startBtn.style.display = "none";
  moveToTask();
};

function moveToTask() {
  player.classList.add("walk");

  // random position (feels like different tasks)
  let x = Math.random() * 400 + 100;
  let y = Math.random() * 200 + 100;

  player.style.left = x + "px";
  player.style.top = y + "px";

  setTimeout(() => {
    player.classList.remove("walk");
    showTask();
  }, 2000);
}

function showTask() {
  taskUI.classList.remove("hidden");
  taskUI.innerHTML = "";

  if (!tasks[currentTask]) {
    alert("All Tasks Completed!");
    return;
  }

  tasks[currentTask](taskCompleted);
}

function taskCompleted() {
  taskUI.classList.add("hidden");
  currentTask++;

  setTimeout(moveToTask, 1000);
}