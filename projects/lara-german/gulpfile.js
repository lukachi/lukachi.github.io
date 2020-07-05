const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const server = require('browser-sync').create();
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const babel = require('gulp-babel');

function styles() {
    return gulp.src('./assets/scss/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 5 versions'))
        .pipe(gulp.dest('./assets/styles/'))
        .pipe(server.stream());
}

gulp.task('styles', styles);

function scripts() {
    return gulp.src('scripts/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('assets/scripts'))
        .pipe(server.stream());
}

gulp.task('scripts', scripts);

gulp.task('vendors', function () {
    return gulp.src([
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/lity/dist/lity.min.js",
        "./node_modules/tilt.js/dest/tilt.jquery.min.js",
        "./node_modules/aos/dist/aos.js",
        "./node_modules/slick-carousel/slick/slick.min.js",
    ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./assets/vendors/'));
});

gulp.task('iconfonts', function () {
    let fontName = "lara-german-fonts";
    gulp.src('./icons/**/*.svg')
        .pipe(iconfontCss({
            targetPath: '../../scss/common/_icons.scss',
            fontPath: '../fonts/' + fontName + '/',
            fontName: fontName
        }))
        .pipe(iconfont({
            fontName: fontName,
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            normalize: true,
            fontHeight: 1001
        }))
        .pipe(gulp.dest('./assets/fonts/' + fontName + '/'));
});

gulp.task('default', function () {
    server.init({
        server: './',
        port: 8080,
    });
    gulp.watch('./assets/scss/**/*.scss', styles);
    gulp.watch('./scripts/**/main.js', scripts);
    gulp.watch('./*.html').on('change', server.reload);
});
