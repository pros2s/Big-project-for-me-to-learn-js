import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import wServer from "gulp-webserver";
import image from "gulp-image";

const routes = {
  pug: {
    watch: 'src/**/*.pug',
    src: 'src/*.pug',
    dest: 'build'
  },
  img: {
    src: "src/img/*",
    dest: "build/img"
  }
};

//PUG
const pug = () =>
  gulp.src(routes.pug.src)
  .pipe(gPug())
  .pipe(gulp.dest(routes.pug.dest));

//Watch
const watchPug = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img);
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
const assets = gulp.series([pug]);
const postDev = gulp.parallel([ws, watchPug]);

export const dev = gulp.series([prepare, assets, postDev]);