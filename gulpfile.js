var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var minifyCSS 	= require('gulp-minify-css');
var include     = require('gulp-include');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
      .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
      .pipe(include())
      .pipe(uglify())
    .pipe(sourcemaps.write('maps'))
  .pipe(gulp.dest('dist/js'))
  .pipe(gulp.dest('_site/dist/js'))
  .pipe(browserSync.reload({stream:true}));
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({
      includePaths: ['scss'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sourcemaps.init())
      .pipe(minifyCSS({keepBreaks:true}))
    .pipe(sourcemaps.write('maps'))
  .pipe(gulp.dest('dist/css'))
  .pipe(gulp.dest('_site/dist/css'))
  .pipe(browserSync.reload({stream:true}));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch(['src/js/*.js', 'src/vendor/*.js'], ['scripts']);
  gulp.watch(['index.html', 'blog/index.html', 'blog/archive/index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['scripts', 'sass', 'browser-sync', 'watch']);