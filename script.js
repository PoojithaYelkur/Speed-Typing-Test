const timerEl = document.getElementById("timer");
const quoteDisplayEl = document.getElementById("quoteDisplay");
const quoteInputEl = document.getElementById("quoteInput");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const resultEl = document.getElementById("result");
const spinner = document.getElementById("spinner");

let timer = 0;
let intervalId = null;
let currentQuote = "";

function startTimer() {
  timer = 0;
  timerEl.textContent = timer;
  intervalId = setInterval(() => {
    timer++;
    timerEl.textContent = timer;
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

function fetchQuote() {
  spinner.classList.remove("d-none");
  quoteDisplayEl.textContent = "";
  resultEl.textContent = "";

  fetch("https://apis.ccbp.in/random-quote")
    .then(response => response.json())
    .then(data => {
      currentQuote = data.content;
      quoteDisplayEl.textContent = currentQuote;
      spinner.classList.add("d-none");
      startTimer();
    });
}

submitBtn.addEventListener("click", () => {
  const userText = quoteInputEl.value.trim();
  if (userText === currentQuote) {
    stopTimer();
    resultEl.textContent = `✅ Success! You typed in ${timer} seconds.`;
    resultEl.style.color = "green";
  } else {
    resultEl.textContent = "❌ Text doesn't match. Keep typing!";
    resultEl.style.color = "red";
  }
});

resetBtn.addEventListener("click", () => {
  stopTimer();
  timer = 0;
  timerEl.textContent = "0";
  quoteInputEl.value = "";
  fetchQuote();
});

window.onload = fetchQuote;
