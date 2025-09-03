/*
const stats = {
  health: 25,
  maxHealth: 25,
  attack: {
    all: 5
  },
  defense: {
    all: 5
  }
}
*/

class Entity {
  
  constructor(stats) {
    this.stats.health = stats.health;
    this.stats.maxHealth: stats.maxHealth;
    this.stats.attack: stats.attack;
    this.stats.defense: stats.defense;
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

class Player extends Entity {
  constructor(stats) {
    super(stats);
    this.stats.energy = stats.energy;
    this.stats.energy = stats.maxEnergy;
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
