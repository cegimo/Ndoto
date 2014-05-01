(function() {
  'use strict';

  function Credits() {
    this.titleTxt = null;
    this.startTxt = null;
    this.highScoreTxt = null;
    this.myButton=null;
    this.credits = null;
    this.buttonBack = null;

  }

  Credits.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.creditsBackground = this.add.sprite(0, 0, 'creditsBackground');

      this.buttonBack = this.add.button(550, 500, 'buttonBack', function() { this.game.state.start('menu') }, this, 1, 0, 0);

      /*this.titleTxt = this.add.bitmapText(x, y, 'Credits', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'Luis Miguel García y César Gil', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 30;

      this.myButton = this.add.button(200, 575, 'buttonPlay', function() { this.game.state.start('menu') }, this, 1, 0, 0);*/

      //this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

   /* startButton: function () {
      this.game.state.start('highScore');
    }*/
  };

  window['ndoto'] = window['ndoto'] || {};
  window['ndoto'].Credits = Credits;

}());