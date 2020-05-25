class Creditos extends Phaser.Scene {
    constructor(){
        super("creditos");
    }

    create(){
        this.background = this.add.image(0,0,"creditos");
        this.background.setOrigin(0,0);

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
            this.scene.start("menu1")
        });

        var texto="Jogo desenvolvido no âmbito da cadeira\n\nde Multimédia da Licenciatura em Engenharia\n\nInformática,da Universidade de Coimbra,\n\nno ano letivo 2019/2020.\n\n\nAutores:\n\nGuilherme Gaspar | José Gaspar | Sofia Meireles";

        this.add.text(155,250,texto,{font: "18px Helvetica", fill: 'black'});

    }

   
}