class Cenario1 extends Phaser.Scene {
    constructor(){
        super("cenario1");
    }
    init(data){
        this.listaPerguntas = data.listaPerguntas;
    }
    create(){
        console.log("cenario1 page");
        this.background = this.add.image(0,0,"cena1");
        this.background.setOrigin(0,0);

        this.player=this.physics.add.sprite(config.width/2,config.height/2,'boneco');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.setaD = this.physics.add.staticGroup();
        this.setaD.create(670,400,'setaRight');
        this.setaE = this.physics.add.staticGroup();
        this.setaE.create(20,400,'setaLeft');

        this.physics.add.collider(this.player, this.setaD,()=> {
            this.scene.start("caverna",{ listaPerguntas:this.listaPerguntas});
        });

        // posicao da floresta
        this.floresta = 200;
    }


    update(){
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.anims.play("left", true);
            console.log("x " + this.player.x);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
            console.log("x " + this.player.x);
        }
        else if (this.cursors.up.isDown || this.cursors.down.isDown){
            this.player.setVelocityX(0);

        }

        if (this.cursors.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
            this.player.anims.play("back", true);
            console.log("y " + this.player.y);
        }
        else if (this.cursors.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
            console.log("y " + this.player.y);
        }
        else if (this.cursors.left.isDown || this.cursors.right.isDown){
            this.player.setVelocityY(0);
        }
        else{
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
            this.player.anims.play("stop");
        }
        
        this.colCenario();
    }

    colCenario(){
        if (this.player.y < this.floresta){
            this.player.y=200;
        }
    }
}