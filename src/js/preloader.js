(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.image('principalBackground', 'assets/principalBackground.png');
      this.load.image('creditsBackground', 'assets/creditsBackground.png');
      this.load.spritesheet('buttonPlay', 'assets/buttonPlay.png', 278, 137);
      this.load.spritesheet('boy', 'assets/boymoving.png', 57, 76);
      this.load.spritesheet('enemy', 'assets/enemy1moving.png', 105, 72);
      this.load.spritesheet('bed', 'assets/bedmoving.png', 140, 111); 
      this.load.spritesheet('buttonCredits', 'assets/buttonCredits2.png', 278, 127);
      this.load.spritesheet('buttonBack', 'assets/buttonBack.png', 122, 107);
      //music
      this.load.audio('inexorable', 'assets/inexorable.mp3');
      this.load.audio('penumbra', 'assets/Penumbra.mp3');
      this.load.text('enemyData', 'assets/enemy3.json');
      //map
      this.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('plataformas', 'assets/plataformas.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['ndoto'] = window['ndoto'] || {};
  window['ndoto'].Preloader = Preloader;

}());
