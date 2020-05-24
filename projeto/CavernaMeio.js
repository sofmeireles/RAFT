class CavernaMeio extends Phaser.Scene {
    constructor(){
        super("cavernaMeio");
    }
    init(data){
        this.listaPerguntas = data.listaPerguntas;
        this.tempo=data.tempo+0.5;
        this.posX = data.posX;
        this.posY = data.posY;
        this.listaPaus=data.listaPaus;
        this.nameuser = data.nameuser;
    }
    create(){
        console.log("cavernaMeio page");
        //console.log("tempo: "+this.tempo);
        this.background = this.add.image(0,0,"cavernaMeio");
        this.background.setOrigin(0,0);
        this.flag=0;

        this.timer = this.time.addEvent({
            loop: true,
            paused: false
        });
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        this.contaPaus=this.listaPaus.length;
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');

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
        this.setaL = this.physics.add.staticGroup();
        this.setaL.create(50,400,'setaLeft');


        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("cavernaF",{listaPaus:this.listaPaus,nomeuser:this.nomeuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY:400});
        });

        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("cavernaLago",{listaPaus:this.listaPaus,nomeuser:this.nomeuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 570, posY: 400});
        });
        
        //posição do cenario fora da gruta
        this.entradaesquerda=313;
        this.entradadireita=383;
        
        //posiçao da parede
        this.parede = 255;

        //PAU CAVERNA MEIO
        if(this.listaPaus.includes("pauCavernaMeio")==false){
            this.pau1 = this.physics.add.staticGroup();
            this.pau1.create(200,config.width-130,'pau');
            this.physics.add.collider(this.player, this.pau1,this.incrementaPaus, null, { this: this, nomepau: "pauCavernaMeio"});
        }
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
            this.scene.launch("pausa",{background:this.background, sceneName:"cavernaMeio"});
        }

        this.colCenario();
    }

    colCenario(){
        if (this.player.y < this.parede){
            this.player.y=this.parede;
        }
    }

    incrementaPaus(player,pau){
        this.this.contaPaus++;    
        this.this.listaPaus.push(this.nomepau);
        this.this.textoContaPaus.setText('x '+this.this.contaPaus);
        pau.destroy();
    }
}