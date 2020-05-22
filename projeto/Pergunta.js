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
    }
    create(){
        var x=400;
        var y=250;
        this.background = this.add.image(0,0,"lago");
        this.background.setOrigin(0,0);
        this.veil=this.add.graphics({x:0,y:0});
        this.veil.fillStyle('0x000000',0.3);
        this.veil.fillRect(0,0,config.width, config.height);
        this.imagem = this.add.image(config.width/2,config.height/2,'perg');
        var tam=this.listaPerguntas.length;
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        this.player.setPosition(350,350);
        this.player.setVelocity(0);

        if(tam==0){
            this.respCorreta(true,1);
        }
        else{
            var text=this.add.text(x,y,"ola sou o troll do lago e\numa vez que entraste so\nte poderei deixar sair\nse responderes corretamente\na uma questão",{font: "20px Helvetica", fill: 'black'});

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
                text.setText('');
                this.btnCont.destroy();
                this.btnContc.destroy();
                this.gerapergunta();
            });

        }
    }

    gerapergunta(){
        var tam=this.listaPerguntas.length;
        var random=Phaser.Math.Between(0,tam-1);
        var x=300;
        var y=250;
        var espacamento=70;

        var opCerta=this.listaPerguntas[random].correta;
        console.log(opCerta);
        this.pergunta=this.add.text(x,y,this.listaPerguntas[random].pergunta,{font: "30px Helvetica", fill: 'black'});


        var opcs=[0,1,2,3];
        var n1=opcs[Math.floor(Math.random() * opcs.length)];
        console.log('n1:'+n1);
        var index=opcs.indexOf(n1);
        opcs.splice(index,1);
        var n2=opcs[Math.floor(Math.random() * opcs.length)];
        console.log('n2:'+n2);
        var index=opcs.indexOf(n2);
        opcs.splice(index,1);
        var n3=opcs[Math.floor(Math.random() * opcs.length)];
        console.log('n3:'+n3);
        var index=opcs.indexOf(n3);
        opcs.splice(index,1);
        var n4=opcs[0];
        console.log('n4:'+n4);
        
        var ups='ups';
        if('ups'==ups){
            console.log('yep');
        }
        

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
            if(this.op3==this.opCerta){
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
        var x=350;
        var y=250;
        if (flag==1){
            this.add.text(x,y,"Já não há\nperguntas!",{font: "30px Helvetica", fill: 'black'});
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
        this.btnCont = this.add.image(450,450,'btnContinuar');
        this.btnCont.setScale(0.2);
        this.btnContc = this.add.image(450,450,'btnContinuarc');
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
            this.veil.destroy();
            this.imagem.destroy();
            if(valor==true){
                this.veil.destroy();
                this.imagem.destroy();
                this.scene.stop(this.sceneName);
                this.scene.stop();
                this.scene.start("cavernaLago",{listaPerguntas:this.listaPerguntas, tempo:this.tempo, posX: 350, posY: 280});
            }
            else{
                this.game.canvas.style.cursor = "default";
                this.veil.destroy();
                this.imagem.destroy();
                this.scene.stop();
                this.scene.resume(this.sceneName,{listaPerguntas:this.listaPerguntas,tempo:this.tempo});
            }
        });
    }
}