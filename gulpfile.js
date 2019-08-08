var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// autoprefixeroptions for older browsers
var autoprefixeroptions = {
    browsers: ['last 2 versions']
};

// creates virtual server & watches for changes on sass folder
gulp.task('serve', function () {
    browserSync.init({
        server: "./public"
    });
    gulp.watch("sass/**/*.scss", gulp.series('sass'));
    gulp.watch("sass/partials/**/*.scss", gulp.series('sass'));
    gulp.watch("sass/**/*.scss").on('change', browserSync.reload);
});

// compile the main.scss and drop it on .dest/css folder
gulp.task('sass', function () {
    return gulp.src('./sass/main.scss')
        .pipe(sass())
        .pipe(autoprefixer(autoprefixeroptions))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

// 'gulp build' on terminal to run gulp task
gulp.task('build', gulp.series('serve', 'sass'));