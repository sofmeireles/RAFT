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

        this.cliff = this.physics.add.staticGroup();
        this.cliff.create(420,600, 'cliff');
        this.cliff.create(535, 540, 'cliff');
        this.cliff.create(560, 520, 'cliff');
        this.cliff.create(610, 505, 'cliff');
        this.cliff.create(350, 660, 'cliff');
        this.cliff.create(300, 680, 'cliff');
        this.cliff.create(385, 630, 'cliff');

        this.pedra1 = this.physics.add.sprite(400, 500, 'pedra');
        this.pedra2 = this.physics.add.sprite(390, 485, 'pedra');
        this.pedra1.setCollideWorldBounds(true);
        this.pedra2.setCollideWorldBounds(true);

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

        this.arvore1 = this.physics.add.sprite(100, 235, 'arvore');
        this.arvore1.setCollideWorldBounds(true);
        this.arvore1.setBounce(0.2);
        this.arvore1.body.width = 50;
        this.arvore1.body.height = 70;
        this.arvore1.body.setSize(this.arvore1.body.width, this.arvore1.body.height, true);
        this.arvore1.setScale(1.5);
        this.arvore1.setImmovable();

        this.arvore2 = this.physics.add.sprite(625, 200, 'arvore');
        this.arvore2.setCollideWorldBounds(true);
        this.arvore2.setBounce(0.2);
        this.arvore2.body.width = 25;
        this.arvore2.body.height = 70;
        this.arvore2.body.setSize(this.arvore2.body.width, this.arvore2.body.height, true);
        this.arvore2.setScale(1.5);
        this.arvore2.setImmovable();

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

        this.setaL = this.physics.add.staticGroup();
        this.setaL.create(20,400,'setaLeft');


        this.physics.add.collider(this.player, this.arvore1);
        this.physics.add.collider(this.player, this.arvore2);
        this.physics.add.collider(this.player, this.pedra1);
        this.physics.add.collider(this.player, this.pedra2);
        this.physics.add.collider(this.player, this.cliff);
        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("preTopo",{firstTime:this.firstTime,nameuser:this.nameuser,listaPaus:this.listaPaus,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 360, posY: 340});
        });

        // limites
        this.limiteCima = 230;
        this.limiteDireita = 620;
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

        if (this.player.x > this.limiteDireita){
            this.player.x=this.limiteDireita;
        }
    }

    incrementaPaus(player,pau){
        this.this.contaPaus++;    
        this.this.listaPaus.push(this.nomepau);
        this.this.textoContaPaus.setText('x '+this.this.contaPaus);
        pau.destroy();
    }
}