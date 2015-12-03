var gulp = require('gulp');
var angularProtractor = require('gulp-angular-protractor');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('test', function() {
    gulp.src(['./src/tests/*.js'])
        .pipe(angularProtractor({
            'configFile': 'test/protractor-conf.js',
            'args': ['--baseUrl', 'localhost:8080'],
            'autoStartStopServer': true,
            'debug': true
        }))
        .on('error', function(e) { throw e })
});

gulp.task('sass', function() {
    gulp.src('app/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('uglify', function() {
    gulp.src('app/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('minify', function() {
    gulp.src('app/**/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('app/styles/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', ['dev-copy']);
    gulp.watch('app/**/*.html', ['dev-copy']);
});

gulp.task('copy', function() {
    gulp.src('app/img/**')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('dev-copy', function() {
    gulp.src('app/js/**')
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('default', ['sass', 'watch', 'copy', 'dev-copy', 'connect']);
gulp.task('deploy', ['uglify', 'minify', 'sass', 'copy']);