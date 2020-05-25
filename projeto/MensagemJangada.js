class MensagemJangada extends Phaser.Scene {
    constructor(){
        super("mensagemJangada");
    }
    
    init(data){
        this.background=data.background;
        this.sceneName=data.sceneName;
        this.listaPaus = data.listaPaus;
    }
    create(){
        this.background=this.background;
        this.veil=this.add.graphics({x:0,y:0});
        this.veil.fillStyle('0x000000',0.3);
        this.veil.fillRect(0,0,config.width, config.height);
        this.imagem = this.add.image(config.width/2,config.height/2,'pergaminho');

        this.pausEmFalta = 12 - this.listaPaus.length;

        var texto1 = "Oops, esta jangada não está com bom ar.\n\nPrecisas de mais " + this.pausEmFalta + " troncos\n\npara conseguires escapar!";

        this.add.text(160,250,texto1,{font: "18px Helvetica", fill: 'black'});


        //btn voltar
        this.btnVoltar = this.add.image(350,500,'btnVoltar');
        this.btnVoltar.setScale(0.07);
        this.btnVoltarc = this.add.image(350,500,'btnVoltarc');
        this.btnVoltarc.setScale(0.3);
        this.btnVoltarc.visible=false;

        //interações do btnVoltar
        this.btnVoltar.setInteractive();

        this.btnVoltar.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnVoltarc.visible=true;
        });
        this.btnVoltar.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnVoltarc.visible=false;
        });
        this.btnVoltar.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            this.scene.stop();
            this.scene.resume(this.sceneName);
        });
    }
}