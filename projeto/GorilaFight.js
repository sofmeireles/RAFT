class GorilaFight extends Phaser.Scene {
    constructor(){
        super("gorilafight");
    }
    init(data){
        this.tempo=data.tempo;
        this.listaPerguntas=data.listaPerguntas;
        this.posX = data.posX;
        this.posY = data.posY;
        this.listaPaus = data.listaPaus;
        this.nameuser=data.nameuser;
        this.firstTime=data.firstTime;
        this.chave=data.chave;

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
        this.lookingRight = true;
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
        //this.physics.add.collider(this.player, this.projectiles);
        this.physics.add.collider(this.player, this.plataforma);

        this.timer = this.time.addEvent({
            loop: true,
            paused: false
        });
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        this.contaPaus=this.listaPaus.length;
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});

        if(this.chave==true){
            this.imChave=this.add.image(configContaPaus.posX-70,configContaPaus.posY+25,'chave');
        }

        this.intervalo = this.time.addEvent({
            loop: true,
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);



        //PAUS
        this.pausApanhados=0;
        this.numTotalPaus=4;
        this.pau1 = this.physics.add.staticGroup();
        this.pau1.create(10,545,'pau');
        this.physics.add.collider(this.player, this.pau1,this.incrementaPaus, null, { this: this, nomepau: "pau"});
        this.pau1.create(445,405,'pau');
        this.physics.add.collider(this.player, this.pau1,this.incrementaPaus, null, { this: this, nomepau: "pau"});
        this.pau1.create(675,125,'pau');
        this.physics.add.collider(this.player, this.pau1,this.incrementaPaus, null, { this: this, nomepau: "pau"});
        this.pau1.create(250,160,'pau');
        this.physics.add.collider(this.player, this.pau1,this.incrementaPaus, null, { this: this, nomepau: "pau"});

    
        this.physics.add.overlap(this.player, this.projectiles, this.respawn, null, {this: this, banana:this.banana});
        
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
            this.player.anims.play("leftdown", true);
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
            this.player.anims.play("rightdown", true);
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
            this.scene.launch("pausa",{background:this.background, sceneName:"gorilafight"});
        }

        if(this.pausApanhados==this.numTotalPaus){
            this.addSeta();
        }
    }

    lançaBanana(){
        this.gorila.play("lancar",true);
        var banana= new Banana(this);
        this.projectiles.add(banana);
    }
    incrementaPaus(player,pau){
        this.this.contaPaus++;
        this.this.pausApanhados++;   
        this.this.listaPaus.push(this.nomepau);
        this.this.textoContaPaus.setText('x '+this.this.contaPaus);
        pau.destroy();
    }

    respawn(player, bananas) {
        player.x = 130;
        player.y = 500;
        bananas.destroy();
    }

    addSeta(){
        this.setaR = this.physics.add.staticGroup();
        this.setaR.create(670,config.height-50,'setaRight');
        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("floresta",{chave:this.chave,firstTime:this.firstTime,listaPaus: this.listaPaus, nameuser: this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY: 400});
        }); 
    }

}