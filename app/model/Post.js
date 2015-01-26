/**
 * Created by drmabuse on 25/01/15.
 */
'use strict';
var Parse = require('parse').Parse;
var joi = require('joi');

var model = Parse.Object.extend({
  className: 'Post',
  defaults: {
    title: '',
    decription: '',
    authorId: ''
  }
});
module.exports = model;
