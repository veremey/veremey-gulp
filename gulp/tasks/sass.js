var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var notify = require('gulp-notify');
var mqpacker = require("css-mqpacker");
var smartgrid = require('smart-grid');
var config = require('../config');


var smartgridSettings = {
    outputStyle: 'sass', /* less || scss || sass || styl */
    columns: 24, /* number of grid columns */
    offset: "12px", /* gutter width px || % */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '12px' /* side fields */
    },
    breakPoints: {
        lg: {
            'width': '1000px', /* -> @media (max-width: 1100px) */
            'fields': '12px' /* side fields */
        },
        md: {
            'width': '960px',
            'fields': '15px'
        },
        sm: {
            'width': '780px',
            'fields': '15px'
        },
        xs: {
            'width': '660px',
            'fields': '15px'
        }
        /*
        We can create any quantity of break points.

        some_name: {
            some_width: 'Npx',
            some_offset: 'N(px|%)'
        }
        */
    }
};

gulp.task('smartgrid', function() {
    smartgrid('../static/css/sass', smartgridSettings);
});

gulp.task('sass', function() {

    var processors = [
        autoprefixer({browsers: ['IE 9', 'IE 10', 'IE 11', 'Opera 12', 'iOS 7', 'ios_saf 7', 'iOS 8', 'ios_saf 8', 'last 5 versions'], cascade: false}),
        mqpacker({
            sort: function (a, b) {
                a = a.replace(/\D/g,'');
                b = b.replace(/\D/g,'');
                return b-a;
                // replace this with a-b for Mobile First approach
            }
        })
    ];

    return sass(config.src.sass+'**/*.sass', {
        sourcemap: false,//true is better
        // style: 'compact',
        style: 'compressed',
        emitCompileError: true
    })
    .on('error', notify.onError({
        title: 'Sass Error!',
        message: '<%= error.message %>'
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:watch', function() {
    gulp.watch(config.src.sass + '**/*', ['sass']);
});