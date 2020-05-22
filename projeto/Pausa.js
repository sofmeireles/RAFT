class Pausa extends Phaser.Scene {
    
    constructor(){
        super("pausa");
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
        this.imagem = this.add.image(config.width/2,config.height/2,'pausa');

        this.btnMenosM = this.add.image(340,290,'btnMenos');
        this.btnMenosM.setScale(0.028);
        this.btnMenoscM = this.add.image(340,290,'btnMenosc');
        this.btnMenoscM.setScale(0.119);
        this.btnMenoscM.visible=false;
        
        this.btnMaisM = this.add.image(420,290,'btnMais');
        this.btnMaisM.setScale(0.028);
        this.btnMaiscM = this.add.image(420,290,'btnMaisc');
        this.btnMaiscM.setScale(0.119);
        this.btnMaiscM.visible=false;
        
        
        this.btnMuteM = this.add.image(500,290,'btnMute');
        this.btnMuteM.setScale(0.028);
        // this.btnMuteM.visible=false;
        this.btnMutecM = this.add.image(500,290,'btnMutec');
        this.btnMutecM.setScale(0.119);
        this.btnMutecM.visible=false;

        this.btnUnmuteM = this.add.image(500,290,'btnUnmute');
        this.btnUnmuteM.setScale(0.028);
        this.btnUnmuteM.visible=false;
        this.btnUnmutecM = this.add.image(500,290,'btnUnmutec');
        this.btnUnmutecM.setScale(0.014);
        this.btnUnmutecM.visible=false;

        
        //btn voltar
        this.btnVoltar = this.add.image(350,380,'btnVoltar');
        this.btnVoltar.setScale(0.07);
        this.btnVoltarc = this.add.image(350,380,'btnVoltarc');
        this.btnVoltarc.setScale(0.3);
        this.btnVoltarc.visible=false;

        //btn sair
        this.btnSair = this.add.image(350,460,'btnSair');
        this.btnSair.setScale(0.07);
        this.btnSairc = this.add.image(350,460,'btnSairc');
        this.btnSairc.setScale(0.3);
        this.btnSairc.visible=false;
        

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
            // this.volume += 0.2;
            // this.musica.setVolume(volume);
            // console.log(volume);
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
            // this.volume -= 0.2;
            // this.musica.setVolume(volume);
            // console.log(musica.volume);
            
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
            this.btnMuteM.visible = true;
            // this.scene.setMute(true);
        });

        //interações do btnSair
        this.btnSair.setInteractive();

        this.btnSair.on("pointerover", ()=>{
            console.log("over Sair");
            this.game.canvas.style.cursor = "pointer";
            this.btnSairc.visible=true;
        });
        this.btnSair.on("pointerout", ()=>{
            console.log("out Sair");
            this.game.canvas.style.cursor = "default";
            this.btnSairc.visible=false;
        });
        this.btnSair.on("pointerup", ()=>{
            //this.game.canvas.style.cursor = "default";
            this.scene.stop();
            this.scene.stop("cenario1");
            this.scene.stop("caverna");
            this.scene.stop("pergunta");
            this.scene.launch("menu1");
            console.log("up Sair");
        });
        
    }
}