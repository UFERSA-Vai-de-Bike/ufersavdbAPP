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
    var servicesAPI = gulp.src('./app/services/api/*.js', {read: false});
    var servicesTOOLS = gulp.src('./app/services/tools/*.js', {read: false});

    // example
    //var general = gulp.src(['./app/**/*.js', '!./app/services/*.js'], {read: false});

    //css
    var css = gulp.src('./app/**/*.css', {read: false});

    return target.pipe(inject(module,{name:'module'}))
        .pipe(inject(app,{name:'app'}))
        .pipe(inject(servicesAPI,{name:'api'}))
        .pipe(inject(servicesTOOLS,{name:'tools'}))
        .pipe(inject(components,{name:'components'}))
        .pipe(inject(css))
        .pipe(gulp.dest(''));
});