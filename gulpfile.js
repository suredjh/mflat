var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require("gulp-clean-css");
// gulp.task('HelloWorld', function() { 
//   console.log('HelloWorld');
// });
gulp.task('sass', function(){
  return gulp.src('scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    // 浏览器前缀补全    
    .pipe(autoprefixer({
      browsers: ["last 3 versions"],
      cascade: false
    }))
    // css压缩
    .pipe(minifyCss({
      keepSpecialComments: "*"
    }))
    .pipe(gulp.dest('css'))
});
gulp.watch('scss/**/*.scss',gulp.series('sass'));