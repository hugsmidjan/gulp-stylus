const { src, dest, watch } = require('gulp');

const defaultOpts = {
  name: 'css', // the display name of the generated tasks
  src: 'src/',
  dist: 'pub/',
  glob: '*.styl', // which files to glob up as entry points
  watchGlob: '*/**/*.styl', // additional files to watch for changes
  browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead'],
  sourcemaps: true, // Not supported tet
};

const _plugins = {
  stylus: require('gulp-stylus'),
  autoprefixer: require('gulp-autoprefixer'),
  cleancss: require('gulp-clean-css'),
  replace: require('gulp-replace'),
};

const plumber = require('gulp-plumber');

const notifyError = (err) => {
  var errmsg = err.message || err;
  require('node-notifier').notify({
    title: 'Error',
    message: errmsg,
  });
  console.error(errmsg);
};

const notifyPipeError = () => plumber(notifyError);

const normalizeOpts = (userOpts, defaultOpts) => {
  const opts = { ...defaultOpts, ...userOpts };
  opts.src = (opts.src + '/').replace(/\/\/$/, '/');
  opts.dist = (opts.dist + '/').replace(/\/\/$/, '/');
  if (typeof opts.glob === 'string') {
    opts.glob = [opts.glob];
  }
  return opts;
};
const prefixGlobs = (globs, src) => globs.map((glob) => src + glob);

module.exports = (opts) => {
  opts = normalizeOpts(opts, defaultOpts);

  const bundleTask = () => {
    return src(prefixGlobs(opts.glob, opts.src), {
      sourcemaps: opts.sourcemaps,
      base: opts.src,
    })
      .pipe(notifyPipeError())
      .pipe(_plugins.stylus({}))
      .pipe(_plugins.autoprefixer({ browsers: opts.browsers }))
      .pipe(
        _plugins.cleancss({
          level: { 1: { roundingPrecision: 'all=7,px=2' } },
          format: 'keep-breaks',
        })
      )
      .pipe(_plugins.replace(/ -no-merge/g, ''))
      .pipe(dest(opts.dist));
  };
  bundleTask.displayName = opts.name;

  const watchTask = () => {
    let watchGlobs = opts.glob;
    if (opts.watchGlob) {
      watchGlobs = watchGlobs.concat(opts.watchGlob);
    }
    watch(prefixGlobs(watchGlobs, opts.src), { base: opts.src }, bundleTask);
  };
  watchTask.displayName = opts.name + '_watch';

  const ret = [bundleTask, watchTask];
  ret.bundle = bundleTask;
  ret.watch = watchTask;

  return ret;
};
