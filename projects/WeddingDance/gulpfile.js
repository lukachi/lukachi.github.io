const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const server = require('browser-sync').create();

function style() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 5 versions'))
        .pipe(gulp.dest('./assets/styles/'))
        .pipe(server.stream());
}

function vendors() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/slick-carousel/slick/slick.min.js', 'node_modules/wowjs/dist/wow.min.js'])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./assets/vendors/'));
}


function defaultTask() {
    vendors();
    server.init({
        server: './'
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./assets/scripts/**/*.js').on('change', server.reload);
    gulp.watch('./*.html').on('change', server.reload);
}

gulp.task('default', defaultTask);

gulp.task('vendors', vendors);
