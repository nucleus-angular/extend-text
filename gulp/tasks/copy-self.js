var gulp = require('gulp');
var gulpConfig = require('../config.js');
var del = require('del');

gulp.task('copy-self', 'Copy this library into the components folder on the test web server', function(done) {
  del.sync('./' + gulpConfig.vendorComponentsPath + '/nucleus-angular-extend-text');

  return gulp.src([
    'module.js',
    'extend-text-controller.js',
    'extend-text-directive.js',
    'assets/**/*.*'
  ], {
    base: '.'
  })
  .pipe(gulp.dest(gulpConfig.vendorComponentsPath + '/nucleus-angular-extend-text'));
});
