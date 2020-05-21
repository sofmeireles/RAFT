class Opcoes extends Phaser.Scene {
    constructor(){
        super("opcoes");
    }
    
    create(){
        console.log("opcoes page");
        this.background = this.add.image(0,0,"opcoes");
        this.background.setOrigin(0,0);
        
        //btns musica
        this.btnMenosM = this.add.image(370,391,'btnMenos');
        this.btnMenosM.setScale(0.028);
        this.btnMenoscM = this.add.image(370,391,'btnMenosc');
        this.btnMenoscM.setScale(0.119);
        this.btnMenoscM.visible=false;
        
        this.btnMaisM = this.add.image(450,391,'btnMais');
        this.btnMaisM.setScale(0.028);
        this.btnMaiscM = this.add.image(450,391,'btnMaisc');
        this.btnMaiscM.setScale(0.119);
        this.btnMaiscM.visible=false;
        
        
        this.btnMuteM = this.add.image(527,391,'btnMute');
        this.btnMuteM.setScale(0.028);
        // this.btnMuteM.visible=false;
        this.btnMutecM = this.add.image(527,391,'btnMutec');
        this.btnMutecM.setScale(0.119);
        this.btnMutecM.visible=false;

        this.btnUnmuteM = this.add.image(527,391,'btnUnmute');
        this.btnUnmuteM.setScale(0.028);
        this.btnUnmuteM.visible=false;
        this.btnUnmutecM = this.add.image(527,391,'btnUnmutec');
        this.btnUnmutecM.setScale(0.119);
        this.btnUnmutecM.visible=false;

        
        //btn voltar
        this.btnVoltar = this.add.image(350,550,'btnVoltar');
        this.btnVoltar.setScale(0.07);
        this.btnVoltarc = this.add.image(350,550,'btnVoltarc');
        this.btnVoltarc.setScale(0.3);
        this.btnVoltarc.visible=false;

        //Musica
        this.volume = musicaConfig.volume;
        this.mute = musicaConfig.mute;

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
            this.volume += 0.2;
            this.musica.setVolume(volume);
            console.log(volume);
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
            this.volume -= 0.2;
            this.musica.setVolume(volume);
            console.log(musica.volume);
            
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
            this.btnMuteM.visible = false;
            this.btnMutecM.visible = false;
            this.btnUnmuteM.visible = true;
        });

        //interações do btnMuteM
        this.btnUnmuteM.setInteractive();

        this.btnUnmuteM.on("pointerover", ()=>{
            console.log("over UnmuteM");
            this.game.canvas.style.cursor = "pointer";
            this.btnUnmutecM.visible=true;
        });
        this.btnUnmuteM.on("pointerout", ()=>{
            console.log("out UnmuteM");
            this.game.canvas.style.cursor = "default";
            this.btnUnmutecM.visible=false;
        });
        this.btnUnmuteM.on("pointerup", ()=>{
            console.log("up UnmuteM");
            this.btnUnmutecM.visible = false;
            this.btnUnmuteM.visible = false;
            this.btnMuteM.visible = false;
            this.musica.mute = true;
        });

    }
}