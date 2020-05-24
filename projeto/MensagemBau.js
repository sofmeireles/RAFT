class MensagemBau extends Phaser.Scene {
    
    constructor(){
        super("mensagemBau");
    }
    init(data){
        this.background=data.background;
        this.sceneName=data.sceneName;
    }
    create(){

        console.log("tempo: "+this.tempo);
        this.background=this.background;
        this.veil=this.add.graphics({x:0,y:0});
        this.veil.fillStyle('0x000000',0.3);
        this.veil.fillRect(0,0,config.width, config.height);
        this.imagem = this.add.image(config.width/2,config.height/2,'pergaminho');

        var texto="Dentro deste baú encontraste mais 3\n\npedaços de madeira para conseguires acabar\n\nde construir a tua jangada.\n\nBoa sorte a tentar escapar aos macacos outra vez!";

        this.add.text(155,250,texto,{font: "18px Helvetica", fill: 'black'});


        //btn voltar
        this.btnVoltar = this.add.image(350,500,'btnVoltar');
        this.btnVoltar.setScale(0.07);
        this.btnVoltarc = this.add.image(350,500,'btnVoltarc');
        this.btnVoltarc.setScale(0.3);
        this.btnVoltarc.visible=false;

        //interações do btnVoltar
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
            this.scene.stop();
            this.scene.resume(this.sceneName);
        });
    }
}