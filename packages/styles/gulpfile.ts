import path from 'path';
import { src, dest, parallel, series } from 'gulp';
import postcss from 'gulp-postcss';
import each from 'postcss-each';
import colorMix from 'postcss-color-mix';

import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import { copyFile, mkdir } from 'fs/promises';

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

export async function copyFullStyle() {
  await mkdir(path.resolve(__dirname, '..', '..', 'dist', 'umd'), { recursive: true });

  await copyFile(
    path.resolve(__dirname, '..', '..', 'dist', 'theme-chalk', 'index.css'),
    path.resolve(__dirname, '..', '..', 'dist', 'umd', 'index.css')
  );
}

export function buildThemeChalk() {
  const sass = gulpSass(dartSass);
  return src(path.resolve(__dirname, 'src/**.scss'))
    .pipe(sass.sync())
    .pipe(postcss(postcssProcessors))
    .pipe(dest(path.resolve(__dirname, 'dist')));
}

export const build = series(buildThemeChalk, copyThemeChalkBundle, copyFullStyle);
export default build;
