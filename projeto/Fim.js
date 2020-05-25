class Fim extends Phaser.Scene {
    constructor(){
        super("fim");
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
        console.log("fim page");
        console.log("tempo: "+this.tempo);
        this.background = this.add.image(0,0,"fim");
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


        this.pausEmFalta = 12 - this.listaPaus.length;

        var texto = "Prima 'I'";

        this.textoEscrito = this.add.text(250,510,texto,{font: "18px Helvetica", fill: 'black'});

        this.palmeira1 = this.physics.add.sprite(45, 215, 'palmeirabound');
        this.palmeira1.setCollideWorldBounds(true);
        this.palmeira1.body.width = 11;
        this.palmeira1.body.height = 10;
        this.palmeira1.setSize(this.palmeira1.body.width, this.palmeira1.height, true);
        this.palmeira1.setImmovable();

        this.palmeira2 = this.physics.add.sprite(295, 215, 'palmeirabound');
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

        this.pedra2 = this.physics.add.sprite(340, 290, 'pedrapraia');
        this.pedra2.setCollideWorldBounds(true);
        this.pedra2.body.width = 10;
        this.pedra2.body.height = 10;
        this.pedra2.setSize(this.pedra2.body.width, this.pedra2.height, true);
        this.pedra2.setImmovable();

        this.jangadaEstragada = this.physics.add.sprite(420, 520, 'jangada');
        this.jangadaEstragada.body.width = 50;
        this.jangadaEstragada.body.height = 50;
        this.jangadaEstragada.body.setSize(this.jangadaEstragada.body.width, this.jangadaEstragada.body.height, true);
        this.jangadaEstragada.setScale(0.5);
        this.jangadaEstragada.setImmovable();
        // this.physics.add.overlap(this.player, this.jangada, this.handleJangada, null, this);

        this.jangadaFinal = this.physics.add.sprite(420, 520, 'jangadaFinal');
        this.jangadaFinal.body.width = 50;
        this.jangadaFinal.body.height = 50;
        this.jangadaFinal.body.setSize(this.jangadaFinal.body.width, this.jangadaFinal.body.height, true);
        this.jangadaEstragada.setScale(0.5);
        this.jangadaFinal.visible = false;

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
        this.teste = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        

        this.setaL = this.physics.add.staticGroup();
        this.setaL.create(20,470,'setaLeft');

        this.physics.add.collider(this.player, this.palmeira1);
        this.physics.add.collider(this.player, this.palmeira2);
        this.physics.add.collider(this.player, this.pedra1);
        this.physics.add.collider(this.player, this.pedra2);

        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("praiaMeio",{chave:this.chave,firstTime:this.firstTime,nameuser:this.nameuser,listaPaus:this.listaPaus,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 570, posY: 400});
        });

        // posicao da floresta
        this.inferior = 490;
        this.lateral = 405;
        this.conta=0;

        this.carregou=0;
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
            this.scene.launch("pausa",{background:this.background, sceneName:"fim"});
        }

        if(Phaser.Input.Keyboard.JustDown(this.teste)){
            if(this.listaPaus.length < 12){
                this.scene.pause();
                this.scene.launch("mensagemJangada",{background:this.background, sceneName:"fim",listaPaus:this.listaPaus});
                this.carregou=1;
            }
            else{
                console.log("FINALL");
                this.jangadaFinal.visible = true;
                this.jangadaEstragada.visible = false;
                console.log(this.nameuser);
                console.log(this.tempoAtual);
                //this.restartRank();
                if(this.carregou==1){
                    var pontos = JSON.parse(localStorage.getItem('pontuacao'));
                    var novo={nome:this.nameuser,pontuacao:this.tempoAtual};
                    pontos.push(novo);
                    localStorage.setItem('pontuacao',JSON.stringify(pontos));
                }
                
            }
        }
        
        this.colCenario();
    }


    colCenario(){
        if (this.player.y > this.inferior){
            this.player.y=this.inferior;
        }
        if (this.player.x > this.lateral){
            this.player.x=this.lateral;
        }
    }

    restartRank(){
        var pontos = JSON.parse(localStorage.getItem('pontuacao'));
        for(var i = 0;i<pontos.length;i++){
            pontos.pop();
        }
        localStorage.setItem('pontuacao',JSON.stringify(pontos));
    }

}