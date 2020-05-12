class Load extends Phaser.Scene {
    constructor(){
        super("load");
    }
    preload(){
        this.load.image("capa","./resources/fundomenu.png");
        this.load.image("balao","./resources/imagem_balao.png");
        this.load.image("btnJogar","./resources/btns/btnjogar.png");
        this.load.image("btnOpcoes","./resources/btns/btnopcoes.png");
        this.load.image("btnRanking","./resources/btns/btnranking.png");
        this.load.image("btnCreditos","./resources/btns/btncreditos.png");
        this.load.image("btnAjuda","./resources/btns/btnajuda.png");
        this.load.image("btnVoltar","./resources/btns/btnvoltar.png");
        this.load.image("btnSair","./resources/btns/btnsair.png");
        this.load.image("creditos","./resources/creditos.png");
        this.load.image("ajuda","./resources/ajuda.png");
        this.load.image("opcoes","./resources/options.png");
        this.load.image("btnJogarc","./resources/claros/btnjogarc.png");
        this.load.image("btnOpcoesc","./resources/claros/btnopcoesc.png");
        this.load.image("btnRankingc","./resources/claros/btnrankingc.png");
        this.load.image("btnCreditosc","./resources/claros/btncreditosc.png");
        this.load.image("btnAjudac","./resources/claros/btnajudac.png");
        this.load.image("btnVoltarc","./resources/claros/btnvoltarc.png");
        this.load.image("btnSairc","./resources/claros/btnsairc.png");
        this.load.image("btnMenos","./resources/btns/btnmenos.png");
        this.load.image("btnMais","./resources/btns/btnmais.png");
        this.load.image("btnMute","./resources/btns/btnmute.png");
        this.load.image("btnMenosc","./resources/claros/btnmenosc.png");
        this.load.image("btnMaisc","./resources/claros/btnmaisc.png");
        this.load.image("btnMutec","./resources/claros/btnmutec.png");
        this.load.image("btnProx","./resources/btns/btnprox.png");
        this.load.image("btnProxc","./resources/claros/btnproxc.png");
        this.load.image("btnContinuar","./resources/btns/btncontinuar.png");
        this.load.image("btnContinuarc","./resources/claros/btncontinuarc.png");
        this.load.image("setas","./resources/setas.png");
        this.load.image("mouse","./resources/Mouse-3-icon.png");
        this.load.json('pontuacao',"./pontuacao.json");
        this.load.json('perguntas',"./perguntas.json");
        this.load.image('cena1','./resources/cenario1.png');
        this.load.image('caverna','./resources/caverna.png');
        this.load.image('setaLeft', "./resources/seta_left.png");
        this.load.image('setaRight', "./resources/seta_right.png");
        this.load.image('perg','./resources/falatemp.png');
        this.load.html('nameform', 'nameform.html');
        
        this.load.spritesheet("boneco", "./resources/BONECO.png", {
            frameWidth: 120,
            frameHeight: 120
        });



        console.log("images loaded");

    }

    create(){

        this.add.text(20,20,"Carregando o jogo...");
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("boneco", {start:0, end:1}),
            frameRate: 5,
            repeat:-1
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("boneco", {start:2, end:3}),
            frameRate: 5,
            repeat:-1
        });
        this.anims.create({
            key: "back",
            frames: this.anims.generateFrameNumbers("boneco", {start:4, end:6}),
            frameRate: 5,
            repeat:-1
        });
        this.anims.create({
            key: "stop",
            frames: [{key:"boneco", frame: 7}],
            frameRate: 10,
        });

        this.scene.start("menu1")
    }
}