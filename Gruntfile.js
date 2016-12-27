module.exports = function (grunt) {

    grunt.initConfig({
        image_resize: {
            resize: {
                options: {
                    width: 32,
                    height: 32,
                    upscale: true
                },
                src: 'src/*.png',
                dest: 'img/'
            }
        }
    });
    grunt.loadNpmTasks('grunt-image-resize');

    grunt.registerTask('image-resize', ['image_resize']);
    grunt.registerTask('default', ['image_resize', 'uglify']);
};
