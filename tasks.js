// 🔌 TASK 1 - CONNECT WIRES
function task1(done) {
  const left = ["red", "green", "blue", "yellow"];
  const right = [...left].sort(() => Math.random() - 0.5);

  taskUI.innerHTML = `
    <h2>Connect Wires</h2>
    <div style="display:flex; justify-content:space-between;">
      <div>
        ${left.map(c => `<div class="wire left" data-color="${c}" style="background:${c}"></div>`).join("")}
      </div>
      <div>
        ${right.map(c => `<div class="wire right" data-color="${c}" style="background:${c}"></div>`).join("")}
      </div>
    </div>
    <canvas id="wireCanvas"></canvas>
  `;

  const canvas = document.getElementById("wireCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = taskUI.offsetWidth;
  canvas.height = taskUI.offsetHeight;

  let selected = null;
  let count = 0;

  document.querySelectorAll(".left").forEach(w => {
    w.onclick = () => selected = w;
  });

  document.querySelectorAll(".right").forEach(w => {
    w.onclick = () => {
      if (!selected) return;

      if (selected.dataset.color === w.dataset.color) {
        drawWire(selected, w, selected.dataset.color);
        count++;
        selected = null;

        if (count === 4) {
          setTimeout(done, 500);
        }
      } else {
        selected = null;
      }
    };
  });

  function drawWire(a, b, color) {
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    const rc = canvas.getBoundingClientRect();

    let x1 = ra.left - rc.left + 10;
    let y1 = ra.top - rc.top + 10;
    let x2 = rb.left - rc.left + 10;
    let y2 = rb.top - rc.top + 10;

    let p = 0;
    let anim = setInterval(() => {
      p += 0.1;

      ctx.strokeStyle = color;
      ctx.lineWidth = 5;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 + (x2 - x1)*p, y1 + (y2 - y1)*p);
      ctx.stroke();

      if (p >= 1) clearInterval(anim);
    }, 20);
  }
}


// 🧪 TASK 2 - FILL TANK
function task2(done) {
  let progress = 0;

  taskUI.innerHTML = `
    <h2>Fill Tank</h2>
    <div style="width:100%;background:#555;height:30px;">
      <div id="bar" style="height:30px;width:0%;background:lime;"></div>
    </div>
    <button id="fillBtn">Hold</button>
  `;

  document.getElementById("fillBtn").onclick = () => {
    let interval = setInterval(() => {
      progress += 5;
      document.getElementById("bar").style.width = progress + "%";

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(done, 500);
      }
    }, 100);
  };
}


// 🔢 TASK 3 - GUESS NUMBER
function task3(done) {
  let number = Math.floor(Math.random() * 10) + 1;
  let attempts = 3;

  taskUI.innerHTML = `
    <h2>Guess Number (1-10)</h2>
    <p>Attempts left: <span id="tries">${attempts}</span></p>
    <input id="guessInput" type="number">
    <button id="guessBtn">Guess</button>
    <p id="hint"></p>
  `;

  document.getElementById("guessBtn").onclick = () => {
    let val = Number(document.getElementById("guessInput").value);

    if (!val) return;

    attempts--;
    document.getElementById("tries").innerText = attempts;

    if (val === number) {
      document.getElementById("hint").innerText = "Correct!";
      setTimeout(done, 500);
    } else if (attempts === 0) {
      document.getElementById("hint").innerText = "Lost! Number was " + number;
      setTimeout(done, 1000);
    } else if (val < number) {
      document.getElementById("hint").innerText = "Too Low!";
    } else {
      document.getElementById("hint").innerText = "Too High!";
    }
  };
}


  
  



    


