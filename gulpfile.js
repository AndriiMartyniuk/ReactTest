var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var path = {
    base: './src/',
    scripts: ['./src/js/'],
    mainScript: 'application.js',
    destination: './build/',
    html: 'application.html'
};

var browserifyConfig = {
    entries: [path.scripts + path.mainScript],
    transform: [reactify]
};

gulp.task('scripts', function() {
    browserify(browserifyConfig)
        .bundle()
        .pipe(source(path.mainScript))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(path.destination + 'js'));
});

gulp.task('styles', function () {
    gulp.src(path.base  + '**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(path.destination + 'styles'));
});

gulp.task('html', function() {
    gulp.src(path.base + path.html)
        .pipe(gulp.dest(path.destination));
});

gulp.task('build', ['scripts', 'styles', 'html']);