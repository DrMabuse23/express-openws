/**
 * Created by drmabuse on 19/01/15.
 */
'use strict';
var joi = require('joi');
/**
 * Check if the json we are loading is the correct Shema
 * https://openws-app.herokuapp.com/ login and check your acess token
 */
var firebaseSchema = joi.object().keys({
  token: [joi.string(), joi.number()],
  db: [joi.string(), joi.number()],
  admin: [joi.string(), joi.number()]
}).with('token', 'db', 'admin');

module.exports = firebaseSchema;
