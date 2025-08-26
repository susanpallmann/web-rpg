// when a map region is clicked
// get the region's id
// check validity of selected region?
// change the selected region to the region corresponding to that id
// animate movement to that region
// switch view to battle view
const config = {
  mapMarkers: {
    location1: [80.5, 50],
    location2: [78.5, 60],
    location3: [73.5, 70]
  }
};

function generateMapMarkers() {
  let $map = $('#map');
  $map.empty();
  Object.values(config.mapMarkers).forEach(value => {
    let $newMarker = $(`<div class="map-marker" style="top:${value[1]}%; left:${value[0]}%;">`);
    $map.append($newMarker);
  });
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
  newGame.changeView('map');
  generateMapMarkers();
});
