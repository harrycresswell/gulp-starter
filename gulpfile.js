var gulp          = require ('gulp');
var uglify        = require('gulp-uglify');
var sass          = require('gulp-sass');
var browserSync   = require('browser-sync');


function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}


// Scripts Task
// Uglifies
gulp.task('scripts', function(){
  gulp.src('app/js/*.js')
    .pipe(uglify())
    .on('error', errorLog)
    .pipe(gulp.dest('build/js'));
});


// Sass Task
// uglifies
gulp.task('sass', function(){
  gulp.src('app/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css/'))
});


// Run Sass task then reload browser
gulp.task('sass-watch', ['sass'], browserSync.reload);



// Watch Task
// Watches JS
gulp.task('watch', function(){
  browserSync({
      server: {
        baseDir: 'app/'
      }
  });
  gulp.watch('app/js/*js', ['scripts']);
  gulp.watch('app/sass/**/*.scss', ['sass-watch'])
});


gulp.task('default', ['scripts', 'sass', 'watch']);
