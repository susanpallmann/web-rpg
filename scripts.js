// when a map region is clicked
// get the region's id
// check validity of selected region?
// change the selected region to the region corresponding to that id
// animate movement to that region
// switch view to battle view
const config = {
  mapMarkers: {
    location1: [1, 2],
    location2: [4, 6],
    location3: [3, 8],
  }
};

function generateMapMarkers() {
  for (location in config.mapMarkers) {
    console.log(location);
  }
}

class Game {
  constructor(view) {
    // Player attributes, like level, items, health, stats, etc.
    this.playerLevel;
    this.playerEquipment;
    this.playerItems;
    
    // Attack power
    // Health
    // Armor/defense
    this.stats = {
      attackPower: 0,
      health: 0,
      defense: 0
    };
    
    // Game attributes, like region, level phase, etc.
    this.region;
    this.levelPhase;
    // UI attributes, like view, etc.
    this.view = view;
  }

  changeView(newView) {
    let $previousView = $(`#view-${this.view}`);
    let $newView = $(`#view-${newView}`);
    $previousView.fadeToggle(1000);
    $newView.delay(1000).fadeToggle(1000);
    this.view = newView;
  }
}

$(document).ready(function() {
  $('#view-level').fadeOut();
  $('#view-map').fadeOut();
  let newGame = new Game('menu');
  //newGame.changeView('map');
  generateMapMarkers();
});
