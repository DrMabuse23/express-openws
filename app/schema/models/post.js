/**
 * Created by drmabuse on 02/02/15.
 */
'use strict';
var joi = require('joi');
var postSchema = joi.object().keys({
  title: joi.string(),
  description: joi.string(),
  authorId: joi.number()
}).with('title', 'authorId');

module.exports = postSchema;
