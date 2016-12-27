var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
gulp.task('server',['sass'],function () {
    browserSync.init({
        server:{
            baseDir:'./',
            startPath:'index.html'
        }
    });

    gulp.watch('scss/*.scss',['sass']);
    gulp.watch('js/*.js').on('change',reload);
    gulp.watch('*.html').on('change',reload);
});

gulp.task('concat',function () {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('sass',function () {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}))
});


gulp.task('uglify',function () {
    return gulp.src('dist/all.js')
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('compile',['concat','uglify']);

//为最后打包上线处理的
gulp.task('build',['compile']);