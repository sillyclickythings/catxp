document.addEventListener("DOMContentLoaded", () => {
  const cat = document.getElementById("cat");
  const xpDisplay = document.getElementById("xp");
  const levelDisplay = document.getElementById("level");

  if (!cat || !xpDisplay || !levelDisplay) {
    console.error("Cat, XP, or level display not found");
    return;
  }

  // XP stored in memory for now (we can persist later)
  let xp = 0;

  // 1) Level from XP: every 10 XP = +1 level
  function getLevelFromXp(xp) {
    return Math.floor(xp / 10); // 0–9 => 0, 10–19 => 1, etc.
  }

  // 2) How many different evolution images you currently have
  //    Start with 0 (only cat0.jpg).
  //    When you add cat1.jpg, set this to 1.
  //    When you add cat2.jpg, set this to 2. Etc.
  const MAX_EVOLUTION_INDEX = 1;

  // 3) Use a formula to decide which evolution image to show
  //    evolutionIndex = floor(level ** 0.4), capped at MAX_EVOLUTION_INDEX
  function getEvolutionIndex(level) {
    const raw = Math.floor(Math.pow(level, 0.4));  // level ** 0.4
    return Math.min(raw, MAX_EVOLUTION_INDEX);     // don't exceed max available image
  }

  function getCatImageForLevel(level) {
    const evoIndex = getEvolutionIndex(level);
    return `assets/images/cat${evoIndex}.jpg`;
  }

  function updateDisplays() {
    const level = getLevelFromXp(xp);

    xpDisplay.textContent = "XP: " + xp;
    levelDisplay.textContent = "Level: " + level;

    // Update the cat image
    cat.src = getCatImageForLevel(level);
  }

  // Initial render
  updateDisplays();

  cat.addEventListener("click", () => {
    xp++;
    updateDisplays();
  });
});

