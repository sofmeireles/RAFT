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
        this.firstTime=data.firstTime;
        this.chave=data.chave;
        this.easterEggs=data.easterEggs;
    }
    create(){
        console.log("bau page");
        this.background = this.add.image(0,0,"floresta");
        this.background.setOrigin(0,0);

        this.contaPaus=this.listaPaus.length;        
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');

        if(this.chave==true){
            this.imChave=this.add.image(configContaPaus.posX-70,configContaPaus.posY+25,'chave');
        }

        this.timer = this.time.addEvent({
            loop: true,
            paused: false
        });
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        this.plataforma = this.physics.add.staticGroup();
        this.plataforma.create(config.width/4, 260, 'plataforma');
        this.plataforma.create(config.width/2, 260, 'plataforma');
        this.plataforma.create(config.width*0.65, 260, 'plataforma');

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

        this.macaco1 = this.physics.add.sprite(config.width/4, config.height/2, 'macaco');
        this.macaco2 = this.physics.add.sprite(config.width/2, config.height/2, 'macaco');
        this.macaco3 = this.physics.add.sprite(config.width*0.65, config.height/2, 'macaco');
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
        this.macaco1.setVelocityY(300);
        this.macaco2.setVelocityY(400);
        this.macaco3.setVelocityY(200);


        this.bauaberto = this.physics.add.image(35, 400, 'bauaberto');
        this.bauaberto.visible = false;

        this.bauaberto.body.width = 60;
        this.bauaberto.body.height = 30;
        this.bauaberto.body.setSize(this.bauaberto.body.width, this.bauaberto.body.height, true);

        this.baufechado = this.physics.add.image(35, 400, 'baufechado');
        this.baufechado.visible = false;

        if(this.listaPaus.includes("this.nomepau")==false){
            this.baufechado.visible = true;
            this.baufechado.body.width = 60;
            this.baufechado.body.height = 30;
            this.baufechado.body.setSize(this.baufechado.body.width, this.baufechado.body.height, true);
            this.aberto=0;

            this.physics.add.overlap(this.player, this.baufechado, this.handleBau, null, this);
        } else{
            this.bauaberto.visible = true;
            this.physics.add.overlap(this.player, this.bauaberto, this.handleBauAberto, null, this);
        }


        this.physics.add.collider(this.macaco1, this.plataforma);
        this.physics.add.collider(this.macaco2, this.plataforma);
        this.physics.add.collider(this.macaco3, this.plataforma);

        this.physics.add.overlap(this.player, this.macaco1, this.respawn, null, this);
        this.physics.add.overlap(this.player, this.macaco2, this.respawn, null, this);
        this.physics.add.overlap(this.player, this.macaco3, this.respawn, null, this);

    
        var texto = "Prima 'I'";

        this.textoEscrito = this.add.text(15,450,texto,{font: "20px Helvetica", fill: 'white'});
        this.textoEscrito.visible = false;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.teste = false;

        this.setaR = this.physics.add.staticGroup();
        this.setaR.create(670,400,'setaRight');

        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("inicio",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,listaPaus:this.listaPaus,nameuser:this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY: 400});
        });


        // posicao da floresta
        this.floresta = 220;
        this.conta=0;

        this.lado=1;

        this.flag=0;
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
            this.scene.launch("pausa",{background:this.background, sceneName:"bau"});
        }

        if(Phaser.Input.Keyboard.JustDown(this.teste)){
            this.scene.pause();
            if(this.chave==true){
                this.flag=1;
                console.log("chave");
                this.scene.launch("mensagemBau",{easterEggs:this.easterEggs,flag:this.aberto,chave:true,background:this.background, sceneName:"bau"});
                this.incrementaPaus();
                this.incrementaPaus();
                this.incrementaPaus();
                this.aberto=1;
            }
            else{
                this.scene.launch("mensagemBau",{easterEggs:this.easterEggs,flag:this.aberto,chave:false,background:this.background, sceneName:"bau"});
            }
            if(this.flag==1){
                console.log('ola');
                console.log(this.baufechado);
                this.baufechado.visible=false;
                this.baufechado.destroy();
                this.chave=false;
                this.imChave.destroy();
                // this.scene.pause();
                // this.scene.launch("mensagemBau",{background:this.background, sceneName:"bau"});
                this.bauaberto.visible = true;
            }
        }


        if(this.player.x<config.width/4-10){
            this.lado=0;
        }
        this.colCenario();
    }

    colCenario(){
        if (this.player.y < this.floresta){
            this.player.y=this.floresta;
        }
    }


    respawn(player, macaco3) {
        if(this.lado==1){
            player.x = 570;
            player.y = 400;
        }
        else{
            player.x = 50;
            player.y = 400;
        }
    }

    handleBau(player, baufechado){
        this.textoEscrito.visible=true;
        this.teste = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    }
    handleBauAberto(player,bauaberto){
        this.textoEscrito.visible=true;
        this.teste = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        //this.scene.launch("mensagemBau",{flag:1,chave:false,background:this.background, sceneName:"bau"});
    }

    incrementaPaus(){
        this.contaPaus++;    
        this.listaPaus.push("this.nomepau");
        this.textoContaPaus.setText('x '+this.contaPaus);
    }

}