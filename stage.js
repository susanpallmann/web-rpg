import {regions, leveling, battles} from '/setup.js';

class Stage {
  constructor(stage) {
    this.stageName = stage.name;
    this.level = stage.level;
    this.monsters = stage.monsters;
    this.bosses = stage.bosses;
    this.hasBoss = stage.bosses.length > 0;
    this.numBattles = 0;
  }

  createBattle() {
    // Determine if this is to be a boss battle
    let isBossBattle = false;
    if (this.hasBoss) {
      isBossBattle = roll(battles.bossChance);
    }
    // Determine the monster types
  }
}

class Battle {
  constructor(battleType, monsterTypes) {
    this.turnInterval;
    this.numTurns = 0;
  }

  generateMonsters() {
    
  }
  
  startBattle() {
    this.turnInterval = setInterval(function() {
      this.playTurn();
    }, battles.turnSpeed);
  }

  endBattle() {
    clearInterval(this.turnInterval);
  }
  
  playTurn() {
    this.numTurns++;
  }
};

// Function to roll for an outcome given the chance (num) of that outcome
// Returns true if outcome occurs, and false if not
function roll(num) {
  const randomNum = Math.floor(Math.random() * 100) + 1;
  if (randomNum > (1/num)) {
    return false;
  } else {
    return true;
  }
}

$(document).ready(function() {
  let stage = new Stage(regions.mycanidMeadows.stages.portobelloPrairie);
  console.log(stage.hasBoss);
});
