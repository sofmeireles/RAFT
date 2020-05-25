class Ranking extends Phaser.Scene {
    constructor(){
        super("ranking");
    }

    create(){
        this.background = this.add.image(0,0,"rank");
        this.background.setOrigin(0,0);


        //btn voltar
        this.btnVoltar = this.add.image(350,550,'btnVoltar');
        this.btnVoltar.setScale(0.07);
        this.btnVoltarc = this.add.image(350,550,'btnVoltarc');
        this.btnVoltarc.setScale(0.3);
        this.btnVoltarc.visible=false;

        //interações do btnVoltar
        this.btnVoltar.setInteractive();

        this.btnVoltar.on("pointerover", ()=>{
            this.game.canvas.style.cursor = "pointer";
            this.btnVoltarc.visible=true;
        });
        this.btnVoltar.on("pointerout", ()=>{
            this.game.canvas.style.cursor = "default";
            this.btnVoltarc.visible=false;
        });
        this.btnVoltar.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            this.scene.start("menu1")
        });
        
        //var pontos = this.cache.json.get('pontuacao');
        var pontos=JSON.parse(localStorage.getItem('pontuacao'));

        var tamanho = Object.keys(pontos).length;
        var y = 210;
        var xNome = 250;
        var xPontos = 400;
        var lista = [];

        //adicionar os users ao array
        for(var j=0;j<tamanho;j++){
            lista.push(pontos[j]);
        }
 
        lista.sort(this.compare);


        for(var i=0;i<10;i++){
            if(i<tamanho){
                this.add.text(xNome,y,(i+1)+'   '+lista[i].nome,{font: "18px Helvetica", fill: 'black'});
                this.add.text(xPontos,y,lista[i].pontuacao,{font: "18px Helvetica", fill: 'black'});
            }
            else{
                this.add.text(xNome,y,'00   ',{font: "18px Helvetica", fill: 'black'});
                this.add.text(xPontos,y,'0000',{font: "18px Helvetica", fill: 'black'});
            }
            y+=30;
        }
    }
    compare(a, b){
        const pontA = a.pontuacao;
        const ontB = b.pontuacao;
  
        let comp = 0;
        if (pontA < ontB) {
            comp = -1;
        } else if (pontA > ontB) {
            comp = 1;
        }
        return comp;
    }   
    
}
