'use strict';

var gulp = require('gulp');
var jsdoc2md = require('jsdoc-to-markdown');
var gutil = require('gulp-util');
var fs = require('fs');

gulp.task('generate-docs', function(){
  var src = 'lib/**/*.js';
  var dest = 'doc/API.md';
  var options = {};

  if (!fs.existsSync('doc')) {
    fs.mkdirSync('doc');
  }

  return jsdoc2md.render(src, options)
    .on('error', function(err){
      gutil.log(gutil.colors.red('jsdoc2md failed'), err.message);
    })
    .pipe(fs.createWriteStream(dest));
});
