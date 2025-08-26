// when a map region is clicked
// get the region's id
// check validity of selected region?
// change the selected region to the region corresponding to that id
// animate movement to that region
// switch view to battle view

class Game {
  constructor() {
    // Player attributes, like level, items, health, stats, etc.
    this.playerLevel;
    this.playerItems;
    // Game attributes, like region, level phase, etc.
    this.region;
    this.levelPhase;
    // UI attributes, like view, etc.
    this.view;
  }
}

$(document).ready(function() {
  let newGame = new Game();
  newGame.view = 'test';
  console.log(newGame.view);
});
