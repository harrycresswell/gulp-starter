var gulp          = require('gulp');
var uglify        = require('gulp-uglify');
var sass          = require('gulp-sass');
var browserSync   = require('browser-sync');
var imagemin      = require('gulp-imagemin');
var autoprefixer  = require('gulp-autoprefixer');

// Outputs error in terminal instead of breaking file
function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}


// Scripts Task
// Uglifies
gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .on('error', errorLog)
    .pipe(gulp.dest('app/js'));
});


// Sass Task
// uglifies
gulp.task('sass', function(){
  gulp.src('src/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .pipe(gulp.dest('app/css/'));
});


// Image Task
// Compresses images
gulp.task('image', function(){
  gulp.src('app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/img'));
});


// Run Sass task then reload browser
gulp.task('sass-watch', ['sass'], browserSync.reload);


// Watch Task
// Watches JS and Sass
gulp.task('watch', function(){
  browserSync({
      server: {
        baseDir: 'app/'
      }
  });
  gulp.watch('src/js/*js', ['scripts']);
  gulp.watch('src/sass/**/*.scss', ['sass-watch'])
});


gulp.task('default', ['scripts', 'sass', 'image', 'watch']);
