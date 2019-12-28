var gulp = require("gulp");
var LiveServer = require("gulp-live-server");
var browserSync = require("browser-sync");
var broswerify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

/*gulp.task("live-server", function() {
  var server = new LiveServer("server/main.js");
  server.start();
});
*/
gulp.task("bundle", function() {
  return broswerify({
    entries: "app/main.jsx",
    debug: true
  })
    .transform(reactify)
    .bundle()
    .pipe(source("app.js"))
    .pipe(gulp.dest("./.temp"));
});
/*
gulp.task("serve", gulp.series("live-server"), function() {
  browserSync.init(null, {
    proxy: "localhost:7777",
    port: 9001
  });
});
*/

function bundle() {
  broswerify({
    entries: "app/main.jsx",
    debug: true
  })
    .transform(reactify)
    .bundle()
    .pipe(source("app.js"))
    .pipe(gulp.dest("./.temp"));
}

function serve() {
  bundle();
  var server = new LiveServer("server/main.js");
  server.start();
  browserSync.init(null, {
    proxy: "localhost:7777",
    port: 9001
  });
}

exports.serve = serve;
