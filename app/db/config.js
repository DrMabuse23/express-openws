'use strict';
var joi = require('joi');
var jf = require('jsonfile');
var schema = require('../schema/open-ws');
var async = require('async');
/**
 * @type {string}
 * @private
 * @return {object}
 */
var _connectionJson = __dirname + '/../config/openws.json';
/**
 *
 * @private
 */
var _readConfig = function (callback) {
  jf.readFile(_connectionJson, callback);
};
/**
 * @param {object} obj
 * @private
 */
var _validateConfig = function (obj, callback) {
  joi.validate(obj, schema, callback);
};
/**
 *
 * @param cb
 */
var getDbConfig = function (cb) {
  async.waterfall([
    _readConfig,
    function (config, callback) {
      _validateConfig(config, function (err, val) {
        if (err) {
          return callback(err);
        }
        if (val) {
          return callback(val);
        }
        callback(null, config);
      });
    }
  ], cb);

};
module.exports = getDbConfig;
