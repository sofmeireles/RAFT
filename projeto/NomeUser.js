class NomeUser extends Phaser.Scene {
    constructor(){
        super("nomeUser");
    }
    create(){
        console.log('nomeUser')
        this.background = this.add.image(0,0,"balao");
        this.background.setOrigin(0,0);
        this.flag=0;

        //btn prox
        this.btnProx = this.add.image(480,435,'btnProx');
        this.btnProx.setScale(0.07);
        this.btnProxc = this.add.image(480,435,'btnProxc');
        this.btnProxc.setScale(0.295);
        this.btnProxc.visible=false;

        this.listaPaus=[];

        this.textoi = ["Ótimo, qual é o teu nome?"];

        this.linha = [];

        this.indexP = 0;
        this.indexL = 0;

        this.delayP = 100;
        this.delayL = 100;

        this.fala = this.add.text(300,280,'',{font: "19px Helvetica", fill: 'black'});
        this.avancaLinha();

        var element = this.add.dom(425, 350).createFromCache('nameform');
        console.log(element);

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
            var inputText = element.getChildByName('nameField');
            console.log(inputText.value);

            if (inputText.value !== ''){
                this.flag=1;
            }
            if (this.flag==1){
                this.game.canvas.style.cursor = "default";
                this.crialistaperguntas();
                this.nameuser=inputText.value;
                this.scene.start("inicio",{chave:false,firstTime:0,listaPaus: this.listaPaus, nameuser:this.nameuser, listaPerguntas:this.listaPerguntas,tempo:0, posX: 400, posY: 400});
            }
            else{
                this.fala.setVisible(false);
                this.add.text(300,280,"QUAL É O TEU NOME???",{font: "19px Helvetica", fontWeight:"bold", fill: 'black'});
            }
        });


    }

    crialistaperguntas(){
        var perguntas = this.cache.json.get('perguntas');
        var count = Object.keys(perguntas).length;
        this.listaPerguntas=[];

        for(var i=0;i<count;i++){
            this.listaPerguntas.push(perguntas[i]);
        }
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
            this.fala.text = this.fala.text.concat(this.linha[this.indexP] + " ");
            this.indexP++;
        }
    
        if (this.indexP === this.linha.length){
            this.fala.text = this.fala.text.concat("\n");
            this.time.addEvent({delay: this.delayL, callback: this.avancaLinha, callbackScope: this});
        }
    }
    
}