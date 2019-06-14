import { Scene } from "phaser";

export class World {

    player;
    constructor(private scene: Scene) {}

    createBackround() {
        this.scene.add.image(400, 300, 'background');
    }

    createStages() {
        let platforms = this.scene.physics.add.staticGroup();
        platforms.create(30, 580, 'ground').setScale(2).refreshBody();
        platforms.create(155, 580, 'ground').setScale(2).refreshBody();
        platforms.create(280, 580, 'ground').setScale(2).refreshBody();
        platforms.create(405, 580, 'ground').setScale(2).refreshBody();
        platforms.create(530, 580, 'ground').setScale(2).refreshBody();
        platforms.create(655, 580, 'ground').setScale(2).refreshBody();
        platforms.create(780, 580, 'ground').setScale(2).refreshBody();

        platforms.create(400, 470, 'ground').setScale(2).refreshBody();

        this.scene.physics.add.collider(this.player, platforms);
    }

    createPlayer() {
        this.player = this.scene.physics.add.sprite(50, 400, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        this.scene.anims.create({
            key: 'walk-right',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 60,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk-left',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
            frameRate: 60,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idle',
            frames: [ { key: 'player', frame: 4 } ]
        });

        return this.player;
    }
}