import config from "./config.json" with { type: "json" };

const rarities = {
  1: 'Common',
  2: 'Uncommon',
  3: 'Rare',
  4: 'Epic',
  5: 'Legendary'
};

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

const exampleTriggeredEffect = new TriggeredEffect('onAttack', 3, 0, ['attack', 'basic', '2', 'player']);
const exampleItemAttributes = {
  id: 1,
  name: 'Basic Sword',
  description: 'lorem ipsum dolor etc.',
  rarity: 1,
  type: 'sword',
  appearance: 'basicSword',
  allowedSlots: ['mainHand', 'offHand'],
  stats: {
    health: 0,
    maxHealth: 0,
    energy: 0,
    maxEnergy: 0,
    attack: {
      basic: 0
    },
    defense: {
      basic: 0
    }
  },
  effects: {
    1: exampleTriggeredEffect,
  }
};

class Item {
  constructor(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.rarity = attributes.rarity;
    this.type = attributes.type;
    this.appearance = attributes.appearance;
    this.allowedSlots = attributes.allowedSlots;
    this.stats = attributes.stats;
    this.effects = attributes.effects;
  }
};

class TriggeredEffect {
  constructor(trigger, cooldown, initialOffset, effect) {
    this.trigger = trigger;
    this.cooldown = cooldown;
    this.triggersElapsed = cooldown - initialOffset;
    this.effect = effect;
  }

  getCooldownStatus() {
    return this.triggersElapsed === this.cooldown;
  }
  
  incrementCooldown() {
    if (this.triggersElapsed < this.cooldown) {
      this.triggersElapsed++;
    } else {
      this.triggersElapsed = 0;
    }
  }
  
}

const triggers = [
  "turnStart",
  "onAttack",
  "onDefend",
  "onOpponentDeath",
  "turnEnd"
];

// Sets constants to control battle gameplay
const battles = {
  // Length of automatic turns during battles, in milliseconds
  turnSpeed: 2000,
  // Chance of generating a boss encounter in stages with bosses (should be less than 1)
  bossChance: 0.05
};

class Entity {
  
  constructor(stats) {
    this.stats = {
      health: stats.health,
      maxHealth: stats.maxHealth,
      attack: stats.attack,
      defense: stats.defense
    };
  }

  modifyHealth(amount) {
    if (this.stats.health + amount >= this.stats.maxHealth) {
      this.stats.health = this.stats.maxHealth;
    } else {
      this.stats.health = this.stats.health + amount;
    }
  }
  
  attack() {
    let attacks = [];
    
    for (let attack in this.stats.attack) {
      attacks.push({
        type: attack, 
        amount: this.stats.attack[attack]
      });
    }
    
    return attacks;
  }

  defend(attack) {
    let totalDefense = 0;
    let damage;
    
    for (let defense in this.stats.defense) {
      if (defense === attack.type) {
        totalDefense = totalDefense + this.stats.defense[defense];
      }
    }

    if (attack.amount - totalDefense <= 0) {
      damage = 0;
    } else {
      damage = attack.amount - totalDefense;
    }

    return damage;
  }
}

const playerBaseStats = {
  health: 25,
  maxHealth: 25,
  energy: 25,
  maxEnergy: 25,
  attack: {
    basic: 0
  },
  defense: {
    basic: 0
  }
};



class Player extends Entity {
  constructor(stats, playerBaseStats) {
    super(stats);
    this.stats.energy = stats.energy;
    this.stats.maxEnergy = stats.maxEnergy;
    this.equipment = {
      head: 'item',
      torso: 'item',
      legs: 'item',
      feet: 'item',
      mainHand: 'item',
      offHand: 'item'
    };
    this.inventory = [
      {}
    ]
    this.buffEffects = {
      exampleBuff: 'buff',
    };
    this.baseStats = playerBaseStats;
    this.recalculateStats(false);
  }

