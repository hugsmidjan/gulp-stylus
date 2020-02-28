# @hugsmidjan/gulp-stylus

```
npm install --save-dev @hugsmidjan/gulp-stylus
```

## Usage

```js
const [cssBundle, cssWatch] = require('@hugsmidjan/gulp-stylus')(opts);
```

## API / Advanced usage

```js
const stylusTaskFactory = require('@hugsmidjan/gulp-stylus');

const options = {
  // These are the defaults:
  name: 'css', // the display name of the generated tasks
  src: 'src/',
  dist: 'pub/',
  glob: '*.styl', // Glob|Array<Glob> – for entry points. Use '!' prefix to ignore
  watchGlob: '*/**/*.styl', // Glob|Array<Glob> – additional files to watch for changes (or '!' ignore).
  sourcemaps: '.', // boolean or string (relative location)
};

// Create the gulp tasks based on the above options.
const cssTasks = stylusTaskFactory(options);

// cssTasks is a two item array...
const [cssBundle, cssWatch] = cssTasks;
// ...but it also exposes the tasks as named properties.
const { bundle, watch } = cssTasks;
```
