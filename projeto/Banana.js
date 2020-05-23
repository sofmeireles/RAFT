class Banana extends Phaser.GameObjects.Sprite{
    constructor(scene){

        var x = scene.gorila.x+50;
        var y = scene.gorila.y+10;

        super(scene,x,y,"banana");
        scene.add.existing(this);

        var opcs=[1,-1];
        var opc=Phaser.Math.Between(0,1);
        var n=opcs[opc];

        this.play("bananas",true);
        scene.physics.world.enableBody(this);
        this.body.setCollideWorldBounds(true,true,false,false);
        this.body.velocity.y=lancamentoBananas.velocidadeY;
        this.body.velocity.x=n*Phaser.Math.Between(0,lancamentoBananas.velocidadeX);



        

    }
    update(){
        if(this.y > config.width-20){
            this.destroy();
        }
    }
}