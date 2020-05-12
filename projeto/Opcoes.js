class Opcoes extends Phaser.Scene {
    constructor(){
        super("opcoes");
    }

    create(){
        console.log("opcoes page");
        this.background = this.add.image(0,0,"opcoes");
        this.background.setOrigin(0,0);

        //btns musica
        this.btnMaisM = this.add.image(370,360,'btnMais');
        this.btnMaisM.setScale(0.028);
        this.btnMaiscM = this.add.image(370,360,'btnMaisc');
        this.btnMaiscM.setScale(0.119);
        this.btnMaiscM.visible=false;

        this.btnMenosM = this.add.image(450,360,'btnMenos');
        this.btnMenosM.setScale(0.028);
        this.btnMenoscM = this.add.image(450,360,'btnMenosc');
        this.btnMenoscM.setScale(0.119);
        this.btnMenoscM.visible=false;

        this.btnMuteM = this.add.image(527,360,'btnMute');
        this.btnMuteM.setScale(0.028);
        this.btnMutecM = this.add.image(527,360,'btnMutec');
        this.btnMutecM.setScale(0.119);
        this.btnMutecM.visible=false;

        //btns som
        this.btnMaisS = this.add.image(370,423,'btnMais');
        this.btnMaisS.setScale(0.028);
        this.btnMaiscS = this.add.image(370,423,'btnMaisc');
        this.btnMaiscS.setScale(0.119);
        this.btnMaiscS.visible=false;

        this.btnMenosS = this.add.image(450,423,'btnMenos');
        this.btnMenosS.setScale(0.028);
        this.btnMenoscS = this.add.image(450,423,'btnMenosc');
        this.btnMenoscS.setScale(0.119);
        this.btnMenoscS.visible=false;

        this.btnMuteS = this.add.image(527,423,'btnMute');
        this.btnMuteS.setScale(0.028);
        this.btnMutecS = this.add.image(527,423,'btnMutec');
        this.btnMutecS.setScale(0.119);
        this.btnMutecS.visible=false;
        
        //btn voltar
        this.btnVoltar = this.add.image(350,550,'btnVoltar');
        this.btnVoltar.setScale(0.07);
        this.btnVoltarc = this.add.image(350,550,'btnVoltarc');
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
            this.scene.start("menu1")
        });


        //interações do btnMaisM
        this.btnMaisM.setInteractive();

        this.btnMaisM.on("pointerover", ()=>{
            console.log("over MaisM");
            this.game.canvas.style.cursor = "pointer";
            this.btnMaiscM.visible=true;
        });
        this.btnMaisM.on("pointerout", ()=>{
            console.log("out MaisM");
            this.game.canvas.style.cursor = "default";
            this.btnMaiscM.visible=false;
        });
        this.btnMaisM.on("pointerup", ()=>{
            console.log("up MaisM");
        });

        //interações do btnMenosM
        this.btnMenosM.setInteractive();

        this.btnMenosM.on("pointerover", ()=>{
            console.log("over MenosM");
            this.game.canvas.style.cursor = "pointer";
            this.btnMenoscM.visible=true;
        });
        this.btnMenosM.on("pointerout", ()=>{
            console.log("out MenosM");
            this.game.canvas.style.cursor = "default";
            this.btnMenoscM.visible=false;
        });
        this.btnMenosM.on("pointerup", ()=>{
            console.log("up MenosM");
        });

        //interações do btnMuteM
        this.btnMuteM.setInteractive();

        this.btnMuteM.on("pointerover", ()=>{
            console.log("over MuteM");
            this.game.canvas.style.cursor = "pointer";
            this.btnMutecM.visible=true;
        });
        this.btnMuteM.on("pointerout", ()=>{
            console.log("out MuteM");
            this.game.canvas.style.cursor = "default";
            this.btnMutecM.visible=false;
        });
        this.btnMuteM.on("pointerup", ()=>{
            console.log("up MuteM");
        });


        //interações do btnMaisS
        this.btnMaisS.setInteractive();

        this.btnMaisS.on("pointerover", ()=>{
            console.log("over MaisS");
            this.game.canvas.style.cursor = "pointer";
            this.btnMaiscS.visible=true;
        });
        this.btnMaisS.on("pointerout", ()=>{
            console.log("out MaisS");
            this.game.canvas.style.cursor = "default";
            this.btnMaiscS.visible=false;
        });
        this.btnMaisS.on("pointerup", ()=>{
            console.log("up MaisS");
        });

        //interações do btnMenosM
        this.btnMenosS.setInteractive();

        this.btnMenosS.on("pointerover", ()=>{
            console.log("over MenosS");
            this.game.canvas.style.cursor = "pointer";
            this.btnMenoscS.visible=true;
        });
        this.btnMenosS.on("pointerout", ()=>{
            console.log("out MenosS");
            this.game.canvas.style.cursor = "default";
            this.btnMenoscS.visible=false;
        });
        this.btnMenosS.on("pointerup", ()=>{
            console.log("up MenosS");
        });

        //interações do btnMuteS
        this.btnMuteS.setInteractive();

        this.btnMuteS.on("pointerover", ()=>{
            console.log("over MuteS");
            this.game.canvas.style.cursor = "pointer";
            this.btnMutecS.visible=true;
        });
        this.btnMuteS.on("pointerout", ()=>{
            console.log("out MuteS");
            this.game.canvas.style.cursor = "default";
            this.btnMutecS.visible=false;
        });
        this.btnMuteS.on("pointerup", ()=>{
            console.log("up MuteS");
        });

        

    }

   
}