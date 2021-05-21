# Grunt Setup

### 1. Install packages

```
$ npm init -y
OR
$ npm init

// Install the grunt command line
$ npm install grunt-cli -g

```

### 3. The basic setup

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

### 3.1 ...continued

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

## Overview

-  ### Why a task runner?

-  Automation = less work to do repetitve tasks
-  Tasks come readily available as plugins

-  ### Anatomy

```javascript
grunt.initConfig({
   task: {
      options: {},
      target: {
         options: {},
      },
   },
});
```

-  ### Files

   -  Uses src-dest (source-destination) file mapping
   -  src: " " or dest: " "

-  ### Files - Compact Form
   -  Used for file mapping per target
   -  Mainly used for read-only tasks
   -  Only the src is needed
   -  Supports src-dest file mapping

```javascript
grunt.initConfig({
   task: {
      target01: {
         src: ["src/app.js", "src/index.js"],
      },
      target02: {
         src: ["src/bb.js", "src/bbb.js"],
         dest: "dest/b.js",
      },
   },
});
```

-  ### Files - File Object Format
   -  Has multiple src-dest mapping per target
   -  Property is the destination with multiple sources

```javascript
grunt.initConfig({
   task: {
      target: {
         files: {
            // Destination: Source
            "src/css/styles.css": ["src/scss/styles.scss", "src/scss/abstracts.scss"],
         },
      },
   },
});
```

-  ### Files - File Array Format
   -  Multiple src-dest file mapping per target

```javascript
grunt.initConfig({
   task: {
      target: {
         files: [
            {
               src: "src/app.js",
               dest: "build/app.min.js",
            },
         ],
      },
   },
});
```

---

-  ### Files - Globbing
   -  Specify different filenames

```

src/*.js = matches all files that end with .js in the src directory

src/**/*.js = matches all files ending in .js in src directory including all sub directories

```

-  ### Files - Building Files object dynamically
   -  When processing multiple individual files, it may be necessary to biild a fileslist dynamically

```
expand: true; will enable all properties below
   cwd: all sources matches are relative to this path (but don't include)
   src: patterns that match relative to cwd eg. *.js
   dest: destination path prefix
```

> Example

```javascript
grunt.initConfig({
   uglify: {
      dynamic_mappings: {
         // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
         // runs and build the appropriate src-dest file mappings then, so you
         // don't need to update the Gruntfile when files are added or removed.
         files: [
            {
               expand: true, // Enable dynamic expansion.
               cwd: "lib/", // Src matches are relative to this path.
               src: ["**/*.js"], // Actual pattern(s) to match.
               dest: "build/", // Destination path prefix.
               ext: ".min.js", // Dest filepaths will have this extension.
               extDot: "first", // Extensions in filenames begin after the first dot
            },
         ],
      },
   },
});
```
