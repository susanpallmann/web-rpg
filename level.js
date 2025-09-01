class Monster {
  constructor() {
    this.health = 25;
    this.defense = 2;
    this.damage = 2;
  }

  takeDamage(baseDamage) {
    this.health =  this.health - (baseDamage - this.defense);
  }
  
  dealDamage() {
    return this.damage;
  }
}

class Player {
  constructor() {
    this.health = 25;
    this.defense = 3;
    this.damage = 2;
  }

  takeDamage(baseDamage) {
    this.health =  this.health - (baseDamage - this.defense);
  }
  
  dealDamage() {
    return this.damage;
  }
}

class Battle {
  constructor (turnNumber, maxTurns, turnFrequency, player) {
    this.player = player;
    this.turnNumber = turnNumber;
    this.maxTurns = maxTurns;
    this.turnFrequency = turnFrequency;
    this.battleTurnInterval;
    this.startBattleInterval();
    this.monster = new Monster();
  }

  startBattleInterval() {
    this.battleTurnInterval = setInterval(() => {

      if (this.turnNumber < this.maxTurns) {
        
        this.turnNumber++;
        
        console.log(`Turn ${this.turnNumber} begins.`);
        
        console.log(`Player has ${this.player.health} health.`);
        console.log(`Monster has ${this.monster.health} health.`);

        let playerDamageDealt = this.player.dealDamage();
        let monsterDamageDealt = this.monster.dealDamage();

        console.log(`Player dealt ${playerDamageDealt} damage.`);
        console.log(`Monster dealt ${monsterDamageDealt} damage.`);

        this.monster.takeDamage(playerDamageDealt);
        this.player.takeDamage(monsterDamageDealt);

        if (this.player.health <= 0) {
          
          this.endBattleInterval();
          
          console.log('Player ran out of health; ending battle.');
          
        } else if (this.monster.health <= 0) {
          
          this.endBattleInterval();
          
          console.log('Monster ran out of health; ending battle.');
          
        }
        
        console.log(`Player now has ${this.player.health} health.`);
        console.log(`Monster now has ${this.monster.health} health.`);
        
      } else {
        
        this.endBattleInterval();
        console.log('Battle ran out of turns and ended.');
        
      }
      
    }, this.turnFrequency);
  }

  endBattleInterval() {
    clearInterval(this.battleTurnInterval);
  }
}

$(document).ready(function () {
  let newPlayer = new Player();
  let newBattle = new Battle(0, 16, 1000, newPlayer);
});
