class Inicio extends Phaser.Scene {
    constructor(){
        super("inicio");
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
        this.background = this.add.image(0,0,"floresta");
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

        this.fogueira = this.physics.add.sprite(490, 370, 'fogueira');
        this.fogueira.setCollideWorldBounds(true);
        this.fogueira.setBounce(0.2);
        this.fogueira.body.width = 50;
        this.fogueira.body.height = 50;
        this.fogueira.body.setSize(this.fogueira.body.width, this.fogueira.body.height, true);
        this.fogueira.setScale(0.3);
        this.fogueira.setImmovable();

        this.mesa = this.physics.add.sprite(400, 240, 'mesa');
        this.mesa.setCollideWorldBounds(true);
        this.mesa.setBounce(0.2);
        this.mesa.body.width = 50;
        this.mesa.body.height = 15;
        this.mesa.body.setSize(this.mesa.body.width, this.mesa.body.height, true);
        this.mesa.setScale(1.2);
        this.mesa.setImmovable();

        this.tenda = this.physics.add.sprite(660, 240, 'tenda');
        this.tenda.setCollideWorldBounds(true);
        this.tenda.setBounce(0.2);
        this.tenda.body.width = 150;
        this.tenda.body.height = 50;
        this.tenda.body.setSize(this.tenda.body.width, this.tenda.body.height, true);
        this.tenda.setScale(1.2);
        this.tenda.setImmovable();

        this.lenha = this.physics.add.sprite(670, 270, 'lenha');
        this.lenha.setCollideWorldBounds(true);
        this.lenha.setBounce(0.2);
        this.lenha.body.width = 50;
        this.lenha.body.height = 50;
        this.lenha.body.setSize(this.lenha.body.width, this.lenha.body.height, true);
        this.lenha.setScale(0.2);
        this.lenha.setImmovable();


        this.player=this.physics.add.sprite(config.width/2,config.height/2,'boneco');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.body.width = 70;
        this.player.body.height = 110;
        this.player.body.setSize(this.player.body.width, this.player.body.height, true);

        this.player.x = this.posX;
        this.player.y = this.posY;
        this.player.setScale(config.scalePlayer);
        this.lookingRight = true;


        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.setaR = this.physics.add.staticGroup();
        this.setaR.create(670,400,'setaRight');
        this.setaD = this.physics.add.staticGroup();
        this.setaD.create(350,670,'setaDown');
        this.setaL = this.physics.add.staticGroup();
        this.setaL.create(30,400,'setaLeft');

        this.physics.add.collider(this.player, this.setaR,()=> {
            this.scene.start("floresta",{easterEggs:this.easterEggs,chave:this.chave,firstTime: this.firstTime,listaPaus: this.listaPaus, nameuser: this.nameuser, listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual, posX: 130, posY: 400});
        });

        this.physics.add.collider(this.player, this.setaD,()=> {
            this.scene.start("praiaMeio",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,listaPaus: this.listaPaus, nameuser: this.nameuser,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 350, posY: 230});
        });

        this.physics.add.collider(this.player, this.setaL,()=> {
            this.scene.start("bau",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,listaPaus: this.listaPaus, nameuser: this.nameuser,listaPerguntas:this.listaPerguntas, tempo:this.tempoAtual, posX: 570, posY: 400});
        });

        this.physics.add.collider(this.player, this.mesa);
        this.physics.add.collider(this.player, this.tenda);
        this.physics.add.collider(this.player, this.fogueira);

    
        this.floresta = 220;
        this.conta=0;

        //fade
        /* this.transp=0.5;
        this.veil=this.add.graphics({x:0,y:0});
        this.veil.fillStyle('0xffffff',0.5); */

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
            this.scene.launch("pausa",{background:this.background, sceneName:"inicio"});
        }
        
        this.colCenario();
    }

    colCenario(){
        if (this.player.y < this.floresta){
            this.player.y=this.floresta;
        }
    }

}