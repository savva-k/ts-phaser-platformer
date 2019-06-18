import { BaseScene } from "./BaseScene";

export class Sandbox extends BaseScene {

    private readonly playerSpriteName = 'player';
    private player;

    public preload(): void {
        this.load.setBaseURL('/src');
        this.load.image('background', './assets/space_background.jpg');
        this.load.image('ground', './assets/ground.png');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 64, frameHeight: 64 });
    }

    public create(): void {
        this.createBackround();
        this.createPlayer();
        this.createPlayerAnimations();
        this.createStages();
    }

    public update(): void {
        let cursors = this.input.keyboard.createCursorKeys();
        
        if (cursors.right.isDown) {
            this.player.anims.play('walk-right', true);
            if (this.player.body.touching.down) {
                this.player.setVelocityX(160);
            }
        } else if (cursors.left.isDown) {
            this.player.anims.play('walk-left', true);
            if (this.player.body.touching.down) {
                this.player.setVelocityX(-160);
            }
        } else {
            this.player.anims.play('idle', true);
            
            if (this.player.body.touching.down) {
                this.player.setVelocityX(0);
            }
        }
    
        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-220);
        }
    }

    private createStages() {
        let platforms = this.physics.add.staticGroup();
        platforms.create(30, 580, 'ground').setScale(2).refreshBody();
        platforms.create(155, 580, 'ground').setScale(2).refreshBody();
        platforms.create(280, 580, 'ground').setScale(2).refreshBody();
        platforms.create(405, 580, 'ground').setScale(2).refreshBody();
        platforms.create(530, 580, 'ground').setScale(2).refreshBody();
        platforms.create(655, 580, 'ground').setScale(2).refreshBody();
        platforms.create(780, 580, 'ground').setScale(2).refreshBody();

        platforms.create(400, 470, 'ground').setScale(2).refreshBody();

        this.physics.add.collider(this.player, platforms);
    }

    private createBackround() {
        this.add.image(400, 300, 'background');
    }

    private createPlayer() {
        this.player = this.physics.add.sprite(50, 400, this.playerSpriteName);
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
    }

    private createPlayerAnimations() {
        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNumbers(this.playerSpriteName, { start: 0, end: 7 }),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers(this.playerSpriteName, { start: 8, end: 15 }),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [ { key: this.playerSpriteName, frame: 4 } ]
        });
    }

}