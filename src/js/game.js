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
    this.animationLast = null; //last animation registered
    this.boyWeapon = null;
  }

  Game.prototype = {

    create: function () {

    // Create the shadow texture
    this.shadowTexture = this.game.add.bitmapData(this.game.world.width, this.game.world.height);

    // Create an object that will use the bitmap as a texture
    var lightSprite = this.game.add.image(0, 0, this.shadowTexture);
    lightSprite.fixedToCamera = true;

    // Set the blend mode to MULTIPLY. This will darken the colors of
    // everything below this sprite.
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
    //Set animations for player and enemys
    //this.boy = new this.boyPlayer(3,'sword',this.add.sprite(25, 25, 'boy'));
    this.spriteBoy = this.add.sprite( 25, 750, 'boy');
    //Boy animations
    this.spriteBoy.animations.add('left', [8, 9, 10], 8, true);
    this.spriteBoy.animations.add('stopLeft', [15], 8, true);
    this.spriteBoy.animations.add('right', [1, 2, 3], 8, true);
    this.spriteBoy.animations.add('stopRight', [0], 8, true);
    this.spriteBoy.animations.add('upLookingRight', [16, 17], 5, false);
    this.spriteBoy.animations.add('upLookingLeft', [19, 18], 5, false);
    this.spriteBoy.animations.add('upAirRight', [17], 5, true);
    this.spriteBoy.animations.add('upAirLeft', [18], 5, true);
    this.spriteBoy.animations.add('up&right', [5], 8, true);
    this.spriteBoy.animations.add('up&left', [12], 8, true);
    this.spriteBoy.animations.add('atackRight', [20, 21], 3, true);
    this.spriteBoy.animations.add('atackLeft', [23, 22], 3, true);
    this.spriteBoy.animations.add('boyDieRight', [24, 25, 26], 7, true);
    this.spriteBoy.animations.add('boyDieLeft', [29, 28, 27], 7, false);
    
    this.animationLast = 'stopRight';
    
    //bed
    this.bed = this.add.sprite( 20, 800, 'bed'); 
    this.bed.animations.add('bedanimation', [0, 1, 2, 3, 4, 5, 6, 7], 4, false);
    this.bed.animations.play('bedanimation');

    //Audio 

    this.music = this.add.audio('inexorable');
    this.music.play('',0,0.5,true);

      

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.stage.backgroundColor = '#FFFFFF';
    //add tilemap
    this.map = this.add.tilemap('map');
    this.map.addTilesetImage('plataformas');
    this.map.setCollisionBetween(0, 6);
    // this.map.setCollision(7);
    this.map.setCollisionBetween(8, 11);
    this.map.setCollisionBetween(14, 17);
    this.map.setCollisionBetween(28, 30);
    this.map.setCollisionBetween(42, 47);
    this.map.setCollisionBetween(58, 60);
    this.map.setCollisionBetween(91, 93);
    this.map.setCollisionBetween(100, 102);
      
    this.layer = this.map.createLayer('Capa de Patrones 1');
    this.layer.resizeWorld();
    

    //add enemy whith json
    this.cache._text['enemyData'].data = JSON.parse(this.cache.getText('enemyData'));
    this.enemyData = this.cache.getText('enemyData').enemys;
    for (var i = 0, l = this.enemyData.length; i < l; i++)
    {
      this.newEnemy(this.enemyData[i].posX, this.enemyData[i].posY, this.enemyData[i].range, this.enemyData[i].velocity);
      console.log(i);
    }

    //add physics boy
    this.physics.enable(this.spriteBoy);
    this.physics.arcade.gravity.y = 180;
    this.spriteBoy.body.bounce.y = 0.1;
    this.spriteBoy.body.linearDamping = 1;
    this.spriteBoy.body.collideWorldBounds = false;
    this.camera.follow(this.spriteBoy);

    //add physics weapon
    this.weapon = this.add.sprite(this.spriteBoy.x + 50,this.spriteBoy.y ,'');
    this.physics.enable(this.weapon);
    this.weapon.body.collideWorldBounds = true;
    this.weapon.body.drag.setTo(600, 0);
    this.weapon.body.setSize(30,15,0,0);
    this.weapon.body.allowGravity = false;

    //add cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // The radius of the circle of light
    this.LIGHT_RADIUS = 400;

    },

    update: function () {
      //console.log (this.spriteBoy.x + " + " + this.spriteBoy.y);

      //position y weapon
      this.weapon.y = this.spriteBoy.y+30 ;

      this.physics.arcade.collide(this.spriteBoy, this.layer);

      //enemys
      for (var i = 0, l = this.enemys.length; i < l; i++)
      {
        this.physics.arcade.collide(this.enemys[i].enemySprite, this.layer);
        this.enemys[i].enemySprite.body.setSize(80,70,0,0);

        //enemy kill boy
        this.physics.arcade.overlap(this.spriteBoy, this.enemys[i].enemySprite, function (boy, enemy) {
          this.boyDead();
        }, null, this);
        //enemys move
        //right
        if( (this.enemys[i].enemyDir) && ( this.enemys[i].enemyX + this.enemys[i].enemyMove > this.enemys[i].enemySprite.body.x ) )
        {
          this.enemys[i].enemySprite.body.x += this.enemys[i].velocity;
        }
        else
        {
          this.enemys[i].enemySprite.animations.play('enemyRight');
          this.enemys[i].enemyDir = false;
          
        }
        //left
        if((!this.enemys[i].enemyDir) && ( this.enemys[i].enemyX - this.enemys[i].enemyMove < this.enemys[i].enemySprite.body.x ))
          {
            this.enemys[i].enemySprite.body.x -= this.enemys[i].velocity;


          }
          else
          {
            this.enemys[i].enemySprite.animations.play('enemyLeft');
            this.enemys[i].enemyDir = true;
          }
          if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
             //touch weapon enemy
        this.physics.arcade.overlap(this.weapon, this.enemys[i].enemySprite, function (weapon, enemy) {
          this.enemys[i].enemySprite.animations.play('enemyDie');
          this.enemys[i].enemySprite.kill();
          //this.enemys.splice(i, 1);
        }, null, this);
          }
      }
      //out of bounds, boy is dead
      if ((this.spriteBoy.body.y > 1200) || (this.spriteBoy.body.x < -30))
      {
        this.boyDead();
      }
    //Boy movement
    //this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)

    if (!this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !this.input.keyboard.isDown(Phaser.Keyboard.UP) && !this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.spriteBoy.animations.play(this.animationLast);
    }
    // else if(this.cursors.right.isDown || this.cursors.left.isDown || this.cursors.up.isDown){

    //   // this.spriteBoy.frame = 0;
    //   // this.spriteBoy.animations.stop();
    // }
      this.spriteBoy.body.setSize(46,71,0,0);
      this.spriteBoy.body.velocity.x = 0;
    
    
    //Atack

    if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      if(this.animationLast === 'stopRight'){
        this.spriteBoy.animations.play('atackRight');
        //touch weapon enemy
      }
      else if(this.animationLast === 'stopLeft'){
        this.spriteBoy.animations.play('atackLeft');
      }
        /*  */
    }  
    //Jump 
    if (this.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
      
      //this.animationLast = 'stopLeft';
        if (this.spriteBoy.body.onFloor() && this.animationLast === 'stopRight')
        {
            this.spriteBoy.animations.play('upLookingRight');
            this.spriteBoy.body.velocity.y = -280;
            this.weapon.x = this.spriteBoy.x + 45;
        } else if (this.spriteBoy.body.onFloor() && this.animationLast === 'stopLeft')
          {
            this.spriteBoy.animations.play('upLookingLeft');
            this.spriteBoy.body.velocity.y = -280;
            this.weapon.x = this.spriteBoy.x - 15;
          }

        if(!this.spriteBoy.body.onFloor() && this.animationLast === 'stopRight')
        {
            this.spriteBoy.animations.play('upAirRight');
            this.weapon.x = this.spriteBoy.x + 45;
        }else if(!this.spriteBoy.body.onFloor() && this.animationLast === 'stopLeft'){
            this.spriteBoy.animations.play('upAirLeft');
            this.weapon.x = this.spriteBoy.x - 15;
        }

            
    }
  
    // If  the player press two keys at the same time
    if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
         this.spriteBoy.body.velocity.x = 0;
         this.spriteBoy.animations.play(this.animationLast);
    }
    //Turn left & moving while the boy is in the air
    else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
          if(this.spriteBoy.body.onFloor())
        {
           this.spriteBoy.animations.play('left');
           this.animationLast = 'stopLeft';
           this.spriteBoy.body.velocity.x = -200;
        } else{
           this.spriteBoy.animations.play('up&left');
           this.animationLast = 'stopLeft';
           this.spriteBoy.body.velocity.x = -140;
          }
          this.weapon.x = this.spriteBoy.x - 15;
      
    }
    //Turn right & moving while the kid is in the air 
    else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {         
         if(this.spriteBoy.body.onFloor())
        {
           this.spriteBoy.animations.play('right');
           this.animationLast = 'stopRight';
           this.spriteBoy.body.velocity.x = 200;
        } else{
           this.spriteBoy.animations.play('up&right');
           this.animationLast = 'stopRight';
           this.spriteBoy.body.velocity.x = 140;
          }
          this.weapon.x = this.spriteBoy.x + 45;
    }
    else if(this.input.keyboard.isDown(Phaser.Keyboard.S)){
      this.spriteBoy.animations.play('boyDieRight');

    }
    // Update the shadow texture each frame
      this.updateShadowTexture();
},
//boy dead, reset in pos(25,750)
boyDead: function(){ 
       this.spriteBoy.body.x = 25;
       this.spriteBoy.body.y = 750;
    if(this.animationLast === 'stopRight'){
      this.spriteBoy.animations.play('boyDieRight');
      if (this.spriteBoy.animations.currentAnim._frameIndex >= 1)
      {
         
      }
    }else if(this.animationLast === 'stopLeft'){
      this.spriteBoy.animations.play('boyDieLeft');
    }
},
//objeto donde se implementarán los atributos del niño según nos lo vayan pasando
boyPlayer: function(lives, weapon, sprite){ 
      this.lives = lives;
      this.weapon = weapon;
      this.spriteBoy = sprite;
      /*
      this.animationRight = this.spriteBoy.animations.add('right', [3, 1, 2], 10, true);
      this.animationLeft = this.spriteBoy.animations.add('left', [10, 9, 8], 8, true);
      this.animationJump = this.spriteBoy.animations.add('jump', [4, 5, 6], 8, true);
      */
    },

  //create enemy
