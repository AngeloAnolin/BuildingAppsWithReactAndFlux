"use strict";

var gulp = require('gulp');
var gulpConnect = require('gulp-connect');    // Run local dev server
var gulpOpen = require('gulp-open');          // Open url in browser
var browserify = require('browserify');       // Bundles JS
var source = require('vinyl-source-stream');  // Use conventional text streams with Gulp
var concat = require('gulp-concat');          // Concatenate files
var lint = require('gulp-eslint');            // Lint JS files and JSX

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    images: './src/images/*',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'node_modules/toastr/toastr.css',
      'node_modules/fixed-data-table/dist/fixed-data-table.min.css',
      'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
    ],
    dist: './dist',
    mainJs: './src/main.js'
  }
}

// Start Dev Server (Local)
gulp.task('connect', function(){
  gulpConnect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], function(){
  gulp.src('dist/index.html')
    .pipe(gulpOpen({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(gulpConnect.reload());
});

gulp.task('js', function(){
  browserify(config.paths.mainJs)
  .transform('babelify', { presets: ['react', 'es2015']})
  .bundle()
  .on('error', console.error.bind(console))
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.paths.dist + '/scripts'))
  .pipe(gulpConnect.reload());
});

gulp.task('css', function(){
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function(){
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(gulpConnect.reload());

  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist));
})

gulp.task('lint', function(){
  return gulp.src(config.paths.js)
    .pipe(lint({configFile: 'eslint.config.json'}))
    .pipe(lint.format());
})

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default',['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);