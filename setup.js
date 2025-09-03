// Sets the game's level-based constants and modifiers, including:
  // The game's maximum level
  // Monsters and bosses' base stats
  // How monsters and bosses' stats scale per level
const leveling = {
  maxLevel: 100,
  monsterLeveling: {
    health: {
      base: 20,
      perLevel: 1,
    },
    attack: {
      base: 4,
      perLevel: 1,
    },
    defense: {
      base: 0,
      perLevel: 1,
    },
    bossMultiplier: 1.5
  }
};

// Sets the game's zone information, including:
  // The game's regions and their attributes
  // Each region's stages and their attributes
const regions = {
  mycanidMeadows: {
    name: "Mycanid Meadows",
    stages: {
      portobelloPrairie: {
        name: "Portobello Prairie",
        level: 0, // Dynamically populated
        monsters: ['mycanid'],
        bosses: []
      },
      chanterelleCountryside: {
        name: "Chanterelle Countryside",
        level: 0, // Dynamically populated
        monsters: ['mycanid'],
        bosses: ['mushroomKing']
      }
    }
  },
  fernForest: {
    name: "Fern Forest",
    stages: {
      plantPlateau: {
        name: "Plant Plateau",
        level: 0, // Dynamically populated
        monsters: ['mycanid', 'spider'],
        bosses: []
      },
      pothosPeak: {
        name: "Pothos Peak",
        level: 0, // Dynamically populated
        monsters: ['mycanid', 'spider'],
        bosses: ['queenSpider']
      }
    }
  }
}

const monsters = {
  mycanid: {
    name: "Mycanid",
    appearance: 'mycanid',
    relativeDifficulty: 1,
    attack: ['basic'],
    defense: ['basic']
  },
  spider: {
    name: "Spider",
    appearance: 'spider',
    relativeDifficulty: 1,
    attack: ['basic'],
    defense: ['basic']
  },
  // Bosses
  mushroomKing: {
    name: "Mushroom King",
    appearance: 'mushroomKing',
    relativeDifficulty: 1,
    attack: ['basic'],
    defense: ['basic']
  },
  queenSpider: {
    name: "Queen Spider",
    appearance: 'queenSpider',
    relativeDifficulty: 1,
    attack: ['basic'],
    defense: ['basic']
  }
};

// Sets constants to control battle gameplay
const battles = {
  // Length of automatic turns during battles, in milliseconds
  turnSpeed: 2000,
  // Chance of generating a boss encounter in stages with bosses (should be less than 1)
  bossChance: 0.05
};

// Function to assign levels ranges and levels to regions and stages based on the maxLevel constant
function assignStageLevels() {

  // Get the total number of stages across all regions
  let numStages = 0;
  for (let region in regions) {
    numStages = numStages + Object.keys(regions[region].stages).length;
  }

  // Determine the level difference between each stage, rounded to the nearest integer
  // If the maxLevel is 100 and there are 20 stages, each stage will be ~5 levels apart
  const levelDifference = Math.round(leveling.maxLevel/(numStages - 1));

  // Loop through each region and each stage in that region
  let stagesAssigned = 0;
  for (let region in regions) {
    for (let stage in regions[region].stages) {

      // Calculate the level
      // If this is the last stage to be assigned, the level should be set to the maxLevel from the leveling constant
      let level = stagesAssigned === numStages - 1 ? leveling.maxLevel : (stagesAssigned*levelDifference) + 1;

      // Assign this stage the calculated level
      regions[region].stages[stage].level = level;
      stagesAssigned++;
    }
  }
  console.log(regions);
}


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
  assignStageLevels();
  let stage = new Stage(regions.mycanidMeadows.stages.portobelloPrairie);
  console.log(stage.hasBoss);
});
