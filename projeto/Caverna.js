class Caverna extends Phaser.Scene {
    constructor(){
        super("caverna");
    }
    init(data){
        this.listaPerguntas = data.listaPerguntas;
        this.tempo=data.tempo+0.5;
    }
    create(){
        console.log("caverna page");
        console.log("tempo: "+this.tempo);
        this.background = this.add.image(0,0,"caverna");
        this.background.setOrigin(0,0);
        this.flag=0;

        this.timer = this.time.addEvent({
            loop: true,
            paused: false
        });
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});


        this.player=this.physics.add.sprite(config.width/2,config.height/2,'boneco');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.x = 400;
        this.player.y = 400;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.setaD = this.physics.add.staticGroup();
        this.setaD.create(650,400,'setaRight');
        this.setaE = this.physics.add.staticGroup();
        this.setaE.create(50,400,'setaLeft');


        this.physics.add.collider(this.player, this.setaD,()=> {
            this.scene.start("menu1",{tempo:this.tempoAtual});
        });

        this.physics.add.collider(this.player, this.setaE,()=> {
            this.scene.start("cenario1",{ listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual});
        });
        
        //posição do cenario fora da gruta
        this.entradaesquerda=313;
        this.entradadireita=383;
        this.entradabaixo=230;

        //posiçao da parede
        this.parede = 245;
    }

    
    update(){
        this.tempoAtual=Math.floor(this.tempo+this.timer.getElapsedSeconds());
        this.text.setText('Tempo: '+ this.tempoAtual);
        //console.log(this.listaPerguntas);
        //console.log(this.tempo);

        if (this.cursors.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.anims.play("left", true);
            //console.log("x " + this.player.x);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
            //console.log("x " + this.player.x);
        }
        else if (this.cursors.up.isDown || this.cursors.down.isDown){
            this.player.setVelocityX(0);

        }

        if (this.cursors.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
            this.player.anims.play("back", true);
            //console.log("y " + this.player.y);
        }
        else if (this.cursors.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
            //console.log("y " + this.player.y);
        }
        else if (this.cursors.left.isDown || this.cursors.right.isDown){
            this.player.setVelocityY(0);
        }
        else{
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
            this.player.anims.play("stop");
        }

        this.pergunta();
        this.colCenario();
    }

    colCenario(){
        if (this.player.y < this.parede && this.player.x < this.entradaesquerda && this.player.x > this.entradadireita && this.player.y > this.entradabaixo){
            this.player.y=244;
        }
    }

    pergunta(){
        //entrar num novo plano
        this.flag=1;
        if (this.player.x > this.entradaesquerda && this.player.x < this.entradadireita && this.player.y < this.entradabaixo){
            this.player.x=350;
            this.player.y=355;
            this.player.setVelocity(0);
            console.log("tempo atuaaal: " + this.tempoAtual);

            this.text.setText('');
            this.scene.pause();
            this.scene.launch("pergunta",{background:this.background, listaPerguntas:this.listaPerguntas, player:this.player, sceneName:"caverna", tempo:this.tempoAtual});
        }
    }
}