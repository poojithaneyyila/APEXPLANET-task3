// Timer Function
function updateTime() {
  const clock = document.getElementById("clock");
  const now = new Date();
  const time = now.toLocaleTimeString();
  clock.textContent = `Time: ${time}`;  
}
setInterval(updateTime, 1000);
updateTime();

// Joke Generator:
function getJoke() {
  const jokeP = document.getElementById("joke");
  const topic = document.getElementById("topic").value;
  jokeP.textContent = "Loading...";

  let url = "https://v2.jokeapi.dev/joke/";
  url += (topic === "Any") ? "Any" : topic;

  fetch(url + "?type=single")
    .then(response => response.json())
    .then(data => {
      if (data && data.joke) {
        jokeP.textContent = data.joke;
      } else {
        jokeP.textContent = "No joke found for this topic!";
      }
    })
    .catch(() => {
      jokeP.textContent = "Oops! Could not fetch a joke.";
    });
}