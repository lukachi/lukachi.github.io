const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const server = require('browser-sync').create();
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');

function styles() {
    return gulp.src('./scss/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 5 versions'))
        .pipe(gulp.dest('./assets/styles/'))
        .pipe(server.stream());
}

gulp.task('styles', styles);

gulp.task('vendors', function() {
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/slick-carousel/slick/slick.min.js'])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./assets/vendors/'));
});

gulp.task('iconfonts', function() {
    gulp.src('./icons/**/*.svg')
        .pipe(iconfontCss({
            targetPath: '../../scss/common/_icons.scss',
            fontPath: '../fonts/',
            fontName: 'MilgurtIcons'
        }))
        .pipe(iconfont({
            fontName: 'MilgurtIcons',
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            normalize: true,
            fontHeight: 1001
        }))
        .pipe(gulp.dest('./assets/fonts/'));
});

gulp.task('default', function() {
    server.init({
        server: './'
    });
    gulp.watch('./scss/**/*.scss', styles);
    gulp.watch('./assets/scripts/**/*.js').on('change', server.reload);
    gulp.watch('./*.html').on('change', server.reload);
});
