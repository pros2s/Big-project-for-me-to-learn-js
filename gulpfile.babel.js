import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import wServer from "gulp-webserver";
import img from "gulp-image";

const routes = {
  pug: {
    watch: 'src/**/*.pug',
    src: 'src/*.pug',
    dest: 'build'
  }
};

//PUG
const pug = () =>
  gulp.src(routes.pug.src)
  .pipe(gPug())
  .pipe(gulp.dest(routes.pug.dest));

//Watch PUG
const watchPug = () => {
  gulp.watch(routes.pug.watch, pug);
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

const prepare = gulp.series([clean]);
const assets = gulp.series([pug]);
const postDev = gulp.parallel([ws, watchPug]);

export const dev = gulp.series([prepare, assets, postDev]);