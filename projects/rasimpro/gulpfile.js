const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const server = require('browser-sync').create();
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const babel = require('gulp-babel');

function styles() {
    return gulp.src('./scss/main.scss')
        .pipe(sass({
            // outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 5 versions'))
        .pipe(gulp.dest('./assets/styles/'))
        .pipe(server.stream());
}

function scripts() {
    return gulp.src('scripts/**/main.js')
        .pipe(babel())
        .pipe(gulp.dest('assets/scripts'))
        .pipe(server.stream());
}

function allScripts() {
    return gulp.src('scripts/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('assets/scripts'))
        .pipe(server.stream());
}

function noReloadScript() {
    return gulp.src('scripts/**/no-reload-script.js')
        .pipe(babel())
        .pipe(gulp.dest('assets/scripts'))
        .pipe(server.stream());
}

gulp.task('vendors', function () {
    return gulp.src([
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/js-cookie/src/js.cookie.js",
        "./node_modules/swup/dist/swup.min.js",
        "./node_modules/@swup/scripts-plugin/dist/SwupScriptsPlugin.min.js",
        "./node_modules/@swup/overlay-theme/dist/SwupOverlayTheme.min.js",
        "./node_modules/slick-carousel/slick/slick.min.js",
        "./node_modules/gsap/dist/gsap.min.js",
        "./libs/imakewebthings-waypoints-34d9f6d/lib/jquery.waypoints.min.js",
        "./libs/VanillaTilt/vanilla-tilt.babel.min.js",
        "./node_modules/magnific-popup/dist/jquery.magnific-popup.min.js",
        "./node_modules/lazyload/lazyload.min.js"
    ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./assets/vendors/'));
});

gulp.task('iconfonts', function () {
    let fontName = "rasimpro-icons";
    gulp.src('./icons/**/*.svg')
        .pipe(iconfontCss({
            targetPath: '../../../scss/common/_icons.scss',
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

gulp.task('styles', styles);

gulp.task('scripts', scripts);

gulp.task('allScripts', allScripts);

gulp.task('noReloadScript', noReloadScript);

gulp.task('default', function () {
    server.init({
        server: './',
        port: 8080,
    });
    gulp.watch('./scss/**/*.scss', styles);
    gulp.watch('./scripts/**/main.js', scripts);
    gulp.watch('./scripts/**/no-reload-script.js', noReloadScript);
    gulp.watch('./*.html').on('change', server.reload);
});
