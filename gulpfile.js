import gulp from 'gulp';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
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

export const watch = () => {
  gulp.watch(paths.styles.src, styles)
};

export const clean = await deleteAsync(['dist']);

const build = gulp.series(clean, styles, watch);

export default build;
