class Topo extends Phaser.Scene {
    constructor(){
        super("topo");
    }
    
    init(data){
        this.listaPerguntas = data.listaPerguntas;
        this.tempo=data.tempo+0.5;
        this.posX = data.posX;
        this.posY = data.posY;
        this.listaPaus=data.listaPaus;
        this.nameuser=data.nameuser;
        this.firstTime=data.firstTime;
    }
    create(){
        console.log("topo page");
        this.background = this.add.image(0,0,"topo");
        this.background.setOrigin(0,0);

        this.contaPaus=this.listaPaus.length;
        
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});

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

        this.setaL = this.physics.add.staticGroup();
        this.setaL.create(20,400,'setaLeft');


        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("preTopo",{firstTime:this.firstTime,nameuser:this.nameuser,listaPaus:this.listaPaus,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 350, posY: 230});
        });

        // posicao da floresta
        this.limiteCima = 230;
        this.conta=0;


        //PAUS TOPO
        var y=270;
        var x=450;
        var esp=30;

        if(this.listaPaus.includes("pauTopo1")==false){
            this.pau1 = this.physics.add.staticGroup();
            this.pau1.create(x+esp,y,'pau');
            this.physics.add.collider(this.player, this.pau1,this.incrementaPaus, null, { this: this, nomepau: "pauTopo1"});
        }

        if(this.listaPaus.includes("pauTopo2")==false){
            this.pau1 = this.physics.add.staticGroup();
            this.pau1.create(x+2*esp,y,'pau');
            this.physics.add.collider(this.player, this.pau1,this.incrementaPaus, null, { this: this, nomepau: "pauTopo2"});
        }

        if(this.listaPaus.includes("pauTopo3")==false){
            this.pau1 = this.physics.add.staticGroup();
            this.pau1.create(x+3*esp,y,'pau');
            this.physics.add.collider(this.player, this.pau1,this.incrementaPaus, null, { this: this, nomepau: "pauTopo3"});
        }
    }


    update(){
        this.tempoAtual=Math.floor(this.tempo+this.timer.getElapsedSeconds());
        this.text.setText('Tempo: '+ this.tempoAtual);
    
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
            this.scene.launch("pausa",{background:this.background, sceneName:"topo"});
        }
        
        this.colCenario();
    }

    colCenario(){
        if (this.player.y < this.limiteCima){
            this.player.y=this.limiteCima;
        }
    }

    incrementaPaus(player,pau){
        this.this.contaPaus++;    
        this.this.listaPaus.push(this.nomepau);
        this.this.textoContaPaus.setText('x '+this.this.contaPaus);
        pau.destroy();
    }
}