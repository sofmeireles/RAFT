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

        this.seta = this.physics.add.staticGroup();
        this.seta.create(650,400,'setaRight');

        this.physics.add.collider(this.player, this.seta,()=> {
            this.scene.start("caverna",{ listaPerguntas:this.listaPerguntas});
        });
    }


    update(){
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.anims.play("left", true);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
        }
        else if (this.cursors.up.isDown || this.cursors.down.isDown){
            this.player.setVelocityX(0);

        }

        if (this.cursors.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
            this.player.anims.play("back", true);
        }
        else if (this.cursors.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
        }
        else if (this.cursors.left.isDown || this.cursors.right.isDown){
            this.player.setVelocityY(0);
        }
        else{
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
            this.player.anims.play("stop");
        }
    }
}