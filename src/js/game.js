(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.map = null;
    this.tileset = null;
this.layer = null;
this.p = null;
this.cursors = null;

  }

  Game.prototype = {

    create: function () {
      /*var x = this.game.width / 2
        , y = this.game.height / 2;

      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.input.onDown.add(this.onInputDown, this);*/
      this.physics.startSystem(Phaser.Physics.ARCADE);

    this.stage.backgroundColor = '#FFFFFF';

    this.map = this.add.tilemap('map_prototype');

    this.map.addTilesetImage('tiles');
    //this.map.addTilesetImage('tiles2');


    //  14 = ? block
    // map.setCollisionBetween(14, 15);

    /*this.map.setCollisionBetween(15, 16);
    this.map.setCollisionBetween(20, 25);
    this.map.setCollisionBetween(27, 29);
    this.map.setCollision(40);
    this.map.setCollision(14);*/
    
    this.layer = this.map.createLayer('plataformas');

    //  Un-comment this on to see the collision tiles
    // layer.debug = true;

    //this.layer.resizeWorld();

    this.p = this.add.sprite(32, 32, 'player');

    this.physics.enable(this.p);

    this.physics.arcade.gravity.y = 250;

    this.p.body.bounce.y = 0.2;
    this.p.body.linearDamping = 1;
    this.p.body.collideWorldBounds = true;

    this.camera.follow(this.p);

    this.cursors = this.input.keyboard.createCursorKeys();

    },

    update: function () {

     this.physics.arcade.collide(this.p, this.layer);

      this.p.body.velocity.x = 0;

    if (this.cursors.up.isDown)
    {
        if (this.p.body.onFloor())
        {
            this.p.body.velocity.y = -200;
        }
    }

    if (this.cursors.left.isDown)
    {
        this.p.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown)
    {
        this.p.body.velocity.x = 150;
    }

}

      /*var x, y, cx, cy, dx, dy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      this.player.angle = angle;

      dx = x - cx;
      dy = y - cy;
      scale = Math.sqrt(dx * dx + dy * dy) / 100;

      this.player.scale.x = scale * 0.6;
      this.player.scale.y = scale * 0.6;
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }*/

  };

  window['ndoto'] = window['ndoto'] || {};
  window['ndoto'].Game = Game;

}());
