import { Sandbox } from "./scenes/Sandbox";

export class Game extends Phaser.Game {

    constructor() {        
        super({
            type: Phaser.AUTO,
            parent: "app",
            width: 800,
            height: 600,
            title: "TS Platformer Game",
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 190
                    }
                }
            }
        });

        this.scene.add("Sandbox", Sandbox)
        this.scene.start('Sandbox')
    }
    
}