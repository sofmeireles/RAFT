class Pergunta extends Phaser.Scene {
    
    constructor(){
        super("pergunta");
    }
    init(data){
        this.background=data.background;
        this.listaPerguntas=data.listaPerguntas;
        this.sceneName=data.sceneName;
        this.player=data.player;
        this.tempo=data.tempo;
        this.nameuser=data.nameuser;
        this.listaPaus=data.listaPaus;
        this.firstTime=data.firstTime;
        this.chave=data.chave;
        this.easterEggs=data.easterEggs;
    }
    create(){
        var x=400;
        var y=250;
        /* this.background = this.add.image(0,0,"lago");
        this.background.setOrigin(0,0);
        this.veil=this.add.graphics({x:0,y:0});
        this.veil.fillStyle('0x000000',0.3);
        this.veil.fillRect(0,0,config.width, config.height); */
        this.imagem = this.add.image(config.width/2,config.height/2,'perg');
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

        if(tam==0){
            this.respCorreta(true,1);
        }
        else{
            this.textoi = ["Olá! Sou o troll do lago e","uma vez que entraste só","te poderei deixar sair","se responderes corretamente","a uma questão"];
            this.texto=this.add.text(x,y,'',{font: "20px Helvetica", fill: 'black'});
            this.avancaLinha();

            //btn continuar
            this.btnCont = this.add.image(550,400,'btnContinuar');
            this.btnCont.setScale(0.2);
            this.btnCont.visible = false;
            this.btnContc = this.add.image(550,400,'btnContinuarc');
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
                this.texto.setText('');
                this.btnCont.destroy();
                this.btnContc.destroy();
                this.gerapergunta();
            });

        }
    }

    gerapergunta(){
        var tam=this.listaPerguntas.length;
        var random=Phaser.Math.Between(0,tam-1);
        var x=400;
        var y=225;
        var espacamento=70;

        var opCerta=this.listaPerguntas[random].correta;
        this.pergunta=this.add.text(x,y+25,this.listaPerguntas[random].pergunta,{font: "12px Helvetica", fill: 'black'});


        var opcs=[0,1,2,3];
        var n1=opcs[Math.floor(Math.random() * opcs.length)];
        var index=opcs.indexOf(n1);
        opcs.splice(index,1);
        var n2=opcs[Math.floor(Math.random() * opcs.length)];
        var index=opcs.indexOf(n2);
        opcs.splice(index,1);
        var n3=opcs[Math.floor(Math.random() * opcs.length)];
        var index=opcs.indexOf(n3);
        opcs.splice(index,1);
        var n4=opcs[0];
        

        this.op1=this.listaPerguntas[random].opcoes[n1];
        this.op2=this.listaPerguntas[random].opcoes[n2];
        this.op3=this.listaPerguntas[random].opcoes[n3];
        this.op4=this.listaPerguntas[random].opcoes[n4];


        this.op1Btn=this.add.text(x,y+espacamento,"1."+this.op1,{font: "20px Helvetica", fill: 'black'});
        espacamento+=30;
        this.op2Btn=this.add.text(x,y+espacamento,"2."+this.op2,{font: "20px Helvetica", fill: 'black'});
        espacamento+=30;
        this.op3Btn=this.add.text(x,y+espacamento,"3."+this.op3,{font: "20px Helvetica", fill: 'black'});
        espacamento+=30;
        this.op4Btn=this.add.text(x,y+espacamento,"4."+this.op4,{font: "20px Helvetica", fill: 'black'});


        //interações das opcoes
        this.op1Btn.setInteractive();

        this.op1Btn.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.op1Btn.setColor("#641717");
        });
        this.op1Btn.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.op1Btn.setColor("#000000");
        });
        this.op1Btn.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            if(this.op1==opCerta){
                this.respCorreta(true,0);
            }
            else{
                this.respCorreta(false,0);
            }
        });

        this.op2Btn.setInteractive();

        this.op2Btn.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.op2Btn.setColor("#641717");
        });
        this.op2Btn.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.op2Btn.setColor("#000000");
        });
        this.op2Btn.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            if(this.op2==opCerta){
                this.respCorreta(true,0);
            }
            else{
                this.respCorreta(false,0);
            }
        });

        this.op3Btn.setInteractive();

        this.op3Btn.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.op3Btn.setColor("#641717");
        });
        this.op3Btn.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.op3Btn.setColor("#000000");
        });
        this.op3Btn.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            if(this.op3==opCerta){
                this.respCorreta(true,0);
            }
            else{
                this.respCorreta(false,0);
            }
        });

        this.op4Btn.setInteractive();

        this.op4Btn.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.op4Btn.setColor("#641717");
        });
        this.op4Btn.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.op4Btn.setColor("#000000");
        });
        this.op4Btn.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            if(this.op4==opCerta){
                this.respCorreta(true,0);
            }
            else{
                this.respCorreta(false,0);
            }
        });

        this.listaPerguntas.splice(random, 1);
    }

    respCorreta(valor,flag){
        var x=400;
        var y=250;
        var sem=0;
        if (flag==1){
            this.textoF=this.add.text(x,y,"Olha, paciência,\n\nestudasses!",{font: "30px Helvetica", fill: 'black'});
            var sem=1;
            valor==true;
        }
        else{

            if(valor==true){
                this.pergunta.destroy();
                this.op1Btn.destroy();
                this.op2Btn.destroy();
                this.op3Btn.destroy();
                this.op4Btn.destroy();
                this.add.text(x,y,"Resposta certa!",{font: "20px Helvetica", fill: 'black'});

            }
            else{
                this.pergunta.destroy();
                this.op1Btn.destroy();
                this.op2Btn.destroy();
                this.op3Btn.destroy();
                this.op4Btn.destroy();
                this.add.text(x,y,"Resposta errada!",{font: "20px Helvetica", fill: 'black'});
            }
        }
        //btn continuar
        this.btnCont = this.add.image(550,400,'btnContinuar');
        this.btnCont.setScale(0.2);
        this.btnContc = this.add.image(550,400,'btnContinuarc');
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
            //this.veil.destroy();
            if(valor==true){
                //this.veil.destroy();
                if(sem==0){
                    this.imagem.destroy();
                    this.scene.stop(this.sceneName);
                    this.scene.stop();
                    this.scene.start("cavernaLago",{easterEggs:this.easterEggs,chave:this.chave,firstTime:this.firstTime,nameuser:this.nameuser,listaPaus:this.listaPaus,listaPerguntas:this.listaPerguntas, tempo:this.tempo, posX: 350, posY: 280});
           
                }
                else{
                    this.perdeu();
                }
                
            }
            else{
                this.game.canvas.style.cursor = "default";
                this.imagem.destroy();
                this.scene.stop();
                this.scene.resume(this.sceneName,{firstTime:this.firstTime,listaPerguntas:this.listaPerguntas,tempo:this.tempo});
            }
        });
    }

    avancaLinha(){
        if(this.indexL == this.textoi.length){
            this.btnCont.visible = true;
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
            this.texto.text = this.texto.text.concat(this.linha[this.indexP] + " ");
            this.indexP++;
        }
    
        if (this.indexP === this.linha.length){
            this.texto.text = this.texto.text.concat("\n");
            this.time.addEvent({delay: this.delayL, callback: this.avancaLinha, callbackScope: this});
        }
    }

    perdeu(){
        var x=400;
        var y=250;
        this.btnCont.destroy();
        this.btnContc.destroy();
        this.textoi="Perdeu, burro!";
        this.textoF.setText(this.textoi);

        //btn sair
        this.btnSair = this.add.image(550,400,'btnSair');
        this.btnSair.setScale(0.07);
        this.btnSairc = this.add.image(550,400,'btnSairc');
        this.btnSairc.setScale(0.3);
        this.btnSairc.visible=false;

        //interações do btnSair
        this.btnSair.setInteractive();

        this.btnSair.on("pointerover", ()=>{
            //console.log("over Sair");
            this.game.canvas.style.cursor = "pointer";
            this.btnSairc.visible=true;
        });
        this.btnSair.on("pointerout", ()=>{
            //console.log("out Sair");
            this.game.canvas.style.cursor = "default";
            this.btnSairc.visible=false;
        });
        this.btnSair.on("pointerup", ()=>{
            //this.game.canvas.style.cursor = "default";
            this.scene.stop();
            this.scene.stop(this.sceneName);
            this.scene.stop("inicio");
            this.scene.stop("cavernaLago");
            this.scene.stop("pergunta");
            this.scene.stop("praia");
            this.scene.stop("cavernaMeio");
            this.scene.stop("cavernaF");
            this.scene.stop("entradaCaverna");
            this.scene.stop("praiaMeio");
            this.scene.stop("gorilafight");
            this.scene.stop("fim");
            this.scene.stop("floresta");
            this.scene.stop("preTopo");
            this.scene.stop("bau");
            this.scene.stop("jangada");
            this.scene.stop("topo");
            this.scene.start("menu1");
            //console.log("up Sair");
        });


    }
}