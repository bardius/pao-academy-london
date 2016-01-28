/*
 Project: Project Name
 Authors: George Bardis
 */

// Create a closure to maintain scope of the '$' and BARDIS
;
(function(BARDIS, $, window, document, undefined) {

    'use strict';

    $(function() {
        BARDIS.Config.init();
    });

    BARDIS.Config = {
        $body: $(document.body),
        init: function() {

            BARDIS.windowResize.init();
            BARDIS.foundation.init();

            if (BARDIS.Supports.touch) {
                BARDIS.touch.init();
            }

            if (BARDIS.environment.isMobile()) {
                BARDIS.mobileSpecific.init();
            }
        }
    };

    BARDIS.foundation = {
        init: function() {

            $(document).foundation({
                offcanvas: {
                    open_method: 'move', // Sets method in which offcanvas opens, can also be 'overlap'
                    close_on_click: true
                },
                equalizer : {
                    // Specify if Equalizer should make elements equal height once they become stacked.
                    equalize_on_stack: false,
                    // Allow equalizer to resize hidden elements
                    act_on_hidden_el: false
                }
            });
        }
    };

    BARDIS.touch = {
        init: function() {

        }
    };

    BARDIS.mobileSpecific = {
        init: function() {

        }
    };

    BARDIS.windowResize = {
        init: function() {
            $(window).smartresize(function() {
                notifications.sendNotification(notifications.WINDOW_RESIZE);
                //$(document).foundation('reflow');
                //BARDIS.foundation.init();
            });
        }
    };

    BARDIS.sampleTest = {
        simpleTest: function (projectName) {
            this.projectName = projectName;

            return this.projectName + ' is starting. Welcome!';
        }
    };

})(window.BARDIS = window.BARDIS || {}, jQuery, window, document);
