async function getScore(user) {
  const response = await fetch(`/score/${user}`);
  const data = await response.json();
  document.getElementById("score").innerText = `${data.user}: ${data.score}`;
}
