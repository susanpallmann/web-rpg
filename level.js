class Battle {
  constructor (turnNumber, maxTurns, turnFrequency) {
    this.turnNumber = turnNumber;
    this.maxTurns = maxTurns;
    this.turnFrequency = turnFrequency;
    this.battleTurnInterval;
    startBattleInterval();
  }

  startBattleInterval() {
    this.battleTurnInterval = setInterval(() => {

      if (this.turnNumber < this.maxTurns) {
        this.turnNumber++;
        console.log('Turn interval increased.);
      } else {
        this.endBattleInterval();
        console.log('Turn interval finshed.);
      }
      
    }, this.turnFrequency);
  }

  endBattleInterval() {
    clearInterval(this.battleTurnInterval);
  }
}


$(document).ready(function () {
  let newBattle = new Battle(0, 5, 1000);
});
