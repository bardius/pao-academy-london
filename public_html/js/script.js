/*
 Project: PAO Basketball Academy London
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
            BARDIS.UI.init();
            BARDIS.mailchimp.init();

            if (BARDIS.Supports.touch) {
                BARDIS.touch.init();
            }

            if (BARDIS.environment.isMobile()) {
                BARDIS.mobileSpecific.init();
            }
        }
    };

    BARDIS.UI = {
        $sliderNavigationItems: $(".slider-navigation a"),
        $toggleTriggerItems: $(".togglerTrigger"),
        init: function(){
            BARDIS.UI.sliderNavigationFix();
            BARDIS.UI.contentToggler();
        },
        sliderNavigationFix: function(){
            BARDIS.UI.$sliderNavigationItems.on("click", function(e){
                BARDIS.UI.$sliderNavigationItems.removeClass("active");
                $(this).addClass("active");
            });
        },
        contentToggler: function(){
            BARDIS.UI.$toggleTriggerItems.on("click", function(e){
                e.preventDefault();

                var $toggledElements = $("#" + $(this).data("toggletarget"));
                $(this).toggleClass("activeTrigger");

                $toggledElements.toggleClass("visibleToggler");
                $toggledElements.toggle(300, function(){
                    $('html, body').animate({
                        scrollTop: $toggledElements.first().offset().top - 80
                    }, 500);
                });
            });
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

                    equalize_on_stack: false, // Specify if Equalizer should make elements equal height once they become stacked.
                    act_on_hidden_el: false // Allow equalizer to resize hidden elements
                },
                orbit: {
                    animation: 'fade', // Sets the type of animation used for transitioning between slides, can also be 'fade' or 'slide'
                    timer_speed: 6000, // Sets the amount of time in milliseconds before transitioning a slide
                    pause_on_hover: true, // Pauses on the current slide while hovering
                    resume_on_mouseout: false, // If pause on hover is set to true, this setting resumes playback after mousing out of slide
                    next_on_click: false, // Advance to next slide on click
                    animation_speed: 600, // Sets the amount of time in milliseconds the transition between slides will last
                    stack_on_small: false,
                    navigation_arrows: false,
                    slide_number: false,
                    slide_number_text: 'of',
                    container_class: 'orbit-container',
                    stack_on_small_class: 'orbit-stack-on-small',
                    next_class: 'orbit-next', // Class name given to the next button
                    prev_class: 'orbit-prev', // Class name given to the previous button
                    timer_container_class: 'orbit-timer', // Class name given to the timer
                    timer_paused_class: 'paused', // Class name given to the paused button
                    timer_progress_class: 'orbit-progress', // Class name given to the progress bar
                    slides_container_class: 'orbit-slides-container', // Class name given to the slide container
                    preloader_class: 'preloader', // Class given to the preloader
                    slide_selector: 'li', // Default is '*' which selects all children under the container
                    bullets_container_class: 'orbit-bullets',
                    bullets_active_class: 'active', // Class name given to the active bullet
                    slide_number_class: 'orbit-slide-number', // Class name given to the slide number
                    caption_class: 'orbit-caption', // Class name given to the caption
                    active_slide_class: 'active', // Class name given to the active slide
                    orbit_transition_class: 'orbit-transitioning',
                    bullets: false, // Does the slider have bullets visible?
                    circular: true, // Does the slider should go to the first slide after showing the last?
                    timer: false, // Does the slider have a timer active? Setting to false disables the timer.
                    variable_height: false, // Does the slider have variable height content?
                    //before_slide_change: noop, // Execute a function before the slide changes
                    //after_slide_change: noop // Execute a function after the slide changes
                    swipe: true
                }
            });
        }
    };

    BARDIS.mailchimp = {
        init: function() {
          window.fnames = [
              'EMAIL',
              'FNAME',
              'LNAME',
              'GROUP',
              'PHONE',
              'COMMENTS'
          ];

          window.ftypes = [
              'email',
              'text',
              'text',
              'dropdown',
              'phone',
              'text'
          ];
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
                //$(document).foundation("equalizer", "reflow");
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
