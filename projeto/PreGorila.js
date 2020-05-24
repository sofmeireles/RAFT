class PreGorila extends Phaser.Scene {
    
    constructor(){
        super("pregorila");
    }
    init(data){
        this.listaPerguntas=data.listaPerguntas;
        this.sceneName=data.sceneName;
        this.tempo=data.tempo;
        this.nomeuser=data.nomeuser;
        this.listaPaus=data.listaPaus;
        this.firstTime=data.firstTime;
    }
    create(){
        var x=350;
        var y=200;
        this.pausApanhados=0;
        this.player = this.physics.add.sprite(350, 350, 'boneco');
        this.player.setVisible(false);
        this.imagem = this.add.image(config.width/2,config.height/2,'gorilaFalar');
        var tam=this.listaPerguntas.length;
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        this.player.setPosition(350,350);
        this.player.setVelocity(0);

        this.contaPaus=this.listaPaus.length;
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});

        var text=this.add.text(x,y,"uh uh uh ah ah\nuh uh uh ah ah\nuh uh uh ah ah\nuh uh uh ah ah\nuh uh uh ah ah",{font: "35px Helvetica", fill: 'black'});

        //btn continuar
        this.btnCont = this.add.image(500,470,'btnContinuar');
        this.btnCont.setScale(0.2);
        this.btnContc = this.add.image(500,470,'btnContinuarc');
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
            this.scene.start("gorilafight",{firstTime:this.firstTime,listaPaus: this.listaPaus, nameuser: this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempo, posX: 130, posY: 400});                
        });

    }
}