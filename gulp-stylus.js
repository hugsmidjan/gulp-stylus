/*global process */
const { src, dest, watch } = require('gulp');
const {
  notifyPipeError,
  gulpReplace,
  normalizeOpts,
  prefixGlobs,
} = require('@hugsmidjan/gulp-utils');

const defaultOpts = {
  name: 'css', // the display name of the generated tasks
  src: 'src/',
  dist: 'pub/',
  glob: '*.styl', // Glob|Array<Glob> – for entry points. Use '!' prefix to ignore
  watchGlob: '*/**/*.styl', // Glob|Array<Glob> – additional files to watch for changes (or '!' ignore).
  sourcemaps: process.env.NODE_ENV !== 'production' ? '.' : false, // boolean or string (relative location)
  minify: true,
};

const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = (opts) => {
  opts = normalizeOpts(opts, defaultOpts);

  const bundleTask = () => {
    return src(prefixGlobs(opts.glob, opts.src), {
      sourcemaps: !!opts.sourcemaps,
      base: opts.src,
    })
      .pipe(notifyPipeError())
      .pipe(stylus({}))
      .pipe(
        postcss(
          opts.minify
            ? [autoprefixer(), cssnano({ preset: 'default' })]
            : [autoprefixer()]
        )
      )
      .pipe(gulpReplace(/ -no-merge/g, ''))
      .pipe(dest(opts.dist, { sourcemaps: opts.sourcemaps }));
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
