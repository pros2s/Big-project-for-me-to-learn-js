import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import image from "gulp-image";
import autoPref from "gulp-autoprefixer";
import miniCss from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";
import concat from "gulp-concat";
import bsync from "browser-sync";
import uglify from "gulp-uglify";
import wrapper from "gulp-wrapper";

const sass = require('gulp-sass')(require('sass'));
bsync.create();

const routes = {
  pug: {
    watch: 'src/**/*.pug',
    src: 'src/*.pug',
    dest: 'build'
  },
  img: {
    src: "src/img/**/*",
    dest: "build/img"
  },
  scss: {
    watch: 'src/scss/**/*.scss',
    src: 'src/scss/style.scss',
    dest: 'build/css'
  },
  js: {
    watch: 'src/js/**/*.js',
    src: 'src/js/*.js',
    dest: 'build/js'
  },
  php: {
    watch: 'src/**/*.php',
    src: 'src/server.php',
    dest: 'build/php'
  },
  json: {
    watch: 'src/**/*.json',
    src: 'src/db.json',
    dest: 'build'
  }
};

//Browser reload
const sync = () => {
  bsync.init({
    proxy: "gulpFood.dev"
  });
};

//PUG
const pug = () =>
  gulp.src(routes.pug.src)
  .pipe(gPug())
  .pipe(gulp.dest(routes.pug.dest))
  .pipe(bsync.reload({stream: true}));

//SCSS
const styles = () =>
  gulp.src(routes.scss.src)
  .pipe(sass().on('error', sass.logError))
  .pipe(autoPref({
    browsers: ['last 2 versions']
  }))
  .pipe(miniCss())
  .pipe(gulp.dest(routes.scss.dest))
  .pipe(bsync.reload({stream: true}));

//JS
const js = () =>
  gulp.src(routes.js.src)
  .pipe(bro({
    transform: [babelify.configure({ presets: ['@babel/preset-env'] })]
  }))
  .pipe(uglify())
  .pipe(concat('app.js'))
  .pipe(wrapper({
    header: '"use strict";\n'
  }))
  .pipe(gulp.dest(routes.js.dest))
  .pipe(bsync.reload({stream: true}));

//PHP
const php = () =>
  gulp.src(routes.php.src)
  .pipe(gulp.dest(routes.php.dest))
  .pipe(bsync.reload({stream: true}));

//JSON
const json = () =>
  gulp.src(routes.json.src)
  .pipe(gulp.dest(routes.json.dest))
  .pipe(bsync.reload({stream: true}));

//Watch
const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
  gulp.watch(routes.php.watch, php);
  gulp.watch(routes.json.watch, json);
};

//Clean
const clean = () =>
  del(["build"]);

//Images
const img = () =>
  gulp.src(routes.img.src)
  .pipe(image())
  .pipe(gulp.dest(routes.img.dest));

const prepare = gulp.series([clean, img]);
const assets = gulp.parallel([pug, styles, js, php, json]);

const build = gulp.series(prepare, assets);
const ggulp = gulp.parallel(build, sync, watch);

exports.default = ggulp;