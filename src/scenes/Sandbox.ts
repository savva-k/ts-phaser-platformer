import { BaseScene } from "./BaseScene";
import { Platform } from "../model/Platform";

export class Sandbox extends BaseScene {

    private readonly playerSpriteName: string = 'player';
    private readonly platforms: Platform[] = [
        new Platform(30, 580, 'ground', 2),
        new Platform(155, 580, 'ground', 2),
        new Platform(280, 580, 'ground', 2),
        new Platform(405, 580, 'ground', 2),
        new Platform(530, 580, 'ground', 2),
        new Platform(655, 580, 'ground', 2),
        new Platform(780, 580, 'ground', 2),
        new Platform(400, 470, 'ground', 2),
        new Platform(200, 370, 'ground', 2),
    ];

    private player: Phaser.Physics.Arcade.Sprite;

    public preload(): void {
        this.load.setBaseURL('/src');
        this.load.image('background', './assets/space_background.jpg');
        this.load.image('ground', './assets/ground.png');
        this.load.spritesheet('player', './assets/player.png', { frameWidth: 64, frameHeight: 64 });
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
        let platformsGroup = this.physics.add.staticGroup();
        this.platforms.forEach(p => platformsGroup.create(p.x, p.y, p.type).setScale(p.scale).refreshBody())
        this.physics.add.collider(this.player, platformsGroup);
    }

    private createBackround() {
        this.add.image(400, 300, 'background');
    }

    private createPlayer() {
        this.player = this.physics.add.sprite(50, 400, this.playerSpriteName);
        this.player.setBounce(0.1);
        this.player.setSize(20, 64);
        this.player.setCollideWorldBounds(true);
    }

    private createPlayerAnimations() {
        let walkRighFrames = this.anims.generateFrameNumbers(this.playerSpriteName, { start: 0, end: 7 });
        let walkLeftFrames = this.anims.generateFrameNumbers(this.playerSpriteName, { start: 8, end: 15 });
        let idleFrames = [ { key: this.playerSpriteName, frame: 4 } ];
        
        this.createAnim('walk-right', walkRighFrames);
        this.createAnim('walk-left', walkLeftFrames);
        this.createAnim('idle', idleFrames, 0, 0);
    }

}