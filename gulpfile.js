var gulp=require('gulp');
var browserSync=require('browser-sync');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'source'
    }
  })
})

gulp.task('hello', function () {
  console.log('Hello Zell!');
})

gulp.task('watch', ['browserSync','hello'], function() {
  gulp.watch('index.html', browserSync.reload);
});
