class EntradaCaverna extends Phaser.Scene {
    constructor(){
        super("entradaCaverna");
    }
    
    init(data){
        this.listaPerguntas = data.listaPerguntas;
        this.tempo=data.tempo+0.5;
        this.posX = data.posX;
        this.posY = data.posY;
        this.listaPaus = data.listaPaus;
        this.nameuser=data.nameuser;
        this.firstTime=data.firstTime;
        this.chave=data.chave;
        this.easterEggs=data.easterEggs;
    }
    create(){
        console.log("entradaCaverna page");
        console.log("tempo: "+this.tempo);
        this.background = this.add.image(0,0,"entradaCaverna");
        this.background.setOrigin(0,0);

        this.contaPaus=this.listaPaus.length;        
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');

        if(this.chave==true){
            this.imChave=this.add.image(configContaPaus.posX-70,configContaPaus.posY+25,'chave');
        }

        this.timer = this.time.addEvent({
            loop: true,
            paused: false
        });
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});


        this.player=this.physics.add.sprite(config.width/2,config.height/2,'boneco');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.body.width = 70;
        this.player.body.height = 110;
        this.player.body.setSize(this.player.body.width, this.player.body.height, true);
        this.player.setScale(config.scalePlayer);
        this.player.x = this.posX;
        this.player.y = this.posY;
        this.lookingRight = true;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.setaR = this.physics.add.staticGroup();
        this.setaR.create(670,400,'setaRight');
        this.setaU = this.physics.add.staticGroup();
        this.setaU.create(30,270,'setaUp');

        this.physics.add.collider(this.player, this.setaU,()=> {
            this.scene.start("cavernaF",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,listaPaus:this.listaPaus,nameuser:this.nameuser,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 490, posY: 405});
        });

        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("praia",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,listaPaus:this.listaPaus,nameuser:this.nameuser,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 250, posY: 215});
        });

        // posicao da floresta
        this.floresta = 235;
        this.conta=0;

        //PAU ENTRADA CAVERNA
        if(this.listaPaus.includes("pauEntradaCaverna")==false){
            this.pau1 = this.physics.add.staticGroup();
            this.pau1.create(config.height-10,245,'pau');
            
            this.physics.add.collider(this.player, this.pau1,this.incrementaPaus, null, { this: this, nomepau: "pauEntradaCaverna"});
        }

    }


    update(){
        this.tempoAtual=Math.floor(this.tempo+this.timer.getElapsedSeconds());
        this.text.setText('Tempo: '+ this.tempoAtual);

        if(this.cursors.left.isDown && this.cursors.up.isUp && this.cursors.down.isUp){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.setVelocityY(0);
            this.player.anims.play("left", true);
            this.lookingRight = false;
        }
        else if (this.cursors.left.isDown && this.cursors.up.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.setVelocityY(-gameSettings.playerSpeed);
            this.player.anims.play("back", true);
            this.lookingRight = false;
        }
        else if (this.cursors.left.isDown && this.cursors.down.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.setVelocityY(gameSettings.playerSpeed);
            this.player.anims.play("leftdown", true);
            this.lookingRight = false;
        }
        else if(this.cursors.right.isDown && this.cursors.up.isUp && this.cursors.down.isUp){
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.setVelocityY(0);
            this.player.anims.play("right", true);
            this.lookingRight = true;
        }
        else if (this.cursors.right.isDown && this.cursors.up.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.setVelocityY(-gameSettings.playerSpeed);
            this.player.anims.play("back", true);
            this.lookingRight = true;
        }
        else if (this.cursors.right.isDown && this.cursors.down.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.setVelocityY(gameSettings.playerSpeed);
            this.player.anims.play("rightdown", true);
            this.lookingRight = true;
        }
        else if(this.cursors.up.isDown && this.cursors.left.isUp && this.cursors.right.isUp){
            this.player.setVelocityY(-gameSettings.playerSpeed);
            this.player.setVelocityX(0);
            this.player.anims.play("back", true);
        }
        else if (this.cursors.down.isDown && this.cursors.left.isUp && this.cursors.right.isUp){
            this.player.setVelocityY(gameSettings.playerSpeed);
            this.player.setVelocityX(0);
            this.player.anims.play("right", true);
        }
        else{
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            if(this.lookingRight){
                this.player.anims.play("stopdireita");
            }
            else{
                this.player.anims.play("stopesquerda");
            }
        }
        
        if(Phaser.Input.Keyboard.JustDown(this.pause)){
            this.scene.pause();
            this.scene.launch("pausa",{background:this.background, sceneName:"entradaCaverna"});
        }
        
        this.colCenario();
    }


    colCenario(){
        if (this.player.y < this.floresta){
            this.player.y=this.floresta;
        }
    }

    incrementaPaus(player,pau){
        this.this.contaPaus++;    
        this.this.listaPaus.push(this.nomepau);
        this.this.textoContaPaus.setText('x '+this.this.contaPaus);
        pau.destroy();
    }

}