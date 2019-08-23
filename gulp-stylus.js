const { src, dest, watch } = require('gulp');
const { notifyPipeError, gulpReplace, normalizeOpts, prefixGlobs } = require('@hugsmidjan/gulp-utils');

const defaultOpts = {
  name: 'css', // the display name of the generated tasks
  src: 'src/',
  dist: 'pub/',
  glob: '*.styl', // which files to glob up as entry points
  watchGlob: '*/**/*.styl', // additional files to watch for changes
  sourcemaps: true, // Not supported yet
};

const _plugins = {
  stylus: require('gulp-stylus'),
  autoprefixer: require('gulp-autoprefixer'),
  cleancss: require('gulp-clean-css'),
};


module.exports = (opts) => {
  opts = normalizeOpts(opts, defaultOpts);

  const bundleTask = () => {
    return src(prefixGlobs(opts.glob, opts.src), {
      sourcemaps: opts.sourcemaps,
      base: opts.src,
    })
      .pipe(notifyPipeError())
      .pipe(_plugins.stylus({}))
      .pipe(_plugins.autoprefixer())
      .pipe(
        _plugins.cleancss({
          level: { 1: { roundingPrecision: 'all=7,px=2' } },
          format: 'keep-breaks',
        })
      )
      .pipe(gulpReplace(/ -no-merge/g, ''))
      .pipe(dest(opts.dist));
  };
  bundleTask.displayName = opts.name;

  const watchTask = () => {
    let watchGlobs = opts.glob;
    if (opts.watchGlob) {
      watchGlobs = watchGlobs.concat(opts.watchGlob);
    }
    watch(prefixGlobs(watchGlobs, opts.src), bundleTask);
  };
  watchTask.displayName = opts.name + '_watch';

  const ret = [bundleTask, watchTask];
  ret.bundle = bundleTask;
  ret.watch = watchTask;

  return ret;
};
