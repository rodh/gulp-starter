var gulp          = require ('gulp'),
    uglify        = require ('gulp-uglify'),
    less          = require ('gulp-less'),
    sourcemaps    = require ('gulp-sourcemaps'),
    plumber       = require ('gulp-plumber'),
    browserSync   = require ('browser-sync'),
    notify        = require ('gulp-notify'),
    rename        = require ('gulp-rename'),
    minifycss     = require ('gulp-minify-css'),
    gutil         = require ('gulp-util'),
    reload        = browserSync.reload


var config = {
  paths: {
    html: {
      src:  ['src/**/*.html'],
      dest: 'build'
    },
    javascript: {
      src:  ['src/js/**/*.js'],
      dest: 'build/js'
    },
    css: {
      src: ['src/css/**/*.css'],
      dest: 'build/css'
    },
    images: {
      src: [
        'src/images/**/*.jpg', 
        'src/images/**/*.jpeg', 
        'src/images/**/*.png',
        'src/images/**/*.gif'
      ],
      dest: 'build/images'
    },
    less: {
      src: ['src/less/*.less'],
      dest: 'build/css'
    }
  }
}


//
// Uglyfies js on to /js/minjs
// --------------------------------------------------

gulp.task ('html', function () {
  gulp.src (config.paths.html.src)
    .pipe (gulp.dest(config.paths.html.dest))
})


//
// Uglyfies js on to /js/minjs
// --------------------------------------------------
 
gulp.task ('javascript', function () {  
  gulp.src (config.paths.javascript.src)
    .pipe (plumber ())
    .pipe (uglify ())
    .pipe (gulp.dest (config.paths.javascript.dest))
})


//
// Compiles less on to /css
// --------------------------------------------------

gulp.task ('less', function () {
  gulp.src (config.paths.less.src)
   .pipe (plumber ())
   .pipe(less ({
      paths: ['bower_components/bootstrap/less']
    }))
   .pipe (gulp.dest (config.paths.less.dest))
   .pipe (reload ({ stream: true }))
   .pipe (rename ({ suffix: '.min' }))
   .pipe (minifycss())
   .pipe (gulp.dest (config.paths.less.dest))
})


//
// Browser Sync
// --------------------------------------------------

gulp.task ('browser-sync', function() {
  browserSync ({
    server: {
      baseDir: './build'
    }
  })
})


//
// Reload Browsers
// --------------------------------------------------

gulp.task ('bs-reload', function () {
  browserSync.reload ()
})


//
// Watch
// --------------------------------------------------

gulp.task ('watch', function () { 
  gulp.watch (config.paths.javascript.src, ['javascript', 'bs-reload'])
  gulp.watch (config.paths.less.src, ['less'])  
  gulp.watch (config.paths.html.src, ['html', 'bs-reload'])
}) 


//
// Default Task
// --------------------------------------------------

gulp.task ('default',  ['html', 'javascript', 'less', 'browser-sync', 'watch'])