var gameSettings = {
    playerSpeed: 500,
}

var configTimer = {
    font: '50px Arial',
    posX: 10,
    posY: 10,
    color: 'white',
}

var config = {
    width: 700,
    height: 700,
    parent: 'phaser-example',
    dom: {
        createContainer: true
    },
    backgroundColor: 0xffffff,
    scene: [Inicial,Load,Menu1,Ranking,Ajuda,Creditos,Opcoes,Jogar1,NomeUser,Sair,Cenario1,Caverna,Pergunta],
    pixelAtr: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}


var game = new Phaser.Game(config);
