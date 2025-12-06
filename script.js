let xp = 0;

document.addEventListener("DOMContentLoaded", () => {
  const cat = document.getElementById("cat");
  const xpDisplay = document.getElementById("xp");

  cat.addEventListener("click", () => {
    xp++;
    xpDisplay.textContent = "XP: " + xp;
  });
});
