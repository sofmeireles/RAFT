class PreGorila extends Phaser.Scene {
    
    constructor(){
        super("pregorila");
    }
    init(data){
        this.listaPerguntas=data.listaPerguntas;
        this.sceneName=data.sceneName;
        this.tempo=data.tempo;
        this.nameuser=data.nameuser;
        this.listaPaus=data.listaPaus;
        this.firstTime=data.firstTime;
        this.chave=data.chave;
        this.flag=data.flag;
        this.easterEggs=data.easterEggs;
    }
    create(){
        var x=350;
        var y=250;
        this.pausApanhados=0;
        this.player = this.physics.add.sprite(350, 350, 'boneco');
        this.player.setVisible(false);
        this.imagem = this.add.image(config.width/2,config.height/2,'gorilaFalar');
        var tam=this.listaPerguntas.length;
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        this.player.setPosition(350,350);
        this.player.setVelocity(0);

        this.contaPaus=this.listaPaus.length;
        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});

        if(this.chave==true){
            this.imChave=this.add.image(configContaPaus.posX-70,configContaPaus.posY+25,'chave');
        }
        // Texto a correr
        this.linha = [];

        this.indexP = 0;
        this.indexL = 0;

        this.delayP = 100;
        this.delayL = 100;

        if (this.flag==0){
            this.textoi = ["Uh uh uh ah ah! Sou o","gorila protetor desta parte da ilha.",
        "Agora podes andar livremente pela","por aqui tens de passar este","desafio"];
            this.text=this.add.text(x,y,'',{font: "20px Helvetica", fill: 'black'});
            this.avancaLinha();
        }
        else{
            this.textoi = ["Uh uh uh ah ah!","Parabéns! Venceste o desafio!",
        "Agora podes andar livremente pela","ilha!"];
            this.text=this.add.text(x,y,'',{font: "20px Helvetica", fill: 'black'});
            this.avancaLinha();
        }


        //btn continuar
        this.btnCont = this.add.image(500,470,'btnContinuar');
        this.btnCont.setScale(0.2);
        this.btnContc = this.add.image(500,470,'btnContinuarc');
        this.btnContc.setScale(0.2);
        this.btnContc.visible=false;

        //interações do btnCont
        this.btnCont.setInteractive();

        this.btnCont.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnContc.visible=true;
        });


        this.btnCont.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnContc.visible=false;
        });

        this.btnCont.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            if(this.flag==0){
                this.scene.start("gorilafight",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,listaPaus: this.listaPaus, nameuser: this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempo, posX: 130, posY: 600});
            }
            else{
                this.scene.start("floresta",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,listaPaus: this.listaPaus, nameuser: this.nameuser,listaPerguntas:this.listaPerguntas,tempo:this.tempo, posX: 350, posY: 350});
            }
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
            this.text.text = this.text.text.concat(this.linha[this.indexP] + " ");
            this.indexP++;
        }
    
        if (this.indexP === this.linha.length){
            this.text.text = this.text.text.concat("\n");
            this.time.addEvent({delay: this.delayL, callback: this.avancaLinha, callbackScope: this});
        }
    }
}