/**
 * Created by drmabuse on 19/01/15.
 */
'use strict';
var joi = require('joi');
/**
 * Check if the json we are loading is the correct Shema
 * https://openws-app.herokuapp.com/ login and check your acess token
 */
var parseSchema = joi.object().keys({
  applicationId: [joi.string(), joi.number()],
  restApiKey: [joi.string(), joi.number()]
}).with('applicationId', 'restApiKey');

module.exports = parseSchema;
