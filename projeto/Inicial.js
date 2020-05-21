class Inicial extends Phaser.Scene {
    constructor(){
        super("inicial");
    }

    preload(){
        this.load.image("capaInicio","./resources/capa_finalmaybe.png");
        this.load.image("btnComecar","./resources/btns/btncomecar.png"); //AIAIAIAIA
        this.load.image("btnComecarc","./resources/claros/btncomecarc.png"); //AIAIAIAIA
        this.load.audio('musica','./resources/musica.mp3');
        console.log('page inicial1');
    }

    create(){
        console.log('page inicial');
        this.background = this.add.image(0,0,"capaInicio");
        this.background.setOrigin(0,0);

        //btn começar
        this.btnComecar = this.add.image(350,600,'btnComecar');
        //this.btnComecar.setScale(0.07);
        this.btnComecarc = this.add.image(351,601,'btnComecarc');
        this.btnComecarc.setScale(0.68);
        this.btnComecarc.visible=false;

        //interações do btnComecar
        this.btnComecar.setInteractive();

        this.btnComecar.on("pointerover", ()=>{
            console.log("over Comecar");
            this.game.canvas.style.cursor = "pointer";
            this.btnComecarc.visible=true;
        });
        this.btnComecar.on("pointerout", ()=>{
            console.log("out Comecar");
            this.game.canvas.style.cursor = "default";
            this.btnComecarc.visible=false;
        });
        this.btnComecar.on("pointerup", ()=>{
            console.log("up Comecar");
            this.game.canvas.style.cursor = "default";
            this.musica = this.sound.add("musica", musicaConfig);
            this.musica.play(musicaConfig);
            this.scene.start("load")
        });

        
    }

}