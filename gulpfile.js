// plugin for browserify to convert ES2015 to ES5
// https://www.npmjs.com/package/babelify
var babelify = require('babelify');

// acts as a tiny web server for testing the app
// also automatically reloads the browser when any files change
// https://www.npmjs.com/package/browser-sync
var browserSync = require('browser-sync').create();

// builds a single JS file out of all the 'require'd stuff
// https://www.npmjs.com/package/browserify
var browserify = require('browserify');

// stream files into a buffer
// https://www.npmjs.com/package/vinyl-buffer
var buffer = require('vinyl-buffer');

// our task runner
// https://www.npmjs.com/package/gulp
var gulp = require('gulp');

// gives gulp some handy utilities (like logging)
// https://www.npmjs.com/package/gulp-util
var gutil = require('gulp-util');

// allow us to use pretty URLs
// https://www.npmjs.com/package/connect-history-api-fallback
var historyApiFallback = require('connect-history-api-fallback')

// rename files
// https://www.npmjs.com/package/gulp-rename
var rename = require('gulp-rename');

// compile .scss files
// https://www.npmjs.com/package/gulp-sass
var sass = require('gulp-sass');

// make file streaming with gulp easier
// https://www.npmjs.com/package/vinyl-source-stream
var source = require('vinyl-source-stream');

// minify JS & CSS files
// https://www.npmjs.com/package/gulp-uglify
var uglify = require('gulp-uglify');

// automatically rebuild dist/js/startup.js file whenever any JS file changes
// https://www.npmjs.com/package/watchify
var watchify = require('watchify');

// ******************
// HELPER FUNCTIONS
// ******************
function logError() {
    // convert all error arguments to a real array
    var errs = Array.prototype.slice.call(arguments);

    // lazy stuff - throw the errors to the console
    // this would be a great place for improvement
    gutil.log(errs);
}

function buildJS(file, watch) {
    var config = {
        entries: ['./js/' + file],
        debug : true,
        transform:  [babelify.configure({
            presets: ['es2015', 'react']
        })]
    };

    // watchify() if watch requested, otherwise run browserify() once
    var bundler = watch ? watchify(browserify(config)) : browserify(config);

    function rebuild() {
        var stream = bundler.bundle();

        return stream
            .on('error', logError)
            .pipe(source(file))
            .pipe(gulp.dest('./dist/js/'))
            .pipe(browserSync.reload({ stream: true }))
    }

    bundler.on('update', function() {
        rebuild();
        gutil.log('rebuilding JS!');
    });

    return rebuild();
}

// ******************
// GULP TASKS
// ******************

// spin up a lil' server configured for pretty URLs
gulp.task('browser-sync', function() {
    browserSync.init({
        // no special server config, as we only have a simple HTML site
        server: {},
        // allow us to use clean URLs
        // this basically forces all URLs to use index.html, which then
        // passes control to our <Router>
        middleware: [ historyApiFallback() ],
        // don't mirror actions to other devices (doesn't really apply here)
        ghostMode: false
    })
});

// compile Sass to CSS and put in /dist/css/ folder
gulp.task('css',function() {
    gulp.src('css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'))
});

// transpile ES2015 back to ES5 (via the buildJS helper function)
gulp.task('js', function() {
    // passing false to build dist/js/startup.js once when gulp starts
    return buildJS('startup.js', false);
});

// 'default' task is run when typing 'gulp' into the command line
// run css, js, and browser-sync tasks immediately
gulp.task('default', ['css', 'js', 'browser-sync'], function() {
    // if a .scss file changes, run the 'css' gulp task
    gulp.watch('css/**/*', ['css']);

    // passing true here tell buildJS to continually watch for changes to
    // startup.js
    return buildJS('startup.js', true);
});
