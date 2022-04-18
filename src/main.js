//Rocket Patrol Mods
//Made by Huy Nguyen
//4/18/2022
//Completion time: 15 hours

//Points Break Down:
//Track a high score that persists across scenes and display it in the UI (5)           +
//Add your own (copyright-free) background music to the Play scene (5)                  +
//Create a new scrolling tile sprite for the background (5)                             + 
//Allow the player to control the Rocket after it's fired (5)                           += 20
//Create 4 new explosion SFX and randomize which one plays on impact (10)               +
//Display the time remaining (in seconds) on the screen (10)                            +
//Create a new animated sprite for the Spaceship enemies (10)                           +
//Create a new title screen (e.g., new artwork, typography, layout) (10)                += 60
//Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) +
//Implement mouse control for player movement and mouse click to fire (20)              += 100

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play],
  }
let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT, leftClick;
//set UI Sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
