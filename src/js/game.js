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
    this.enemyData = null;

  }

  Game.prototype = {

    create: function () {

    //Set animations for player and enemys
    this.boy = new this.boyPlayer(3,'sword',this.add.sprite(25, 25, 'boy'));
    
    //this.boy.animations.add('jump', [4], 20, true);
    //this.boy.animations.add('left', [5, 6, 7, 8], 4, true);
    // Create the shadow texture
    this.shadowTexture = this.game.add.bitmapData(this.game.world.width, this.game.world.height);

    // Create an object that will use the bitmap as a texture
    var lightSprite = this.game.add.image(0, 0, this.shadowTexture);
    lightSprite.fixedToCamera = true;

    // Set the blend mode to MULTIPLY. This will darken the colors of
    // everything below this sprite.
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.stage.backgroundColor = '#FFFFFF';
    //add tilemap
    this.map = this.add.tilemap('map');
    this.map.addTilesetImage('plataformas');
    this.map.setCollisionBetween(0, 5);
    // this.map.setCollision(7);
    this.map.setCollisionBetween( 8, 10);
    this.map.setCollisionBetween(27, 28);
    this.map.setCollisionBetween(40, 45);
    this.map.setCollisionBetween(56, 58);
      
    this.layer = this.map.createLayer('Capa de Patrones 1');
    this.layer.resizeWorld();
    

    //add enemy whith json
    this.cache._text['enemyData'].data = JSON.parse(this.cache.getText('enemyData'));
    this.enemyData = this.cache.getText('enemyData').enemys;
    for (var i = 0, l = this.enemyData.length; i < l; i++)
    {
      this.newEnemy(this.enemyData[i].posX, this.enemyData[i].posY, this.enemyData[i].range);
    }

    //add physics boy
    this.physics.enable(this.boy.spriteBoy);
    this.physics.arcade.gravity.y = 200;
    this.boy.spriteBoy.body.bounce.y = 0.2;
    this.boy.spriteBoy.body.linearDamping = 1;
    this.boy.spriteBoy.body.collideWorldBounds = false;
    this.camera.follow(this.boy.spriteBoy);

    //add cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //circulo de luz, por ahora no funciona correctamente con los tilemap, mirar por qué
    
    // The radius of the circle of light
    this.LIGHT_RADIUS = 200;

    },

    update: function () {

      this.physics.arcade.collide(this.boy.spriteBoy, this.layer);

      //enemys
      for (var i = 0, l = this.enemys.length; i < l; i++)
      {
        this.physics.arcade.collide(this.enemys[i].enemySprite, this.layer);
        this.enemys[i].enemySprite.body.setSize(80,70,0,0);
        //enemys move
        //right
        if( (this.enemys[i].enemyDir) && ( this.enemys[i].enemyX + this.enemys[i].enemyMove > this.enemys[i].enemySprite.body.x ) )
        {
          this.enemys[i].enemySprite.body.x += 1;

          
           this.enemys[i].enemySprite.frame = 0;

        }
        else
        {
          this.enemys[i].enemyDir = false;
        }
        //left
        if((!this.enemys[i].enemyDir) && ( this.enemys[i].enemyX - this.enemys[i].enemyMove < this.enemys[i].enemySprite.body.x ))
          {
            
            this.enemys[i].enemySprite.body.x -= 1;

            this.enemys[i].enemySprite.frame = 6;
          }
          else
          {
            this.enemys[i].enemyDir = true;
          }
      }
      //boy dead, reset in pos(25,25)
      if ((this.boy.spriteBoy.body.y > 900) || (this.boy.spriteBoy.body.x < -60))
      {
        this.boy.spriteBoy.body.x = 25;
        this.boy.spriteBoy.body.y = 25;
      }

      

    //boy movement 


    if(!this.cursors.right.isDown || !this.cursors.left.isDown || !this.cursors.up.isDown){

      this.boy.spriteBoy.frame = 0;
    }
      this.boy.spriteBoy.body.setSize(57,70,0,0);
      this.boy.spriteBoy.body.velocity.x = 0;

    if (this.cursors.up.isDown)
    {
        this.boy.animationRight.play('jump');
        if (this.boy.spriteBoy.body.onFloor())
        {
            this.boy.spriteBoy.body.velocity.y = -300;
        }
    }

    if (this.cursors.left.isDown)
    {
        this.boy.animationLeft.play('left');
        this.boy.spriteBoy.body.velocity.x = -200;
    }
    else if (this.cursors.right.isDown)
    {
         
         this.boy.animationRight.play('right');
        this.boy.spriteBoy.body.velocity.x = 200;
    }

        //no funciona correctamente, 
    // Update the shadow texture each frame
      this.updateShadowTexture();
},


//objeto donde se implementarán los atributos del niño según nos lo vayan pasando
boyPlayer: function(lives, weapon, sprite){ 
      this.lives = lives;
      this.weapon = weapon;
      this.spriteBoy = sprite;
      this.animationRight = this.spriteBoy.animations.add('right', [3, 1, 2], 10, true);
      this.animationLeft = this.spriteBoy.animations.add('left', [10, 9, 8], 8, true);
      this.animationJump = this.spriteBoy.animations.add('jump', [4, 5, 6], 8, true);
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
    var spotX = this.boy.spriteBoy.body.x - this.game.camera.view.x;
    var spotY = this.boy.spriteBoy.body.y  - this.game.camera.view.y;
  // Draw shadow
    this.shadowTexture.context.fillStyle = 'rgb(0,0,0)';
    this.shadowTexture.context.fillRect(0, 0, this.game.world.width, this.game.world.height);

    //gradient
    var gradient = this.shadowTexture.context.createRadialGradient(
        spotX, spotY, this.LIGHT_RADIUS * 0.80,
        spotX, spotY, this.LIGHT_RADIUS);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    // Draw circle of light
    this.shadowTexture.context.beginPath();
   // this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
        this.shadowTexture.context.fillStyle = gradient;
    this.shadowTexture.context.arc(spotX, spotY,
      this.LIGHT_RADIUS, 0, Math.PI*2);
    console.log(this.boy.spriteBoy)
    /*this.shadowTexture.context.arc(this.boy.spriteBoy.body.x, this.boy.spriteBoy.body.y,
        this.LIGHT_RADIUS, 0, Math.PI*2);*/
    this.shadowTexture.context.fill();

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;
},
render: function(){

    this.game.debug.body(this.boy.spriteBoy);
    for (var i = 0; i < this.enemys.length; i++){
       this.game.debug.body(this.enemys[i].enemySprite);
    }

}

  };

  window['ndoto'] = window['ndoto'] || {};
  window['ndoto'].Game = Game;

}());
