'use strict';
var joi = require('joi');
var jf = require('jsonfile');
var util = require('util');
var schema = require('../schema/open-ws');
var _ = require('lodash');
var async = require('async');
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
var _readConfig = function (callback) {
  jf.readFile(_connectionJson, function (err, obj) {
    if (err) {
      return callback(err);
    }
    return callback(null, obj);
  });
};
/**
 * @param {object} obj
 * @private
 */
var _validateConfig = function (obj, callback) {
  joi.validate(obj, schema, function (err, value) {
    if (err) {
      return callback(err);
    }
    return callback(null, value);
  });
};

var getConnection = function (cb) {
  //console.log(args);
  async.waterfall([
    function (callback) {
      var config = _readConfig(callback);
      callback(null, config);
    },
    function (config, callback) {
      var validate = _validateConfig(config, callback);
      callback(null, validate, config);
    },
    function (validate, config, callback) {
      console.log(validate, config);
      if (validate) {
        callback(validate, null);
      } else {
        callback(null, config);
      }

    }
  ], function (err, result) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, result);
    }
  });

};
module.exports = getConnection;
