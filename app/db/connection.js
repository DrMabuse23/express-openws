'use strict';
var _accessToken = 'xx';
var _email = 'xx';

var _getToken = function () {
  return _accessToken;
};

var _getEmail = function () {
  return _email;
};

var getLoginCredentials = function () {
  return {
    token: _getToken(),
    email: _getEmail()
  }
};

module.exports = getLoginCredentials;