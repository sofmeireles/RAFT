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

        this.textoi= ["Olá! O meu nome é Papi Chulo!", "Estou preso nesta ilha há 10 anos,", "por ter sido acusado, injustamente,","de ter roubado a Mona Lisa.","Preciso de ajuda para fugir daqui!","Ajudas-me?"]
        // Texto a correr
        this.linha = [];

        this.indexP = 0;
        this.indexL = 0;

        this.delayP = 100;
        this.delayL = 100;

        this.intro=this.add.text(300,280,'',{font: "19px Helvetica", fill: 'black'});

        this.avancaLinha();

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

    avancaLinha(){
        if(this.indexL == this.textoi.length){
            return;
        }

        this.linha = this.textoi[this.indexL].split(' ');

        this.indexP = 0;

        this.time.addEvent({ delay: this.delayP, callback: this.avancaPalavra, callbackScope: this, repeat: this.linha.length});

        this.indexL++;
    }

    avancaPalavra(){

        if(this.linha[this.indexP] == null){
            return;
        }else{
            this.intro.text = this.intro.text.concat(this.linha[this.indexP] + " ");
            this.indexP++;
        }
    
        if (this.indexP === this.linha.length){
            this.intro.text = this.intro.text.concat("\n");
            this.time.addEvent({delay: this.delayL, callback: this.avancaLinha, callbackScope: this});
        }
    }

}