module.exports = function (grunt) {
   /* All tasks are represented as a task */
   grunt.initConfig({
      package: grunt.file.readJSON("package.json"),
      uglify: {
         /* Will be inherited by all targets if its a direct child of uglify;
         This will add a line of code on the top of every minified files. */
         options: {
            banner: 'console.log("Working Now")',
         },
         // Name is arbitrary - make it descriptive
         target1: {
            // Specify a files array of objects with the path and the destination
            files: [
               {
                  src: "src/app.js",
                  dest: "build/app.min.js",
               },
               {
                  src: "src/globals.js",
                  dest: "build/globals.min.js",
               },
            ],
         },
         // This target will convert all files
         // Use a different target because you dont want to compress some files
         target2: {
            options: {
               banner: "console.log('Just for target 2')",
            },
            files: [
               {
                  // Select all files that end with JS
                  src: "src/*.js",
                  dest: "build/compress.min.js",
               },
            ],
         },
      },
      cssmin: {
         target: {
            files: [
               {
                  src: "src/css/*.css",
                  dest: "build/css/styles.min.css",
               },
            ],
         },
      },
      htmlmin: {
         options: {
            removeComments: true,
            collapseWhitespace: true,
         },
         target: {
            files: [
               {
                  src: "src/index.html",
                  dest: "build/index.html",
               },
            ],
         },
      },

      watch: {
         files: ["src/*.js", "src/css/*.css", "src/*.html"],
         tasks: ["cssmin", "uglify", "htmlmin"],
      },
      connect: {
         server: {
            options: {
               port: 8000,
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

   grunt.loadNpmTasks("grunt-contrib-uglify");
   grunt.loadNpmTasks("grunt-contrib-cssmin");
   grunt.loadNpmTasks("grunt-contrib-watch");
   grunt.loadNpmTasks("grunt-contrib-connect");
   grunt.loadNpmTasks("grunt-contrib-htmlmin");

   // We can register alias for a task (1: alias 2: actual)
   grunt.registerTask("compress", "uglify");
   grunt.registerTask("compressAll", "uglify:target2");

   // Run all Tasks
   // Make sure connect comes first
   grunt.registerTask("default", ["connect", "watch"]);
};
