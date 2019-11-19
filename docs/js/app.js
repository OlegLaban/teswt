/*
 *  Document   : app.js
 *  Author     : pixelcave
 *  Description: Custom scripts and plugin initializations (available to all pages)
 *
 *  Feel free to remove the plugin initilizations from uiInit() if you would like to
 *  use them only in specific pages. Also, if you remove a js plugin you won't use, make
 *  sure to remove its initialization from uiInit().
 */

var App = function() {
    /* Helper variables - set in uiInit() */
    var page, pageContent, header, footer, sidebar, sScroll, sidebarAlt, sScrollAlt;

    /* Initialization UI Code */
    var uiInit = function() {
        // Set variables - Cache some often used Jquery objects in variables */
        page            = $('#page-container');
        pageContent     = $('#page-content');
        header          = $('header');
        footer          = $('#page-content + footer');

        sidebar         = $('#sidebar');
        sScroll         = $('#sidebar-scroll');

        sidebarAlt      = $('#sidebar-alt');
        sScrollAlt      = $('#sidebar-alt-scroll');

        // Initialize sidebars functionality
        handleSidebar('init');

        // Sidebar navigation functionality
        handleNav();

        // Interactive blocks functionality
        interactiveBlocks();

        // Scroll to top functionality
        scrollToTop();

        // Template Options, change features
        templateOptions();

        // Resize #page-content to fill empty space if exists (also add it to resize and orientationchange events)
        resizePageContent();
        $(window).resize(function(){ resizePageContent(); });
        $(window).bind('orientationchange', resizePageContent);

        // Add the correct copyright year at the footer
        var yearCopy = $('#year-copy'), d = new Date();
        if (d.getFullYear() === 2014) { yearCopy.html('2014'); } else { yearCopy.html('2014-' + d.getFullYear().toString().substr(2,2)); }

        // Initialize chat demo functionality (in sidebar)
        chatUi();

        // Initialize tabs
        $('[data-toggle="tabs"] a, .enable-tabs a').click(function(e){ e.preventDefault(); $(this).tab('show'); });

        // Initialize Tooltips
        $('[data-toggle="tooltip"], .enable-tooltip').tooltip({container: 'body', animation: false});

        // Initialize Popovers
        $('[data-toggle="popover"], .enable-popover').popover({container: 'body', animation: true});

        // Initialize single image lightbox
        $('[data-toggle="lightbox-image"]').magnificPopup({type: 'image', image: {titleSrc: 'title'}});

        // Initialize image gallery lightbox
        $('[data-toggle="lightbox-gallery"]').each(function(){
            $(this).magnificPopup({
                delegate: 'a.gallery-link',
                type: 'image',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    arrowMarkup: '<button type="button" class="mfp-arrow mfp-arrow-%dir%" title="%title%"></button>',
                    tPrev: 'Previous',
                    tNext: 'Next',
                    tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
                },
                image: {titleSrc: 'title'}
            });
        });

        // Initialize Typeahead - Example with countries
        var exampleTypeheadData = ["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","CΓ΄te d'Ivoire","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Cook Islands","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Faeroe Islands","Falkland Islands","Fiji","Finland","Former Yugoslav Republic of Macedonia","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","Northern Marianas","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar","RΓ©union","Romania","Russia","Rwanda","SΓ£o TomΓ© and PrΓ­ncipe","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Saudi Arabia","Senegal","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Korea","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","The Bahamas","The Gambia","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","US Virgin Islands","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Wallis and Futuna","Western Sahara","Yemen","Yugoslavia","Zambia","Zimbabwe"];
        $('.input-typeahead').typeahead({ source: exampleTypeheadData });

        // Initialize Chosen
        $('.select-chosen').chosen({width: "100%"});

        // Initialize Select2
        $('.select-select2').select2();

        // Initialize Bootstrap Colorpicker
        $('.input-colorpicker').colorpicker({format: 'hex'});
        $('.input-colorpicker-rgba').colorpicker({format: 'rgba'});

        // Initialize Slider for Bootstrap
        $('.input-slider').slider();

        // Initialize Tags Input
        $('.input-tags').tagsInput({ width: 'auto', height: 'auto'});

        // Initialize Datepicker
        $('.input-datepicker, .input-daterange').datepicker({weekStart: 1});
        $('.input-datepicker-close').datepicker({weekStart: 1}).on('changeDate', function(e){ $(this).datepicker('hide'); });

        // Initialize Timepicker
        $('.input-timepicker').timepicker({minuteStep: 1,showSeconds: true,showMeridian: true});
        $('.input-timepicker24').timepicker({minuteStep: 1,showSeconds: true,showMeridian: false});

        // Easy Pie Chart
        $('.pie-chart').easyPieChart({
            barColor: $(this).data('bar-color') ? $(this).data('bar-color') : '#777777',
            trackColor: $(this).data('track-color') ? $(this).data('track-color') : '#eeeeee',
            lineWidth: $(this).data('line-width') ? $(this).data('line-width') : 3,
            size: $(this).data('size') ? $(this).data('size') : '80',
            animate: 800,
            scaleColor: false
        });

        // Initialize Placeholder
        $('input, textarea').placeholder();
    };

    /* Page Loading functionality */
    var pageLoading = function(){
        var pageWrapper = $('#page-wrapper');

        if (pageWrapper.hasClass('page-loading')) {
            pageWrapper.removeClass('page-loading');
        }
    };

    /* Gets window width cross browser */
    var getWindowWidth = function(){
        return window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
    };

    /* Sidebar Navigation functionality */
    var handleNav = function() {
        // Animation Speed, change the values for different results
        var upSpeed     = 250;
        var downSpeed   = 250;

        // Get all vital links
        var menuLinks       = $('.sidebar-nav-menu');
        var submenuLinks    = $('.sidebar-nav-submenu');

        // Primary Accordion functionality
        menuLinks.click(function(){
            var link = $(this);

            if (page.hasClass('sidebar-mini') && page.hasClass('sidebar-visible-lg-mini') && (getWindowWidth() > 991)) {
                if (link.hasClass('open')) {
                    link.removeClass('open').next().removeAttr('style');
                }
                else {
                    $('.sidebar-nav-menu.open').removeClass('open').next().removeAttr('style');
                    link.addClass('open').next().css('display', 'block');
                }
            }
            else if (!link.parent().hasClass('active')) {
                if (link.hasClass('open')) {
                    link.removeClass('open').next().slideUp(upSpeed, function(){
                        handlePageScroll(link, 200, 300);
                    });

                    // Resize #page-content to fill empty space if exists
                    setTimeout(resizePageContent, upSpeed);
                }
                else {
                    $('.sidebar-nav-menu.open').removeClass('open').next().slideUp(upSpeed);
                    link.addClass('open').next().slideDown(downSpeed, function(){
                        handlePageScroll(link, 150, 600);
                    });

                    // Resize #page-content to fill empty space if exists
                    setTimeout(resizePageContent, ((upSpeed > downSpeed) ? upSpeed : downSpeed));
                }
            }

            link.blur();

            return false;
        });

        // Submenu Accordion functionality
        submenuLinks.click(function(){
            var link = $(this);

            if (link.parent().hasClass('active') !== true) {
                if (link.hasClass('open')) {
                    link.removeClass('open').next().slideUp(upSpeed, function(){
                        handlePageScroll(link, 200, 300);
                    });

                    // Resize #page-content to fill empty space if exists
                    setTimeout(resizePageContent, upSpeed);
                }
                else {
                    link.closest('ul').find('.sidebar-nav-submenu.open').removeClass('open').next().slideUp(upSpeed);
                    link.addClass('open').next().slideDown(downSpeed, function(){
                        handlePageScroll(link, 150, 600);
                    });

                    // Resize #page-content to fill empty space if exists
                    setTimeout(resizePageContent, ((upSpeed > downSpeed) ? upSpeed : downSpeed));
                }
            }

            link.blur();

            return false;
        });
    };

    /* Scrolls the page (static layout) or the sidebar scroll element (fixed header/sidebars layout) to a specific position - Used when a submenu opens */
    var handlePageScroll = function(sElem, sHeightDiff, sSpeed) {
        if (!page.hasClass('disable-menu-autoscroll')) {
            var elemScrollToHeight;

            // If we have a static layout scroll the page
            if (!header.hasClass('navbar-fixed-top') && !header.hasClass('navbar-fixed-bottom')) {
                var elemOffsetTop   = sElem.offset().top;

                elemScrollToHeight  = (((elemOffsetTop - sHeightDiff) > 0) ? (elemOffsetTop - sHeightDiff) : 0);

                $('html, body').animate({scrollTop: elemScrollToHeight}, sSpeed);
            } else { // If we have a fixed header/sidebars layout scroll the sidebar scroll element
                var sContainer      = sElem.parents('#sidebar-scroll');
                var elemOffsetCon   = sElem.offset().top + Math.abs($('div:first', sContainer).offset().top);

                elemScrollToHeight = (((elemOffsetCon - sHeightDiff) > 0) ? (elemOffsetCon - sHeightDiff) : 0);
                sContainer.animate({ scrollTop: elemScrollToHeight}, sSpeed);
            }
        }
    };

    /* Sidebar Functionality */
    var handleSidebar = function(mode, extra) {
        if (mode === 'init') {
            // Init sidebars scrolling functionality
            handleSidebar('sidebar-scroll');
            handleSidebar('sidebar-alt-scroll');

            // Close the other sidebar if we hover over a partial one
            // In smaller screens (the same applies to resized browsers) two visible sidebars
            // could mess up our main content (not enough space), so we hide the other one :-)
            $('.sidebar-partial #sidebar')
                .mouseenter(function(){ handleSidebar('close-sidebar-alt'); });
            $('.sidebar-alt-partial #sidebar-alt')
                .mouseenter(function(){ handleSidebar('close-sidebar'); });
        } else {
            var windowW = getWindowWidth();

            if (mode === 'toggle-sidebar') {
                if ( windowW > 991) { // Toggle main sidebar in large screens (> 991px)
                    page.toggleClass('sidebar-visible-lg');

                    if (page.hasClass('sidebar-mini')) {
                        page.toggleClass('sidebar-visible-lg-mini');
                    }

                    if (page.hasClass('sidebar-visible-lg')) {
                        handleSidebar('close-sidebar-alt');
                    }

                    // If 'toggle-other' is set, open the alternative sidebar when we close this one
                    if (extra === 'toggle-other') {
                        if (!page.hasClass('sidebar-visible-lg')) {
                            handleSidebar('open-sidebar-alt');
                        }
                    }
                } else { // Toggle main sidebar in small screens (< 992px)
                    page.toggleClass('sidebar-visible-xs');

                    if (page.hasClass('sidebar-visible-xs')) {
                        handleSidebar('close-sidebar-alt');
                    }
                }

                // Handle main sidebar scrolling functionality
                handleSidebar('sidebar-scroll');
            }
            else if (mode === 'toggle-sidebar-alt') {
                if ( windowW > 991) { // Toggle alternative sidebar in large screens (> 991px)
                    page.toggleClass('sidebar-alt-visible-lg');

                    if (page.hasClass('sidebar-alt-visible-lg')) {
                        handleSidebar('close-sidebar');
                    }

                    // If 'toggle-other' is set open the main sidebar when we close the alternative
                    if (extra === 'toggle-other') {
                        if (!page.hasClass('sidebar-alt-visible-lg')) {
                            handleSidebar('open-sidebar');
                        }
                    }
                } else { // Toggle alternative sidebar in small screens (< 992px)
                    page.toggleClass('sidebar-alt-visible-xs');

                    if (page.hasClass('sidebar-alt-visible-xs')) {
                        handleSidebar('close-sidebar');
                    }
                }
            }
            else if (mode === 'open-sidebar') {
                if ( windowW > 991) { // Open main sidebar in large screens (> 991px)
                    if (page.hasClass('sidebar-mini')) { page.removeClass('sidebar-visible-lg-mini'); }
                    page.addClass('sidebar-visible-lg');
                } else { // Open main sidebar in small screens (< 992px)
                    page.addClass('sidebar-visible-xs');
                }

                // Close the other sidebar
                handleSidebar('close-sidebar-alt');
            }
            else if (mode === 'open-sidebar-alt') {
                if ( windowW > 991) { // Open alternative sidebar in large screens (> 991px)
                    page.addClass('sidebar-alt-visible-lg');
                } else { // Open alternative sidebar in small screens (< 992px)
                    page.addClass('sidebar-alt-visible-xs');
                }

                // Close the other sidebar
                handleSidebar('close-sidebar');
            }
            else if (mode === 'close-sidebar') {
                if ( windowW > 991) { // Close main sidebar in large screens (> 991px)
                    page.removeClass('sidebar-visible-lg');
                    if (page.hasClass('sidebar-mini')) { page.addClass('sidebar-visible-lg-mini'); }
                } else { // Close main sidebar in small screens (< 992px)
                    page.removeClass('sidebar-visible-xs');
                }
            }
            else if (mode === 'close-sidebar-alt') {
                if ( windowW > 991) { // Close alternative sidebar in large screens (> 991px)
                    page.removeClass('sidebar-alt-visible-lg');
                } else { // Close alternative sidebar in small screens (< 992px)
                    page.removeClass('sidebar-alt-visible-xs');
                }
            }
            else if (mode === 'sidebar-scroll') { // Handle main sidebar scrolling
                if (page.hasClass('sidebar-mini') && page.hasClass('sidebar-visible-lg-mini') && (windowW > 991)) { // Destroy main sidebar scrolling when in mini sidebar mode
                    if (sScroll.length && sScroll.parent('.slimScrollDiv').length) {
                        sScroll
                            .slimScroll({destroy: true});
                        sScroll
                            .attr('style', '');
                    }
                }
                else if ((page.hasClass('header-fixed-top') || page.hasClass('header-fixed-bottom'))) {
                    var sHeight = $(window).height();

                    if (sScroll.length && (!sScroll.parent('.slimScrollDiv').length)) { // If scrolling does not exist init it..
                        sScroll
                            .slimScroll({
                                height: sHeight,
                                color: '#fff',
                                size: '3px',
                                touchScrollStep: 100
                            });

                        // Handle main sidebar's scrolling functionality on resize or orientation change
                        var sScrollTimeout;

                        $(window).on('resize orientationchange', function(){
                            clearTimeout(sScrollTimeout);

                            sScrollTimeout = setTimeout(function(){
                                handleSidebar('sidebar-scroll');
                            }, 150);
                        });
                    }
                    else { // ..else resize scrolling height
                        sScroll
                            .add(sScroll.parent())
                            .css('height', sHeight);
                    }
                }
            }
            else if (mode === 'sidebar-alt-scroll') { // Init alternative sidebar scrolling
                if ((page.hasClass('header-fixed-top') || page.hasClass('header-fixed-bottom'))) {
                    var sHeightAlt = $(window).height();

                    if (sScrollAlt.length && (!sScrollAlt.parent('.slimScrollDiv').length)) { // If scrolling does not exist init it..
                        sScrollAlt
                            .slimScroll({
                                height: sHeightAlt,
                                color: '#fff',
                                size: '3px',
                                touchScrollStep: 100
                            });

                        // Resize alternative sidebar scrolling height on window resize or orientation change
                        var sScrollAltTimeout;

                        $(window).on('resize orientationchange', function(){
                            clearTimeout(sScrollAltTimeout);

                            sScrollAltTimeout = setTimeout(function(){
                                handleSidebar('sidebar-alt-scroll');
                            }, 150);
                        });
                    }
                    else { // ..else resize scrolling height
                        sScrollAlt
                            .add(sScrollAlt.parent())
                            .css('height', sHeightAlt);
                    }
                }
            }
        }

        return false;
    };

    /* Resize #page-content to fill empty space if exists */
    var resizePageContent = function() {
        var windowH         = $(window).height();
        var sidebarH        = sidebar.outerHeight();
        var sidebarAltH     = sidebarAlt.outerHeight();
        var headerH         = header.outerHeight();
        var footerH         = footer.outerHeight();

        pageContent.css('min-height', $(window).height() + 'px');

        // // If we have a fixed sidebar/header layout or each sidebars’ height < window height
        // if (header.hasClass('navbar-fixed-top') || header.hasClass('navbar-fixed-bottom') || ((sidebarH < windowH) && (sidebarAltH < windowH))) {
        //     if (page.hasClass('footer-fixed')) { // if footer is fixed don't remove its height
        //         pageContent.css('min-height', windowH - headerH + 'px');
        //     } else { // else if footer is static, remove its height
        //         pageContent.css('min-height', windowH - (headerH + footerH) + 'px');
        //     }
        // }  else { // In any other case set #page-content height the same as biggest sidebar's height
        //     if (page.hasClass('footer-fixed')) { // if footer is fixed don't remove its height
        //         pageContent.css('min-height', ((sidebarH > sidebarAltH) ? sidebarH : sidebarAltH) - headerH + 'px');
        //     } else { // else if footer is static, remove its height
        //         pageContent.css('min-height', ((sidebarH > sidebarAltH) ? sidebarH : sidebarAltH) - (headerH + footerH) + 'px');
        //     }
        // }
    };

    /* Interactive blocks functionality */
    var interactiveBlocks = function() {

        // Toggle block's content
        $('[data-toggle="block-toggle-content"]').on('click', function(){
            var blockContent = $(this).closest('.block').find('.block-content');

            if ($(this).hasClass('active')) {
                blockContent.slideDown();
            } else {
                blockContent.slideUp();
            }

            $(this).toggleClass('active');
        });

        // Toggle block fullscreen
        $('[data-toggle="block-toggle-fullscreen"]').on('click', function(){
            var block = $(this).closest('.block');

            if ($(this).hasClass('active')) {
                block.removeClass('block-fullscreen');
            } else {
                block.addClass('block-fullscreen');
            }

            $(this).toggleClass('active');
        });

        // Hide block
        $('[data-toggle="block-hide"]').on('click', function(){
            $(this).closest('.block').fadeOut();
        });
    };

    /* Scroll to top functionality */
    var scrollToTop = function() {
        // Get link
        var link = $('#to-top');

        $(window).scroll(function() {
            // If the user scrolled a bit (150 pixels) show the link in large resolutions
            if (($(this).scrollTop() > 150) && (getWindowWidth() > 991)) {
                link.fadeIn(100);
            } else {
                link.fadeOut(100);
            }
        });

        // On click get to top
        link.click(function() {
            $('html, body').animate({scrollTop: 0}, 400);
            return false;
        });
    };

    /* Demo chat functionality (in sidebar) */
    var chatUi = function() {
        var chatUsers       = $('.chat-users');
        var chatTalk        = $('.chat-talk');
        var chatMessages    = $('.chat-talk-messages');
        var chatInput       = $('#sidebar-chat-message');
        var chatMsg         = '';

        // Initialize scrolling on chat talk list
        chatMessages.slimScroll({ height: 210, color: '#fff', size: '3px', position: 'left', touchScrollStep: 100 });

        // If a chat user is clicked show the chat talk
        $('a', chatUsers).click(function(){
            chatUsers.slideUp();
            chatTalk.slideDown();
            chatInput.focus();

            return false;
        });

        // If chat talk close button is clicked show the chat user list
        $('#chat-talk-close-btn').click(function(){
            chatTalk.slideUp();
            chatUsers.slideDown();

            return false;
        });

        // When the chat message form is submitted
        $('#sidebar-chat-form').submit(function(e){
            // Get text from message input
            chatMsg = chatInput.val();

            // If the user typed a message
            if (chatMsg) {
                // Add it to the message list
                chatMessages.append('<li class="chat-talk-msg chat-talk-msg-highlight themed-border animation-slideLeft">' + $('<div />').text(chatMsg).html() + '</li>');

                // Scroll the message list to the bottom
                chatMessages.slimScroll({ scrollTo: chatMessages[0].scrollHeight + 'px' });

                // Reset the message input
                chatInput.val('');
            }

            // Don't submit the message form
            e.preventDefault();
        });
    };

    /* Template Options, change features functionality */
    var templateOptions = function() {
        /*
         * Color Themes
         */
        var colorList   = $('.sidebar-themes');
        var themeLink   = $('#theme-link');

        var themeColor  = themeLink.length ? themeLink.attr('href') : 'default';
        var cookies     = true;

        var themeColorCke;

        // If cookies have been enabled
        if (cookies) {
            themeColorCke = Cookies.get('optionThemeColor') ? Cookies.get('optionThemeColor') : false;

            // Update color theme
            if (themeColorCke) {
                if (themeColorCke === 'default') {
                    if (themeLink.length) {
                        themeLink.remove();
                        themeLink = $('#theme-link');
                    }
                } else {
                    if (themeLink.length) {
                        themeLink.attr('href', themeColorCke);
                    } else {
                        $('link[href="css/themes.css"]')
                            .before('<link id="theme-link" rel="stylesheet" href="' + themeColorCke + '">');

                        themeLink = $('#theme-link');
                    }
                }
            }

            themeColor = themeColorCke ? themeColorCke : themeColor;
        }

        // Set the active color theme link as active
        $('a[data-theme="' + themeColor + '"]', colorList)
            .parent('li')
            .addClass('active');

        // When a color theme link is clicked
        $('a', colorList).click(function(e){
            // Get theme name
            themeColor = $(this).data('theme');

            $('li', colorList).removeClass('active');
            $(this).parent('li').addClass('active');

            if (themeColor === 'default') {
                if (themeLink.length) {
                    themeLink.remove();
                    themeLink = $('#theme-link');
                }
            } else {
                if (themeLink.length) {
                    themeLink.attr('href', themeColor);
                } else {
                    $('link[href="css/themes.css"]').before('<link id="theme-link" rel="stylesheet" href="' + themeColor + '">');
                    themeLink = $('#theme-link');
                }
            }

            // If cookies have been enabled, save the new options
            if (cookies) {
                Cookies.set('optionThemeColor', themeColor, {expires: 7});
            }
        });

        // Prevent template options dropdown from closing on clicking options
        $('.dropdown-options a').click(function(e){ e.stopPropagation(); });

        /* Page Style */
        var optMainStyle        = $('#options-main-style');
        var optMainStyleAlt     = $('#options-main-style-alt');

        if (page.hasClass('style-alt')) {
            optMainStyleAlt.addClass('active');
        } else {
            optMainStyle.addClass('active');
        }

        optMainStyle.click(function() {
            page.removeClass('style-alt');
            $(this).addClass('active');
            optMainStyleAlt.removeClass('active');
        });

        optMainStyleAlt.click(function() {
            page.addClass('style-alt');
            $(this).addClass('active');
            optMainStyle.removeClass('active');
        });

        /* Header options */
        var optHeaderDefault    = $('#options-header-default');
        var optHeaderInverse    = $('#options-header-inverse');

        if (header.hasClass('navbar-default')) {
            optHeaderDefault.addClass('active');
        } else {
            optHeaderInverse.addClass('active');
        }

        optHeaderDefault.click(function() {
            header.removeClass('navbar-inverse').addClass('navbar-default');
            $(this).addClass('active');
            optHeaderInverse.removeClass('active');
        });

        optHeaderInverse.click(function() {
            header.removeClass('navbar-default').addClass('navbar-inverse');
            $(this).addClass('active');
            optHeaderDefault.removeClass('active');
        });
    };

    /* Datatables basic Bootstrap integration (pagination integration included under the Datatables plugin in plugins.js) */
    var dtIntegration = function() {
        $.extend(true, $.fn.dataTable.defaults, {
            "sDom": "<'row'<'col-sm-6 col-xs-5'l><'col-sm-6 col-xs-7'f>r>t<'row'<'col-sm-5 hidden-xs'i><'col-sm-7 col-xs-12 clearfix'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_",
                "sSearch": "<div class=\"input-group\">_INPUT_<span class=\"input-group-addon\"><i class=\"fa fa-search\"></i></span></div>",
                "sInfo": "<strong>_START_</strong>-<strong>_END_</strong> of <strong>_TOTAL_</strong>",
                "oPaginate": {
                    "sPrevious": "",
                    "sNext": ""
                }
            }
        });
        $.extend($.fn.dataTableExt.oStdClasses, {
            "sWrapper": "dataTables_wrapper form-inline",
            "sFilterInput": "form-control",
            "sLengthSelect": "form-control"
        });
    };

    /* Print functionality - Hides all sidebars, prints the page and then restores them (To fix an issue with CSS print styles in webkit browsers)  */
    var handlePrint = function() {
        // Store all #page-container classes
        var pageCls = page.prop('class');

        // Remove all classes from #page-container
        page.prop('class', '');

        // Print the page
        window.print();

        // Restore all #page-container classes
        page.prop('class', pageCls);
    };

    var readURL = function(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function(e) {
                $(input).prev('img.upload-image-preview').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    var previewUploadImage = function() {
        $("img.upload-image-preview + input[type=file]").change(function() {
            readURL(this);
        });
    };

    var disableSubmitButton = function() {
        $(".submit-form").submit(function (e) {
            $(".btn-submit").attr('disabled', true);
            return true;
        });
    }

    return {
        init: function() {
            uiInit(); // Initialize UI Code
            pageLoading(); // Initialize Page Loading
            previewUploadImage(); // Preview Upload Image
            disableSubmitButton(); // Disable submit button
        },
        sidebar: function(mode, extra) {
            handleSidebar(mode, extra); // Handle sidebars - access functionality from everywhere
        },
        datatables: function() {
            dtIntegration(); // Datatables Bootstrap integration
        },
        pagePrint: function() {
            handlePrint(); // Print functionality
        }
    };
}();

/* Initialize app when page loads */
$(function(){ App.init(); });

function confirmDelete({ e, target }, text) {
    let _text = `${text}. Восстановление не возможно!!!`;
    if (confirm(_text)) {
        // success
    } else {
        e.preventDefault();
        let next = $(target).next();
        next.trigger('click');
    }
}


    $(document).ready(function () {
        $.validator.addMethod("gretedZero", function (element) {
            return parseFloat(element) > 0;
        }, "Значение в поле должно быть больше нуля");
    });


    $(document).ajaxComplete(function () {
        (function () {
            let orderNumber, oldOrderNumber,  orderNumberUser = $('.inputForOrderNumber');
            orderNumberUser.on('focus', function () {
                orderNumber = $(this);
                oldOrderNumber = orderNumber.val();
            });

            function action() {
                let formClass = '.formOrderNumber-' + $(this).data('id');
                let name = $(this).attr('name');
                let objectForValidate = {};
                oldOrderNumber = $(oldInput)[0] === undefined ? oldOrderNumber :  $(oldInput)[0].defaultValue;
                objectForValidate['rules'] = {};
                objectForValidate['rules'][name] = {
                    gretedZero: true,
                };
                $(formClass).validate(objectForValidate);

                $(this).prop('disabled', true);
                if ($(this).val() <= 0) {
                    $(this).prop('disabled', false);
                    $(this).val(oldOrderNumber);
                } else if ($(this).val() !== oldOrderNumber) {
                    $(this).prop('disabled', true);
                    $.ajax({
                        url: '/admin/users/update/ordernum',
                        type: 'POST',
                        textType: 'html',
                        data: {id: $(this).data('id'), newValue: $(this).val()},
                        beforeSend: function () {
                            $(this).prop('disabled', true);
                        },
                        complete: function () {
                            $(this).prop('disabled', false);
                        },
                        success: function (data) {
                            let table = $('#user-datatable').DataTable();
                            table.columns(4).search(data);
                            table.order([5, 'asc']).draw();
                            $('#sectionSelect option[value="' + data + '"]').attr('selected', 'select');
                            if ($('body').find('.alert-success').length === 0 ) {
                                $.bootstrapGrowl("Данные обновлены успешно!", {type: 'success', delay: 2000});
                            }
                        }
                    });
                } else {
                    $(this).prop('disabled', false);
                }

            }

            let oldClick = false;
            let input;
            let oldInput = '';
            $('#user-datatable').on('click', function (event) {
                if (event.target !== input && oldClick) {
                    oldClick = false;
                    action.call(input);
                }else if (oldInput !== ""){
                    if (oldInput.dataset['id'] !== input.dataset['id'] && oldClick) {
                        oldClick = false;
                        action.call(oldInput);
                        oldInput = '';
                    }

                }
            });

            orderNumberUser.keydown(function (event) {
                if (event.keyCode === 13){
                    oldClick = false;
                    $(this).prop('disabled', true);
                    action.call(this);
                }
            });
            orderNumberUser.on('change', function () {
                oldInput = this;
            });
            orderNumberUser.on('focus', function (event) {
                oldClick = true;
                input = this;
            });

        })();

        (function () {
            let id, oldOrderNumber, newOrderNumber, orderNumberArticle = $('.orderNumberArticle');
            orderNumberArticle.on('focus', function () {
                id = $(this).data('id');
                oldOrderNumber = $(this).val();
                if ($('span').is('#messOrderNumb')) {
                    $('#messOrderNumb').detach();
                    $('.br').detach();
                }
            });

            function action() {
                let formClass = '.formOrderNumber-' + $(this).data('id');
                let name = $(this).attr('name');
                let objectForValidate = {};
                oldOrderNumber = $(oldInput)[0] === undefined ? oldOrderNumber :  $(oldInput)[0].defaultValue;
                objectForValidate['rules'] = {};
                objectForValidate['rules'][name] = {
                    gretedZero: true,
                };
                $(formClass).validate(objectForValidate);
                $(this).prop('disabled', true);
                id = $(this).data('id');
                newOrderNumber = $(this).val();
                if ($(this).val() <= 0) {
                    $(this).prop('disabled', false);
                    $(this).val(oldOrderNumber);
                } else if ($(this).val() !== 0 && oldOrderNumber !== $(this).val()) {
                    $(this).prop('disabled', true);
                    $.ajax({
                        url: '/admin/article/ajax/data/order',
                        type: "POST",
                        textType: 'html',
                        data: {idArticle: $(this).data('id'), orderNumber: $(this).val()},
                        beforeSend: function () {
                            $(this).prop('disabled', true);
                        },
                        complete: function () {
                            $(this).prop('disabled', false);
                        },
                        success: function (data) {
                            let table = $('#article-datatable').DataTable();
                            table.columns(2).search(data);
                            table.order([4, 'asc']).draw();
                            $('#sectionSelect option[value="' + data + '"]').attr('selected', 'select');
                            if ($('body').find('.alert-success').length === 0 ) {
                                $.bootstrapGrowl("Данные обновлены успешно!", {type: 'success', delay: 2000});
                            }
                        }
                    });
                } else {
                    $(this).prop('disabled', false);
                }

            }

            let oldClick = false;
            let input;
            let oldInput = '';
            $('#article').on('click', function (event) {
                if (event.target !== input && oldClick) {
                    oldClick = false;
                    action.call(input);
                }else if (oldInput !== ""){
                    if (oldInput.dataset['id'] !== input.dataset['id'] && oldClick) {
                        oldClick = false;
                        action.call(oldInput);
                        oldInput = '';
                    }

                }
            });

            orderNumberArticle.keydown(function (event) {
                if (event.keyCode === 13){
                    oldClick = false;
                    $(this).prop('disabled', true);
                    action.call(this);
                }
            });
            orderNumberArticle.on('change', function () {
                oldInput = this;
            });
            orderNumberArticle.on('focus', function (event) {
                oldClick = true;
                input = this;
            });
        })();

        (function () {
            let id, oldOrderNumber, newOrderNumber, orderNumberArticle = $('.orderNumberObject');
            orderNumberArticle.on('focus', function (event) {
                    id = $(this).data('id');
                    oldOrderNumber = $(this).val()
            });

            function action() {
                let formClass = '.formOrderNumber-' + $(this).data('id');
                let name = $(this).attr('name');
                oldOrderNumber = $(oldInput)[0] === undefined ? oldOrderNumber :  $(oldInput)[0].defaultValue;
                $(formClass).validate(objectForValidate);
                $(this).prop('disabled', true);
                id = $(this).data('id');
                newOrderNumber = $(this).val();
                if ($(this).val() <= 0) {
                    $(this).prop('disabled', false);

                    $(this).val(oldOrderNumber);
                } else if ($(this).val() !== 0 && oldOrderNumber !== $(this).val()) {
                    $.ajax({
                        url: '/admin/object/ajax/data/order',
                        type: "POST",
                        textType: 'html',
                        data: {idApartment: $(this).data('id'), orderNumber: $(this).val()},
                        beforeSend: function () {
                            $(this).prop('disabled', true);
                        },
                        complete: function () {
                            $(this).prop('disabled', false);
                        },
                        success: function (data) {
                            let table = $('#object-datatable').DataTable();
                            table.columns(5).search(data);
                            table.order([6, 'asc']).draw();
                            $('#object-specialization option[value="' + data + '"]').attr('selected', 'select');
                            if ($('body').find('.alert-success').length === 0 ) {
                                $.bootstrapGrowl("Данные обновлены успешно!", {type: 'success', delay: 2000});
                            }
                            $('.orderNumberArticle').prop('disabled', true);
                        }
                    });
                } else {
                    $(this).prop('disabled', false);
                }

            }

            let oldClick = false;
            let input;
            let oldInput = '';
            $('#apartment').on('click', function (event) {
                if (event.target !== input && oldClick) {
                    oldClick = false;
                    action.call(input);
                }else if (oldInput !== ""){
                    if (oldInput.dataset['id'] !== input.dataset['id'] && oldClick) {
                        oldClick = false;
                        action.call(oldInput);
                        oldInput = '';
                    }

                }
            });

            orderNumberArticle.keydown(function (event) {
                if (event.keyCode === 13){
                    oldClick = false;
                    $(this).prop('disabled', true);
                    action.call(this);
                }
            });
            orderNumberArticle.on('change', function () {
               oldInput = this;
            });
            orderNumberArticle.on('focus', function (event) {
                    oldClick = true;
                    input = this;
            });

        })();

    });
    let specializationChange = false;

    $(document).ready(function () {
        $("#object-specialization").on('change', function () {
            table = $('#object-datatable').DataTable();
            table.order([6, 'asc']).draw();
        });
        $("#sectionSelect").on('change', function () {
            table = $('#user-datatable').DataTable();
            table.order([5, 'asc']).draw();
        });
    });

    function addObjectsIsAlert(id, name, url) {
        if (url === 'image') {
            $.ajax({
                url: 'delete/ajax/',
                method: 'POST',
                type: 'html',
                data: {'id': id},
                success: function (data) {
                    let text = '';
                    let newText = JSON.parse(data.data);
                    if (newText !== false) {
                        text = '<div class="modal-text">Плашка ' + name + ' наложена на объекты:</div>';
                        text += newText;
                    }
                    $('#modal-image_overlay-' + id + '-delete .modal-header .model-object-list').html(text);
                    $('#modal-image_overlay-' + id + '-delete').modal('show');
                }
            })
        }
        if (url === 'user') {
            $.ajax({
                url: '/admin/users/delete/ajax/',
                method: 'POST',
                type: 'html',
                data: {'id': id},
                success: function (data) {
                    let text;
                    let newText = JSON.parse(data.data);
                    if (newText != false) {
                        text = '<div class="modal-text">C этим пользователем связаны следующие объекты:</div>';
                        text += newText;
                    } else {
                        text = '';
                    }
                    $('#modal-user-' + id + '-delete .modal-header .model-object-list').html(text);
                    $('#modal-user-' + id + '-delete').modal('show');
                }
            })
        }
        if (url === 'object_section') {
            $.ajax({
                url: '/admin/object_section/delete/ajax/',
                method: 'POST',
                type: 'html',
                data: {'id': id},
                success: function (data) {
                    let text;
                    let newText = data.data;
                    if (newText != false) {
                        text = '<div class="modal-text">C этим разделом объектов связаны следующие пункты меню:</div>';
                        text += newText;
                    } else {
                        text = '';
                    }
                    $('#modal-object-section-' + id + '-delete .modal-header .model-object-list').html(text);
                    $('#modal-object-section-' + id + '-delete').modal('show');
                }
            })
        }
        if (url === 'article_section') {
            $.ajax({
                url: '/admin/article-section/delete/ajax/',
                method: 'POST',
                type: 'html',
                data: {'id': id},
                success: function (data) {
                    let text;
                    let newText = data.data;
                    if (newText != false) {
                        text = '<div class="modal-text">C этим разделом связаны следующие статьи:</div>';
                        text += newText;
                    } else {
                        text = '';
                    }
                    $('#modal-article-section-' + id + '-delete .modal-header .model-object-list').html(text);
                    $('#modal-article-section-' + id + '-delete').modal('show');
                }
            })
        }
        if (url === 'specialization') {
            $.ajax({
                url: '/admin/specialization/delete/ajax/',
                method: 'POST',
                type: 'html',
                data: {'id': id},
                success: function (data) {
                    let text;
                    let newText = data.data;
                    if (newText != false) {
                        text = '<div class="modal-text">За этой специализацией закреплены следующие пользователи:</div>';
                        text += newText;
                    } else {
                        text = '';
                    }
                    $('#modal-specialization-' + id + '-delete .modal-header .model-object-list').html(text);
                    $('#modal-specialization-' + id + '-delete').modal('show');
                }
            })
        }

        if (url === 'apartment_complex') {
            $.ajax({
                url: '/admin/zhilye-kompleksy/delete/ajax/',
                method: 'POST',
                type: 'html',
                data: {'id': id},
                success: function (data) {
                    let text;
                    let newText = data.data;
                    if (newText != false) {
                        text = '<div class="modal-text">Этот жиличный комлекс закрплен за следующими разделами объектов:</div>';
                        text += newText;
                    } else {
                        text = '';
                    }
                    $('#modal-apartment-complex-' + id + '-delete .modal-header .model-object-list').html(text);
                    $('#modal-apartment-complex-' + id + '-delete').modal('show');
                }
            })
        }
        if (url === 'developer') {
            $.ajax({
                url: '/admin/zastrojshhiki/delete/ajax/',
                method: 'POST',
                type: 'html',
                data: {'id': id},
                success: function (data) {
                    let text;
                    let newText = data.data;
                    if (newText != false) {
                        text = '<div class="modal-text">' +
                            'Этот застройщик закрплен за следующими разделами объектов:' +
                            '</div>';
                        text += newText;
                    } else {
                        text = '';
                    }
                    $('#modal-developer-' + id + '-delete .modal-header .model-object-list').html(text);
                    $('#modal-developer-' + id + '-delete').modal('show');
                }
            })
        }
    }

$(document).ready(
    function () {
        var canonicalCheckbox = $(".canonicalLinkDefault").first(),
            canonicalLink = $('.canonicalLink').first(),
            linkOriginal = $(".linkOriginal").first(),
            sectionForUrl = $('.sectionForUrl').first();

         function correctUrl(path, url, context, otherSite = true){
            let parElem = context.parentNode;
            if(url !== ''){
                $.ajax({
                    type: "POST",
                    url: path,
                    data: {'url': url, 'otherSite': otherSite},
                    beforeSend: () => {
                        $(context).attr('disabled', true);
                        $('.btn-primary').attr('disabled', true);
                        if($('#messageUrl').length < 1){
                            $(parElem).append('<span id="messageUrl">' + 'Идет обрабоктка... '+'</span>');
                        }
                    },
                    success: (data) => {
                        $('.btn-primary').attr('disabled', false);
                        $('#messageUrl').remove();
                        $(context).attr('disabled', false);
                        viewMessage(data, context);
                    }
                });
            }
        }

        function viewMessage(data, parEle) {
            let inputOnUrl = $(parEle);
            let url = data['url'];
            let code = data['code'];
            if(code !== 200 && code !== 401 && code !== 1){
                $('#messageUrl').remove();
                $(inputOnUrl[0]).addClass('errorUrl');
                $(parEle.parentNode).append("<span id=\"messageUrl\" style='color:red'>" + " Неверный url " + "</span>");
            }else if (code === 401){
                $('#messageUrl').remove();
                $(inputOnUrl[0]).addClass('errorUrl');
                $(parEle.parentNode).append("<span id=\"messageUrl\" style='color:red'>" + " Невозможно проверить url т.к. требуется авторизация. " + "</span>");
            }else if (code === 1){
                $('#messageUrl').remove();
                $(inputOnUrl[0]).addClass('errorUrl');
                $(parEle.parentNode).append("<span id=\"messageUrl\" style='color:red'>" + " Данный url находится за пределами домена сайта." + "</span>");
            }else{
                $('#messageUrl').remove();
            }
            inputOnUrl.val(url);
        }

        //Start code for menu correct link
        $('#menu_url').on('blur', function (){
            let url = $(this).val();
            correctUrl("/admin/menu/isseturl", url, this, false);
        });

        $("#menu_url").on('focus', function () {
            $('#messageUrl').remove();
            $(this).removeClass('errorUrl');
        });

        $('#menu_objectSection').change(function () {
            let parElem = document.querySelector('#menu_url');
            if(this.value != ''){
                $.ajax({
                    type: "POST",
                    url: "/admin/menu/geturl",
                    data: {'id_object': this.value},
                    success: (data) => {
                        viewMessage(data, parElem);
                    }
                });
            }else{
                $("#menu_url").val('');
            }
        });
        //End code for menu correct link
        var eventAjax = new Event("loadCanonical", {bubbles: true});
        function getSection(context, urlMethod, elemId = '', verifyCorrect = true, callback = false, userAjaxData = []){
            var sectionElement = $(elemId);
            if (sectionElement.length > 0) {
                var sectionId = parseInt(sectionElement.val());
                let url, parElem = canonicalLink.parent(), data = {"sectionId": sectionId};
                if (userAjaxData.length > 0){
                    for (var i = 0; i < userAjaxData.length; i++){
                        data['up' + i] =  userAjaxData[i];
                    }
                }
                    $.ajax({
                        type: "POST",
                        url: urlMethod,
                        data: data,
                        beforeSend: () => {
                            $('.btn-primary').attr('disabled', true);
                        },
                        success: (data) => {
                            $('.btn-primary').attr('disabled', false);
                            $("#messageUrl").remove();
                            url = canonicalLink.val();
                            if (canonicalCheckbox.prop('checked')) {
                                if (canonicalLink.val() !== "/" + data + "/" + linkOriginal.val()){
                                    url = "/" + data + "/" + linkOriginal.val();
                                    canonicalLink.val(url);
                                }
                            }else{
                                canonicalLink.val(url);
                                if (verifyCorrect) {
                                    correctUrl("/admin/menu/isseturl", url, context);
                                }
                            }
                            canonicalLink[0].dispatchEvent(eventAjax);
                        }
                    });
            }else if (callback !== false && callback()){
                var url = canonicalLink.val() , data;
                if (callback !== false) {
                    data = callback();
                }
                if (canonicalCheckbox.prop('checked')) {
                    let section;
                    if (data === true){
                        section = '/';
                    }else{
                        section = "/" + data + "/";
                    }
                    url = canonicalLink.val().slice(1);
                    if (url.indexOf("/") + 1 > 0) {
                        let pos = url.indexOf("/");
                        let colLiter = url.length - pos - 1;
                        url = url.substr(url.length - colLiter);
                        url =  section + url;
                    } else {
                        url = section + linkOriginal.val();
                    }
                    canonicalLink.val(url);
                }else{
                    canonicalLink.val(url);
                    if (verifyCorrect) {
                        correctUrl("/admin/menu/isseturl", url, context);
                    }
                }
                canonicalLink[0].dispatchEvent(eventAjax);
            }
        }

        canonicalLink.on('blur', function () {
            if ($('#object_section_category').length > 0) {
                getSection(this,
                    "",
                    "", true, function () {
                        return $("#object_section_category option:selected").val();
                    });
            }
            getSection(this,
                '/admin/specialization/getspecializationurl',
                "#apartment_specialization option:selected");
            getSection(this,
                "/admin/article-section/geturlsection",
                "#article_articleSection option:selected");
            getSection(this,
                "/admin/specialization/getspecializationurl",
                "#edit_user_profile_specialization option:selected",
                true,
                false,
                ["prodazha-kvartir", "hero"]);
            getSection(this,
                "/admin/specialization/getspecializationurl",
                "#create_user_profile_specialization option:selected",
                true,
                false,
                ["prodazha-kvartir", "hero"]);
            if ($("#specialization_name").length > 0) {
                getSection(this,
                    "",
                    "",
                    true, function (){
                        return true;
                    });
            }
            if ($("#article_section_name").length > 0) {
                getSection(this,
                    "",
                    "",
                    true, function (){
                        return true;
                    });
            }

        });
        linkOriginal.on('blur', function (){
            canonicalLink.trigger('blur');

        });
        sectionForUrl.on('change', function () {
            if ($('#object_section_category').length > 0) {
                getSection(this,
                    "",
                    "", false, function () {
                        return $("#object_section_category option:selected").val();
                    });
            }
            getSection(this,
                '/admin/specialization/getspecializationurl',
                "#apartment_specialization option:selected",
                false);
            getSection(this,
                "/admin/article-section/geturlsection",
                "#article_articleSection option:selected",
                false);
            getSection(this,
                "/admin/specialization/getspecializationurl",
                "#edit_user_profile_specialization option:selected",
                true,
                false,
                ["prodazha-kvartir", "hero"]);
            getSection(this,
                "/admin/specialization/getspecializationurl",
                "#create_user_profile_specialization option:selected",
                true,
                false,
                ["prodazha-kvartir", "hero"]);

        });

        canonicalLink.on('focus', function () {
            $('#messageUrl').remove();
            $(this).removeClass('errorUrl');
        });

        function uploadImage($pos, completed, fileElem, preview, size)
        {

            var file = fileElem[0].files[0];
            var $posValue = $pos.children("option:selected").val();
            var width, height;
            var isCorrectImage = false;
            var img = new Image();
            if (preview[0].currentSrc !== '' && file === undefined) {
                img.src = preview[0].currentSrc;
            }else if (file !== undefined){
                img.src = window.URL.createObjectURL( file );
            }


            img.onload = function () {
                width = this.naturalWidth;
                height = this.naturalHeight;
                window.URL.revokeObjectURL( img.src );

                    if (size[$posValue][0] === width && size[$posValue][1] === height) {
                        isCorrectImage = true;
                    }

                completed(isCorrectImage, size);

            };
        }

        var isUploadNewFile = false;
        var oldImage = $('.upload-image-preview').length > 0 ? $('.upload-image-preview')[0].currentSrc : '';
        const sizeBanner = {
            'top': [1905, 385],
            'right': [305, 400],
            'bottom': [1580, 250],
        };

        const sizeImage = {
            'main' : [1905, 1052],
            'article': [1905, 385],
            'choice': [1905, 743]
        };

        $('#banner_position').on('change', function () {
            $('#banner_file').css('background-color', 'white');
            $('#banner_file').parent().parent().parent().find('label').css('color', '#07313a');
            $('.submit-form[name=banner]').find('.errorJsImage').remove();
            if (($('#banner_file')[0].files.length > 0 && $("#banner_fileType option:selected")[0].value === typeFiles['image']) || ($("#banner_file-preview")[0].currentSrc !== '' && !isNew && $("#banner_fileType option:selected")[0].value === typeFiles['image'])) {
                uploadImage($(this), function (isCorrectImage, $pos, size) {
                    if (isUploadNewFile) {
                        viewErrorForBannerSelect(isCorrectImage, sizeBanner);
                    } else {
                        viewErrorForFile(isCorrectImage);
                    }
                }, $('#banner_file'), $("#banner_file-preview"), sizeBanner);

            }
        });

        function viewErrorForFile(isCorrectImage){
            if (!isCorrectImage) {
                $('.btn-primary').attr('disabled', true);
                $('#banner_position').css('border', ' 1px solid #e74c3c');
                $('#banner_position').css('background-color', '#ffd1cc');
                $('#banner_position').parent().parent().find('label').css('color', '#e74c3c');
                $('.submit-form[name=banner]').find('.errorJs').remove();
                $('#banner_position').after('<p style="color: #e74c3c" class="errorJs">' +
                    'Выбранная позиция не соответствует загруженной картинке.');
            } else {
                $('.btn-primary').attr('disabled', false);
                $('#banner_position').css('background-color', 'white');
                $('#banner_position').css('border', ' 1px solid #e8e8e8');
                $('#banner_position').parent().parent().find('label').css('color', '#07313a');
                $('#banner_position').parent().parent().parent().find('label').css('color', '#07313a');
                $('.submit-form[name=banner]').find('.errorJs').remove();
                $('.submit-form[name=banner]').find('.errorJsImage').remove();
            }
        }

        $('#banner_file').on('change', function () {
            if ($(this)[0].files[0] !== undefined) {
                isUploadNewFile = true;
            } else {
                isUploadNewFile = false;
                $('.upload-image-preview').first().attr('src', oldImage);
                viewErrorForFile(true);
                viewErrorForBannerSelect(true);
            }
            $('#banner_position').css('background-color', 'white');
            $('#banner_position').css('border', ' 1px solid #e8e8e8');
            $('#banner_position').parent().parent().find('label').css('color', '#07313a');
            $('.submit-form[name=banner]').find('.errorJs').remove();
            if (($('#banner_file')[0].files.length > 0 &&
                $("#banner_fileType option:selected")[0].value === typeFiles['image']) ||
                ($("#banner_file-preview")[0].currentSrc !== '' && !isNew &&
                    $("#banner_fileType option:selected")[0].value === typeFiles['image']) ) {
                   uploadImage($('#banner_position'), function (isCorrectImage, size) {
                       if (isUploadNewFile) {
                           viewErrorForBannerSelect(isCorrectImage, sizeBanner);
                       } else {
                           viewErrorForFile(isCorrectImage);
                       }

                   }, $('#banner_file'), $("#banner_file-preview"), sizeBanner);
            }
        });

        function viewErrorForBannerSelect(isCorrectImage, size) {
            if (!isCorrectImage) {
                if ($('.submit-form[name=banner]').find('.errorJsImage').length === 0) {
                    $('.btn-primary').attr('disabled', true);
                    $('#banner_file').parent().parent().parent().find('label').css('color', '#e74c3c');
                    $('.submit-form[name=banner]').find('.errorJsImage').remove();
                    $('#banner_file').after('<p style="color: #e74c3c" class="errorJsImage">' +
                        'Изображение не соответсвует параметрам выбранной позиции, требуемые параметры: '
                        + size[$('#banner_position').children("option:selected").val()][0] + '*' + size[$('#banner_position').children("option:selected").val()][1] + " px");
                }
            }else{
                $('.btn-primary').attr('disabled', false);
                $('#banner_file').parent().parent().parent().find('label').css('color', '#07313a');
                $('.submit-form[name=banner]').find('.errorJs').remove();
                $('.submit-form[name=banner]').find('.errorJsImage').remove();
                $('#banner_position').css('background-color', 'white');
                $('#banner_position').css('border', ' 1px solid #e8e8e8');
                $('#banner_position').parent().parent().find('label').css('color', '#07313a');
            }
        }

    $('#banner_fileType').on('change', function () {
        if ($("#banner_fileType option:selected")[0].value === typeFiles['image']) {
            if ($('#banner_file')[0].files[0] == undefined) {
                $('#banner_position').trigger('change');
            }else{
                $('#banner_file').trigger('change');
            }

        }
        $('.btn-primary').attr('disabled', false);
        $('#banner_file').parent().parent().parent().find('label').css('color', '#07313a');
        $('.submit-form[name=banner]').find('.errorJs').remove();
        $('.submit-form[name=banner]').find('.errorJsImage').remove();
        $('#banner_position').css('background-color', 'white');
        $('#banner_position').css('border', ' 1px solid #e8e8e8');
        $('#banner_position').parent().parent().find('label').css('color', '#07313a');
    });

        $('#image_page_page').on('change', function () {
                $('#image_page_image').css('background-color', 'white');
                $('#image_page_image').parent().parent().parent().find('label').css('color', '#07313a');
                $('.submit-form[name=image_page]').find('.errorJsImage').remove();
                if ($('#image_page_image')[0].files.length > 0 || ($("#image_page_image-preview")[0].currentSrc !== '' && !isNew)) {
                    uploadImage($(this), function (isCorrectImage, size) {
                        if (isUploadNewFile) {
                            viewErorForButtonFileImage(isCorrectImage, sizeImage);
                        } else {
                            viewErorForImageSelect(isCorrectImage);
                        }
                    }, $('#image_page_image'), $("#image_page_image-preview"), sizeImage);

                }

        });

        $('#image_page_image').on('change', function () {
            if ($(this)[0].files[0] !== undefined) {
                isUploadNewFile = true;
            } else {
                isUploadNewFile = false;
                $('.upload-image-preview').first().attr('src', oldImage);
                viewErorForButtonFileImage(true);
                viewErorForImageSelect(true);
            }
            $('#image_page_page').css('background-color', 'white');
            $('#image_page_page').css('border', ' 1px solid #e8e8e8');
            $('#image_page_page').parent().parent().find('label').css('color', '#07313a');
            $('.submit-form[name=image_page]').find('.errorJs').remove();
            if ($('#image_page_image')[0].files.length > 0 ||
                ($("#image_page_image-preview")[0].currentSrc !== '' && !isNew) ) {
                uploadImage($('#image_page_page'), function (isCorrectImage, $pos, size) {
                    if (isUploadNewFile) {
                        viewErorForButtonFileImage(isCorrectImage, sizeImage);
                    } else {
                        viewErorForImageSelect(isCorrectImage);
                    }

                }, $('#image_page_image'), $("#image_page_image-preview"), sizeImage);
            }
        });

        function viewErorForImageSelect(isCorrectImage){
            if (!isCorrectImage) {
                $('.btn-primary').attr('disabled', true);
                $('#image_page_page').css('border', ' 1px solid #e74c3c');
                $('#image_page_page').css('background-color', '#ffd1cc');
                $('#image_page_page').parent().parent().find('label').css('color', '#e74c3c');
                $('.submit-form[name=image_page]').find('.errorJs').remove();
                $('#image_page_page').after('<p style="color: #e74c3c" class="errorJs">' +
                    'Выбранная позиция не соответствует загруженной картинке.');

            } else {
                $('.btn-primary').attr('disabled', false);
                $('#image_page_page').css('background-color', 'white');
                $('#image_page_page').css('border', ' 1px solid #e8e8e8');
                $('#image_page_page').parent().parent().find('label').css('color', '#07313a');
                $('#image_page_page').parent().parent().parent().find('label').css('color', '#07313a');
                $('.submit-form[name=image_page]').find('.errorJs').remove();
                $('.submit-form[name=image_page]').find('.errorJsImage').remove();
            }
        }

        function viewErorForButtonFileImage(isCorrectImage, size) {
            if (!isCorrectImage) {
                if ($('.submit-form[name=image_page]').find('.errorJsImage').length === 0) {
                    $('.btn-primary').attr('disabled', true);
                    $('#image_page_image').parent().parent().parent().find('label').css('color', '#e74c3c');
                    $('.submit-form[name=banner]').find('.errorJsImage').remove();
                    $('#image_page_image').after('<p style="color: #e74c3c" class="errorJsImage">' +
                        'Изображение не соответсвует параметрам выбранной позиции, требуемые параметры: '
                        + size[$('#image_page_page').children("option:selected").val()][0] + '*' + size[$('#image_page_page').children("option:selected").val()][1] + " px");
                }
            }else{
                $('.btn-primary').attr('disabled', false);
                $('#image_page_image').parent().parent().parent().find('label').css('color', '#07313a');
                $('.submit-form[name=image_page]').find('.errorJs').remove();
                $('.submit-form[name=image_page]').find('.errorJsImage').remove();
                $('#image_page_image').parent().parent().find('label').css('color', '#07313a');
            }
        }






        $('#object_section_additionalObjects').on('input', function (e) {
           var stringObjects = $('#object_section_additionalObjects').val(), regex = /[^0-9\s]+/;
           var regexObj = new RegExp(regex);
            while(regexObj.test(stringObjects)) {
                stringObjects = stringObjects.replace(regex, "");
            }
            $('#object_section_additionalObjects').val(stringObjects.replace(/[\s]+/g, " "));

        });

        $('.submit-form[name=object_section]').on('submit', function (e) {
            var additionalRow = $('#object_section_additionalObjects');
            if (additionalRow.val() !== "") {
               e.preventDefault();
                $.ajax({
                    url: "/admin/object_section/ajax/verify/objects",
                    method: "POST",
                    dataType: "html",
                    beforeSend: function (){
                        $(this).prop('disabled', true);
                    },
                    data:{'data': additionalRow.val()},
                    success:  function (data) {
                        var dataArr = JSON.parse(data);
                        if (dataArr['issetNoValidObjectsCode'] === 419 ||
                            dataArr['issetNoValidObjectsCode'] ===  420 ||
                            dataArr['issetNoValidObjectsCode'] === 422 ) {
                            $('#model-text').html(dataArr['text']);
                            $('#modal-object-section').modal('show');
                            $('#object_section_delete_submit').on('click', function () {
                                var objectsIdArr = dataArr['objects'].split(", "),
                                    valueInputArr = additionalRow.val().split(" "),
                                    resultValueInput = '';
                                valueInputArr.forEach(function  (element) {
                                    if (!objectsIdArr.includes(String(element))) {
                                        resultValueInput += element  + " ";
                                    }
                                });
                                additionalRow.val(resultValueInput);
                                document.querySelector('.submit-form[name=object_section]').submit();
                            });
                            $('#object_section_submit').on('click', function () {
                                document.querySelector('.submit-form[name=object_section]').submit();
                            });

                            $('#object_section_back').on('click', function () {
                                $('.btn-primary').prop('disabled', false);
                                $('#object_section_delete_submit').show();
                            });
                        }else{
                            document.querySelector('.submit-form[name=object_section]').submit();
                        }
                    }
                });
            } else {
                this.submit();
            }
        });

        $('.submit-form[name=article]').on('submit', function (e) {
            e.preventDefault();
            var allLinks = [], linksInTextarea = $(this).find('textarea'), regex = /(?<!url=")href="(https?:\/{2}(w{3}[.A-Za-z]+)?([.?a-zA-z]+)?)/, regObj = new RegExp(regex, 'g');
            var message = 'В одном из полей статьи были обнаружены ссылки на другие сайты: <br>',  elementTextareaval = '';
            linksInTextarea.each(function (item) {
                 elementTextareaval += linksInTextarea.eq(item).val();
            });
            elementTextareaval += $("#article_seoTitle").val();
            var bool = regObj.test(elementTextareaval);
            if (bool) {
                var maches = elementTextareaval.match(/(?<!url=")href="(https?:\/{2}(w{3}[.A-Za-z]+)?([.?a-zA-z]+)?)/g);
                allLinks = unique(maches);
            }

            if (allLinks.length > 0) {
                allLinks = allLinks.map(function (item) {
                    return item.replace('href="', '');
                });
                message +=  allLinks.join(", ").trim(", ");
                message += '<br> Уверены что обязательно надо дать ссылку на внешний сайт? <br> Для SEO лучше просто текстом оставить.';
                $('#modal-article').modal('show');
                $("#model-text").html(message);
                $("#article_submit").on('click', function () {
                    document.querySelector('.submit-form[name=article]').submit();
                });
                $("#article_back").on('click', function () {
                    $('#modal-article').modal('hide');
                    $(".btn-primary").attr('disabled', false);
                });
            } else {
                this.submit();
            }

            function unique(array) {
                var arrayWithoutDouble = [];
                for (var i = 0; i < array.length; i++){
                   var item = array[i];
                   if (arrayWithoutDouble.indexOf(item) === -1) {
                       arrayWithoutDouble.push(item);
                   }
                }
                return arrayWithoutDouble;
            }
        });

        //Reset data in rss.xml
        $("#resetRedirectButton").on('click', function () {
            $(".buttonConfirm").on('click', function () {

                if($(this).data('bool')) {
                    $.ajax({
                        url: '/rss/reset',
                        type:"html",
                        method: "POST",
                        beforeSend: function () {
                            $("#resetRedirectButton").prop('disabled', true);
                        },
                        success: function (data) {
                            $("#resetRedirectButton").prop('disabled', false);
                            if (data['state'] === 'ok') {
                                $('#modal-rss-reset').modal('hide');
                                $.bootstrapGrowl("Данные обновлены успешно!", { type: 'success', delay: 2000 });
                            }
                        }
                    });
                } else {
                    $('#modal-rss-reset').show();
                }

            });
            $('#modal-rss-reset').modal('show');
        });


        ///////// Upload file for index page (admin panel) /////////////
        function uploadFileToStatic(fileTagId, buttonTagId, urlToMethod) {
            var link = localStorage.getItem('linkLastUploadedFile');
            if (link) {
                $("#outForLinkFile").html("Последний загруженный вами файл:<br>" + link);
            }
            $(buttonTagId).on('click', function (event) {
                event.stopPropagation();
                event.preventDefault();
                var files = document.querySelector(fileTagId).files;
                if (files.length < 1) {
                    alert("Выберите файл!");
                    return false;
                }
                console.log(files);
                var data = new FormData();
                data.append('file', files[0]);

                $.ajax({
                    url: urlToMethod,
                    type: 'POST',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data['response']) {
                           var link = data['response'];
                           $("#outForLinkFile").text(link);
                           localStorage.setItem('linkLastUploadedFile', link);
                        } else {
                            $("#outForLinkFile").text("Во время загрузки файла произошла ошибка!");
                        }
                    },
                    error: function (jqXHR, status) {
                        console.log('ОШИБКА AJAX запроса: ' + status, jqXHR);
                    }

                });
            });
        }
        uploadFileToStatic("#uploadFileIndex", "#uploadFiles", "/admin/adminfile/loadfiletostatic");
});





//set styles on javascript
$(document).ready(
    function(){
        $('.canonicalLinkDefault').first().parent().parent().parent().css('margin-bottom', '5px');
});
