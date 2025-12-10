document.addEventListener("DOMContentLoaded", () => {
  const cat = document.getElementById("cat");
  const wrapper = document.querySelector(".cat-wrapper");
  const xpDisplay = document.getElementById("xp");
  const levelDisplay = document.getElementById("level");

  if (!cat || !xpDisplay || !levelDisplay) {
    console.error("Cat, XP, or level display not found");
    return;
  }

  // XP stored in memory for now (we can persist later)
  let xp = 0;

  function getLevelFromXp(xp) {
    let level = 0;
    let xpForNextLevel = 10; // cost for level 1

    while (xp >= xpForNextLevel) {
      xp -= xpForNextLevel;      // pay the XP cost
      level++;                   // go up a level
      xpForNextLevel += 10;       // each next level costs 10 more XP
    }
  return level;
}

  function getXpToNextLevel(xp) {
    let level = 0;
    let xpForNextLevel = 10;
    let originalXp = xp;
  
    while (xp >= xpForNextLevel) {
      xp -= xpForNextLevel;
      level++;
      xpForNextLevel += 10; // your current increment amount
    }

  // xp is now: the XP already spent on this level
  // xpForNextLevel is how much is required for the NEXT level
  return xpForNextLevel - xp; 
}


  // 2) How many different evolution images you currently have
  //    Start with 0 (only cat0.jpg).
  //    When you add cat1.png, set this to 1.
  //    When you add cat2.png, set this to 2. Etc.
  const MAX_EVOLUTION_INDEX = 1;

  // 3) Use a formula to decide which evolution image to show
  //    evolutionIndex = floor(level ** 0.4), capped at MAX_EVOLUTION_INDEX
  function getEvolutionIndex(level) {
    const raw = Math.floor(Math.pow(level, 0.4));  // level ** 0.4
    return Math.min(raw, MAX_EVOLUTION_INDEX);     // don't exceed max available image
  }

  function getCatImageForLevel(level) {
    const evoIndex = getEvolutionIndex(level);
    return `assets/images/cat${evoIndex}.png`;
  }

  function updateDisplays() {
    const level = getLevelFromXp(xp);
    const xpToNext = getXpToNextLevel(xp);
    const nextLevelDisplay = document.getElementById("nextLevel");
    const progressBar = document.getElementById("xpProgress");

    if (nextLevelDisplay) {
      nextLevelDisplay.textContent = "Your cat needs " + xpToNext + " more scritches to evolve!";
  }
    xpDisplay.textContent = "XP: " + xp;
    levelDisplay.textContent = "Level: " + level;

    if (progressBar) {
      const percent = getLevelProgressPercent(xp);
      progressBar.style.width = percent + "%";
    }

    // Update the cat image
    cat.src = getCatImageForLevel(level);
  }

  function showFloatingScritch(clickX, clickY) {
    const wrapper = cat.parentElement; // <div class="cat-wrapper">
    if (!wrapper) return;
  
    const rect = wrapper.getBoundingClientRect();
  
    // Create the bubble
    const scritchEl = document.createElement("span");
    scritchEl.className = "floating-xp";
    scritchEl.textContent = "+1";
  
    // Position bubble exactly where clicked
    const offsetX = clickX - rect.left;
    const offsetY = clickY - rect.top;
  
    scritchEl.style.left = offsetX + "px";
    scritchEl.style.top = offsetY + "px";
  
    wrapper.appendChild(scritchEl);
  
    // Remove after animation
    setTimeout(() => {
      scritchEl.remove();
    }, 700);
  }

  function getLevelProgressPercent(xp) {
  let tempXp = xp;
  let level = 0;
  let xpForNext = 10;

  // Deduct XP until we reach the current level
  while (tempXp >= xpForNext) {
    tempXp -= xpForNext;
    level++;
    xpForNext += 10; // your 10-per-level increment
  }

  // tempXp = XP earned IN the current level
  // xpForNext = total XP needed for THIS level
  const percent = (tempXp / xpForNext) * 100;
  return percent;
}


  // Initial render
  updateDisplays();

  wrapper.addEventListener("click", (event) => {
    xp++;                 // increment XP
    updateDisplays();     // update XP + level
    showFloatingScritch(event.clientX, event.clientY); // show bubble
  });

  
});

