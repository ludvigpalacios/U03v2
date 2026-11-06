const saved = localStorage.getItem("lastResults");
console.log(saved);
const results = saved ? JSON.parse(saved) : null;

if (results) {
    document.querySelector("#answered").textContent = results.answered;
    document.querySelector("#correct").textContent = results.correct;
    document.querySelector("#incorrect").textContent = results.incorrect;
    document.querySelector("#points").textContent = results.points;
} else {
    document.querySelector(".results h1").textContent = "No results yet";
}