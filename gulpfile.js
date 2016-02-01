var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var uglify      = require('gulp-uglifyjs');
var handlebars  = require('gulp-handlebars');
var wrap        = require('gulp-wrap');
var declare     = require('gulp-declare');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var cp          = require('child_process');
var mainBowerFiles = require('main-bower-files');
var paths = {
  asset   : './assets',
  bower   : './bower_components'
};
var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
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
gulp.task('browser-sync', ['sass', 'jekyll-build', 'templates', 'js', 'bower_install'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src(paths.asset+'/scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

gulp.task('js', function(){
  gulp.src(paths.asset+'/js/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('_site/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('js'));
});

gulp.task('templates', function(){
  gulp.src(paths.asset+'/templates/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'HandlebarsTemplates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('_site/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('js'));
});

gulp.task('bower_install', function() {
    return gulp.src(mainBowerFiles(), { base: '/bower_components' })
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('_site/js'))
        .pipe(gulp.dest('js'));

});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch([paths.asset+'/scss/*.scss', paths.asset+'/scss/modules/*.scss'], ['sass']);
  gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', 'climate/**/*.md', 'gfw/**/*.md', 'commodities/**/*.md', 'fires/**/*.md'], ['jekyll-rebuild']);
  gulp.watch([paths.asset+'/js/*.js', paths.asset+'/templates/*.hbs'], ['js']);
  gulp.watch([paths.asset+'/templates/*.hbs'], ['templates']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
