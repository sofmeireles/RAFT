class PraiaMeio extends Phaser.Scene {
    constructor(){
        super("praiaMeio");
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
        console.log("praiaMeio page");
        console.log(this.easterEggs);
        this.background = this.add.image(0,0,"praiaMeio");
        this.background.setOrigin(0,0);
        
        this.contaPaus=this.listaPaus.length;
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});

        if(this.chave==true){
            this.imChave=this.add.image(configContaPaus.posX-70,configContaPaus.posY+25,'chave');
        }

        this.timer = this.time.addEvent({
            loop: true,
            paused: false
        });
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        this.palmeira1 = this.physics.add.sprite(40, 230, 'palmeirabound');
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

        this.pedra1 = this.physics.add.sprite(90, 290, 'pedrapraia');
        this.pedra1.setCollideWorldBounds(true);
        this.pedra1.body.width = 10;
        this.pedra1.body.height = 5;
        this.pedra1.setSize(this.pedra1.body.width, this.pedra1.height, true);
        this.pedra1.setImmovable();

        this.palmeira3 = this.physics.add.sprite(485, 400, 'palmeirabound');
        this.palmeira3.setCollideWorldBounds(true);
        this.palmeira3.body.width = 11;
        this.palmeira3.body.height = 10;
        this.palmeira3.setSize(this.palmeira3.body.width, this.palmeira3.height, true);
        this.palmeira3.setImmovable();

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
        this.setaL.create(30,400,'setaLeft');
        this.setaU = this.physics.add.staticGroup();
        this.setaU.create(350,130,'setaUp');

        this.physics.add.collider(this.player, this.palmeira1);
        this.physics.add.collider(this.player, this.palmeira2);
        this.physics.add.collider(this.player, this.palmeira3);
        this.physics.add.collider(this.player, this.pedra1);

        this.physics.add.collider(this.player, this.setaU,()=> {
            this.scene.start("inicio",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,nameuser: this.nameuser,listaPaus:this.listaPaus,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 350, posY: 570});
        });

        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("fim",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,nameuser: this.nameuser,listaPaus:this.listaPaus,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 130, posY: 400});
        });

        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("praia",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,nameuser: this.nameuser,listaPaus: this.listaPaus,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 570, posY: 400});
        });

        // posicao da floresta
        this.mar = 450;
        this.florestaY = 100;
        this.conta=0;
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
            this.scene.launch("pausa",{background:this.background, sceneName:"praiaMeio"});
        }
        
        this.colCenario();
    }


    colCenario(){
        if (this.player.y > this.mar){
            this.player.y=this.mar;
        }
        if(this.player.y < this.florestaY){
            this.player.y = this.florestaY;
        }
    }
    colEasterEgg(player,easterEgg){   
        this.this.easterEggs.push(this.nome);
        easterEgg.destroy();
        if(this.this.tempo>=gameSettings.descEasterEggs){
            this.this.tempo-=gameSettings.descEasterEggs;
        }
        else{
            this.this.tempo=0;
        }
    }

}