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
        this.load.image("btnUnmute","./resources/btns/btnunmute.png");
        this.load.image("btnUnmutec","./resources/claros/btnunmutec.png");
        this.load.image("btnProx","./resources/btns/btnprox.png");
        this.load.image("btnProxc","./resources/claros/btnproxc.png");
        this.load.image("btnContinuar","./resources/btns/btncontinuar.png");
        this.load.image("btnContinuarc","./resources/claros/btncontinuarc.png");
        this.load.image("setas","./resources/setas.png");
        this.load.json('pontuacao',"./pontuacao.json");
        this.load.json('perguntas',"./perguntas.json");
        this.load.image('inicio','./resources/inicial.png');
        this.load.image('cavernaLago','./resources/cavernaLago.png');
        this.load.image('pausa', './resources/pausa.png');
        this.load.image('setaLeft', "./resources/seta_left.png");
        this.load.image('setaRight', "./resources/seta_right.png");
        this.load.image('setaDown', "./resources/seta_down.png");
        this.load.image('setaUp', "./resources/seta_up.png");
        this.load.image('pergaminho', "./resources/pergaminho.png");
        this.load.image('baufechado', "./resources/baufechado.png");
        this.load.image('bauaberto', "./resources/bauaberto.png");
        this.load.image('perg','./resources/golemafalarcenario.png');
        this.load.image('golem','./resources/golem.png');
        this.load.image('cavernaF','./resources/cavernaF.png');
        this.load.image('cavernaMeio','./resources/cavernaMeio.png');
        this.load.image('praia','./resources/praia.png');
        this.load.image('entradaCaverna','./resources/entradaCaverna.png');
        this.load.image('praiaMeio','./resources/praiaMeio.png');
        this.load.image('topo','./resources/topo.png');
        this.load.image('floresta','./resources/floresta.png');
        this.load.image('preTopo','./resources/preTopo.png');
        this.load.image('lago','./resources/lago.png');
        this.load.image('jangada','./resources/jangada.png');
        this.load.image('jangadaFinal','./resources/jangadaFinal.png');
        this.load.image('fim','./resources/fim.png');
        this.load.image('pau','./resources/pau.png');
        this.load.html('nameform', 'nameform.html');
        this.load.image('cenarioluta','./resources/cenarioluta1.png');
        this.load.image('plataforma', './resources/plataforma.png');
        this.load.image('mesa', './resources/table real.png');
        this.load.image('tenda', './resources/tenda.png');
        this.load.image('fogueira', './resources/fogueira.png');
        this.load.image('lenha', './resources/lenha.png');
        this.load.image('pedra', './resources/rock.png');
        this.load.image('folhasbounds', './resources/folhasbounds.png');
        this.load.image('arvore', './resources/arvore top.png');
        this.load.spritesheet('morcego', './resources/bat.png', {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.spritesheet('macaco', './resources/macacospsheet.png',{
            frameWidth: 100,
            frameHeight: 94
        });
        this.load.spritesheet("boneco", "./resources/BONECO.png", {
            frameWidth: 120,
            frameHeight: 120
        });

        this.load.spritesheet("gorila", "./resources/gorilaspsheet.png", {
            frameWidth: 208,
            frameHeight: 206
        });

        this.load.spritesheet("banana", "./resources/bananapequenaspsheet.png", {
            frameWidth: 30,
            frameHeight: 30
        });
        
        
        console.log("images loaded");

    }

    create(){

        this.add.text(20,20,"Carregando o jogo...");
        this.anims.create({
            key: "bat",
            frames: this.anims.generateFrameNumbers("morcego"),
            frameRate: 10,
            repeat:-1
        });
        this.anims.create({
            key: "monkey",
            frames: this.anims.generateFrameNumbers("macaco"),
            frameRate: 10,
            repeat:-1
        });
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

        this.anims.create({
            key: "bananas",
            frames: this.anims.generateFrameNumbers("banana"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "lancar",
            frames: this.anims.generateFrameNumbers("gorila"),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: "parar",
            frames: [{key:"gorila", frame:0}],
            frameRate: 10,
        });


        this.scene.start("menu1")
    }
}