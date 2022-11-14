import gulp from 'gulp';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
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
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js/'
  }
}

const sass = gulpSass(dartSass);

export const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
};

// Обрабтка скриптов
export const scripts = () => {
  return gulp.src(paths.scripts.src, {
    sourcemaps: true
  })
  .pipe(babel())
  .pipe(uglify())
  .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
};

export const watch = () => {
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)

};

export const clean = await deleteAsync(['dist']);

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch);

export default build;
