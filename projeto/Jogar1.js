class Jogar1 extends Phaser.Scene {
    constructor(){
        super("jogar1");
    }

    create(){
        console.log('jogar1')
        this.background = this.add.image(0,0,"balao");
        this.background.setOrigin(0,0);

        //btn prox
        this.btnProx = this.add.image(480,435,'btnProx');
        this.btnProx.setScale(0.07);
        this.btnProxc = this.add.image(480,435,'btnProxc');
        this.btnProxc.setScale(0.295);
        this.btnProxc.visible=false;

        var textoi="Olá! O meu nome é Papi Chulo!\nEstou preso nesta ilha há 10 anos,\npor ter sido acusado, injustamente,\nde ter roubado a Mona Lisa.\nPreciso de ajuda para fugir daqui!\nAjudas-me?";

        var intro=this.add.text(300,280,textoi,{font: "19px Helvetica", fill: 'black'});

        //intercoes btnProx
        this.btnProx.setInteractive();

        this.btnProx.on("pointerover", ()=>{
            console.log("over Prox");
            this.game.canvas.style.cursor = "pointer";
            this.btnProxc.visible=true;
        });
        this.btnProx.on("pointerout", ()=>{
            console.log("out Prox");
            this.game.canvas.style.cursor = "default";
            this.btnProxc.visible=false;
        });
        this.btnProx.on("pointerup", ()=>{
            console.log("up Prox");
            this.game.canvas.style.cursor = "default";
            this.scene.start("nomeUser")
        });

    }
}