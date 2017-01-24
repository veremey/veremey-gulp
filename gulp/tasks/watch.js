var gulp = require('gulp');
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('watch', [
    'sprite:watch',
    'sass:watch',
    // 'copy:watch',
    'pug:watch',
    'font:watch',
    'js:watch',
    'img:watch'
]);


gulp.task('delete', function (cb) {
    rimraf('./'+config.dest.root, cb);
});
gulp.task('default', ['server', 'watch'], function() {});
gulp.task('build', ['pug','font','sprite',/*'copy',*/'js','sass', 'img'], function() {});