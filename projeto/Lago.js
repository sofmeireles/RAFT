class Lago extends Phaser.Scene {
    constructor(){
        super("lago");
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
        this.easterEggs=data.easterEggs;
    }
    create(){
        this.background = this.add.image(0,0,"lago");
        this.background.setOrigin(0,0);
        /* this.golem=this.add.image(350,150,'golem');
        this.golem.setScale(1.3); */
        this.flag=0;

        this.timer = this.time.addEvent({
            loop: true,
            paused: false
        });
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        this.contaPaus=this.listaPaus.length;
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});

        this.folhas = this.physics.add.staticGroup();
        this.folhas.create(280, 270, 'folhasbounds');
        this.folhas.create(240, 270, 'folhasbounds');
        this.folhas.create(210, 270, 'folhasbounds');
        this.folhas.create(480, 270, 'folhasbounds');
        this.folhas.create(440, 270, 'folhasbounds');
        this.folhas.create(410, 270, 'folhasbounds');

        this.player=this.physics.add.sprite(config.width/2,config.height/2,'boneco');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.body.width = 70;
        this.player.body.height = 110;
        this.player.body.setSize(this.player.body.width, this.player.body.height, true);
        this.player.setScale(config.scalePlayer);
        this.player.x = this.posX;
        this.player.y = this.posY+100;
        this.lookingRight = true;


        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.physics.add.collider(this.player, this.folhas);
        //limites
        this.entradaesquerda=313;
        this.entradadireita=383;
        this.limiteY = 150;
        this.limiteDireita = 500;
        this.limiteEsquerda = 200;
        this.ponteBaixo = 330;
        this.ponteEsquerda = 320;
        this.ponteDireita = 360;
        this.agua = 210;
        this.agua2 = 220;

        //chave
        if(this.chave==false){
            this.colChave = this.physics.add.staticGroup();
            this.colChave.create(config.height/2,config.width/2,'chave');
            this.physics.add.collider(this.player, this.colChave,this.guardaChave, null, this);
        }
        else{
            this.imChave=this.add.image(configContaPaus.posX-70,configContaPaus.posY+25,'chave');
        }

        this.golem = this.physics.add.staticGroup();
        this.golem.create(350,150,'golem');
        this.physics.add.collider(this.player, this.golem,this.handlerGolem, null,this);
        
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
            this.scene.launch("pausa",{background:this.background, sceneName:"lago"});
        }
        this.colCenario();
    }

    colCenario(){
        if (this.player.x < this.limiteEsquerda){
            this.player.x=this.limiteEsquerda;
        }
        if (this.player.x > this.limiteDireita){
            this.player.x=this.limiteDireita;
        }
        if(this.player.y > this.ponteBaixo){
            this.player.y = this.ponteBaixo;
        }

        if(this.player.x < this.ponteEsquerda && this.player.y < this.agua && this.player.x < this.ponteEsquerda){
            if(this.player.y > this.agua){
                this.player.y = this.agua;
            }
        }

        if(this.player.x > this.ponteDireita && this.player.y < this.agua && this.player.x > this.ponteDireita){
            if(this.player.y > this.agua){
                this.player.y = this.agua;
            }
        }

        if(this.player.y > this.agua2){
            if(this.player.x < this.ponteEsquerda){
                this.player.x = this.ponteEsquerda + 5;
            }
            if(this.player.x > this.ponteDireita){
                this.player.x = this.ponteDireita - 5;
            }
        }
    }

    voltar(){
        if (this.player.x > this.entradaesquerda && this.player.x < this.entradadireita && this.player.y < this.limiteY){
            this.player.setVelocity(0);
            this.scene.pause();
            this.scene.launch("pergunta",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,listaPaus: this.listaPaus,nameuser:this.nameuser,tempo:this.tempoAtual, background:this.background, player:this.player,listaPerguntas:this.listaPerguntas, sceneName:"lago"});
        }
    }

    guardaChave(player,colChave){
        this.chave=true;
        this.imChave=this.add.image(configContaPaus.posX-70,configContaPaus.posY+25,'chave');
        colChave.destroy();
    }

    handlerGolem(){
        this.player.setVelocity(0);
        this.scene.pause();
        this.scene.launch("pergunta",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,listaPaus: this.listaPaus,nameuser:this.nameuser,tempo:this.tempoAtual, background:this.background, player:this.player,listaPerguntas:this.listaPerguntas, sceneName:"lago"});
    }
}