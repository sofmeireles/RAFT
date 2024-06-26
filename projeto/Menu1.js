class Menu1 extends Phaser.Scene {
    constructor(){
        super("menu1");
    }

    create(){
        //this.scene.restart();
        this.background = this.add.image(0,0,"capa");
        this.background.setOrigin(0,0);

        this.btnJogar = this.add.image(360,245,'btnJogar');
        this.btnJogar.setScale(0.09);
        this.btnJogarc = this.add.image(360,245,'btnJogarc');
        this.btnJogarc.setScale(0.38);
        this.btnJogarc.visible=false;

        this.btnOpcoes = this.add.image(360,340,'btnOpcoes');
        this.btnOpcoes.setScale(0.09);
        this.btnOpcoesc = this.add.image(360,340,'btnOpcoesc');
        this.btnOpcoesc.setScale(0.38);
        this.btnOpcoesc.visible=false;

        this.btnRanking= this.add.image(360,435,'btnRanking');
        this.btnRanking.setScale(0.09);
        this.btnRankingc= this.add.image(360,435,'btnRankingc');
        this.btnRankingc.setScale(0.38);
        this.btnRankingc.visible=false;

        this.btnCreditos = this.add.image(360,530,'btnCreditos');
        this.btnCreditos.setScale(0.09);
        this.btnCreditosc = this.add.image(360,530,'btnCreditosc');
        this.btnCreditosc.setScale(0.38);
        this.btnCreditosc.visible=false;

        this.btnAjuda = this.add.image(100,650,'btnAjuda');
        this.btnAjuda.setScale(0.07);
        this.btnAjudac = this.add.image(100,650,'btnAjudac');
        this.btnAjudac.setScale(0.3);
        this.btnAjudac.visible=false;

        this.btnSair = this.add.image(600,650,'btnSair');
        this.btnSair.setScale(0.07);
        this.btnSairc = this.add.image(600,650,'btnSairc');
        this.btnSairc.setScale(0.3);
        this.btnSairc.visible=false;

        //interações do btnJogar
        this.btnJogar.setInteractive();

        this.btnJogar.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnJogarc.visible=true;
        });
        this.btnJogar.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnJogarc.visible=false;
        });
        this.btnJogar.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            this.scene.start("jogar1")
        });

        //interações do btnOpcoes
        this.btnOpcoes.setInteractive();

        this.btnOpcoes.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnOpcoesc.visible=true;
        });
        this.btnOpcoes.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnOpcoesc.visible=false;
        });
        this.btnOpcoes.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            this.scene.start("opcoes")
        });

        //interações do btnRanking
        this.btnRanking.setInteractive();

        this.btnRanking.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnRankingc.visible=true;
            
        });
        this.btnRanking.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnRankingc.visible=false;
        });
        this.btnRanking.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            this.scene.start("ranking")
        });

        //interações do btnCreditos
        this.btnCreditos.setInteractive();

        this.btnCreditos.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnCreditosc.visible=true;
            
        });
        this.btnCreditos.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnCreditosc.visible=false;
        });
        this.btnCreditos.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            this.scene.start("creditos")
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
            this.scene.start("ajuda",{flag:null});
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
            this.scene.start("sair");
        });
    }

}