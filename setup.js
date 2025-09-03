// please please work
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

const regions = {
  mycanidMeadows: {
    name: "Mycanid Meadows",
    stages: {
      portobelloPrairie: {
        name: "Portobello Prairie",
        level: 0, // Dynamically populated by assignDifficulty()
        monsters: ['mycanid'],
        bosses: []
      },
      chanterelleCountryside: {
        name: "Chanterelle Countryside",
        level: 0, // Dynamically populated by assignDifficulty()
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
        level: 0, // Dynamically populated by assignDifficulty()
        monsters: ['mycanid', 'spider'],
        bosses: []
      },
      pothosPeak: {
        name: "Pothos Peak",
        level: 0, // Dynamically populated by assignDifficulty()
        monsters: ['mycanid', 'spider'],
        bosses: ['queenSpider']
      }
    }
  }
}

// Function to assign levels ranges and levels to regions and stages based on the maxLevel constant
function assignDifficulty() {

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

$(document).ready(function() {
  assignDifficulty();
});
