var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  var Parse = require('parse').Parse;
  var joi = require('joi');

  var Post = require('../model/Post');
  var schema = require('../schema/models/post.js');

//console.log(req.parseAuth);
  var _users = [];
  var sample = [
    {
      title: 'Lorem Ipsum Dolor',
      description: 'Mauris ultricies purus placerat auctor cras augue hac, ultrices, penatibus pid lundium, porttitor pulvinar, magnis a. Phasellus, elementum? Sed placerat platea? Massa magna dictumst lundium enim velit elementum natoque? Et. Mus placerat. Ac platea elit parturient, dignissim, porta enim elit magna mid? Eu augue, ac, nascetur egestas, magna magna tincidunt.A parturient. Nec sagittis mus cras scelerisque. Dictumst pulvinar. Eros auctor tincidunt urna mus platea mauris mus purus magnis cras pid odio ac? Ultricies vut, proin parturient purus dictumst velit ultrices urna eros! Odio lacus dis ut ac diam, pid egestas sit, adipiscing sit vut, lectus eu, etiam etiam. Pulvinar nisi, in? Dignissim, lundium tortor vel! Pulvinar pid, sociis parturient, enim elit! Vel cras, porta turpis dapibus in nec mus purus et, integer integer amet non, integer dis penatibus sagittis. Aenean ac, urna? Nisi arcu risus eros enim! Augue porttitor, risus proin! Ut pulvinar vut? Scelerisque dolor risus.',
      authorId: 1
    },
    {
      title: 'Lorem Ipsum Dolor sjdajs',
      description: '23 Mauris ultricies purus placerat auctor cras augue hac, ultrices, penatibus pid lundium, porttitor pulvinar, magnis a. Phasellus, elementum? Sed placerat platea? Massa magna dictumst lundium enim velit elementum natoque? Et. Mus placerat. Ac platea elit parturient, dignissim, porta enim elit magna mid? Eu augue, ac, nascetur egestas, magna magna tincidunt.A parturient. Nec sagittis mus cras scelerisque. Dictumst pulvinar. Eros auctor tincidunt urna mus platea mauris mus purus magnis cras pid odio ac? Ultricies vut, proin parturient purus dictumst velit ultrices urna eros! Odio lacus dis ut ac diam, pid egestas sit, adipiscing sit vut, lectus eu, etiam etiam. Pulvinar nisi, in? Dignissim, lundium tortor vel! Pulvinar pid, sociis parturient, enim elit! Vel cras, porta turpis dapibus in nec mus purus et, integer integer amet non, integer dis penatibus sagittis. Aenean ac, urna? Nisi arcu risus eros enim! Augue porttitor, risus proin! Ut pulvinar vut? Scelerisque dolor risus.',
      authorId: 1
    }
  ];

  var _validate = function (args, cb) {
    return joi.validate(args, schema, cb);
  };
  Parse.initialize(req.parseAuth.applicationId, req.parseAuth.javascriptKey);
  var key = 0;
  for (var i = 0, l = 10; i < l; i++) {
    var post = new Post();
    post.set('title', sample[key].title);
    post.set('description', sample[key].description);
    post.set('authorId', sample[key].authorId);
    _validate(post, function (model) {
      model.save(null, {
        success: function (post) {
          // Execute any logic that should take place after the object is saved.
          console.log('New object created with objectId: ' + post.id);
        },
        error: function (post, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          console.log('Failed to create new object, with error code: ' + error.message);
        }
      });
      if (key === 0) {
        key = 1;
      } else {
        key = 0;
      }
      //console.log(sample[key]);
    });
  }
  res.render('index');
});

router.get('/firebase', function (req, res, next) {
  console.log(req.firebaseDb);
  res.render('firebase', {token: 'works'});

  //console.log('token', token);
});
module.exports = router;
