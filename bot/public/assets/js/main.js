"use strict";

var $ = jQuery;


var header, bannerRevSlider;

// Home slider height fix
function homeSliderHeightFix() {
    $('#home').height($(window).height());
}

$(document).ready(function ($) {

    // Revolution Slider
    var matxRevSlider = $('[data-action="matx_revslider"]'),
        matxRevSliderArrow = {
            style: '',
            enable: false,
        };

    var matxRevSliderBullet = {
        enable: true
    };


    matxRevSlider.each(function () {

        var revSliderWrapID = $(this);

        if (revSliderWrapID.attr('id') == 'matx_revslider_2') {
            matxRevSliderArrow = {
                style: 'matx-revslider-2-arrow',
                enable: true,
            }
        }
        if (revSliderWrapID.attr('id') == 'matx_revslider_2') {
            matxRevSliderArrow = {
                style: 'matx-revslider-2-arrow',
                enable: true,
            }
        }
        if (revSliderWrapID.attr('id') == 'matx_revslider_3') {
            matxRevSliderBullet = {
                enable: false,
            }
        }

        if (revSliderWrapID.revolution == undefined) {
            revslider_showDoubleJqueryError(revSliderWrapID);
        } else {

            bannerRevSlider = revSliderWrapID.show().revolution({
                sliderType: "standard",
                jsFileLocation: "assets/libs/revolution/js/",
                sliderLayout: "fullscreen",
                responsiveLevels: [1240, 1024, 778, 485],
                gridwidth: [1400, 1170, 778, 480],
                gridheight: [800, 700, 1050, 500],
                delay: 6000,
                shuffle: "off",

                navigation: {
                    keyboardNavigation: "on",
                    onHoverStop: "off",
                    arrows: {
                        style: matxRevSliderArrow.style,
                        enable: matxRevSliderArrow.enable,
                        rtl: false,
                        hide_onmobile: false,
                        hide_onleave: true,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        hide_under: 0,
                        hide_over: 9999,
                        tmp: '',
                        left: {
                            container: "slider",
                            h_align: "left",
                            v_align: "center",
                            h_offset: 30,
                            v_offset: 0
                        },
                        right: {
                            container: "slider",
                            h_align: "right",
                            v_align: "center",
                            h_offset: 30,
                            v_offset: 0
                        }
                    },
                    bullets: {
                        style: "",
                        enable: matxRevSliderBullet.enable,
                        hide_onmobile: false,
                        hide_onleave: false,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        hide_under: 0,
                        hide_over: 9999,
                        tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>',
                        direction: "horizontal",
                        space: 10,
                        h_align: "center",
                        v_align: "middle",
                        h_offset: 0,
                        v_offset: 50
                    }
                },

                lazyType: "none",
                parallax: {
                    type: "mouse+scroll",
                    origo: "slidercenter",
                    speed: 2000,
                    levels: [1, 2, 3, 20, 25, 30, 35, 40, 45, 50],
                    disable_onmobile: "on"
                },
                shadow: 0,
                spinner: "spinner2",
                autoHeight: "on",
                disableProgressBar: "off",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: 'off',
                    disableFocusListener: false
                }
            });

            revSliderWrapID.bind("revolution.slide.onchange", function (e, data) {

                if (data.currentslide.hasClass('slider-color-schema-white')) {

                    $('body').removeClass('color-schema-white').addClass('color-schema-dark');

                } else if (data.currentslide.hasClass('slider-color-schema-dark')) {

                    $('body').removeClass('color-schema-dark').addClass('color-schema-white');

                }

            });
        }
    });


    // Home slider height fix
    homeSliderHeightFix();


    backButton = $('#backToTop');
    header = $('header.main-header');

    // BackToTop
    var backToTop = {

        button: backButton,

        show: function () {
            var self = this;
            if (self.button.hasClass('hide-bottom')) {
                self.button.removeClass('hide-bottom');

                var handler = setTimeout(function () {
                    self.button.removeClass('shade-on');
                    clearTimeout(handler);
                }, 800);
            }
        },

        hide: function () {
            var self = this;
            if (!self.button.hasClass('hide-bottom')) {
                self.button.addClass('shade-on').addClass('hide-bottom');
            }
        },

        enableBackToTop: function () {
            var self = this;
            if (!self.button.hasClass('rotate')) {
                self.button.addClass('rotate').data('action', 'top');
            }
        },

        enableSectionCall: function () {
            var self = this;
            if (self.button.hasClass('rotate')) {
                self.button.removeClass('rotate').data('action', 'bottom');
            }
        }
    };


    backButton.on('click', function () {

        if ($(this).data('action') && $(this).data('action') == 'top') {

            $('html, body').stop(true, true).animate({
                'scrollTop': '0px'
            }, 1500, 'easeOutQuad');

        } else {
            var currentSection = $('.section-main.section-active');
            var nextSection = currentSection.next();

            $('html, body').stop(true, true).animate({
                'scrollTop': ( nextSection.offset().top - header.outerHeight() ) + 'px'
            }, 800, 'easeOutQuad');
        }

    });


    // window scroll Sections scrolling
    (function () {

        var sections = $(".section-main");

        var getActiveSectionLength = function (section, sections) {
            return sections.index(section);
        };

        if (sections.length > 0) {

            sections.waypoint({

                handler: function (event, direction) {

                    var active_section, active_section_index, prev_section_index, length;

                    length = sections.length;

                    active_section = $(this);
                    active_section_index = getActiveSectionLength($(this), sections);
                    prev_section_index = ( active_section_index - 1 );

                    if (direction === "up") {
                        active_section = sections.eq(prev_section_index);
                    }

                    // Updating the section active class
                    sections.removeClass('section-active');
                    active_section.addClass('section-active');

                    // BackToTop on click button functions
                    if (active_section_index == length - 1) {
                        $('.menu-smooth-scroll').parent('li').removeClass('active');
                        backToTop.enableBackToTop();
                    } else {
                        backToTop.enableSectionCall();
                    }

                    // BackToTop show hide
                    if (active_section.attr('id') == 'home') {
                        backToTop.hide();
                    } else {
                        backToTop.show();
                    }

                    // Menu link active class update
                    var active_link = $('.menu-smooth-scroll[href="#' + active_section.attr("id") + '"]');
                    active_link.parent('li').addClass("active").siblings().removeClass("active");

                    if (active_section.attr('id') == 'home') {
                        $('.menu-smooth-scroll').parent('li').removeClass('active');
                    }

                },

                offset: '35%'
            });
        }

    }());


    $('.mailchimpForm').ajaxChimp({

        callback: function (resp) {

            console.log('respones', resp);
            if (resp.result === 'success') {

                $('.mailchimpForm .mdl-textfield').removeClass('is-dirty').find('input[type=text]').val('');
                swal("Thanks!", "Almost finished... Please confirm your email address.", "success");

            } else if (resp.result === 'error') {

                swal("Ops!", "Please enter a valid email address.", "error");

            }

        },

        url: "https://facebook.us16.list-manage.com/subscribe/post?u=63ee01e3990bcad50010c9a85&id=1a55721ae5" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".

    });


    // Contact Form
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        var $this = $(this),
            data = $(this).serialize(),
            name = $this.find('#name'),
            email = $this.find('#email'),
            phone = $this.find('#phone'),
            subject = $this.find('#subject'),
            message = $this.find('#message'),
            loader = $this.find('.form-loader-area'),
            submitBtn = $this.find('button, input[type="submit"]');

        loader.show();
        submitBtn.attr('disabled', 'disabled');

        var success = function (response) {
            swal("Thanks!", "Your message has been sent successfully!", "success");
            $this.find("input:not('[type=submit]'), textarea").val("");
            $this.find(".is-dirty, .is-invalid").removeClass('is-dirty is-invalid');
        };

        var error = function (response) {
            $this.find('.is-invalid').removeClass('is-invalid');
            if (response.errors.name) {
                name.closest('.mdl-textfield').addClass('is-invalid');
            }
            if (response.errors.email) {
                email.closest('.mdl-textfield').addClass('is-invalid');
            }
            if (response.errors.phone) {
                phone.closest('.mdl-textfield').addClass('is-invalid');
            }
            if (response.errors.subject) {
                subject.closest('.mdl-textfield').addClass('is-invalid');
            }
            if (response.errors.message) {
                message.closest('.mdl-textfield').addClass('is-invalid');
            }
        };

        $.ajax({
            type: "POST",
            url: '/api/contact',
            data: data
        }).done(function (res) {

            var response = JSON.parse(res);

            console.log('response ==<', response.success);
            ( response.success ) ? success(response) : error(response);

            var hand = setTimeout(function () {
                loader.hide();
                clearTimeout(hand);
            }, 1000);

        }).fail(function () {

            sweetAlert("Oops...", "Something went wrong, Try again later!", "error");

            var hand = setTimeout(function () {
                loader.hide();
                submitBtn.removeAttr('disabled');
                clearTimeout(hand);
            }, 1000);

        });
    });


    // contact Request Service Form
    $('#contactRequestServiceForm').on('submit', function (e) {
        e.preventDefault();

        var $this = $(this),
            data = $(this).serialize(),
            contactOrganizationName = $this.find('#contactOrganizationName'),
            contactName = $this.find('#contactName'),
            contactEmail = $this.find('#contactEmail'),
            contactMobileNumber = $this.find('#contactMobileNumber'),
            contactInterests = $this.find('#contactInterestss'),
            contactBudget = $this.find('#contactBudget'),
            submitBtn = $this.find('button, input[type="submit"]');

        submitBtn.attr('disabled', 'disabled');

        var success = function (response) {
            swal("Thanks!", "Your message has been sent successfully!", "success");
            $this.find("input:not('[type=submit]'), textarea").val("");
            $this.find(".is-dirty, .is-invalid").removeClass('is-dirty is-invalid');
        };

        var error = function (response) {
            $this.find('.is-invalid').removeClass('is-invalid');
            if (response.errors.organizationName) {
                contactOrganizationName.closest('.mdl-textfield').addClass('is-invalid');
            }
            if (response.errors.contactName) {
                contactName.closest('.mdl-textfield').addClass('is-invalid');
            }
            if (response.errors.contactEmail) {
                contactEmail.closest('.mdl-textfield').addClass('is-invalid');
            }
            if (response.errors.contactPhone) {
                contactMobileNumber.closest('.mdl-textfield').addClass('is-invalid');
            }
            if (response.errors.contactInterests) {
                contactInterests.closest('.mdl-textfield').addClass('is-invalid');
            }
            if (response.errors.contactBudget) {
                contactBudget.closest('.mdl-textfield').addClass('is-invalid');
            }

        };

        $.ajax({
            type: "POST",
            url: '/api/request-service',
            data: data
        }).done(function (res) {

            var response = JSON.parse(res);

            console.log('response ==<', response.success);
            ( response.success ) ? success(response) : error(response);

            var hand = setTimeout(function () {
                clearTimeout(hand);
            }, 1000);

        }).fail(function () {

            sweetAlert("Oops...", "Something went wrong, Try again later!", "error");

            var hand = setTimeout(function () {
                submitBtn.removeAttr('disabled');
                clearTimeout(hand);
            }, 1000);

        });
    });


    // Google Map show
    $('#map-open').click(function (e) {
        e.preventDefault();
        $(this).hide().siblings('.btn').show();

        $('.map-wrapper').css('margin-top', '0px');
    });

    // Google Map hide
    $('#map-close').click(function (e) {
        e.preventDefault();
        $(this).hide().siblings('.btn').show();

        $('.map-wrapper').css('margin-top', '-' + $('.map-wrapper').height() + 'px');
    });

    // Map
    var mapStyle = [{
        featureType: "landscape",
        stylers: [{saturation: -100}, {lightness: 50}, {visibility: "on"}]
    }, {
        featureType: "poi",
        stylers: [{saturation: -100}, {lightness: 40}, {visibility: "simplified"}]
    }, {
        featureType: "road.highway",
        stylers: [{saturation: -100}, {visibility: "simplified"}]
    }, {
        featureType: "road.arterial",
        stylers: [{saturation: -100}, {lightness: 20}, {visibility: "on"}]
    }, {
        featureType: "road.local",
        stylers: [{saturation: -100}, {lightness: 30}, {visibility: "on"}]
    }, {
        featureType: "transit",
        stylers: [{saturation: -100}, {visibility: "simplified"}]
    }, {featureType: "administrative.province", stylers: [{visibility: "off"}]}, {
        featureType: "water",
        elementType: "labels",
        stylers: [{visibility: "on"}, {lightness: -0}, {saturation: -0}]
    }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{hue: "#00baff"}, {lightness: -10}, {saturation: -95}]
    }];

    var mapWrapperID = '#map', draggableOp = ( $.browser.mobile === true ) ? false : true;

    if ($(mapWrapperID).length > 0 && window.google && window.google.maps) {

        window.mapOps = {

            lat: 33.893775,	// Provide your latitude
            lng: 35.557071, // Provide your longitude
            content: '<p>Beirut</p>', // Provide your address to show on pop up
            icon: '/img/marker-icon.png',
        };
        window.mapOps2 = {
            lat: 34.434706,	// Provide your latitude
            lng: 35.835389, // Provide your longitude
            content: '<p>Tripoli</p>', // Provide your address to show on pop up
            icon: '/img/marker-icon.png',
        };
        window.mapOps3 = {
            lat: 34.546827,	// Provide your latitude
            lng: 36.085198, // Provide your longitude
            content: '<p>Akkar</p>', // Provide your address to show on pop up
            icon: '/img/marker-icon.png',
        };
        window.mapOps4 = {
            lat: 33.376892,	// Provide your latitude
            lng: 35.481483, // Provide your longitude
            content: '<p>Nabatieh</p>', // Provide your address to show on pop up
            icon: '/img/marker-icon.png',
        };
        window.mapOps5 = {
            lat: 33.558020,	// Provide your latitude
            lng: 35.372854, // Provide your longitude
            content: '<p>Sidon</p>', // Provide your address to show on pop up
            icon: '/img/marker-icon.png',
        };
        window.mapOps6 = {
            lat: 33.702266,	// Provide your latitude
            lng: 35.581105, // Provide your longitudeCoder Pixel, Gulshan 1, Dhaka, Bangladesh
            content: '<p>Chouf</p>', // Provide your address to show on pop up
            icon: '/img/marker-icon.png',
        };
        window.mapOps7 = {
            lat: 34.004658,	// Provide your latitude
            lng: 36.211068, // Provide your longitude
            content: '<p>Baalbeck</p>', // Provide your address to show on pop up
            icon: '/img/marker-icon.png',
        };
        window.mapOps8 = {
            lat: 33.762066,	// Provide your latitude
            lng: 35.883544, // Provide your longitude
            content: '<p>Central Beqaa</p>', // Provide your address to show on pop up
            icon: '/img/marker-icon.png',
        };


        window.map = new GMaps({
            div: mapWrapperID,
            lat: 33.822895,
            lng: 35.730461,
            scrollwheel: true,
            draggable: draggableOp,
            disableDefaultUI: false,
            styles: mapStyle,
            zoom: 9
        });


        map.addMarkers([
            {
                lat: mapOps.lat,
                lng: mapOps.lng,
                icon: mapOps.icon,
                infoWindow: {
                    content: mapOps.content
                }
            },
            {
                lat: mapOps2.lat,
                lng: mapOps2.lng,
                icon: mapOps2.icon,
                infoWindow: {
                    content: mapOps2.content
                }
            },
            {
                lat: mapOps3.lat,
                lng: mapOps3.lng,
                icon: mapOps3.icon,
                infoWindow: {
                    content: mapOps3.content
                }
            },
            {
                lat: mapOps4.lat,
                lng: mapOps4.lng,
                icon: mapOps4.icon,
                infoWindow: {
                    content: mapOps4.content
                }
            },
            {
                lat: mapOps5.lat,
                lng: mapOps5.lng,
                icon: mapOps5.icon,
                infoWindow: {
                    content: mapOps5.content
                }
            },
            {
                lat: mapOps6.lat,
                lng: mapOps6.lng,
                icon: mapOps6.icon,
                infoWindow: {
                    content: mapOps6.content
                }
            },
            {
                lat: mapOps7.lat,
                lng: mapOps7.lng,
                icon: mapOps7.icon,
                infoWindow: {
                    content: mapOps7.content
                }
            },
            {
                lat: mapOps8.lat,
                lng: mapOps8.lng,
                icon: mapOps8.icon,
                infoWindow: {
                    content: mapOps8.content
                }
            },

        ]);

        map.panBy(0, -40);
    }

});


$(window).load(function () {

    // Initial Animation when Site loaded
    var handler = setTimeout(function () {
        $('.init-animation').addClass('animated').css({
            "visibility": "visible",
            "animation-duration": "2s",
            "animation-name": "fadeIn"
        });
        clearTimeout(handler);
    }, 1400);

    if ($(window).scrollTop() > 0) {
        $('.main-header').addClass('is-sticky');
    }

});


$(window).on('scroll', function (e) {

    // Header Sticky

    if ($(this).scrollTop() > 0) {
        header.addClass('is-sticky');
    } else {
        header.removeClass('is-sticky');
    }

});


// The function actually applying the offset
function offsetAnchor() {
    if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 100);
    }
}


// Captures click events of all <a> elements with href starting with #
$(document).on('click', 'a[href^="#"]', function (event) {
    // Click events are captured before hashchanges. Timeout
    // causes offsetAnchor to be called after the page jump.
    window.setTimeout(function () {
        offsetAnchor();
    }, 0);
});

// Set the offset when entering page with hash present in the url
window.setTimeout(offsetAnchor, 0);

