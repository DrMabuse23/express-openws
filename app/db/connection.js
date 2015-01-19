'use strict';
var joi = require('joi');
var jf = require('jsonfile');
var util = require('util');
var schema = require('../schema/open-ws');
var _ = require('lodash');
/**
 * @type {string}
 * @private
 * @return {object}
 */
var _connectionJson = __dirname + '/../config/openws.json';
/**
 *
 * @type {null}
 * @private
 *
 */
var _accessToken = null;
/**
 *
 * @type {null}
 * @private
 */
var _email = null;
/**
 *
 * @type {null}
 * here we store the connection information
 */
var dbConfiguration = null;
/**
 *
 * @private
 */
var _readConfig = function () {
  return jf.readFile(_connectionJson, function (err, obj) {
    if (err) {
      throw err;
    }
    return obj;
  });
};
/**
 * @param {object} obj
 * @private
 */
var _validateConfig = function (obj) {
  return joi.validate(obj, schema, function (err, value) {
    if (err) {
      return err;
    }
    return value;
  });
};
/**
 *
 */
var _setConfig = function () {
  var config = _readConfig();
  var validate = _validateConfig(config);
  if (_.isNull(validate)) {
    _accessToken = config.access_token;
    _email = config.email;
    return config;
  }
};

module.exports = function () {
  dbConfiguration = _setConfig();
  if (_.isObject(dbConfiguration)) {
    console.log(dbConfiguration);
    return dbConfiguration;
  }
  return false;
};
