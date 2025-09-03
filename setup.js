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
    levelRange: [],
    stages: {
      portobelloPrairie: {
        name: "Portobello Prairie",
        level: 0,
        monsters: ['mycanid'],
        bosses: []
      },
      chanterelleCountryside: {
        name: "Chanterelle Countryside",
        level: 0,
        monsters: ['mycanid'],
        bosses: ['mushroomKing']
      }
    }
  },
  fernForest: {
    name: "Fern Forest",
    levelRange: [],
    stages: {
      plantPlateau: {
        name: "Plant Plateau",
        level: 0,
        monsters: ['mycanid', 'spider'],
        bosses: []
      },
      pothosPeak: {
        name: "Pothos Peak",
        level: 0,
        monsters: ['mycanid', 'spider'],
        bosses: ['queenSpider']
      }
    }
  }
}

// Function to assign levels ranges and levels to regions and stages based on the maxLevel constant
function assignRegionDifficulty() {
  
  // Get number of regions from regions constant
  const numRegions = Object.keys(regions).length;
  
  // Determine the range for each region, rounded to an integer
  // If the maxLevel is 100 and there are 3 regions, each region will have a range of ~33 levels
  const regionRange = Math.round(leveling.maxLevel/numRegions);

  // Loop through each region
  let regionsProcessed = 0;
  for (let region in regions) {
    
    // Calculate the minimum and maximum level for this region
    let minLevel = 1 + (regionsProcessed*regionRange);
    let maxLevel = regionsProcessed === numRegions-1 ? leveling.maxLevel : minLevel + regionRange - 1;
    
    // Assign this range to the region in the regions object
    regions[region].levelRange = [minLevel, maxLevel];

    // Get the number of stages in this region
    const numStages = Object.keys(region.stages).length;

    // Determine the difference in difficulty between each level, rounded to an integer
    // If the region's range was 33 and there are 3 stages, there will be approximately 17 levels between each stage
    const stageGap = Math.round(regionRange/(numStages-1));

    // Loop through each stage
    let stagesProcessed = 0;
    for (let stage in region.stages) {

      // Calculate the level for this stage
      let stageLevel = minLevel + (stagesProcessed*stageGap);
      if (stagesProcessed === numStages-1) {
        stageLevel = maxLevel;
      }

      // Assign this range to the region in the regions object
      regions[region].stages[stage].level = stageLevel;
      
      stagesProcessed++;
    }
    regionsProcessed++;
  }

  console.log(regions);
}

$(document).ready(function() {
  assignRegionDifficulty();
});
