/**
 * Created by drmabuse on 19/01/15.
 */
'use strict';
var joi = require('joi');
/**
 * Check if the json we are loading is the correct Shema
 * https://openws-app.herokuapp.com/ login and check your acess token
 */
var openWsSchema = joi.object().keys({
  access_token: [joi.string(), joi.number()],
  email: joi.string().email()
}).with('access_token', 'email');

module.exports = openWsSchema;
