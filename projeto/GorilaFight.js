class GorilaFight extends Phaser.Scene {
    constructor(){
        super("gorilafight");
    }
    init(data){
        this.tempo=data.tempo;

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


        this.intervalo = this.time.addEvent({
            loop: true,
        });

    }
    update(){

        for(var i = 0; i<this.projectiles.getChildren().lenght; i++){
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
        //this.gorila.play("parar",true);
    }

}