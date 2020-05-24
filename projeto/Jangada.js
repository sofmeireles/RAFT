class Jangada extends Phaser.Scene {
    constructor(){
        super("jangada");
    }
    
    init(data){
        this.listaPerguntas = data.listaPerguntas;
        this.tempo=data.tempo+0.5;
        this.posX = data.posX;
        this.posY = data.posY;
        this.listaPaus=data.listaPaus;
        this.nameuser=nameuser;
        this.firstTime=data.firstTime;
        this.chave=data.chave;
    }
    create(){
        var x=400;
        var y=250;
        /* this.background = this.add.image(0,0,"lago");
        this.background.setOrigin(0,0);
        this.veil=this.add.graphics({x:0,y:0});
        this.veil.fillStyle('0x000000',0.3);
        this.veil.fillRect(0,0,config.width, config.height); */
        this.imagem = this.add.image(config.width/2,config.height/2,'fim');
        var tam=this.listaPerguntas.length;
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        this.player.setPosition(405,490);
        this.player.setVelocity(0);

        this.contaPaus=this.listaPaus.length;
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});

        if(this.chave==true){
            this.imChave=this.add.image(configContaPaus.posX-60,configContaPaus.posY+20,'chave');
            this.imChave.setScale(0.3);
        }
        
        if(this.chave==true){
            this.imChave=this.add.image(configContaPaus.posX-60,configContaPaus.posY+20,'chave');
            this.imChave.setScale(0.3);
        }

        if(tam==0){
            this.respCorreta(true,1);
        }
        else{
            var text=this.add.text(x,y,"Olá sou o troll do lago e\numa vez que entraste só\nte poderei deixar sair\nse responderes corretamente\na uma questão",{font: "20px Helvetica", fill: 'black'});

            //btn continuar
            this.btnCont = this.add.image(550,400,'btnContinuar');
            this.btnCont.setScale(0.2);
            this.btnContc = this.add.image(550,400,'btnContinuarc');
            this.btnContc.setScale(0.2);
            this.btnContc.visible=false;

            //interações do btnCont
            this.btnCont.setInteractive();

            this.btnCont.on("pointerover", ()=>{
                this.game.canvas.style.cursor = "pointer";
                this.btnContc.visible=true;
            });

            this.btnCont.on("pointerout", ()=>{
                this.game.canvas.style.cursor = "default";
                this.btnContc.visible=false;
            });

            this.btnCont.on("pointerup", ()=>{
                text.setText('');
                this.btnCont.destroy();
                this.btnContc.destroy();
                this.gerapergunta();
            });

        }
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
        
        this.colCenario();
        this.mensagem();
    }


    colCenario(){
        if (this.player.y > this.inferior){
            this.player.y=this.inferior;
        }
        if (this.player.x > this.lateral){
            this.player.x=this.lateral;
        }
    }

    mensagem(){
        if(this.player.x > this.jangadaX && this.player.y > this.jangadaY){
            this.scene.pause();
            this.scene.launch("jangada",{background:this.background, sceneName:"fim"})
        }
    }

}