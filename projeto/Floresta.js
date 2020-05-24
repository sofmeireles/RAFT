class Floresta extends Phaser.Scene {
    constructor(){
        super("floresta");
    }

    init(data){
        this.listaPerguntas = data.listaPerguntas;
        this.tempo=data.tempo+0.5;
        this.posX = data.posX;
        this.posY = data.posY;
        this.listaPaus= data.listaPaus;
        this.nameuser=data.nameuser;
        this.firstTime=data.firstTime;
    }
    create(){
        console.log("floresta page");
        this.background = this.add.image(0,0,"floresta");
        this.background.setOrigin(0,0);
        this.contaPaus=this.listaPaus.length;
        
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});
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
        this.player.body.width = 70;
        this.player.body.height = 110;
        this.player.body.setSize(this.player.body.width, this.player.body.height, true);

        this.player.x = this.posX;
        this.player.y = this.posY;
        this.player.setScale(config.scalePlayer);


        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.setaR = this.physics.add.staticGroup();
        this.setaR.create(670,400,'setaRight');
        /* this.setaU = this.physics.add.staticGroup();
        this.setaU.create(350,200,'setaUp'); */
        this.setaL = this.physics.add.staticGroup();
        this.setaL.create(30,400,'setaLeft');


        /* 
        this.physics.add.collider(this.player, this.setaU,()=> {
            this.scene.start("gorilafight",{listaPaus: this.listaPaus, nameuser: this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY: 400});
        }); */

        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("preTopo",{listaPaus:this.listaPaus,nameuser:this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY: 400});
        });

        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("inicio",{listaPaus:this.listaPaus,nameuser:this.nameuser,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 570, posY: 400});
        });

        // posicao da floresta
        this.floresta = 220;
        this.conta=0;

        //gorila
        this.porGorila=false;
        if(this.firstTime!=null){
            this.gorila = this.add.image(config.height/2,200,'gorila1');
            this.gorila.setScale(0.5);
            this.porGorila=true;
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
            this.scene.launch("pausa",{background:this.background, sceneName:"floresta"});
        }

        if(this.porGorila==true && this.player.x>config.height/2){
            console.log('balao');
        }


        this.colCenario();
    }

    colCenario(){
        if (this.player.y < this.floresta){
            this.player.y=this.floresta;
        }
    }

}