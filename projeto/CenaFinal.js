class CenaFinal extends Phaser.Scene {
    constructor(){
        super("cenaFinal");
    }
    
    init(data){
        this.nameuser=data.nameuser;
        this.pontuacao=data.pontuacao;
    }
    create(){
        console.log('cenafinal');
        this.background = this.add.image(0,0,"balao");
        this.background.setOrigin(0,0);


        //btn prox
        this.btnProx = this.add.image(480,435,'btnProx');
        this.btnProx.setScale(0.07);
        this.btnProxc = this.add.image(480,435,'btnProxc');
        this.btnProxc.setScale(0.295);
        this.btnProxc.visible=false;

        this.listaPaus=[];

        var textoi="Parabéns! Muito obrigado\n"+this.nameuser+".\nGraças a ti consegui escapar!\n\n\nTempo demorado: "+this.pontuacao+"s";

        this.add.text(300,275,textoi,{font: "19px Helvetica", fill: 'black'});

        //this.resetRank();
        var pontos = JSON.parse(localStorage.getItem('pontuacao'));
        if(pontos==null){
            pontos=[];
        }
        console.log(this.pontuacao);
        console.log(this.nameuser);
        var novo={nome:this.nameuser,pontuacao:this.pontuacao};
        pontos.push(novo);
        localStorage.setItem('pontuacao',JSON.stringify(pontos)); 

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
             this.registry.destroy();
             this.events.off();
             this.scene.start('load');
         });
    }

    resetRank(){
        var pontos = JSON.parse(localStorage.getItem('pontuacao'));
        for(var i = 0;i<pontos.length;i++){
            pontos.pop();
        }
        localStorage.setItem('pontuacao',JSON.stringify(pontos));
    }
}