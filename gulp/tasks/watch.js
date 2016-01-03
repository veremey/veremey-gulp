var gulp = require('gulp');
var rimraf = require('rimraf');
var config = require('../config');

gulp.task('watch', [
    'sprite:watch',
    'sass:watch',
    'copy:watch',
    'html:watch',
    // 'jade:watch',
    'font:watch',
    'js:watch'
]);


gulp.task('delete', function (cb) {
    rimraf('./'+config.dest.root, cb);
});
gulp.task('build', ['html','font','sprite','copy','js','sass'], function() {});
gulp.task('default', ['build', 'server', 'watch'], function() {});