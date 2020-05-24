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
        this.firstTime=data.firstTime;
        this.chave=data.chave;
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

        if(this.chave==true){
            this.imChave=this.add.image(configContaPaus.posX-60,configContaPaus.posY+20,'chave');
            this.imChave.setScale(0.3);
        }

        this.pedra1 = this.physics.add.sprite(440, 460, 'pedra');
        this.pedra2 = this.physics.add.sprite(100, 400, 'pedra');
        this.pedra4 = this.physics.add.sprite(170, 550, 'pedra');
        this.pedra5 = this.physics.add.sprite(600, 600, 'pedra');
        this.pedra1.setCollideWorldBounds(true);
        this.pedra2.setCollideWorldBounds(true);
        this.pedra4.setCollideWorldBounds(true);
        this.pedra5.setCollideWorldBounds(true);

        this.pedra1.body.width = 180;
        this.pedra1.body.height = 180;
        this.pedra1.setSize(this.pedra1.body.width, this.pedra1.body.height, true);
        this.pedra1.setScale(0.25);
        this.pedra1.setImmovable();

        this.pedra2.body.width = 180;
        this.pedra2.body.height = 180;
        this.pedra2.setSize(this.pedra2.body.width, this.pedra2.body.height, true);
        this.pedra2.setScale(0.25);
        this.pedra2.setImmovable();

        this.pedra4.body.width = 180;
        this.pedra4.body.height = 180;
        this.pedra4.setSize(this.pedra4.body.width, this.pedra4.body.height, true);
        this.pedra4.setScale(0.25);
        this.pedra4.setImmovable();

        this.pedra5.body.width = 180;
        this.pedra5.body.height = 180;
        this.pedra5.setSize(this.pedra5.body.width, this.pedra5.body.height, true);
        this.pedra5.setScale(0.25);
        this.pedra5.setImmovable();

        this.morcego1 = this.physics.add.sprite(config.width/7, config.height/4, 'morcego');
        this.morcego2 = this.physics.add.sprite(config.width/2, config.height/5, 'morcego');
        this.morcego1.setCollideWorldBounds(true);
        this.morcego2.setCollideWorldBounds(true);
        this.morcego1.setBounce(1);
        this.morcego2.setBounce(1);
        this.morcego1.body.width = 58;
        this.morcego1.body.height = 41;
        this.morcego1.setSize(this.morcego1.body.width, this.morcego1.body.height, true);
        this.morcego1.setScale(0.5);
        this.morcego2.body.width = 58;
        this.morcego2.body.height = 41;
        this.morcego2.setSize(this.morcego2.body.width, this.morcego2.body.height, true);
        this.morcego2.setScale(0.8);
        this.morcego1.play("bat");
        this.morcego2.play("bat");
        this.morcego1.setVelocityX(100);
        this.morcego2.setVelocityX(-100);

        this.player=this.physics.add.sprite(config.width/2,config.height/2,'boneco');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.body.width = 70;
        this.player.body.height = 110;
        this.player.body.setSize(this.player.body.width, this.player.body.height, true);
        this.player.setScale(config.scalePlayer);
        this.player.x = this.posX;
        this.player.y = this.posY;



        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.setaR = this.physics.add.staticGroup();
        this.setaR.create(650,400,'setaRight');
        this.setaL = this.physics.add.staticGroup();
        this.setaL.create(50,400,'setaLeft');

        this.physics.add.collider(this.player, this.pedra1);
        this.physics.add.collider(this.player, this.pedra2);
        this.physics.add.collider(this.player, this.pedra4);
        this.physics.add.collider(this.player, this.pedra5);

        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("cavernaF",{chave:this.chave,firstTime:this.firstTime,listaPaus:this.listaPaus,nomeuser:this.nomeuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY:400});
        });

        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("cavernaLago",{chave:this.chave,firstTime:this.firstTime,listaPaus:this.listaPaus,nomeuser:this.nomeuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 570, posY: 400});
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