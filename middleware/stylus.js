var path = require('path');

// https://github.com/LearnBoost/stylus/blob/master/docs/middleware.md
var stylus = require('stylus');

// http://visionmedia.github.io/nib/
var nib = require('nib');

// https://github.com/mojotech/jeet/tree/master/stylus
var jeet = require('jeet');

// https://github.com/postcss/autoprefixer
var autoprefixer = require('autoprefixer-stylus');

// https://github.com/jenius/rupture
var rupture = require('rupture');

module.exports = stylus.middleware({
  src: path.join(__dirname, '..', 'public'),
  dest: path.join(__dirname, '..', 'public'),
  compile: function(str, path) {
    console.log('compling');
    return stylus(str)
     .set('filename', path)
     .set('compress', false)
     .use(nib())
     .use(jeet())
     .use(autoprefixer())
     .use(rupture())
  }
});