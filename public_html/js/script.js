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
        $scrollerTriggerItems: $(".scrollToTrigger"),

        init: function(){
            BARDIS.UI.sliderNavigationFix();
            BARDIS.UI.contentToggler();
            BARDIS.UI.contentScroller();

            if($('#mapPage').length > 0){
                BARDIS.mapConfig.mapInit();
            }
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

                var $this = $(this);
                var triggerTarget = $this.data("toggletarget");
                var $toggledElements = $("#" + triggerTarget);

                BARDIS.UI.$toggleTriggerItems.each(function() {
                    if($(this).data("toggletarget") == triggerTarget){
                        $(this).toggleClass("active");
                        $(this).toggleClass("activeTrigger");

                        if($(this).hasClass("in-menu-trigger")){
                            $(this).parent("li").toggleClass("active");
                        }
                    }
                });

                $toggledElements.toggleClass("visibleToggler");
                $toggledElements.toggle(300, function(){
                    $('html, body').animate({
                        scrollTop: $toggledElements.first().offset().top - 100
                    }, 500);
                });
            });
        },

        contentScroller: function(){
            BARDIS.UI.$scrollerTriggerItems.on("click", function(e){
                e.preventDefault();

                var $this = $(this);
                var scrolltarget = $this.data("scrolltarget");
                var $scrollToElement = $("#" + scrolltarget).first();

                BARDIS.UI.$scrollerTriggerItems.each(function() {
                    if($(this).data("scrolltarget") == scrolltarget){
                        $(this).toggleClass("active");
                        $(this).toggleClass("activeTrigger");

                        if($(this).hasClass("in-menu-trigger")){
                            $(this).parent("li").toggleClass("active");
                        }
                    }
                });

                $('html, body').animate({
                    scrollTop: $scrollToElement.offset().top - 100
                }, 500);
            });
        }

    };

    BARDIS.mapConfig = {
        // Map settings
        map:			null,
        mapKey:			'AIzaSyB8uoWbuhHNagbpi22tEeZYiT41toB171g',
        mapLatitude:	$('#mapLat').val(),
        mapLongitude:	$('#mapLong').val(),
        mapZoom:		14,
        markerTitle:	$('#mapTitle').val(),
        mapCanvasId:	'map-canvas',
        GMapScriptURL:	'http://maps.google.com/maps/api/js?sensor=false&key=',
        map_html:		'',
        map_to_html:	'',
        map_from_html:	'',
        map_infowindow:	'',
        marker:			'',

        mapInit: function() {
            $.getScript(BARDIS.mapConfig.GMapScriptURL + BARDIS.mapConfig.mapKey + "&callback=BARDIS.mapConfig.showMap");
        },

        showMap: function() {
            var windowHeight	= $(window).height();
            var mapLatlng		= new google.maps.LatLng(BARDIS.mapConfig.mapLatitude, BARDIS.mapConfig.mapLongitude);
            var contentString	= '<h4>' + BARDIS.mapConfig.markerTitle + '</h4>';

            // The info window version with the "to here" form open
            BARDIS.mapConfig.map_to_html = contentString + '<p>Get Directions: <b>To here</b> - <a href="javascript:BARDIS.mapConfig.mapFromHere()">From here</a></p>' +
                '<form action="http://maps.google.com/maps" method="get"" target="_blank"><label for="saddr">Start address:</label>' +
                '<input type="text" size="40" maxlength="80" name="saddr" id="saddr" value="" /><br />' +
                '<input class="button small" value="Get Directions" type="submit" />' +
                '<input type="hidden" name="daddr" value="' + BARDIS.mapConfig.mapLatitude + ',' + BARDIS.mapConfig.mapLongitude + "(" + BARDIS.mapConfig.markerTitle + ")" + '"/></form>';

            // The info window version with the "to here" form open
            BARDIS.mapConfig.map_from_html = contentString + '<p>Get Directions: <a href="javascript:BARDIS.mapConfig.mapToHere()">To here</a> - <b>From here</b></p>' +
                '<form action="http://maps.google.com/maps" method="get"" target="_blank"><label for="daddr">End address:</label>' +
                '<input type="text" size="40" maxlength="80" name="daddr" id="daddr" value="" /><br />' +
                '<input class="button small" value="Get Directions" type="submit" />' +
                '<input type="hidden" name="saddr" value="' + BARDIS.mapConfig.mapLatitude + ',' + BARDIS.mapConfig.mapLongitude + "(" + BARDIS.mapConfig.markerTitle + ")" + '"/></form>';

            // The inactive version of the direction info
            BARDIS.mapConfig.map_html = contentString + '<p>Get Directions: <a href="javascript:BARDIS.mapConfig.mapToHere()">To here</a> - <a href="javascript:BARDIS.mapConfig.mapFromHere()">From here</a></p>';

            $('#' + BARDIS.mapConfig.mapCanvasId).css('height', (windowHeight / 2) + 'px');

            if($('#mapZoom').length > 0){
                BARDIS.mapConfig.mapZoom = parseInt($('#mapZoom').val());
            }

            var mapOptions = {
                center:		mapLatlng,
                mapTypeId:	google.maps.MapTypeId.ROADMAP,
                zoom:		BARDIS.mapConfig.mapZoom
            };

            BARDIS.mapConfig.map = new google.maps.Map(document.getElementById(BARDIS.mapConfig.mapCanvasId), mapOptions);

            google.maps.event.addDomListener(window, "resize", function() {
                var newCenter = BARDIS.mapConfig.map.getCenter();
                google.maps.event.trigger(BARDIS.mapConfig.map, "resize");
                BARDIS.mapConfig.map.setCenter(newCenter);
            });

            if(BARDIS.mapConfig.mapZoom === 14){
                BARDIS.mapConfig.marker	= new google.maps.Marker({
                    position:	mapLatlng,
                    map:		BARDIS.mapConfig.map,
                    title:		BARDIS.mapConfig.markerTitle
                });

                BARDIS.mapConfig.map_infowindow = new google.maps.InfoWindow({
                    content: BARDIS.mapConfig.map_html,
                    disableAutoPan : false
                });

                google.maps.event.addListener(BARDIS.mapConfig.marker, 'click', function() {
                    BARDIS.mapConfig.map_infowindow.open(BARDIS.mapConfig.map, BARDIS.mapConfig.marker);
                });

                google.maps.event.addListener(BARDIS.mapConfig.map_infowindow, 'closeclick', function() {
                    BARDIS.mapConfig.map_infowindow.setContent(BARDIS.mapConfig.map_html);
                });

                //loaded fully
                google.maps.event.addListenerOnce(BARDIS.mapConfig.map, 'idle', function(){
                });
            }

            $(document).on('opened', '[data-reveal]', function () {
                var newCenter = BARDIS.mapConfig.map.getCenter();
                google.maps.event.trigger(BARDIS.mapConfig.map, "resize");
                BARDIS.mapConfig.map.setCenter(newCenter);
                BARDIS.mapConfig.map_infowindow.open(BARDIS.mapConfig.map, BARDIS.mapConfig.marker);
            });
        },

        // functions that open the directions forms
        mapToHere: function() {

            BARDIS.mapConfig.map_infowindow.setContent(BARDIS.mapConfig.map_to_html);
            BARDIS.mapConfig.map_infowindow.open(BARDIS.mapConfig.map, BARDIS.mapConfig.marker);
        },

        mapFromHere: function() {

            BARDIS.mapConfig.map_infowindow.setContent(BARDIS.mapConfig.map_from_html);
            BARDIS.mapConfig.map_infowindow.open(BARDIS.mapConfig.map, BARDIS.mapConfig.marker);
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
                accordion: {
                    content_class: 'content', // specify the class used for accordion panels
                    active_class: 'active', // specify the class used for active (or open) accordion panels
                    multi_expand: false, // allow multiple accordion panels to be active at the same time
                    toggleable: true // allow accordion panels to be closed by clicking on their headers
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
