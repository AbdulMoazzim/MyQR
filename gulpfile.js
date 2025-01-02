const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function compileSass() {
  return src('**/*.scss')
    .pipe(sass())    
    .pipe(dest("css"))
}

function watchSass() {
  watch('**/*.scss', compileSass);
}

exports.default = series(compileSass, watchSass);