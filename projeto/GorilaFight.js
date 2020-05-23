class GorilaFight extends Phaser.Scene {
    constructor(){
        super("gorilafight");
    }
    init(data){
        this.tempo=data.tempo;
        this.listaPerguntas=data.listaPerguntas;
        this.posX = data.posX;
        this.posY = data.posY;
        this.contaPaus = data.contaPaus;

    }
    create(){
        console.log('gorila fight');
        this.background = this.add.image(0,0,"cenarioluta");
        this.background.setOrigin(0,0);
        this.gorila=this.add.sprite(config.width/2,100,"gorila");
        this.gorila.setScale(0.5);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();
        this.physics.add.collider(true);
        this.contaTempo=this.tempo;

        this.timer = this.time.addEvent({
            loop: true,
            paused: false
        });
        this.text = this.add.text(configTimer.posX, configTimer.y, 'Tempo: '+ this.tempo, { font: configTimer.font, fill: configTimer.color});

        this.add.image(configContaPaus.posX,configContaPaus.posY+25,'pau');
        this.textoContaPaus=this.add.text(configContaPaus.posX+55,configContaPaus.posY-5,'x '+this.contaPaus, { font: configContaPaus.font, fill: configContaPaus.color});


        this.intervalo = this.time.addEvent({
            loop: true,
        });



        /* APAGAAAAAAAAR */
        this.btnVoltar = this.add.image(350,600,'btnVoltar');
        this.btnVoltar.setScale(0.07);
        this.btnVoltarc = this.add.image(350,600,'btnVoltarc');
        this.btnVoltarc.setScale(0.3);
        this.btnVoltarc.visible=false;
        this.btnVoltar.setInteractive();
        this.btnVoltar.on("pointerover", ()=>{
            console.log("over Voltar");
            this.game.canvas.style.cursor = "pointer";
            this.btnVoltarc.visible=true;
        });
        this.btnVoltar.on("pointerout", ()=>{
            console.log("out Voltar");
            this.game.canvas.style.cursor = "default";
            this.btnVoltarc.visible=false;
        });
        this.btnVoltar.on("pointerup", ()=>{
            console.log("up Voltar");
            this.game.canvas.style.cursor = "default";
            this.scene.start("inicio",{nameuser:this.nameuser,contaPaus: this.contaPaus,listaPerguntas:this.listaPerguntas,tempo:this.tempoAtual,posX: 130, posY: 400});
        });
        /* ************************************ */

    }
    update(){

        for(var i = 0; i<this.projectiles.children.size; i++){
            var banana= this.projectiles.getChildren()[i];
            banana.update();
        }

        this.tempoAtual=Math.floor(this.tempo+this.timer.getElapsedSeconds());
        this.text.setText('Tempo: '+ this.tempoAtual);
        if(this.contaTempo==this.tempoAtual){
            this.contaTempo+=lancamentoBananas.intervalo;
            this.lançaBanana();
        }
    }

    lançaBanana(){
        this.gorila.play("lancar",true);
        var banana= new Banana(this);
        this.projectiles.add(banana);
    }

}