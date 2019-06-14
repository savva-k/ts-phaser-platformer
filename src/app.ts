import 'phaser'
import { Scene } from 'phaser';
import { World } from './world';

const config: GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 190 } }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player: Phaser.Physics.Arcade.Sprite

function preload(this: Scene) {
    console.log(this);
    this.load.setBaseURL('/src');
    this.load.image('background', './assets/space_background.jpg');
    this.load.image('ground', './assets/ground.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 64, frameHeight: 64 });
}

function create(this: Scene) {
    let world = new World(this);
    world.createBackround();
    player = world.createPlayer();
    world.createStages();
}

function update(this: Scene) {
    let cursors = this.input.keyboard.createCursorKeys();

    if (cursors.right.isDown) {
        player.anims.play('walk-right', true);
        if (player.body.touching.down) {
            player.setVelocityX(160);
        }
    } else if (cursors.left.isDown) {
        player.anims.play('walk-left', true);
        if (player.body.touching.down) {
            player.setVelocityX(-160);
        }
    } else {
        player.anims.play('idle', true);
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-220);
    }
}