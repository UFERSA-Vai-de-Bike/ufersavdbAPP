/**
 * Created by silva on 06/10/17.
 */
var gulp          = require("gulp"),
    inject       = require("gulp-inject");

gulp.task('index', function () {

    var target = gulp.src('index.html');

    // js
    var module = gulp.src('./app/app.module.js', {read: false});
    var app = gulp.src(['./app/*.js','!./app/app.module.js'], {read: false});
    var components = gulp.src('./app/components/**/*.js', {read: false});
    var services = gulp.src('./app/services/**/*.js', {read: false});

    // example
    //var general = gulp.src(['./app/**/*.js', '!./app/services/*.js'], {read: false});

    //css
    var css = gulp.src('./app/**/*.css', {read: false});

    return target.pipe(inject(module,{name:'module'}))
        .pipe(inject(app,{name:'app'}))
        .pipe(inject(services,{name:'service'}))
        .pipe(inject(components,{name:'components'}))
        .pipe(inject(css))
        .pipe(gulp.dest(''));
});