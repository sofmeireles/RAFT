var gameSettings = {
    playerSpeed: 500,
}

var configTimer = {
    font: '50px Arial',
    posX: 10,
    posY: 10,
    color: 'white',
}

var lancamentoBananas ={
    velocidadeY: 150,
    velocidadeX: 250,
    intervalo: 3,
}

var musicaConfig = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
}

var config = {
    width: 700,
    height: 700,
    parent: 'phaser-example',
    dom: {
        createContainer: true
    },
    backgroundColor: 0xffffff,
    scene: [Inicial,Load,Menu1,Ranking,Ajuda,Creditos,Opcoes,Jogar1,
        NomeUser,Sair,Inicio,PraiaMeio,CavernaLago,CavernaF,Pergunta,
        Praia,EntradaCaverna,CavernaMeio,Lago,Floresta,
        PreTopo,Topo,Fim,Pausa,GorilaFight],
    pixelAtr: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}


var game = new Phaser.Game(config);
