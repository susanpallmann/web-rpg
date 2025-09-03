class Battle {
  constructor(stage) {
    this.stageName = stage.name;
    this.level = stage.level;
    this.monsters = stage.monsters;
    this.bosses = stage.bosses;
    this.hasBoss = stage.bosses.length > 0;
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

$(document).ready(function() {
  let battle = new Battle(regions.mycanidMeadows.stages.portobelloPrairie);
  console.log(battle.hasBoss);
});
