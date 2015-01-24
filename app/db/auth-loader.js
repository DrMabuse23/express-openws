'use strict';
var joi = require('joi');
var jf = require('jsonfile');
var async = require('async');
/**
 * @type {string}
 * @private
 * @return {object}
 */
var _connectionJson = null;
var _schema = null;
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
  joi.validate(obj, _schema, callback);
};
/**
 *
 */
var getDbConfig = function (args, cb) {
  _connectionJson = args[0];
  _schema = args[1];
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
