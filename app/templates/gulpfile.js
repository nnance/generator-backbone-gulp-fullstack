var http = require('http');
var gulp = require('gulp');
var ecstatic = require('ecstatic');
var lr = require('tiny-lr');
var lrserver = lr();

// Load plugins
var $ = require('gulp-load-plugins')();

var paths = {
  scripts: ['js/*.js'],
  html: ['./*.html']
};

var livereloadport = 35729,
    serverport = 5001;

gulp.task('scripts', function() {
    // Single entry point to browserify
    return gulp.src('js/index.js')
        .pipe($.browserify({
          insertGlobals : true,
          debug : false
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe($.livereload(lrserver));
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe($.embedlr())
        .pipe(gulp.dest('dist/'))
        .pipe($.livereload(lrserver));
});

gulp.task('serve', function() {
  //Set up our static fileserver, which serves files in the build dir
  http.createServer(ecstatic({ root: __dirname + '/dist' })).listen(serverport);

  //Set up our livereload server
  lrserver.listen(livereloadport);
});

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.html, ['html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'html', 'serve', 'watch']);

gulp.task('build', ['scripts', 'html']);
