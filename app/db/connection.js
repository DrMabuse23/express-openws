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
var _readConfig = function () {
  jf.readFile(_connectionJson, function (err, obj) {
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
  joi.validate(obj, schema, function (err, value) {
    if (err) {
      return err;
    }
    return value;
  });
};

var getConnection = function (args, cb) {
  //console.log(args);
  async.waterfall([
    function (callback) {
      var config = _readConfig();
      callback(null, config);
    },
    function (config, callback) {
      var validate = _validateConfig(config);
      callback(null, validate, config);
    },
    function (validate, config, callback) {
      dbConfiguration = config;
      if (validate) {
        return callback('Can`t read config');
      }
      callback(null, config);
    }
  ], function (err, result) {
    if (err) {
      return cb(err);
    }
    if(result) {
      return cb(null, result);
    }
    return cb(null);
  });

};
module.exports = getConnection;
