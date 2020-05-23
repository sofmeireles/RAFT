class Lago extends Phaser.Scene {
    constructor(){
        super("lago");
    }
    init(data){
        this.listaPerguntas = data.listaPerguntas;
        this.tempo=data.tempo+0.5;
        this.posX = data.posX;
        this.posY = data.posY;
    }
    create(){
        console.log("lago page");
        console.log(this.listaPerguntas);
        console.log("tempo: "+this.tempo);
        this.background = this.add.image(0,0,"lago");
        this.background.setOrigin(0,0);
        this.flag=0;

        this.timer = this.time.addEvent({
            loop: true,
            paused: false
        });
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});


        this.player=this.physics.add.sprite(config.width/2,config.height/2,'boneco');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.setScale(config.scalePlayer);
        this.player.x = this.posX;
        this.player.y = this.posY;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
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
        
    }

    
    update(){
        this.tempoAtual=Math.floor(this.tempo+this.timer.getElapsedSeconds());
        this.text.setText('Tempo: '+ this.tempoAtual);
        //console.log(this.listaPerguntas);
        //console.log(this.tempo);

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
            this.scene.launch("pausa",{background:this.background, sceneName:"lago"});
        }

        this.voltar();
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
            this.scene.launch("pergunta",{tempo:this.tempoAtual, background:this.background, player:this.player,listaPerguntas:this.listaPerguntas, sceneName:"lago"});
        }
    }
}