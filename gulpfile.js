var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('browserify', function() {

    var bundle = browserify({
        entries: ['./src/js/pages/main.js'],
        transform: [reactify]
    }).bundle();

    return bundle
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('copy-html', function() {
    gulp.src('./src/html/*')
        .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['browserify', 'copy-html']);