let colors = [
  {
    start: "#2193b0",
    end: "#6dd5ed",
  },
  {
    start: "#b993d6",
    end: "#8ca6db",
  },
  {
    start: "#dd5e89",
    end: "#f7bb97",
  },
  {
    start: "#56ab2f",
    end: "#a8e063",
  },
  {
    start: "#eacda3",
    end: "#d6ae7b",
  },
  {
    start: "#faaca8",
    end: "#ddd6f3",
  },
  {
    start: "#4568dc",
    end: "#b06ab3",
  },
  {
    start: "#ed4264",
    end: "#ffedbc",
  },
];

let n;
let nam = new Array(n);
let val = new Array(n);
let ans = [];
let arr;
let amount;
let msg1;
let msg2;
let rand1 = Math.floor( Math.random() * 8);
let rand2 = Math.floor( Math.random() * 8);

let bg = document.getElementById("container");
bg.style.background = "linear-gradient(to bottom," + colors[rand1].start + ","  + colors[rand2].end + ")";

const fetchN = () => {
  n = document.getElementById("numberBox").value;
  if (n < 2 || n > 5) {
    msg1 = document.getElementById("msg1");
    msg1.style.display = "block";
    msg1.innerHTML = "Minimum 2 and Maximum 5 Person";
    setTimeout(() => {
      msg1.style.display = "none";
    }, 3000);
    document.getElementById("numberBox").value = null;
    document.getElementById("numberBox").focus();
    return;
  }

  msg1 = document.getElementById("msg1");
  msg1.style.display = "none";
  document.getElementById("que").style.display = "none";

  for (let i = 0; i < n; i++) {
    let tag = document.createElement("div");
    tag.setAttribute("id", `b${i + 1}`);
    tag.setAttribute("class", `b${i + 1}`);

    let input1 = document.createElement("input");
    input1.setAttribute("id", `nameBox${i + 1}`);
    input1.setAttribute("class", "nameBox");
    input1.setAttribute("type", "text");
    input1.setAttribute("placeholder", "Name");

    let input2 = document.createElement("input");
    input2.setAttribute("id", `nBox${i + 1}`);
    input2.setAttribute("class", "nBox");
    input2.setAttribute("type", "number");
    input2.setAttribute("placeholder", "Money");

    tag.appendChild(input1);
    tag.appendChild(input2);

    let element = document.getElementById("fillarea");
    element.appendChild(tag);
  }
  document.getElementById("box2").style.display = "flex";
  for (let i = 0; i < n; i++) {
    document.getElementById(`nameBox${i + 1}`).style.display = "inline";
    document.getElementById(`nBox${i + 1}`).style.display = "inline";
  }
};

const addEdge = (u, v, m) => {
  arr[u][v] = m;
};

let minIdx = () => {
  let minId = 0;
  for (let i = 1; i < n; i++)
    if (amount[i] < amount[minId]) {
      minId = i;
    }
  return minId;
};

let maxIdx = () => {
  let maxId = 0;
  for (let i = 1; i < n; i++)
    if (amount[i] > amount[maxId]) {
      maxId = i;
    }
  return maxId;
};

let min = (a, b) => {
  return a < b ? a : b;
};

let util = () => {
  let maxCred = maxIdx();
  let minDept = minIdx();

  if (amount[maxCred] == 0 && amount[minDept] == 0) {
    return;
  }
  console.log("Util");
  let x = min(-amount[minDept], amount[maxCred]);
  amount[maxCred] -= x;
  amount[minDept] += x;
  ans.push(`${nam[maxCred]} pays ${x} Rs to ${nam[minDept]}`);
  util();
};

let minimizeCashFlow = () => {
  for (let i = 0; i < n; i++) {
    amount[i] = 0;
    for (let j = 0; j < n; j++) {
      amount[i] += arr[i][j] - arr[j][i];
    }
  }

  util();
  document.getElementById("ans").style.display = "block";
  let p = document.getElementById("ans");
  let last = "";
  ans.map((line) => {
    last += `<h3>${line}</h3>`;
  });
  p.innerHTML = last;
};

const calData = () => {
  for (let i = 0; i < n; i++) {
    nam[i] = document.getElementById(`nameBox${i + 1}`).value;
    val[i] = document.getElementById(`nBox${i + 1}`).value;
    if(nam[i]==="" || val[i]==="") {
        msg2 = document.getElementById("msg2");
        msg2.style.display = "block";
        msg2.innerHTML = "Enter Appropriate Details";
        setTimeout(() => {
          msg2.style.display = "none";
        }, 3000);
        return;
    }
  }
  document.getElementById("box2").style.display = "none";
  arr = new Array(n);
  amount = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(n);
  }

  for (let i = 0; i < n; i++) {
    let temp = Math.floor(val[i] / n);
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        addEdge(j, i, temp);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    arr[i][i] = 0;
  }

  minimizeCashFlow();
};
