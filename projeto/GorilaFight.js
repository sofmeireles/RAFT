class GorilaFight extends Phaser.Scene {
    constructor(){
        super("gorilafight");
    }
    init(data){
        this.tempo=data.tempo;
        this.listaPerguntas=data.listaPerguntas;
        this.posX = data.posX;
        this.posY = data.posY;
        this.contaPaus = data.contaPaus;

    }
    create(){
        console.log('gorila fight');
        this.background = this.add.image(0,0,"cenarioluta");
        this.background.setOrigin(0,0);
        this.player = this.physics.add.sprite(100, 630, 'boneco');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.body.width = 70;
        this.player.body.height = 110;
        this.player.body.setSize(this.player.body.width, this.player.body.height, true);
        this.player.x = this.posX;
        this.player.y = this.posY;
        this.player.setScale(config.scalePlayer);
        this.player.setGravityY(1000);

        this.gorila=this.add.sprite(config.width/2,50,"gorila");
        this.gorila.setScale(0.5);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();
        this.physics.add.collider(true);
        this.contaTempo=this.tempo;
        this.plataforma = this.physics.add.staticGroup();
        var p = this.add.tileSprite(0, 666, 700, 34, 'plataforma');
        p.setOrigin(0,0);
        this.physics.add.existing(p, true);

        this.plataforma.create(480, 580, 'plataforma');
        this.plataforma.create(240, 530, 'plataforma');
        this.plataforma.create(50, 430, 'plataforma');
        this.plataforma.create(650, 470, 'plataforma');
        this.plataforma.create(0, 570, 'plataforma');
        this.plataforma.create(430, 430, 'plataforma');
        this.plataforma.create(240, 330, 'plataforma');
        this.plataforma.create(350, 330, 'plataforma');
        this.plataforma.create(575, 270, 'plataforma');
        this.plataforma.create(50, 230, 'plataforma');
        this.plataforma.create(360, 110, 'plataforma');
        this.plataforma.create(670, 150, 'plataforma');
        this.plataforma.create(250, 180, 'plataforma');

        this.physics.add.collider(this.player, p);
        this.physics.add.collider(this.player, this.projectiles);
        this.physics.add.collider(this.player, this.plataforma);

        this.timer = this.time.addEvent({
            loop: true,
            paused: false
        });
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});


        this.intervalo = this.time.addEvent({
            loop: true,
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


        /* APAGAAAAAAAAR */
        this.btnVoltar = this.add.image(350,600,'btnVoltar');
        this.btnVoltar.setScale(0.07);
        this.btnVoltarc = this.add.image(350,600,'btnVoltarc');
        this.btnVoltarc.setScale(0.3);
        this.btnVoltarc.visible=false;
        this.btnVoltar.setInteractive();
        this.btnVoltar.on("pointerover", ()=>{
            console.log("over Voltar");
            this.game.canvas.style.cursor = "pointer";
            this.btnVoltarc.visible=true;
        });
        this.btnVoltar.on("pointerout", ()=>{
            console.log("out Voltar");
            this.game.canvas.style.cursor = "default";
            this.btnVoltarc.visible=false;
        });
        this.btnVoltar.on("pointerup", ()=>{
            console.log("up Voltar");
            this.game.canvas.style.cursor = "default";
            this.scene.start("inicio",{nameuser:this.nameuser,contaPaus: this.contaPaus,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual,posX: 130, posY: 400});
        });
        /* ************************************ */

    }
    update(){

        for(var i = 0; i<this.projectiles.children.size; i++){
            var banana= this.projectiles.getChildren()[i];
            banana.update();
        }

        this.tempoAtual=Math.floor(this.tempo+this.timer.getElapsedSeconds());
        this.text.setText('Tempo: '+ this.tempoAtual);
        if(this.contaTempo==this.tempoAtual){
            this.contaTempo+=lancamentoBananas.intervalo;
            this.lançaBanana();
        }

        if (this.cursors.left.isDown && this.cursors.up.isUp && this.player.body.touching.down){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.anims.play("left", true);
            //console.log("x " + this.player.x);
        }
        else if(this.cursors.left.isDown && this.cursors.up.isUp && !this.player.body.touching.down){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.anims.play("left", true);
        }
        else if (this.cursors.left.isDown && this.cursors.up.isDown && !this.player.body.touching.down){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.anims.play("left", true);
        }
        else if (this.cursors.right.isDown && this.cursors.up.isUp && this.player.body.touching.down) {
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
            //console.log("x " + this.player.x);
        }
        else if (this.cursors.right.isDown && this.cursors.up.isUp && !this.player.body.touching.down){
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
        }
        else if (this.cursors.right.isDown && this.cursors.up.isDown && !this.player.body.touching.down){
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
        }
        else if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }

        else{
            //this.player.setVelocityY(0);
            this.player.setVelocityX(0);
            this.player.anims.play("stop");
        }

        if(Phaser.Input.Keyboard.JustDown(this.pause)){
            this.scene.pause();
            this.scene.launch("pausa",{background:this.background, sceneName:"inicio"});
        }
    }

    lançaBanana(){
        this.gorila.play("lancar",true);
        var banana= new Banana(this);
        this.projectiles.add(banana);
    }


}