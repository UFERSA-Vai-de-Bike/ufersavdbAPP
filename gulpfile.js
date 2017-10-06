/**
 * Created by silva on 06/10/17.
 */
var gulp          = require("gulp"),
    inject       = require("gulp-inject");

gulp.task('index', function () {

    var target = gulp.src('index.html');
    var app = gulp.src('./app/*.js', {read: false});
    var components = gulp.src('./app/components/**/*.js', {read: false});
    var services = gulp.src('./app/services/**/*.js', {read: false});
    //var general = gulp.src(['./app/**/*.js', '!./app/services/*.js'], {read: false});

    var css = gulp.src('./app/**/*.css', {read: false});

    return target.pipe(inject(app,{name:'app'}))
        .pipe(inject(services,{name:'service'}))
        .pipe(inject(components,{name:'components'}))
        .pipe(inject(css))
        .pipe(gulp.dest(''));
});