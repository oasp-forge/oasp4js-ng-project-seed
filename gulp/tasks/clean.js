'use strict';

var del = require("del");

module.exports = function(gulp, config) {

  return function () {
    return del(config.outputs());
  }
};
