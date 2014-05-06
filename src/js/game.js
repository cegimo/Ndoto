(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.map = null;
    this.tileset = null;
    this.layer = null;
    this.p = null;
    this.cursors = null;
    this.boy = null;
    this.lives = null;
    this.weapon = null;
    this.enemys = [];
    this.enemySprite = null;
    this.spriteEnemy = null;

  }

  Game.prototype = {

    create: function () {

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.stage.backgroundColor = '#FFFFFF';
    //add tilemap
    this.map = this.add.tilemap('map');
    this.map.addTilesetImage('plataformas');
    this.map.setCollisionBetween(1, 12);
    this.map.setCollisionBetween(15, 16);
    this.map.setCollisionBetween(25, 28);
    this.map.setCollisionBetween(44, 46);
    this.map.setCollisionBetween(73, 75);
    this.map.setCollisionBetween(55, 57);
    this.map.setCollision(32);
    this.layer = this.map.createLayer('plataformas');
    this.layer.resizeWorld();
    this.player = new this.boyPlayer(3,'sword');

    //add child whith arcade physics
    this.boy = this.add.sprite(25, 25, 'boy');
    //this.boy.frame = 0;
    this.physics.enable(this.boy);
    this.physics.arcade.gravity.y = 200;
    this.boy.body.bounce.y = 0.2;
    this.boy.body.linearDamping = 1;
    this.boy.body.collideWorldBounds = false;
    this.camera.follow(this.boy);


      //por ahora solo meto 2. Hay que crear una funcion para que los cree automaticamente según los parametros que nos indiquen
      //add enemys
    /*this.spriteEnemy = this.add.sprite(1055, 656, 'enemy');
    this.enemys.push(new this.enemyNode( 3, this.spriteEnemy, 1055, 100));
    this.physics.enable(this.enemys[0].enemySprite);

    this.spriteEnemy = this.add.sprite(782, 285, 'enemy');
    this.enemys.push(new this.enemyNode( 3, this.spriteEnemy, 782, 100));
    this.physics.enable(this.enemys[1].enemySprite);*/


    this.newEnemy(1055,656,100);
    this.newEnemy(782,285,100);
    

    this.cursors = this.input.keyboard.createCursorKeys();


    //circulo de luz, por ahora no funciona correctamente con los tilemap, mirar por qué
    /*
    // The radius of the circle of light
    this.LIGHT_RADIUS = 300;


    // Create the shadow texture
    this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

    // Create an object that will use the bitmap as a texture
    var lightSprite = this.game.add.image(0, 0, this.shadowTexture);

    // Set the blend mode to MULTIPLY. This will darken the colors of
    // everything below this sprite.
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;*/
    },

    update: function () {
      this.physics.arcade.collide(this.boy, this.layer);

      console.log('x'+this.boy.body.x);
      console.log(this.boy.body.y);
      //enemys
      for (var i = 0; i < this.enemys.length; i++)
      {
        this.physics.arcade.collide(this.enemys[i].enemySprite, this.layer);
        //enemys move
        if( (this.enemys[i].enemyDir) && ( this.enemys[i].enemyX + this.enemys[i].enemyMove > this.enemys[i].enemySprite.body.x ) )
        {

          this.enemys[i].enemySprite.body.x += 1;
           //this.spriteEnemy.frame = 3;

        }
        else
        {
          this.enemys[i].enemyDir = false;
        }
        if((!this.enemys[i].enemyDir) && ( this.enemys[i].enemyX - this.enemys[i].enemyMove < this.enemys[i].enemySprite.body.x ))
          {
            
            this.enemys[i].enemySprite.body.x -= 1;
            //this.spriteEnemy.frame = 6;
          }
          else
          {
            this.enemys[i].enemyDir = true;
          }

      }

      if ((this.boy.body.y > 900) || (this.boy.body.x < -60))
      {
        this.boy.body.x = 25;
        this.boy.body.y = 25;
      }

      //enemys move

    //no funciona correctamente, 
    // Update the shadow texture each frame
  //  this.updateShadowTexture();
    if(!this.cursors.right.isDown || !this.cursors.left.isDown || !this.cursors.up.isDown){

      this.boy.frame = 0;
    }



      this.boy.body.velocity.x = 0;

    if (this.cursors.up.isDown)
    {
        this.boy.frame = 6;
        if (this.boy.body.onFloor())
        {
            this.boy.body.velocity.y = -300;
        }
    }

    if (this.cursors.left.isDown)
    {
        this.boy.frame = 9;
        this.boy.body.velocity.x = -200;
    }
    else if (this.cursors.right.isDown)
    {
         this.boy.frame = 1;

        this.boy.body.velocity.x = 200;
    }


},
//objeto donde se implementarán los atributos del niño según nos lo vayan pasando
boyPlayer: function(lives, weapon){ 
      this.lives = lives;
      this.weapon = weapon;
      //console.log(this.lives+' '+this.weapon); 
    },

  //create enemy
newEnemy: function(posX, posY, range){ 
    this.spriteEnemy = this.add.sprite(posX, posY, 'enemy');
    this.enemys.unshift(new this.enemyNode( 3, this.spriteEnemy, posX, range));
    this.physics.enable(this.enemys[0].enemySprite);
    },

  //nodos de la lista de enemigos
enemyNode: function(hits, sprite, x, pixelMove)
{
    this.hits = hits;
    this.enemySprite = sprite;
    this.enemyX = x;
    this.enemyMove = pixelMove;
    this.enemyDir = true; //true right, false left
},

//no funciona bien con tilemaps, buscar errores
updateShadowTexture: function(){
  // Draw shadow
    this.shadowTexture.context.fillStyle = 'rgb(1, 1, 1)';
    this.shadowTexture.context.fillRect(0, 0, this.width, this.height);

    // Draw circle of light
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
    this.shadowTexture.context.arc(this.p.x, this.p.y,
        this.LIGHT_RADIUS, 0, Math.PI*2);
    this.shadowTexture.context.fill();

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;
}
  };

  window['ndoto'] = window['ndoto'] || {};
  window['ndoto'].Game = Game;

}());
