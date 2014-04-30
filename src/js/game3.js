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
    // Set stage background color
    this.stage.backgroundColor = 0x4488cc;

    // The radius of the circle of light
    this.LIGHT_RADIUS = 100;

    // Add random people on the screen
    var NUMBER_OF_PEOPLE = 20;
    for(var i = 0; i < NUMBER_OF_PEOPLE; i++) {
        var x = this.rnd.integerInRange(100, this.game.width-100);
        var y = this.rnd.integerInRange(100, this.game.height-100);
        this.add.image(x, y, 'boy');
    }
   // Create the shadow texture
    this.shadowTexture = this.add.bitmapData(this.game.width, this.game.height);

    // Create an object that will use the bitmap as a texture
    var lightSprite = this.add.image(0, 0, this.shadowTexture);

    // Set the blend mode to MULTIPLY. This will darken the colors of
    // everything below this sprite.
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    // Simulate a pointer click/tap input at the center of the stage
    // when the example begins running.
    this.input.activePointer.x = this.width/2;
    this.input.activePointer.y = this.height/2;



    },

    update: function () {

    // Move the movable light to where the pointer is
   /* this.movingLight.x = this.p.body.x;
    this.movingLight.y = this.p.body.y;*/
    // Update the shadow texture each frame
    this.updateShadowTexture();


},
updateShadowTexture: function(){
    // Draw shadow
    this.shadowTexture.context.fillStyle = 'rgb(100, 100, 100)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

    // Draw circle of light
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
    this.shadowTexture.context.arc(this.input.activePointer.x, this.input.activePointer.y,
        this.LIGHT_RADIUS, 0, Math.PI*2);
    this.shadowTexture.context.fill();

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;
}
  };

  window['ndoto'] = window['ndoto'] || {};
  window['ndoto'].Game = Game;

}());
