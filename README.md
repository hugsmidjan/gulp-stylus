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
  glob: '*.styl', // which files to use as entry points
  watchGlob: '*/**/*.styl', // additional files to watch for changes
  sourcemaps: true, // Not supported tet
};

// Create the gulp tasks based on the above options.
const cssTasks = stylusTaskFactory(options);

// cssTasks is a two item array...
const [cssBundle, cssWatch] = cssTasks;
// ...but it also exposes the tasks as named properties.
const { bundle, watch } = cssTasks;
```
