const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify"),
    cssnano = require('gulp-cssnano'),
    pngquant = require('imagemin-pngquant'),
	pug = require('gulp-pug'),
	data = require('gulp-data'),
	fs = require('fs');


gulp.task('templates', function () {
    return gulp.src('app/templates/*.pug')
        .pipe(data(function(file) {
            return JSON.parse(fs.readFileSync('./app/data/data.json'))
        }))
        .pipe(pug({
            pretty: true
        }))
		.pipe(gulp.dest('app/html'))
        .pipe(browserSync.reload({stream: true}))
});


// Пользовательские скрипты проекта
gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});


gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		// 'app/js/common.min.js',
		])
	.pipe(concat('libs.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});


gulp.task('sass', function() {
	return gulp.src(['app/sass/**/*.sass', 'app/sass/**/*.scss'])
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});


gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});


gulp.task('watch', ['templates', 'sass', 'js', 'css-libs', 'browser-sync'], function() {
	gulp.watch(['app/sass/**/*.sass', 'app/sass/**/*.scss'], ['sass']);
	gulp.watch(['app/libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch(['app/templates/**/*.pug'], ['templates']);
	gulp.watch(['app/data/**/*.json'], ['templates']);
	// gulp.watch('app/*.html', browserSync.reload);
});


// gulp.task('imagemin', function() {
//     return gulp.src(['!app/img/**/*.svg', 'app/img/**/*'])
//         .pipe(cache(imagemin({
//             interlaced: true,
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             une: [pngquant()]
//         })))
//         .pipe(gulp.dest('dist/img'));
// });



gulp.task('build', ['removedist', 'templates', 'css-libs', 'sass', 'js'], function() {

	let buildFiles = gulp.src(
		'app/html/**/*.html'
		).pipe(gulp.dest('dist'));

	let buildCss = gulp.src([
		'app/css/main.min.css',
		'app/css/libs.min.css'
		]).pipe(gulp.dest('dist/css'));

	let buildJs = gulp.src([
		'app/js/common.min.js',
		'app/js/libs.min.js'
		]).pipe(gulp.dest('dist/js'));

	let buildFonts = gulp.src([
		'app/fonts/**/*'
		]).pipe(gulp.dest('dist/fonts'));
});


gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });


gulp.task('default', ['watch']);
