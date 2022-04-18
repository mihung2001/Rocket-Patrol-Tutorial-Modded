//Rocket Patrol Mods
//Made by Huy Nguyen
//4/18/2022
//Completion time: 15 hours

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_explosion', './assets/explosion.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('nebula', './assets/nebula.png')
    }
    
    create() {
        this.nebula = this.add.tileSprite(0, 0, 640, 480, 'nebula').setOrigin(0, 0);

        let menuConfig = {
            fontFamily: 'Lucida Console',
            fontSize: '20px',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        let controlsConfig = {
            fontFamily: 'Lucida Console',
            fontSize: '15px',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let titleConfig = {
            fontFamily: 'Lucida Console',
            fontSize: '28px',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        this.add.text(game.config.width/2, game.config.height/2, 'Use the mouse to move & (F) or (LeftMouseClick) to fire', controlsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET 🚀 PATROL', titleConfig).setOrigin(0.5);
        menuConfig.color = '#FFFFFFFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice Difficulty', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2.7, 'Press → for Expert Difficulty', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    //← → arrows

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //Hard Mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //Hard Mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}