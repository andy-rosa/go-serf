import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import htmlmin from 'gulp-htmlmin';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import { deleteAsync } from 'del';

const paths = {
  styles: {
    src: ['src/styles/**/*.sass','src/styles/**/*.scss'],
    dest: 'dist/css/'
  },
  html: {
    src: './*.html',
    dest: 'dist'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/img/*',
    dest: 'dist/img'
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
    .pipe(gulp.dest(paths.styles.dest))
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
    .pipe(gulp.dest(paths.scripts.dest))
};

// Обработка картинок
export const img = async () => {
  gulp.src(paths.images.src)
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(paths.images.dest))
};

// Минифицирование html
export const htmlMinify = async () => {
  gulp.src(paths.html.src)
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(gulp.dest(paths.html.dest))
};

export const watch = () => {
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
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
