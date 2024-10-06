import path from 'path';
import { src, dest, parallel, series } from 'gulp';
import postcss from 'gulp-postcss';
import nested from 'postcss-nested';
import each from 'postcss-each';
import colorMix from 'postcss-color-mix';

import gulpSass from 'gulp-sass';
import dartSass from 'sass';

const distFolder = path.resolve(__dirname, 'dist');
const distBundle = path.resolve(__dirname, '..', '..', 'dist/theme-chalk');

const postcssProcessors = [
  each({
    plugins: {
      beforeEach: [colorMix]
    }
  })
];

export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle));
}

export function buildThemeChalk() {
  const sass = gulpSass(dartSass);
  return src(path.resolve(__dirname, 'src/**.scss'))
    .pipe(sass.sync())
    .pipe(postcss(postcssProcessors))
    .pipe(dest(path.resolve(__dirname, 'dist')));
}

export const build = series(buildThemeChalk, copyThemeChalkBundle);
export default build;
