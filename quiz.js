const quizData = {
  science: [
    { question: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "Chemical symbol for water?", options: ["H2O", "O2", "NaCl", "CO2"], answer: "H2O" },
    { question: "Bones in human body?", options: ["206", "208", "201", "198"], answer: "206" },
    { question: "Gas absorbed by plants?", options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], answer: "Carbon Dioxide" },
    { question: "DNA is found in?", options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"], answer: "Nucleus" }
  ],
  movies: [
    { question: "Who directed 'Avatar'?", options: ["Spielberg", "Cameron", "Nolan", "Jackson"], answer: "Cameron" },
    { question: "Best Picture 2020 Oscars?", options: ["Joker", "1917", "Parasite", "Hollywood"], answer: "Parasite" },
    { question: "Actor who played Iron Man?", options: ["Evans", "Holland", "Downey Jr.", "Hemsworth"], answer: "Downey Jr." },
    { question: "Highest grossing movie (2024)?", options: ["Endgame", "Titanic", "Avatar", "Lion King"], answer: "Avatar" },
    { question: "Harry Potter’s owl?", options: ["Hedwig", "Errol", "Pigwidgeon", "Crookshanks"], answer: "Hedwig" }
  ],
  nature: [
    { question: "Tallest type of grass?", options: ["Bamboo", "Wheat", "Sugarcane", "Corn"], answer: "Bamboo" },
    { question: "Largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { question: "King of jungle?", options: ["Elephant", "Tiger", "Lion", "Cheetah"], answer: "Lion" },
    { question: "Tree with acorns?", options: ["Oak", "Maple", "Pine", "Birch"], answer: "Oak" },
    { question: "Fastest bird?", options: ["Falcon", "Eagle", "Sparrow", "Owl"], answer: "Falcon" }
  ]
};

let currentQuiz = [], currentIndex = 0, score = 0, timer, timeLeft = 10;

const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const scoreDisplay = document.getElementById("scoreDisplay");
const timerDisplay = document.getElementById("timer");

function startQuiz() {
  const topic = document.getElementById("topic").value;
  currentQuiz = [...quizData[topic]];
  currentIndex = 0;
  score = 0;
  document.querySelector(".topic-select").style.display = "none";
  quizBox.style.display = "block";
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();
  const current = currentQuiz[currentIndex];
  questionText.textContent = current.question;
  current.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => selectAnswer(li, current.answer);
    answerList.appendChild(li);
  });
}

function selectAnswer(selected, correct) {
  [...answerList.children].forEach(li => li.classList.remove("selected"));
  selected.classList.add("selected");
  if (selected.textContent === correct) {
    score++;
  }
}

function nextQuestion() {
  clearInterval(timer);
  currentIndex++;
  if (currentIndex < currentQuiz.length) {
    timeLeft = 10;
    showQuestion();
    startTimer();
  } else {
    endQuiz();
  }
}

function resetState() {
  answerList.innerHTML = "";
}

function endQuiz() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";
  scoreDisplay.textContent = `Your Score: ${score} / ${currentQuiz.length}`;
}

function startTimer() {
  timerDisplay.textContent = `Time: ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

document.getElementById("themeSwitch").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});