const glob = require('glob');
const { minify } = require('terser');
const { readFileSync, writeFileSync } = require('fs');


// options is optional
glob('dist/**/*.js', (er, files) => {
  files.forEach(async file => {
    const code = readFileSync(file, 'utf8');
    const res = await minify(code, { mangle: { toplevel: true } });
    writeFileSync(file, res.code);
  });
});
