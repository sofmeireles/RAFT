var gameSettings = {
    playerSpeed: 500,
}

var configTimer = {
    font: '50px Arial',
    posX: 10,
    posY: 10,
    color: 'white',
}

var configContaPaus = {
    font: '50px Arial',
    posX: 550,
    posY: 5,
    color: 'white',
}

var lancamentoBananas ={
    velocidadeY: 200,
    velocidadeX: 250,
    intervalo: 2,
}

var musicaConfig = {
    mute: false,
    volume: 0.6,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
}

var music;

var config = {
    width: 700,
    height: 700,
    parent: 'phaser-example',
    scalePlayer: 0.7,
    dom: {
        createContainer: true
    },
    backgroundColor: 0xffffff,
    scene: [Inicial,Load,Menu1,Ranking,Creditos,Opcoes,Jogar1,
        NomeUser,Sair,Inicio,Bau,PraiaMeio,CavernaLago,CavernaF,Lago,Pergunta,
        Praia,EntradaCaverna,CavernaMeio,Floresta,MensagemBau,MensagemJangada,
        PreTopo,Topo,Fim,GorilaFight,PreGorila,Pausa,Ajuda],
-
    pixelAtr: true,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    }
}


var game = new Phaser.Game(config);
