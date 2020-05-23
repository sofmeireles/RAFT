class CavernaLago extends Phaser.Scene {
    constructor(){
        super("cavernaLago");
    }
    init(data){
        this.listaPerguntas = data.listaPerguntas;
        this.tempo=data.tempo+0.5;
        this.posX = data.posX;
        this.posY = data.posY;
    }
    create(){
        console.log("cavernaLago page");
        console.log(this.listaPerguntas);
        //console.log("tempo: "+this.tempo);
        this.background = this.add.image(0,0,"cavernaLago");
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
        this.player.setScale(config.scalePlayer);
        this.player.x = this.posX;
        this.player.y = this.posY;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.setaR = this.physics.add.staticGroup();
        this.setaR.create(650,400,'setaRight');


        this.physics.add.collider(this.player, this.setaE,()=> {
            this.scene.start("inicio",{ listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 570, posY: 400});
        });
        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("cavernaMeio",{listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 130, posY: 400});
        });
        
        //posição do cenario fora da gruta
        this.entradaesquerda=313;
        this.entradadireita=383;
        
        //posiçao da parede
        this.parede = 255;
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

        if(Phaser.Input.Keyboard.JustDown(this.pause)){
            this.scene.pause();
            this.scene.launch("pausa",{background:this.background, sceneName:"cavernaLago"});
        }

        this.pergunta();
        this.colCenario();
    }

    colCenario(){
        if (this.player.y < this.parede){
            this.player.y=this.parede;
        }
    }

    pergunta(){
        //entrar num novo plano
        this.flag=1;
        if (this.player.x > this.entradaesquerda && this.player.x < this.entradadireita && this.player.y < this.parede){
            this.player.x=350;
            this.player.y=355;

            this.scene.start("lago",{listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 350, posY: 160});
            //this.scene.start("pergunta",{background:this.background, listaPerguntas:this.listaPerguntas, player:this.player, sceneName:"cavernaLago"});
        }
    }
}