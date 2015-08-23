'use strict';
var gulp = require('gulp'),
uglify = require('gulp-uglify'),
jshint = require('gulp-jshint'),//JS语法检测
rename = require('gulp-rename'),//重命名文件
less = require('gulp-less'),//less文件压缩
cssmin = require('gulp-minify-css'),//css文件压缩
imagemin = require('gulp-imagemin'),//压缩图片
pngquant = require('imagemin-pngquant'),//深度压缩图片
concat = require('gulp-concat'),//合并文件
watch = require('gulp-watch'),//监听文件
wrapper=require('gulp-wrapper'),//添加文本,在这里是添加压缩后的时间
clean = require('gulp-clean');//把src文件夹里面的内容清除
//gutil = require('gulp-util'),// 更新通知
//spritesmith = require('gulp-spritesmith'),
gulp.task('imagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('cssmin', function () {
    //压缩src/css目录下的所有css文件
    gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(wrapper({
            header : "",
            footer : "\n/*" + dateTime()+"*/"
        }))
        .pipe(gulp.dest('dist/css'));
        function dateTime(time){
               time = time || "YYYY-MM-DD hh:mm:ss";
               var d = new Date();
               var result = time.replace(/Y+/g,d.getFullYear()).replace(/M+/g,d.getMonth() + 1).replace(/D+/g,d.getDate()).replace(/h+/g,d.getHours()).replace(/m+/g,d.getMinutes()).replace(/s+/g,d.getSeconds());
               return result;
           }
});
gulp.task('less', function () {
    //编译less后压缩css
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(wrapper({
            header : "",
            footer : "\n//" + dateTime()
        }))
        .pipe(gulp.dest('src/css'));
        function dateTime(time){
               time = time || "YYYY-MM-DD hh:mm:ss";
               var d = new Date();
               var result = time.replace(/Y+/g,d.getFullYear()).replace(/M+/g,d.getMonth() + 1).replace(/D+/g,d.getDate()).replace(/h+/g,d.getHours()).replace(/m+/g,d.getMinutes()).replace(/s+/g,d.getSeconds());
               return result;
           }
});
gulp.task('jsmin', function () {
    //压缩src/js目录下的所有js文件
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(wrapper({
            header : "",
            footer : "\n//" + dateTime()
        })) 
        .pipe(gulp.dest('dist/js'));
           function dateTime(time){
               time = time || "YYYY-MM-DD hh:mm:ss";
               var d = new Date();
               var result = time.replace(/Y+/g,d.getFullYear()).replace(/M+/g,d.getMonth() + 1).replace(/D+/g,d.getDate()).replace(/h+/g,d.getHours()).replace(/m+/g,d.getMinutes()).replace(/s+/g,d.getSeconds());
               return result;
           }
});

gulp.task('concat', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(wrapper({
            header : "",
            footer : "\n//" + dateTime()
        }))
        .pipe(gulp.dest('dist/js'));
        function dateTime(time){
               time = time || "YYYY-MM-DD hh:mm:ss";
               var d = new Date();
               var result = time.replace(/Y+/g,d.getFullYear()).replace(/M+/g,d.getMonth() + 1).replace(/D+/g,d.getDate()).replace(/h+/g,d.getHours()).replace(/m+/g,d.getMinutes()).replace(/s+/g,d.getSeconds());
               return result;
           }
});
gulp.task('clean', function() {
    gulp.src("src/js/*.js", {read: false})
        .pipe(clean());
});
// 检查脚本
gulp.task('jshint', function() {
    gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// 默认任务
gulp.task('default', function(){
    gulp.run('jshint','cssmin', 'imagemin', 'jsmin','concat');
    // 监听文件变化
    gulp.watch('src/js/*.js', function(){
        gulp.run( 'jshint','jsmin');
    });
});

// 自动雪碧图  参考资料:http://npm.taobao.org/package/gulp-css-spritesmith
// autoSprite, with media query
/*gulp.task('sprite', function() {
    gulp.src('css/*.css').pipe(cssSprite({
        // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
        imagepath: 'slice/',
        // 映射CSS中背景路径，支持函数和数组，默认为 null
        imagepath_map: null,
        // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
        spritedest: 'images/',
        // 替换后的背景路径，默认 ../images/
        spritepath: '../images/',
        // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
        padding: 2,
        // 是否使用 image-set 作为2x图片实现，默认不使用
        useimageset: false,
        // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
        newsprite: false,
        // 给雪碧图追加时间戳，默认不追加
        spritestamp: true,
        // 在CSS文件末尾追加时间戳，默认不追加
        cssstamp: true
    }))
    .pipe(gulp.dest('dist/'));
});*/