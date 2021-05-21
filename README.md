# Grunt Setup

## 1. Install packages

```
$ npm init -y
OR
$ npm init

// Install the grunt command line
$ npm install grunt-cli -g

```

## 2. Create Grunt file - must be Gruntfile.js

## 3. The basic setup

-  Tasks come in a form of plugins (a module)

```javascript
module.exports = function (grunt) {
   /* 
   - All tasks are represented as a task
   - Can have their own options
    */
   grunt.initConfig({
      task1: {},
      task2: {},
      randomProp: "value",
      package: grunt.file.readJSON("package.json"),
   });
};
```

> For different targets use

```
$ grunt uglify:target
```

## 3.1 ...continued

```javascript
module.exports = function (grunt) {
   grunt.initConfig({
      package: grunt.file.readJSON("package.json"),
      /* Minifies JavaScript */
      uglify: {
         options: {
            banner: 'console.log("Minified Javascript")',
         },
         js: {
            options: {
               banner: "console.log('This targets the js folder.')",
            },
            files: [
               {
                  src: "src/js/*.js",
                  dest: "build/js/app.min.js",
               },
            ],
         },
      },

      /* Minifies CSS */
      cssmin: {
         css: {
            files: [
               {
                  src: "src/css/*.css",
                  dest: "build/css/styles.min.css",
               },
            ],
         },
      },

      /* Minifies HTML */
      htmlmin: {
         options: {
            collapseWhitespace: true,
            removeComments: true,
         },
         // destination: source
         index: {
            files: {
               "./build/index.html": "./src/index.html",
            },
         },
         pages: {
            files: [
               {
                  expand: true,
                  cwd: "src/pages/",
                  src: ["*.html"],
                  dest: "build/pages",
               },
            ],
         },
      },

      /* Watches on save */
      watch: {
         files: ["src/js/*.js", "src/css/*.css", "src/**/*.html"],
         tasks: ["js-min", "css-min", "html-min"],
      },
      connect: {
         server: {
            options: {
               port: 8500,
               base: {
                  path: "build/",
                  options: {
                     index: "index.html",
                  },
               },
            },
         },
      },
   });

   /* Load Tasks Here */
   grunt.loadNpmTasks("grunt-contrib-uglify");
   grunt.loadNpmTasks("grunt-contrib-cssmin");
   grunt.loadNpmTasks("grunt-contrib-watch");
   grunt.loadNpmTasks("grunt-contrib-connect");
   grunt.loadNpmTasks("grunt-contrib-htmlmin");

   /* Register Alias Here */
   grunt.registerTask("js-min", "uglify:js"); // Minify Javascript
   grunt.registerTask("css-min", "cssmin"); // Minify CSS
   grunt.registerTask("html-min", "htmlmin"); // Minify HTML

   /* Run all tasks */
   grunt.registerTask("develop", ["connect", "watch"]);
};
```
