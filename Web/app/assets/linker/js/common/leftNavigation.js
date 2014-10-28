
$ (function() {

    var
        bindEvent = function ( element, type, handler ) {
            if ( element.addEventListener ) {
                element.addEventListener( type, handler, false );
            } else {
                element.attachEvent( "on" + type, handler );
            }
        },
        preventDefault = function ( e ) { e.preventDefault(); },
        nav = $( "#left_navigation" ),
        returnNavOpened = function () {
            return nav.width() === 230;
        },
        hasSpanWithSubClass = function ( parent ) {
            return parent.find( "span.sub" ).length > 0;
        },
        dataSwipe = {
            event: null,
            time: 0,
            timer: null,
            timePointerDown: 0,
            timePointerUp: 0,
            scrollStartPos: 0
        },
        vibrationOnMobile = function ( time ) {
            return navigator.vibrate( time );
        };

    // Load touch positions on touch event
    $( document ).on( {
        touchmove: function( e ) {
            dataSwipe.event = e.targetTouches ? e.targetTouches[0] : e;
            dataSwipe.event = dataSwipe.event ? dataSwipe.event : e.originalEvent.touches[ 0 ];
        },
        mousemove: function ( e ) {
            dataSwipe.event = e;
        }
    });

    // Scroll menu
    $( "#left_navigation" ).on( {
        // Start
        touchstart: function ( e ) {
            swipeMenu ( e.type, Date.now() );
        },
        mousedown: function ( e ) {
            swipeMenu ( e.type, Date.now() );
        },
        // End
        touchend: function ( e ) {
            swipeMenu ( e.type, Date.now() );
        },
        mouseup: function ( e ) {
            swipeMenu ( e.type, Date.now() );
        },
        // Move
        touchmove: function ( e ) {
            swipeMenu ( e.type, Date.now() );
        }
    } );

    /* a with sub */
    $( "#left_navigation > ul li ul + a" ).on( "tap click", function ( e ) {
        var ulSibling = $( this ).siblings( "ul" );
        ulSibling.addClass( "active" );

        /* Wait ul animation */
        setTimeout( function () {
            if ( !returnNavOpened() ) {
                if ( hasSpanWithSubClass( ulSibling ) ) {
                    $( nav ).removeClass( "responsive" );
                } else {
                    $( nav ).addClass( "responsive" );
                }
            }
        }, 400 );

        e.preventDefault();
    } );

    /* a.sup */
    $( "#left_navigation ul li a.sup" ).on( "tap click", function ( e ) {
        var
            ulClosest = $( this ).closest( "ul" ),
            ulParent = ulClosest.parent().parent();
        ulClosest.removeClass( "active" );

        if ( !returnNavOpened() ) {
            if ( hasSpanWithSubClass( ulParent ) ) {
                $( nav ).removeClass( "responsive" );
            } else {
                $( nav ).addClass( "responsive" );
            }
        }

        e.preventDefault();
    } );

    /* a.part */
    $( "#left_navigation a.part" ).on( "tap click", function ( e ) {
        e.preventDefault();

        var href = $( this ).attr( "href" );

        $( "nav a.active, #sections section.active" ).removeClass( "active" );
        $( this ).addClass( "active" );

        window.location = href;
    } );

    // Home button
    $( "#return_home" ).on( "tap click", function ( e ) {
        var
            ulActive = $( "#left_navigation ul ul.active" ),
            ulActiveCount = ulActive.length;

        if ( ulActiveCount > 0 ) {
            for ( var i = 0; i < ulActiveCount; i++ ) {
                $( ulActive[ i ] ).removeClass( "active" );
            }
        }

        $( nav ).removeClass( "responsive" );

        // Vibration on mobile
        vibrationOnMobile( 100 );

        e.preventDefault();
    } );

    /* section */
    $( "#main" ).on( {
        swipeleft: function ( e, data ) {
            swipeSection( e, data, "left", $( this ) );
        },
        swiperight: function ( e, data ) {
            swipeSection( e, data, "right", $( this ) );
        }
    } );


    /*********************** FUNCTIONS ***********************/


    function swipeSection ( e, data, direction, element ) {
        var
            oldDistance, distance,
            classResponsive = nav.hasClass( "responsive" ),
            lastUlActive = nav.find( "ul.active" ),
            lastUlActiveCount = lastUlActive.length,
            elements = "#left_navigation, body > #left_navigation ul li ul, body > #left_navigation ul li a span, body > #left_navigation ul li a span.sub, #main";

        if ( direction === "left" ) {
            if ( element.css( "left" ) === "auto" || !element.css( "left" ) ) {
                oldDistance = 0;
            } else {
                oldDistance = parseInt( element.css( "left" ) );
            }

            if ( oldDistance > 0 ) {
                distance = oldDistance - data.distance.x;
            } else {
                oldDistance = Math.abs( oldDistance );
                distance = - ( oldDistance + data.distance.x );
            }
        } else if ( direction === "right" ) {
            if ( element.css( "left" ) === "auto" || !element.css( "left" ) ) {
                oldDistance = 0;
            } else {
                oldDistance = parseInt( element.css( "left" ) );
            }

            distance = oldDistance + data.distance.x;
        }

        if ( direction === "left" && returnNavOpened() || direction === "right" && !returnNavOpened() ) {
            if ( distance <= -10 || distance >= 10 ) {
                if ( classResponsive && !hasSpanWithSubClass( lastUlActive.eq( lastUlActiveCount - 1 ) ) || !hasSpanWithSubClass( lastUlActive.eq( lastUlActiveCount - 1 ) ) ) {
                    $( elements ).toggleClass( "resize" );

                    direction === "left" ? $( nav ).addClass( "responsive" ) : $( nav ).removeClass( "responsive" );
                } else if ( classResponsive ) {
                    $( elements ).toggleClass( "resize" );
                    $( nav ).removeClass( "responsive" );
                } else {
                    $( elements ).toggleClass( "resize" );
                }
            }
        }
    }

    function swipeMenu ( eType, dateTime ) {
        var
            elements = $( "#left_navigation ul.active" ),
            count = elements.length,
            lastChild = elements.eq( count - 1 );

        if ( eType === "mousedown" || eType === "touchstart" ) {
            dataSwipe.timePointerDown = dateTime;

            clearTimeout( dataSwipe.timer );
            dataSwipe.timer = setTimeout( function () {
                if ( dataSwipe.timePointerUp === 0 ) {
                    dataSwipe.time += 50;

                    if ( dataSwipe.time > 300 ) {
                        dataSwipe.scrollStartPos = $( lastChild ).scrollTop();

                        $( "body > #left_navigation a" ).addClass( "pointer-events" );
                    }

                    swipeMenu ( eType, Date.now() );
                }
            }, 50 );
        } else if ( eType === "mouseup" || eType === "touchend" ) {
            dataSwipe.timePointerUp = dateTime;

            // Reset
            setTimeout( function () {
                dataSwipe.time = 0;
                dataSwipe.timer = null;
                dataSwipe.timePointerDown = 0;
                dataSwipe.timePointerUp = 0;
            }, 50 );

            $( "body > #left_navigation a" ).removeClass( "pointer-events" );
        } else if ( eType === "touchmove" ) {
            var pageY = dataSwipe.event ? ( dataSwipe.event.originalEvent.touches ? dataSwipe.event.originalEvent.touches[ 0 ].pageY : dataSwipe.event.pageY ) : 0;

            $( "html, body, body > #left_navigation, body > #left_navigation ul.active" ).animate( {
                scrollTop: dataSwipe.scrollStartPos - pageY + 100
            }, 0 );
        }
    }

    /*********************** RESIZE EVENT ***********************/


    $( window ).resize( function () {
        var
            lastUlActive = nav.find( "ul.active" ),
            lastUlActiveCount = lastUlActive.length;

        if ( lastUlActiveCount > 1 ) {
            if ( !hasSpanWithSubClass( $( lastUlActive[ lastUlActiveCount - 1 ] ) ) && returnNavOpened() ) {
                $( nav ).addClass( "responsive" );
            } else {
                $( nav ).removeClass( "responsive" );
            }
        }
    } );


    /*********************** ON LOAD ***********************/

    // Deactivate scroll
    bindEvent ( document.body, "touchmove", preventDefault );

} );