  recalculateStats(preserveAmounts) {
    let newStats = {
      health: this.baseStats.health,
      maxHealth: this.baseStats.maxHealth,
      energy: this.baseStats.energy,
      maxEnergy: this.baseStats.maxEnergy,
      attack: this.baseStats.attack,
      defense: this.baseStats.defense
    };
    
    for (let equipment in this.equipment) {
      for (let stat in this.equipment[equipment].stats) {
        if (stat !== 'defense' || stat !== 'attack') {
          newStats[stat] = newStats[stat] + this.equipment[equipment].stats[stat];
        } else {
          for (let attackDefenseType in this.equipment[equipment].stats[stat]) {
            newStats[stat][attackDefenseType] = newStats[stat][attackDefenseType] + this.equipment[equipment].stats[stat][attackDefenseType];
          }
        }
      }
    }
    for (let buff in this.buffEffects) {
      for (let stat in this.buffEffects[buff].stats) {
        if (stat !== 'defense' || stat !== 'attack') {
          newStats[stat] = newStats[stat] + this.buffEffects[buff].stats[stat];
        } else {
          for (let attackDefenseType in this.buffEffects[buff].stats[stat]) {
            newStats[stat][attackDefenseType] = newStats[stat][attackDefenseType] + this.buffEffects[buff].stats[stat][attackDefenseType];
          }
        }
      }
    }
    if (preserveAmounts) {
      newStats.health = this.stats.health;
      newStats.energy = this.stats.energy;
    }
    this.stats = newStats;
  }

  equipItem(item, targetSlot) {
    // Check if item is allowed to be in that slot
    if (item.allowedSlots.includes(targetSlot)) {

      // If so, check if there is currently something in that slot
      let prevEquippedItem = {};
      if (this.equipment[targetSlot] !== null) {
        
        // If so, put this item in the inventory
        prevEquippedItem = this.equipment[targetSlot];
        this.equipment[targetSlot] = null;
        this.inventory.push(prevEquippedItem);
      }

      // Equip the new item to the desired slot
      let newItemIndex = this.inventory.findIndex(invItem => invItem.id === item.id);
      let newItem = this.inventory[newItemIndex];
      this.inventory.splice(newItemIndex, 1);
      this.equipment[targetSlot] = newItem;
    
    } else {
      // If not, do not equip the item
      // Probably a message to be added or something
    }
  }

  unequipItem(targetSlot) {
    let prevEquippedItem = this.equipment[targetSlot];
    this.equipment[targetSlot] = null;
    this.inventory.push(prevEquippedItem);
  }
  
  modifyEnergy(amount) {
    if (this.stats.energy + amount >= this.stats.maxEnergy) {
      this.stats.energy = this.stats.maxEnergy;
    } else {
      this.stats.energy = this.stats.energy + amount;
    }
  }

  modifyHealth(amount) {
    super.modifyHealth();
  }

  attack() {
    return super.attack();
  }

  defend(attack) {
    return super.defend(attack);
  }
  
}

class Monster extends Entity {
  constructor(stats) {
    super(stats);
    this.stats.type = stats.type;
  }

  modifyHealth(amount) {
    super.modifyHealth();
  }

  attack() {
    return super.attack();
  }

  defend(attack) {
    return super.defend(attack);
  }
}

class Stage {
  constructor(stage) {
    this.stageName = stage.name;
    this.level = stage.level;
    this.monsters = stage.monsters;
    this.bosses = stage.bosses;
    this.hasBoss = stage.bosses.length > 0;
    this.numBattles = 0;
    this.currentBattle;
  }

  createBattle() {
    // Determine if this is to be a boss battle
    let monsterTypes = [];
    let battleType = null;
    if (this.hasBoss && roll(battles.bossChance)) {
      battleType = 'boss';
      monsterTypes.push(this.bosses[Math.floor(Math.random() * this.bosses.length)]);
    } else {
      battleType = 'monster';
      monsterTypes.push(this.monsters[Math.floor(Math.random() * this.monsters.length)]);
      monsterTypes.push(this.monsters[Math.floor(Math.random() * this.monsters.length)]);
    }
    this.currentBattle = new Battle(battleType, monsterTypes, this.level);
    if (this.currentBattle.battleType === 'boss') {
      this.currentBattle.generateBoss();
    } else {
      this.currentBattle.generateMonsters();
    }
  }
}

class Battle {
  constructor(battleType, monsterTypes, level) {
    this.level = level;
    this.battleType = battleType;
    this.monsterTypes = monsterTypes;
    this.turnInterval;
    this.numTurns = 0;
    this.entities = {};
  }
  
