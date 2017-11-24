module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            target: {
                files: {
                    "script/map.min.js": ["script/map.js"],
                    "script/script.min.js": ["script/script.js"],
                    "script/store.min.js": ["script/store.js"],
                    "script/drinkScript.min.js": ["script/drinkScript.js"],
                    "script/systembolaget.min.js": ["script/systembolaget.js"]
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};