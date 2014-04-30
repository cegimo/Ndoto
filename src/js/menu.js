(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
    this.playButton = null;
    this.buttonCredits = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      /*
      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Example Game' );
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'START');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;
      */
      this.principal_background = this.add.sprite(0, 0, 'principalBackground');
      this.playButton = this.add.button(470, 225, 'buttonPlay', function() { this.game.state.start('game') }, this, 1, 0, 0);
      this.buttonCredits = this.add.button(485, 400, 'buttonCredits', function() { this.game.state.start('credits') }, this, 1, 0, 0);
      //this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      //this.game.state.start('game');
      //this.game.state.start('credits');
    }
  };

  window['ndoto'] = window['ndoto'] || {};
  window['ndoto'].Menu = Menu;

}());