  generateBoss() {
    let monsterLeveling = leveling.monsterLeveling

    // Generate base stats
    let baseHealth = monsterLeveling.health.base + (this.level*monsterLeveling.health.perLevel);
    let baseAttack = monsterLeveling.attack.base + (this.level*monsterLeveling.attack.perLevel);
    let baseDefense = monsterLeveling.defense.base + (this.level*monsterLeveling.defense.perLevel);

    let bossType = this.monsterTypes[Math.floor(Math.random() * this.monsterTypes.length)];
    let attack = {};
    for (let j = 0; j < monsters[bossType].attack.length; j++) {
      attack[monsters[bossType].attack[j]] = baseAttack * monsters[bossType].relativeDifficulty * monsterLeveling.bossMultiplier;
    }
    let defense = {};
    for (let j = 0; j < monsters[bossType].defense.length; j++) {
      defense[monsters[bossType].defense[j]] = baseDefense * monsters[bossType].relativeDifficulty * monsterLeveling.bossMultiplier;
    }
    let bossStats = {
      type: bossType,
      health: baseHealth * monsters[bossType].relativeDifficulty * monsterLeveling.bossMultiplier,
      maxHealth: baseHealth * monsters[bossType].relativeDifficulty * monsterLeveling.bossMultiplier,
      attack: attack,
      defense: defense,
    }
    this.entities.monster = new Monster(bossStats);
    console.log(this.entities);
  }
  
  generateMonsters() {
    let monsterLeveling = leveling.monsterLeveling
    
    // Randomly choose how many monsters to generate
    let numMonsters = Math.floor(Math.random() * 3) + 1;

    // Generate base stats
    let baseHealth = monsterLeveling.health.base + (this.level*monsterLeveling.health.perLevel);
    let baseAttack = monsterLeveling.attack.base + (this.level*monsterLeveling.attack.perLevel);
    let baseDefense = monsterLeveling.defense.base + (this.level*monsterLeveling.defense.perLevel);
    console.log(baseDefense);

    for (let i = 0; i < numMonsters; i++) {
      let monsterType = i === 1 ? this.monsterTypes[0] : this.monsterTypes[1];
      let attack = {};
      console.log(monsterType);
      for (let j = 0; j < monsters[monsterType].attack.length; j++) {
        attack[monsters[monsterType].attack[j]] = baseAttack * monsters[monsterType].relativeDifficulty;
      }
      let defense = {};
      for (let j = 0; j < monsters[monsterType].defense.length; j++) {
        defense[monsters[monsterType].defense[j]] = baseDefense * monsters[monsterType].relativeDifficulty;
      }
      let monsterStats = {
        type: monsterType,
        health: baseHealth * monsters[monsterType].relativeDifficulty,
        maxHealth: baseHealth * monsters[monsterType].relativeDifficulty,
        attack: attack,
        defense: defense,
      }
      let monsterKey = 'monster' + i;
      this.entities[monsterKey] = new Monster(monsterStats);
    }
    console.log(this.entities);
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

// Function to assign levels ranges and levels to regions and stages based on the maxLevel constant
function assignStageLevels(regionsConfig) {
  let hydratedRegions = regionsConfig;
  
  // Get the total number of stages across all regions
  let numStages = 0;
  for (let region in regionsConfig) {
    numStages = numStages + Object.keys(regionsConfig[region].stages).length;
  }

  // Determine the level difference between each stage, rounded to the nearest integer
  // If the maxLevel is 100 and there are 20 stages, each stage will be ~5 levels apart
  const levelDifference = Math.round(leveling.maxLevel/(numStages - 1));

  // Loop through each region and each stage in that region
  let stagesAssigned = 0;
  for (let region in regionsConfig) {
    for (let stage in regionsConfig[region].stages) {

      // Calculate the level
      // If this is the last stage to be assigned, the level should be set to the maxLevel from the leveling constant
      let level = stagesAssigned === numStages - 1 ? leveling.maxLevel : (stagesAssigned*levelDifference) + 1;

      // Assign this stage the calculated level
      hydratedRegions[region].stages[stage].level = level;
      stagesAssigned++;
    }
  }
  console.log(regions);
  return hydratedRegions;
}

function hydrateConfig(config) {
  let newConfig = config;
  newConfig.regions = assignStageLevels(config.regions);
  return newConfig;
}


$(document).ready(function() {
  // Hydrate config file for use
  const hydratedConfig = hydrateConfig(config);

  let stage = new Stage(hydratedConfig.regions.mycanidMeadows.stages.chanterelleCountryside);
  console.log(stage.hasBoss);
  stage.createBattle();
});
