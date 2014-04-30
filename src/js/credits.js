(function() {
  'use strict';

  function Credits() {
    this.titleTxt = null;
    this.startTxt = null;
    this.highScoreTxt = null;
    this.myButton=null;
    this.credits = null;

  }

  Credits.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.creditsBackground = this.add.sprite(0, 0, 'creditsBackground');


    },

    update: function () {

    },

  };

  window['ndoto'] = window['ndoto'] || {};
  window['ndoto'].Credits = Credits;

}());