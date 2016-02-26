// -----------------------------
// Config Uglify
// https://github.com/gruntjs/grunt-contrib-uglify
// Minifies and concatenates your JS
// -----------------------------

module.exports = {
    release: {
        options: {
            mangle: false, // mangle: Turn on or off mangling
            beautify: true, // beautify: beautify your code for debugging/troubleshooting purposes
            compress: false,
            // report: 'gzip', // report: Show file size report
            //sourceMap: '<%=config.js.releaseDir%><%=config.js.releaseFile%>.map',
            sourceMappingURL: '/<%=config.js.releaseFile%>.map'
        },
        files: {
            '<%=config.js.releaseDir%><%=config.js.releaseFile%>': '<%=config.js.scriptFileList%>',
            '<%= config.js.releaseDir %><%= config.js.modernizrReleaseFile %>': '<%= config.js.modernizrScriptFile %>'
        }
    },
    production: {
        options: {
            mangle: true, // mangle: Turn on or off mangling
            beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
            compress: true,
            /*
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            }
            */
            // report: 'gzip', // report: Show file size report
            //sourceMap: '<%=config.js.releaseDir%><%=config.js.releaseFile%>.map',
            sourceMappingURL: '/<%=config.js.releaseFile%>.map'
        },
        files: {
            '<%=config.js.releaseDir%><%=config.js.releaseFile%>': '<%=config.js.scriptFileList%>',
            '<%= config.js.releaseDir %><%= config.js.modernizrReleaseFile %>': '<%= config.js.modernizrScriptFile %>'
        }
    }
};
