(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
    this.playButton = null;
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
      this.principal_background = this.add.sprite(0, 0, 'principal_background');
      this.playButton = this.add.button(200, 375, 'options_button', function() { this.game.state.start('options') }, this, 1, 0, 0);
      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['ndoto'] = window['ndoto'] || {};
  window['ndoto'].Menu = Menu;

}());
