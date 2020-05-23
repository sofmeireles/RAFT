class Inicio extends Phaser.Scene {
    constructor(){
        super("inicio");
    }
    
    init(data){
        this.listaPerguntas = data.listaPerguntas;
        this.tempo=data.tempo+0.5;
        this.posX = data.posX;
        this.posY = data.posY;
        this.contaPaus= data.contaPaus;
        this.nameuser=data.nameuser;
    }
    create(){
        console.log("inicio page");
        this.background = this.add.image(0,0,"inicio");
        this.background.setOrigin(0,0);

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
        this.player.x = this.posX;
        this.player.y = this.posY;
        this.player.setScale(config.scalePlayer);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.setaR = this.physics.add.staticGroup();
        this.setaR.create(670,400,'setaRight');
        this.setaD = this.physics.add.staticGroup();
        this.setaD.create(350,670,'setaDown');
        this.setaL = this.physics.add.staticGroup();
        this.setaL.create(30,400,'setaLeft');


        // // *************** MUDAR
        // this.setaL = this.physics.add.staticGroup();
        // this.setaL.create(30,400,'setaLeft');
        // this.physics.add.collider(this.player, this.setaL,()=> {
        //     this.scene.start("gorilafight",{contaPaus: this.contaPaus, nameuser: this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY: 400});
        // });
        // // ***************** MUDAR

        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("floresta",{contaPaus: this.contaPaus, nameuser: this.nameuser, listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY: 400});
        });

        this.physics.add.collider(this.player, this.setaD,()=> {
            this.scene.start("praiaMeio",{contaPaus: this.contaPaus, nameuser: this.nameuser,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 350, posY: 230});
        });

        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("bau",{contaPaus: this.contaPaus, nameuser: this.nameuser,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 570, posY: 400});
        });


        // //MUDAR DEPOIS
        // this.physics.add.collider(this.player,this.setaL,()=> {
        //     this.scene.start("gorilafight",{contaPaus: this.contaPaus, nameuser: this.nameuser,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual});
        // });

        // posicao da floresta
        this.floresta = 220;
        this.conta=0;


        //paus
        this.pau1 = this.physics.add.staticGroup();
        this.pau1.create(200,300,'pau');
        this.physics.add.collider(this.player, this.pau1, this.incrementaPaus, null, this);

        this.pau2 = this.physics.add.staticGroup();
        this.pau2.create(600,600,'pau');
        this.physics.add.collider(this.player, this.pau2, this.incrementaPaus, null, this);


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
            this.scene.launch("pausa",{background:this.background, sceneName:"inicio"});
        }
        
        this.colCenario();
    }

    colCenario(){
        if (this.player.y < this.floresta){
            this.player.y=this.floresta;
        }
    }

    incrementaPaus(player,pau){
        this.contaPaus++;
        this.textoContaPaus.setText('x '+this.contaPaus);
        pau.disableBody(true, true);
    }

}