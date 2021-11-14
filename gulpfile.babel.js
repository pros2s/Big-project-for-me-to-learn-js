import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import wServer from "gulp-webserver";
import image from "gulp-image";
import autoPref from "gulp-autoprefixer";
import miniCss from "gulp-csso";

const sass = require('gulp-sass')(require('sass'));

const routes = {
  pug: {
    watch: 'src/**/*.pug',
    src: 'src/*.pug',
    dest: 'build'
  },
  img: {
    src: "src/img/*",
    dest: "build/img"
  },
  scss: {
    watch: 'src/scss/**/*.scss',
    src: 'src/scss/style.scss',
    dest: 'build/css'
  }
};

//PUG
const pug = () =>
  gulp.src(routes.pug.src)
  .pipe(gPug())
  .pipe(gulp.dest(routes.pug.dest));

//SCSS
const styles = () =>
  gulp.src(routes.scss.src)
  .pipe(sass().on('error', sass.logError))
  .pipe(autoPref({
    browsers: ['last 2 versions']
  }))
  .pipe(miniCss())
  .pipe(gulp.dest(routes.scss.dest));

//Watch
const watchPug = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.watch, styles);
};

//Clean
const clean = () =>
  del(["build"]);

//LifeReload
const ws = () =>
  gulp.src('build')
  .pipe(wServer({
    port: 7355,
    livereload: true,
    open: true
  }));

//Images
const img = () =>
  gulp.src(routes.img.src)
  .pipe(image())
  .pipe(gulp.dest(routes.img.dest));

const prepare = gulp.series([clean, img]);
const assets = gulp.series([pug, styles]);
const postDev = gulp.parallel([ws, watchPug]);

export const dev = gulp.series([prepare, assets, postDev]);