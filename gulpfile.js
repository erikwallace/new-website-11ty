const gulp = require('gulp');
const sharp = require('sharp');
const through2 = require('through2');
const path = require('path');
const fs = require('fs');

function shouldSkipImage(inputPath, outputPath) {
  if (!fs.existsSync(outputPath)) {
    return false;
  }

  const inputMtime = fs.statSync(inputPath).mtimeMs;
  const outputMtime = fs.statSync(outputPath).mtimeMs;

  return outputMtime >= inputMtime;
}

// Process images: resize to 600px wide and convert to webp
function processImages() {
  return gulp
    .src('src/assets/img/batch/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP,avif,AVIF}', { since: gulp.lastRun(processImages) })
    .pipe(
      through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
          const outputPath = path.join(
            'src/assets/img/covers',
            path.basename(file.path, path.extname(file.path)) + '.webp'
          );

          // Skip when a processed image already exists and is newer than the source.
          if (shouldSkipImage(file.path, outputPath)) {
            console.log(`Skipped (up to date): ${path.basename(outputPath)}`);
            cb();
            return;
          }

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
