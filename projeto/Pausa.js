class Pausa extends Phaser.Scene {
    
    constructor(){
        super("pausa");
    }
    init(data){
        this.background=data.background;
        this.sceneName=data.sceneName;
    }
    create(){

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
        this.btnVoltar = this.add.image(350,360,'btnVoltar');
        this.btnVoltar.setScale(0.07);
        this.btnVoltarc = this.add.image(350,360,'btnVoltarc');
        this.btnVoltarc.setScale(0.3);
        this.btnVoltarc.visible=false;

        this.btnAjuda = this.add.image(350,425,'btnAjuda');
        this.btnAjuda.setScale(0.07);
        this.btnAjudac = this.add.image(350,425,'btnAjudac');
        this.btnAjudac.setScale(0.3);
        this.btnAjudac.visible=false;

        //btn sair
        this.btnSair = this.add.image(350,490,'btnSair');
        this.btnSair.setScale(0.07);
        this.btnSairc = this.add.image(350,490,'btnSairc');
        this.btnSairc.setScale(0.3);
        this.btnSairc.visible=false;
        

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


        //interações do btnMaisM
        this.btnMaisM.setInteractive();

        this.btnMaisM.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnMaiscM.visible=true;
        });
        this.btnMaisM.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnMaiscM.visible=false;
        });
        this.btnMaisM.on("pointerup", ()=>{
            if(music.volume < 1){
                music.volume += 0.2;
            }
        });

        //interações do btnMenosM
        this.btnMenosM.setInteractive();

        this.btnMenosM.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnMenoscM.visible=true;
        });
        this.btnMenosM.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnMenoscM.visible=false;
        });
        this.btnMenosM.on("pointerup", ()=>{
            if(music.volume > 0){
                var cond = 0.2;
                if((music.volume - cond) < 0){
                    music.volume = 0;
                } else{
                    music.volume -= cond;
                }
            }
            
        });

        //interações do btnMuteM
        this.btnMuteM.setInteractive();

        this.btnMuteM.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnMutecM.visible=true;
        });
        this.btnMuteM.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnMutecM.visible=false;
        });
        this.btnMuteM.on("pointerup", ()=>{
            this.btnMuteM.visible = false;
            this.btnMutecM.visible = false;
            this.btnUnmuteM.visible = true;
            music.mute = false;
        });

        //interações do btnMuteM
        this.btnUnmuteM.setInteractive();

        this.btnUnmuteM.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnUnmutecM.visible=true;
        });
        this.btnUnmuteM.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnUnmutecM.visible=false;
        });
        this.btnUnmuteM.on("pointerup", ()=>{
            this.btnUnmutecM.visible = false;
            this.btnUnmuteM.visible = false;
            this.btnMuteM.visible = true;
            music.mute = true;
        });

        //interações do btnAjuda
        this.btnAjuda.setInteractive();

        this.btnAjuda.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnAjudac.visible=true;
        });
        this.btnAjuda.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnAjudac.visible=false;
        });
        this.btnAjuda.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            this.scene.pause();
            this.scene.launch("ajuda",{flag:1});
        });

        //interações do btnSair
        this.btnSair.setInteractive();

        this.btnSair.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnSairc.visible=true;
        });
        this.btnSair.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnSairc.visible=false;
        });
        this.btnSair.on("pointerup", ()=>{
            //this.game.canvas.style.cursor = "default";
            this.scene.stop();
            this.scene.stop(this.sceneName);
            this.scene.stop("inicio");
            this.scene.stop("cavernaLago");
            this.scene.stop("pergunta");
            this.scene.stop("praia");
            this.scene.stop("cavernaMeio");
            this.scene.stop("cavernaF");
            this.scene.stop("entradaCaverna");
            this.scene.stop("praiaMeio");
            this.scene.stop("gorilafight");
            this.scene.stop("fim");
            this.scene.stop("floresta");
            this.scene.stop("preTopo");
            this.scene.stop("bau");
            this.scene.stop("lago");
            this.scene.stop("jangada");
            this.scene.stop("preGorila");
            this.scene.stop("mensagemJangada");
            this.scene.stop("mensagemBau");
            this.scene.stop("topo");
            this.scene.start("menu1");
        });
        
    }
}