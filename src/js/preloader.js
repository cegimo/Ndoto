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
      this.load.spritesheet('buttonCredits', 'assets/buttonCredits.png', 278, 127);
      this.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('plataformas', 'assets/plataformas.png');
      this.load.image('boy', 'assets/child.png');
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
