var gulp = require('gulp');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var minifyJS = require('gulp-minify');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var deporder = require('gulp-deporder');

gulp.task('css', function(){
    return gulp.src('./assets/sass/*.scss')
        .pipe(sass())
        .pipe(plumber())
        .pipe(autoPrefixer())
        .pipe(cleanCSS())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream())
})

gulp.task('js', function(){
    return gulp.src('./assets/scripts/main.js')
        .pipe(concat('main.min.js'))
        .pipe(deporder())
        .pipe(minifyJS({
            ext: {
                src: '-debug.js',
                min: '.js'
            }
        }))
        .pipe(gulp.dest('./assets/js'))
        .pipe(browserSync.stream())
})

gulp.task('serve', ['css', 'js'], function(){
    browserSync.init({
        server: './',
    })

    gulp.watch('assets/sass/*.scss', ['css']).on('change', browserSync.reload);
    gulp.watch('assets/scripts/*.js',['js']).on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload)
})

gulp.task('default', ['serve']);