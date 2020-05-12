class Sair extends Phaser.Scene {
    constructor(){
        super("sair");
    }


    create(){
        /* //btn voltar
        this.btnVoltar = this.add.image(350,550,'btnVoltar');
        this.btnVoltar.setScale(0.07);
        this.btnVoltarc = this.add.image(350,550,'btnVoltarc');
        this.btnVoltarc.setScale(0.3);
        this.btnVoltarc.visible=false;

        //interações do btnVoltar
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
            this.scene.start("menu1")
        }); */

        var text = this.add.text(300, 10, 'Please enter your name', { color: 'white', fontSize: '20px '});

        var element = this.add.dom(400, 0).createFromCache('nameform');

        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'playButton')
            {
                var inputText = this.getChildByName('nameField');

                //  Have they entered anything?
                if (inputText.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Hide the login element
                    this.setVisible(false);

                    //  Populate the text with whatever they typed in
                    text.setText('Welcome ' + inputText.value);
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({
                        targets: text,
                        alpha: 0.2,
                        duration: 250,
                        ease: 'Power3',
                        yoyo: true
                    });
                            }
            }

        });
    
        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });
    }
}

