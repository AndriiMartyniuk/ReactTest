var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var uglify = require('gulp-uglifyjs');

gulp.task('browserify', function() {

    var bundle = browserify({
        entries: ['./src/js/pages/main.js'],
        transform: [reactify]
    }).bundle();

    return bundle
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./build/'));
});

gulp.task('copy-html', function() {
    gulp.src('./src/html/*')
        .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['browserify', 'copy-html']);