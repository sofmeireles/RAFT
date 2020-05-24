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
    }
    create(){
        console.log("entradaCaverna page");
        console.log("tempo: "+this.tempo);
        this.background = this.add.image(0,0,"entradaCaverna");
        this.background.setOrigin(0,0);

        this.contaPaus=this.listaPaus.length;        
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');

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

        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.setaR = this.physics.add.staticGroup();
        this.setaR.create(670,400,'setaRight');
        this.setaU = this.physics.add.staticGroup();
        this.setaU.create(30,270,'setaUp');

        this.physics.add.collider(this.player, this.setaU,()=> {
            this.scene.start("cavernaF",{listaPaus:this.listaPaus,nomeuser:this.nomeuser,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 490, posY: 405});
        });

        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("praia",{listaPaus:this.listaPaus,nomeuser:this.nomeuser,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 250, posY: 215});
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
    
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.anims.play("left", true);
            console.log("x " + this.player.x);
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
            console.log("y " + this.player.y);
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
        pau.disableBody(true, true);
    }

}