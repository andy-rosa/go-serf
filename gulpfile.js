import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import htmlmin from 'gulp-htmlmin';
import size from 'gulp-size';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import { deleteAsync } from 'del';

import browserSync from 'browser-sync';

const paths = {
  styles: {
    src: ['src/styles/**/*.sass','src/styles/**/*.scss'],
    dest: 'dist/css/'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist'
  },
  scripts: {
    src: ['src/scripts/**/*.ts', 'src/scripts/**/*.js'],
    dest: 'dist/js/'
  },
  images: {
    src: 'src/img/*',
    dest: 'dist/img'
  },
  libs: {
    src: {
      normalize: 'node_modules/normalize.css/normalize.css',
      animateCss: 'node_modules/animate.css/animate.css'
    },
    dest: 'src/styles/'
  }
}

const sass = gulpSass(dartSass);

// Обработка стилей
export const styles = async () => {
  gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(size())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
};

// Подключение css библиотек
export const addCssLibs = async () => {
  gulp.src([
    paths.libs.src.normalize,
    paths.libs.src.animateCss
  ])
  .pipe(concat('_libs.scss'))
  .pipe(gulp.dest(paths.libs.dest))
};

// Обрабтка скриптов
export const scripts = async () => {
  gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(size())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
};

// Обработка картинок
export const img = async () => {
  gulp.src(paths.images.src)
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(size())
    .pipe(gulp.dest(paths.images.dest));
};

// Минифицирование html
export const htmlMinify = async () => {
  gulp.src(paths.html.src)
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(size())
  .pipe(gulp.dest(paths.html.dest))
  .pipe(browserSync.stream());
};

export const watch = () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch(paths.html.dest).on('change', browserSync.reload);
  gulp.watch(paths.html.src, htmlMinify);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
};

export const clean = async () => await deleteAsync(['dist/*']);


const build = gulp.series(
  clean,
  htmlMinify,
  gulp.parallel(
    styles,
    scripts,
    img
    ),
  watch);

export default build;
