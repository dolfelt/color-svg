// Imports
var gulp = require('gulp'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

// Paths
var paths = {
    scripts: 'js/*.js',
    styles: 'less/*.less',
    dependencies: ['bower_components/jquery/dist/jquery.js', 'bower_components/Snap.svg/dist/snap.svg.js']
};

// Clean the build directory
gulp.task('clean', function() {
    return gulp.src('dist/**/*', {read: false})
        .pipe(clean());
});

gulp.task('scripts', function() {
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(paths.scripts)
        //.pipe(concat('color-svg.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('dist/js'));
});

// Compile LESS
gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

// Minify all the vendor dependencies
gulp.task('dependencies', function() {
    return gulp.src(paths.dependencies)
        .pipe(uglify())
        .pipe(concat('dependencies.min.js'))
        .pipe(gulp.dest('dist/js/vendor'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

// Default task
gulp.task('default', ['clean', 'scripts', 'styles', 'dependencies', 'watch']);