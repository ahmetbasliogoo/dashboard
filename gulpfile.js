const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const { series } = require('gulp');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');



function style() {
    return gulp.src('./app/assets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./app/assets/sass/'))
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        notify: false,
        startPath: './app/index.html'
    });
    gulp.watch('./app/assets/sass/*.scss', style);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
}



function minify() {
    return gulp.src('./app/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true
        }))
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest('./dist'));
}
function forDist(){

    return gulp.src(./app/)
}


exports.style = style;
exports.watch = series(style, watch);
exports.build = series( minify);
