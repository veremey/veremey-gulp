var gulp = require('gulp');
var include = require("gulp-include");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require("gulp-sourcemaps");
var config = require('../config');
var browserSync = require('browser-sync');
// var babel = require('gulp-babel');
reload = browserSync.reload;


gulp.task('js', function () {
    gulp.src(config.src.js+'app.js')
        .pipe(include())
        // .on('error', function(){notify("Javascript include error");})
        .pipe(uglify({compress:
              {hoist_funs: false,
               hoist_vars: false}
            }))
        // .pipe(babel())
        .pipe(sourcemaps.write("./"))
        .pipe(concat("app.min.js"))
        .pipe(gulp.dest(config.dest.js))
        .pipe(reload({stream: true}));
});

gulp.task('js:watch', function() {
    gulp.watch([config.src.js+'*',
                '!' + config.src.js + 'app.min.js',], ['js']);
});