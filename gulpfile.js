var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var inject = require('gulp-inject'); //Start by adding the plugin to your gulpfile
var htmlmin = require('gulp-htmlmin');
var babel = require("gulp-babel");

gulp.task('dist', function() {
   gulp.src('./index.html')
     .pipe(inject(gulp.src(['./analytics.html']), { // This is the file that has the content that will be injected into index.html
       starttag: '<!-- inject:analytics -->', // Here we tell the location in which we want the injection to occur
       transform: function (filePath, file) {
         return file.contents.toString('utf8'); // Return file contents as string
         }
     }))
        .pipe(usemin({
            assetsDir: './',
            css: [minifyCss(), 'concat'],
            js: [babel(), uglify(), 'concat'],
            html: [ htmlmin({
              collapseBooleanAttributes: true,
              collapseWhitespace: true,
              decodeEntities: true,
              minifyCSS: true,
              minifyJS: true,
              processConditionalComments: true,
              removeAttributeQuotes: true,
              removeComments: true,
              removeEmptyAttributes: true,
              removeOptionalTags: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              removeTagWhitespace: true,
              sortAttributes: true,
              sortClassName: true,
              useShortDoctype: true
             }) ]
        }))
        .pipe(gulp.dest('dist')); // This is the destination of the final product
});

gulp.task('sass', function(){
  return gulp.src('./scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('./scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('./js/**/*.js', browserSync.reload);
  gulp.watch('./help/*.html', browserSync.reload);


});

gulp.task('browserSync', function() {
  browserSync.init({
    ui: {
      port: 3002
    },
    server: {
      baseDir: './'
    },
    port: 3015
  });
});
