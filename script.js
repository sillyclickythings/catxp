let xp = 0;

document.addEventListener("DOMContentLoaded", () => {
  const cat = document.getElementById("cat");
  const xpDisplay = document.getElementById("xp");
  const levelDisplay = document.getElementById("level");

   if (!cat || !xpDisplay || !levelDisplay) {
    console.error("Cat, XP, or level display not found");
    return;
  }

  function updateDisplays() {
    xpDisplay.textContent = "XP: " + xp;

    const level = Math.floor(xp / 10);
    levelDisplay.textContent = "Level: " + level;
  }

  updateDisplays(); // set initial text

  cat.addEventListener("click", () => {
    xp++;
    updateDisplays();
  });
});
