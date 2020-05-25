class Ajuda extends Phaser.Scene {
    constructor(){
        super("ajuda");
    }
    init(data){
        this.flag=data.flag;
    }

    create(){
        if(this.flag==null){
            this.background = this.add.image(0,0,"ajuda");
            this.background.setOrigin(0,0);
        }
        else{
            this.background=this.add.image(0,0,"ajudaSemFundo");
            this.background.setOrigin(0,0);
        }

        this.add.image(480,450,'setas');

        //btn voltar
        this.btnVoltar = this.add.image(350,550,'btnVoltar');
        this.btnVoltar.setScale(0.07);
        this.btnVoltarc = this.add.image(350,550,'btnVoltarc');
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
            if(this.flag==null){
                this.scene.start("menu1");
            }
            else{
                this.scene.stop();
                this.scene.resume('pausa');
            }
        });

        var texto='Usar teclas das "setas",\n\nmais propriamente "up","down","left","right",\n\npara mover o boneco no mapa.\n\nTecla Esc para menu pausa.';

        this.add.text(170,220,texto,{font: "18px Helvetica", fill: 'black'});


     

    }

   
}