new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        specialAttackCounter: 1,
        healAmount: 10,
        turns: []
    },
    methods: {
        startGame: function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.specialAttackCounter = 1;
            this.gameIsRunning = true;
            this.turns = [];
        },
        normalAttack: function () {
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                attack: 'normalAttack',
                text: 'Players hits Monster with a Normal Attack for ' + damage
            });

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function () {
            if (this.specialAttackCounter === 1) {
                this.specialAttackAbility();
            }
        },
        specialAttackAbility: function () {
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                attack: 'specialAttack',
                text: 'Players hits Monster with a Special Attack for ' + damage
            });
            this.specialAttackCounter = 0;

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += this.healAmount;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                attack: 'heal',
                text: 'Players heals himself with Rejuvenation Spell for ' + this.healAmount
            });
            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('Monster won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        monsterAttacks: function () {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                attack: 'monsterAttack',
                text: 'Monster hits Player with his claws for ' + damage
            });
            this.checkWin();
        }
    }
})