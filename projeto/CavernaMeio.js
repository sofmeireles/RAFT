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
        this.easterEggs=data.easterEggs;
    }
    create(){
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
            this.imChave=this.add.image(configContaPaus.posX-70,configContaPaus.posY+25,'chave');
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

        this.rato1 = this.physics.add.sprite(350, 350, 'rato');
        //this.rato1.setCollideWorldBounds(true);
        this.rato1.setBounce(1);
        this.rato1.body.width = 20;
        this.rato1.body.height = 10;
        this.rato1.body.setSize(this.rato1.body.width, this.rato1.body.height, true);
        this.rato1.setScale(0.9);
        this.rato1.play("ratodireita");

        this.rato2 = this.physics.add.sprite(350, 350, 'rato');
        //this.rato1.setCollideWorldBounds(true);
        this.rato2.setBounce(1);
        this.rato2.body.width = 20;
        this.rato2.body.height = 10;
        this.rato2.body.setSize(this.rato1.body.width, this.rato1.body.height, true);
        this.rato2.setScale(0.9);
        this.rato2.play("ratoesquerda");

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
        this.lookingRight = true;

        if(this.easterEggs.includes("ghost")==false){
            this.easterEgg = this.physics.add.staticGroup();
            this.easterEgg.create(420,250,'ghost');
            this.physics.add.collider(this.player, this.easterEgg,this.colEasterEgg, null, { this: this, nome: "ghost"});
        }


        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.setaR = this.physics.add.staticGroup();
        this.setaR.create(650,450,'setaRight');
        this.setaL = this.physics.add.staticGroup();
        this.setaL.create(30,450,'setaLeft');

        this.physics.add.collider(this.player, this.pedra1);
        this.physics.add.collider(this.player, this.pedra2);
        this.physics.add.collider(this.player, this.pedra4);
        this.physics.add.collider(this.player, this.pedra5);

        this.physics.add.collider(this.rato1, this.pedra1, ()=>{
            this.rato1.y += 10;
        });
        this.physics.add.collider(this.rato1, this.pedra2, ()=>{
            this.rato1.y += 10;
        });
        this.physics.add.collider(this.rato1, this.pedra3, ()=>{
            this.rato1.y += 10;
        });
        this.physics.add.collider(this.rato1, this.pedra4, ()=>{
            this.rato1.y += 10;
        });
        this.physics.add.collider(this.rato1, this.pedra5, ()=>{
            this.rato1.y += 10;
        });

        this.physics.add.collider(this.rato2, this.pedra1, ()=>{
            this.rato2.y += 10;
        });
        this.physics.add.collider(this.rato2, this.pedra2, ()=>{
            this.rato2.y += 10;
        });
        this.physics.add.collider(this.rato2, this.pedra3, ()=>{
            this.rato2.y += 10;
        });
        this.physics.add.collider(this.rato2, this.pedra4, ()=>{
            this.rato2.y += 10;
        });
        this.physics.add.collider(this.rato2, this.pedra5, ()=>{
            this.rato2.y += 10;
        });

        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("cavernaF",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,listaPaus:this.listaPaus,nameuser:this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY:400});
        });

        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("cavernaLago",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,listaPaus:this.listaPaus,nameuser:this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 570, posY: 400});
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
            this.scene.launch("pausa",{background:this.background, sceneName:"cavernaMeio"});
        }

        this.colCenario();
        this.moverRatoDireita(this.rato1, 3);
        this.moverRatoEsquerda(this.rato2, 2);
    }
    moverRatoDireita(rato, speed){
        rato.x += speed;
        if(rato.x > config.width){
            this.resetRatoDireita(rato);
        }
    }
    moverRatoEsquerda(rato, speed){
        rato.x -= speed;
        if(rato.x < -config.width){
            this.resetRatoEsquerda(rato);
        }
    }
    resetRatoEsquerda(rato){
        rato.x = config.width;
        var randomY = Phaser.Math.Between(config.height/2, config.height-10)
        rato.y = randomY;
    }
    resetRatoDireita(rato){
        rato.x = 0;
        var randomY = Phaser.Math.Between(config.height/2, config.height-10)
        rato.y = randomY;
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