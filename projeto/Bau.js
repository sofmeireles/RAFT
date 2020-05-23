class Bau extends Phaser.Scene {
    constructor(){
        super("bau");
    }
    
    init(data){
        this.listaPerguntas = data.listaPerguntas;
        this.tempo=data.tempo+0.5;
        this.posX = data.posX;
        this.posY = data.posY;
        this.listaPaus= data.listaPaus;
        this.nameuser=data.nameuser;
    }
    create(){
        console.log("bau page");
        this.background = this.add.image(0,0,"floresta");
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

        this.macaco1 = this.physics.add.sprite(config.width/4, config.height/4, 'macaco');
        this.macaco2 = this.physics.add.sprite(config.width/2, config.height/4, 'macaco');
        this.macaco3 = this.physics.add.sprite(config.width*0.75, config.height/4, 'macaco');
        this.macaco1.setCollideWorldBounds(true);
        this.macaco2.setCollideWorldBounds(true);
        this.macaco3.setCollideWorldBounds(true);
        this.macaco1.setBounce(1);
        this.macaco2.setBounce(1);
        this.macaco3.setBounce(1);
        this.macaco1.body.width = 58;
        this.macaco1.body.height = 41;
        this.macaco1.setSize(this.macaco1.body.width, this.macaco1.body.height, true);
        this.macaco2.body.width = 58;
        this.macaco2.body.height = 41;
        this.macaco2.setSize(this.macaco1.body.width, this.macaco1.body.height, true);
        this.macaco3.body.width = 58;
        this.macaco3.body.height = 41;
        this.macaco3.setSize(this.macaco1.body.width, this.macaco1.body.height, true);
        this.macaco1.play("monkey");
        this.macaco2.play("monkey");
        this.macaco3.play("monkey");
        this.macaco1.setVelocityY(100);
        this.macaco2.setVelocityY(400);
        this.macaco3.setVelocityY(200);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.setaR = this.physics.add.staticGroup();
        this.setaR.create(670,400,'setaRight');

        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("inicio",{listaPaus:this.listaPaus,nameuser:this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY: 400});
        });

        // posicao da floresta
        this.floresta = 220;
        this.conta=0;
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
            this.scene.launch("pausa",{background:this.background, sceneName:"bau"});
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