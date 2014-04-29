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

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.stage.backgroundColor = '#FFFFFF';

    this.map = this.add.tilemap('map');

    this.map.addTilesetImage('plataformas');


    
    this.layer = this.map.createLayer('plataformas');


    this.layer.resizeWorld();

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
  };

  window['ndoto'] = window['ndoto'] || {};
  window['ndoto'].Game = Game;

}());
