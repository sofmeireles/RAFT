class Praia extends Phaser.Scene {
    constructor(){
        super("praia");
    }
    
    init(data){
        this.listaPerguntas = data.listaPerguntas;
        this.tempo=data.tempo+0.5;
        this.posX = data.posX;
        this.posY = data.posY;
        this.listaPaus=data.listaPaus;
        this.nameuser=data.nameuser;
        this.firstTime=data.firstTime;
        this.chave=data.chave;
    }
    create(){
        console.log("praia page");
        console.log("tempo: "+this.tempo);
        this.background = this.add.image(0,0,"praia");
        this.background.setOrigin(0,0);
        

        this.timer = this.time.addEvent({
            loop: true,
            paused: false
        });

        this.contaPaus=this.listaPaus.length;
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});
        
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        if(this.chave==true){
            this.imChave=this.add.image(configContaPaus.posX-70,configContaPaus.posY+25,'chave');
        }

        this.palmeira1 = this.physics.add.sprite(185, 230, 'palmeirabound');
        this.palmeira1.setCollideWorldBounds(true);
        this.palmeira1.body.width = 11;
        this.palmeira1.body.height = 10;
        this.palmeira1.setSize(this.palmeira1.body.width, this.palmeira1.height, true);
        this.palmeira1.setImmovable();

        this.palmeira2 = this.physics.add.sprite(335, 220, 'palmeirabound');
        this.palmeira2.setCollideWorldBounds(true);
        this.palmeira2.body.width = 11;
        this.palmeira2.body.height = 10;
        this.palmeira2.setSize(this.palmeira2.body.width, this.palmeira2.height, true);
        this.palmeira2.setImmovable();

        this.palmeira3 = this.physics.add.sprite(650, 305, 'palmeirabound');
        this.palmeira3.setCollideWorldBounds(true);
        this.palmeira3.body.width = 11;
        this.palmeira3.body.height = 10;
        this.palmeira3.setSize(this.palmeira3.body.width, this.palmeira3.height, true);
        this.palmeira3.setImmovable();

        this.palmeira4 = this.physics.add.sprite(485, 405, 'palmeirabound');
        this.palmeira4.setCollideWorldBounds(true);
        this.palmeira4.body.width = 11;
        this.palmeira4.body.height = 10;
        this.palmeira4.setSize(this.palmeira4.body.width, this.palmeira4.height, true);
        this.palmeira4.setImmovable();

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
        this.setaL = this.physics.add.staticGroup();
        this.setaL.create(150,140,'setaLeft');


        this.physics.add.collider(this.player, this.palmeira1);
        this.physics.add.collider(this.player, this.palmeira2);
        this.physics.add.collider(this.player, this.palmeira3);
        this.physics.add.collider(this.player, this.palmeira4);
        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("entradaCaverna",{chave:this.chave,firstTime:this.firstTime,listaPaus:this.listaPaus,nameuser:this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 570, posY: 400});
        });

        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("praiaMeio",{chave:this.chave,firstTime:this.firstTime,listaPaus:this.listaPaus,nameuser:this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY: 400});
        });

        // posicao da floresta
        this.florestaX = 150;
        this.florestaY = 100;
        this.mar = 450;
        this.conta=0;
    }


    update(){
        this.tempoAtual=Math.floor(this.tempo+this.timer.getElapsedSeconds());
        this.text.setText('Tempo: '+ this.tempoAtual);

        if(this.cursors.left.isDown && this.cursors.up.isUp && this.cursors.down.isUp){
            this.player.setVelocityX(-gameSettings.playerSpeed);
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
            this.player.anims.play("back", true);
        }
        else if (this.cursors.down.isDown && this.cursors.left.isUp && this.cursors.right.isUp){
            this.player.setVelocityY(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
        }
        else{
            this.player.setVelocity(0);
            if(this.lookingRight){
                this.player.anims.play("stopdireita");
            }
            else{
                this.player.anims.play("stopesquerda");
            }
        }
        
        if(Phaser.Input.Keyboard.JustDown(this.pause)){
            this.scene.pause();
            this.scene.launch("pausa",{background:this.background, sceneName:"praia"});
        }
        
        this.colCenario();
    }


    colCenario(){
        if (this.player.x < this.florestaX){
            this.player.x=this.florestaX;
        }
        if(this.player.y > this.mar){
            this.player.y = this.mar;
        }
        if(this.player.y < this.florestaY){
            this.player.y = this.florestaY;
        }
    }

}