class Caverna extends Phaser.Scene {
    constructor(){
        super("caverna");
    }
    init(data){
        this.listaPerguntas = data.listaPerguntas;
    }
    create(){
        console.log("caverna page");
        this.background = this.add.image(0,0,"caverna");
        this.background.setOrigin(0,0);

        this.player=this.physics.add.sprite(config.width/2,config.height/2,'boneco');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.x = 130;
        this.player.y = 400;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.setaD = this.physics.add.staticGroup();
        this.setaD.create(650,400,'setaRight');
        this.setaE = this.physics.add.staticGroup();
        this.setaE.create(50,400,'setaLeft');


        this.physics.add.collider(this.player, this.setaD,()=> {
            this.scene.start("menu1");
        });

        this.physics.add.collider(this.player, this.setaE,()=> {
            this.scene.start("cenario1");
        });
        
        //posição do cenario fora da gruta
        this.entradaesquerda=313;
        this.entradadireita=383;
        this.entradabaixo=230;

        //posiçao da parede
        this.parede = 245;
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
        this.pergunta();
    }

    colCenario(){
        if (this.player.y < this.parede){
            this.player.y=244;
        }
    }

    pergunta(){
        //entrar num novo plano
        if (this.player.x > this.entradaesquerda && this.player.x < this.entradadireita && this.player.y < this.entradabaixo){
            this.player.x=350;
            this.player.y=355;
            this.player.setVelocity(0);

            this.scene.pause();
            this.scene.launch("pergunta",{background:this.background, listaPerguntas:this.listaPerguntas, player:this.player, sceneName:"caverna"});
        }
    }
}