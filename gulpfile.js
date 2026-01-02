const gulp = require('gulp');
const sharp = require('sharp');
const through2 = require('through2');
const path = require('path');

// Process images: resize to 600px wide and convert to webp
function processImages() {
  return gulp
    .src('src/assets/img/batch/*.{jpg,jpeg,png}')
    .pipe(
      through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
          const outputPath = path.join(
            'src/assets/img/covers',
            path.basename(file.path, path.extname(file.path)) + '.webp'
          );

          sharp(file.path)
            .resize(600, null, {
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({ quality: 70 })
            .toFile(outputPath)
            .then(() => {
              console.log(`✓ Processed: ${path.basename(outputPath)}`);
              cb();
            })
            .catch(err => {
              console.error(`✗ Error processing ${file.path}:`, err);
              cb(err);
            });
        } else {
          cb();
        }
      })
    );
}

// Default task
gulp.task('images', processImages);
gulp.task('default', gulp.series('images'));
