//setting all the variable as dependencies
var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

//setting the browserify function for transforming jsx into js
gulp.task("browserify", function(){
	browserify("./src/js/main.js")
		.transform("reactify")
		.bundle()
		.pipe(source("main.js"))
		.pipe(gulp.dest("dist/js"));
});

//copying the files over to the dist folder
gulp.task("copy", function(){
	gulp.src("src/index.html")
		.pipe(gulp.dest("dist"));
	gulp.src("src/css/*.*")
		.pipe(gulp.dest("dist/css"));
	gulp.src("src/js/vendors/*.*")
		.pipe(gulp.dest("dist/js"));
});

//setting the default task for gulp
gulp.task("default", ["browserify", "copy"], function(){
	return gulp.watch("src/**/*.*", ["browserify","copy"]);
});