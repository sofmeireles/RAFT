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


        if(this.pausEmFalta==0){
            this.tempoFim = this.time.addEvent({
                loop: true,
                paused: true,
            });
        }

        var texto = "Prima 'I'";

        this.textoEscrito = this.add.text(250,510,texto,{font: "18px Helvetica", fill: 'black'});

        this.jangadaEstragada = this.physics.add.sprite(420, 520, 'jangada');
        this.jangadaEstragada.body.width = 50;
        this.jangadaEstragada.body.height = 50;
        this.jangadaEstragada.body.setSize(this.jangadaEstragada.body.width, this.jangadaEstragada.body.height, true);
        this.jangadaEstragada.setScale(0.6);
        this.jangadaEstragada.setImmovable();
        // this.physics.add.overlap(this.player, this.jangada, this.handleJangada, null, this);

        this.jangadaFinal = this.physics.add.sprite(420, 520, 'jangadaFinal');
        //this.jangadaFinal.body.width = 50;
        //this.jangadaFinal.body.height = 50;
        this.jangadaFinal.body.setSize(this.jangadaFinal.body.width, this.jangadaFinal.body.height, true);
        this.jangadaFinal.setScale(0.5);
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


        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.teste = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        

        this.setaL = this.physics.add.staticGroup();
        this.setaL.create(20,400,'setaLeft');

        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("praiaMeio",{chave:this.chave,firstTime:this.firstTime,nameuser:this.nameuser,listaPaus:this.listaPaus,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 570, posY: 400});
        });

        // posicao da floresta
        this.inferior = 490;
        this.lateral = 405;
        this.conta=0;

        //variaveis para o fim
        this.carregou=0;
        this.jangX=420;
        this.jangY=520;
        this.transp=0;
        this.veil=this.add.graphics({x:0,y:0});

    }


    update(){
        this.tempoAtual=Math.floor(this.tempo+this.timer.getElapsedSeconds());
        this.text.setText('Tempo: '+ this.tempoAtual);
    
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.anims.play("left", true);
            console.log("x " + this.player.x);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
            console.log("x " + this.player.x);
        }
        else if (this.cursors.up.isDown || this.cursors.down.isDown){
            this.player.setVelocityX(0);

        }

        if (this.cursors.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
            this.player.anims.play("back", true);
            console.log("y " + this.player.y);
        }
        else if (this.cursors.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
            this.player.anims.play("right", true);
            console.log("y " + this.player.y);
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
            this.scene.launch("pausa",{background:this.background, sceneName:"fim"});
        }

        if(Phaser.Input.Keyboard.JustDown(this.teste)){
            if(this.listaPaus.length < 12){
                this.scene.pause();
                this.scene.launch("mensagemJangada",{background:this.background, sceneName:"fim",listaPaus:this.listaPaus});
            }
            else{
                console.log("FINALL");
                this.carregou=1;
                this.starTime=this.tempoAtual;
                this.jangadaFinal.visible = true;
                this.jangadaEstragada.visible = false;
                this.posX=363;
                this.posY=525;
                this.player.setCollideWorldBounds(false);          
            }


        }
        if(this.carregou==1){
            this.animFinal();
        }
        
        this.colCenario();
    }


    colCenario(){
        if (this.player.y > this.inferior && this.carregou!=1){
            this.player.y=this.inferior;
        }
        if (this.player.x > this.lateral && this.carregou!=1){
            this.player.x=this.lateral;
        }
    }

    animFinal(){
        this.pause.destroy();
        this.teste.destroy();
        if(this.tempoAtual-this.starTime>0.5 && this.tempoAtual-this.starTime<=2){
            this.jangX+=1.2;
            this.posX+=1.2;
            this.player.setPosition(this.posX,this.posY);
            this.jangadaFinal.setPosition(this.jangX,this.jangY);
        }
        else if(this.tempoAtual-this.starTime>2 && this.tempoAtual-this.starTime<9){
            this.jangY-=1.5;
            this.posY-=1.5;
            this.player.setPosition(this.posX,this.posY);
            this.jangadaFinal.setPosition(this.jangX,this.jangY);
            if(this.tempoAtual-this.starTime>5){
                this.transp+=0.0002;
                if(this.transp>1){
                    this.transp=1;
                }
                this.veil.fillStyle('0x000000',this.transp);
                this.veil.fillRect(0,0,config.width, config.height);
            }

        }
        else if(this.tempoAtual-this.starTime>9){
            this.jangadaFinal.destroy();
            this.player.destroy();
            this.scene.stop();
            this.scene.start("cenaFinal",{nameuser:this.nameuser,pontuacao:Math.floor(this.starTime)});
        }

    }

}