newEnemy: function(posX, posY, range, velocity){ 
    this.spriteEnemy = this.add.sprite(posX, posY, 'enemy');
    this.enemys.unshift(new this.enemyNode( 1, this.spriteEnemy, posX, range, velocity));
    this.physics.enable(this.enemys[0].enemySprite);
    },

  //nodo  s de la lista de enemigos
enemyNode: function(hits, sprite, x, pixelMove, velocity)
{
    this.hits = hits;
    this.enemySprite = sprite;
    this.enemyX = x;
    this.enemyMove = pixelMove;
    this.velocity = velocity;
    this.enemyDir = true; //true right, false left
    this.enemySprite.animations.add('enemyDie', [9, 10, 11, 12], 8, true);
    this.enemySprite.animations.add('enemyLeft', [0, 1, 2, 3, 4], 8, true);
    this.enemySprite.animations.add('enemyRight', [8, 7, 6, 5], 8, true);
},

//no funciona bien con tilemaps, buscar errores
updateShadowTexture: function(){
    var spotX = this.spriteBoy.body.x - this.game.camera.view.x;
    var spotY = this.spriteBoy.body.y  - this.game.camera.view.y;
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

    /*this.shadowTexture.context.arc(this.boy.spriteBoy.body.x, this.boy.spriteBoy.body.y,
        this.LIGHT_RADIUS, 0, Math.PI*2);*/
    this.shadowTexture.context.fill();

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;
},
/*render: function(){

    this.game.debug.body(this.spriteBoy);
    this.game.debug.body(this.weapon);
    for (var i = 0; i < this.enemys.length; i++){
       this.game.debug.body(this.enemys[i].enemySprite);
    }

}*/

  };

  window['ndoto'] = window['ndoto'] || {};
  window['ndoto'].Game = Game;

}());
