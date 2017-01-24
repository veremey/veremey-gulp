var gulp = require('gulp');
var imagemin = require("gulp-imagemin");
var pngquant = require('imagemin-pngquant');
var imageminJpegoptim = require('imagemin-jpegoptim');
var cache = require('gulp-cache');
var config = require('../config');

gulp.task('img', function() {
  return gulp.src(config.src.img + '**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      // optimizationLevel: 7,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant(),
            imageminJpegoptim({
              max: 50,
              progressive: true
            })]
    })))
    .pipe(gulp.dest(config.dest.img));
});


gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('img:watch', function() {
    gulp.watch(config.src.img+ '**/*.*', ['img']);
});