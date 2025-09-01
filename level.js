class Monster {
  constructor() {
    this.health = 25;
    this.defense = 1;
    this.damage = 2;
  }

  takeDamage(baseDamage) {
    let finalDamage = baseDamage >= this.defense ? baseDamage - this.defense : 0;
    this.health = this.health - finalDamage;
    return finalDamage;
  }
  
  dealDamage() {
    return this.damage;
  }
}

class Player {
  constructor() {
    this.health = 25;
    this.defense = 1;
    this.damage = 3;
  }

  takeDamage(baseDamage) {
    let finalDamage = baseDamage >= this.defense ? baseDamage - this.defense : 0;
    this.health = this.health - finalDamage;
    return finalDamage;
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

        let monsterDamageTaken = this.monster.takeDamage(playerDamageDealt);
        let playerDamageTaken = this.player.takeDamage(monsterDamageDealt);

        console.log(`Player dealt ${monsterDamageTaken} damage to monster.`);
        console.log(`Monster dealt ${playerDamageTaken} damage to player.`);

        if (this.player.health <= 0) {
          
          this.endBattleInterval();
          
          console.log('Player ran out of health; ending battle.');
          
        } else if (this.monster.health <= 0) {
          
          this.endBattleInterval();
          
          console.log('Monster ran out of health; ending battle.');
          
        }
        
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
