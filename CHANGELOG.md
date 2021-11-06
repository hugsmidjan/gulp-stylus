# Change Log

## Upcoming...

- ... <!-- Add new lines here. Version number will be decided later -->

## 0.2.3

_2021-11-06_

- fix: Disable sourcemaps (by default) when `NODE_ENV === "production"`

## 0.2.2

_2020-03-16_

- fix: Turn off cssnano's `cssDeclarationSorter` to aid minification of mixins
- feat: Allow opting out of minification

## 0.2.1

_2020-02-27_

- feat: Use postcss for autoprefixing and minification
- feat: Enable gulp's built-in sourcemaps output

## 0.2.0

_2019-07-02_

- feat: Drop `browsers` option in favour of `browserslist` in package.json

## 0.1.0

_2019-05-16_

- feat: Initial commit
  - Missing features: Source maps, reading `pkg.browserslist`.
