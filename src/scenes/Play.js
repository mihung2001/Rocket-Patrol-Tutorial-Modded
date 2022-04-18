class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.spritesheet('spaceship', './assets/spaceshipAnimated.png', {frameWidth:64, frameHeight:64, startFrame: 0, endFrame: 6});
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_explosion', './assets/explosion.wav');
        this.load.audio('sfx_explosion2', './assets/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/explosion4.wav');
        this.load.audio('sfx_explosion5', './assets/explosion5.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('bgd_music', './assets/background.wav');
    }

    create() {
        //Animation Config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 5, first: 0}),
            framerate: 30
        });
        
        this.anims.create({
            key: 'ship',
            frames: this.anims.generateFrameNumbers('spaceship', {start: 5, end: 0, first: 0}),
            framerate: 30,
            repeat: -1,
        });

        this.explosionSounds = ['sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4', 'sfx_explosion5']
        this.backgroundMusic = this.sound.add('bgd_music', {loop: true});
        this.backgroundMusic.play();
        //Starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        //Game Borfder
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        //Rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0.5);
        //Add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship01.anims.play('ship')
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship02.anims.play('ship')
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship03.anims.play('ship')
        //Keybinds
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //Initialize High Score
        this.p1HighScore = 0
        //Initialize Score
        this.p1Score = 0;
        //Display Score
        let scoreConfig = {
            fontFamily: 'Lucida Console',
            fontSize: '24px',
            backgroundColor: '#171717',
            color: '#FFFFFFFF',
            align:'right',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
            fixedWidth: 0
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, 'Score: ' + this.p1Score, scoreConfig);
        //Display High Score
        let highScoreConfig = {
            fontFamily: 'Lucida Console',
            fontSize: '24px',
            backgroundColor: '#171717',
            color: '#FFFFFFFF',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
            fixedWidth: 0
        }
        this.scoreRight = this.add.text(borderUISize + borderPadding * 35.5, borderUISize + borderPadding * 2, 'HiScore: ' + localStorage.getItem("HighScore"), highScoreConfig);
        //Game Over Flfag
        this.gameOver = false;

        //60 Second Play Clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5,);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        let timerConfig = {
            fontFamily: 'Lucida Console',
            fontSize: '24px',
            backgroundColor: '#171717',
            color: '#FFFFFFFF',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
            fixedWidth: 0
        }
        this.timer = this.add.text(borderUISize + borderPadding * 19.5, borderUISize + borderPadding * 2, 60, timerConfig);
    }

    update() {
        if (!this.gameOver) {
            this.timer.setText(parseInt((game.settings.gameTimer / 1000) - (this.clock.getProgress().toString()*(game.settings.gameTimer / 1000))) + 's Left');
            this.p1Rocket.x = this.game.input.activePointer.x;
        }
        // if (Phaser.Input.POINTER_MOVE) {
        //     this.p1Rocket.x = this.game.input.activePointer.x;
        // }

        if (this.gameOver) {
            this.highScore();
        }
        //Check Key Input for Restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX += 1;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
          }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
          }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
          }
        }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        this.sound.play(Phaser.Math.RND.pick(this.explosionSounds))
        });
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = 'Score: ' + this.p1Score;
    }

    highScore() {
        if (this.p1Score > localStorage.getItem("HighScore")) {
            this.p1HighScore = this.p1Score;
            localStorage.setItem("HighScore", this.p1HighScore);
            this.scoreRight.text = 'HiScore: ' + localStorage.getItem("HighScore");
        }
    }
}