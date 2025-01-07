import {gsap} from "gsap";
import $ from "jquery";

$(document).ready(function () {
    let isInfoOpen = false; // Initial state
    let navTl = gsap.timeline({paused: true});
    if ($('#info-body').length) {
        navTl.to('#info-body', {
            transformOrigin: 'bottom center', scaleY: 1, duration: 0.5, ease: 'power1.out', onStart: () => {
                gsap.to('.info-nav', {
                    opacity: 1
                })
                $('.info-nav').addClass('text-gray-100').removeClass('invert-text bottom-0')
                $('.menu-nav').addClass('hidden')
                $('.info-nav>button').text('close')
            }, onReverseComplete: () => {
                $('.info-nav').removeClass('text-gray-100').addClass('invert-text')
                $('.menu-nav').removeClass('hidden')
                $('.info-nav>button').text('info')
            }
        }).to('.info-nav', {bottom: null, top: 0, duration: 0.5}, '=')
            .from($('#info-body').find('.body-item'), {opacity: 0, y: 50, duration: 0.5, stagger: 0.1}, '<=0.3');

        $('.info-nav>button').click(() => {
            if (!isInfoOpen) {
                // Open
                navTl.play();
                isInfoOpen = true;
            } else {
                // Close
                navTl.reverse();
                isInfoOpen = false;
            }
        });
    }

    let showBerger = true;
    let menuTl = gsap.timeline({paused: true});

    menuTl
        .to('.menu-body', {
            transformOrigin: 'top center', scaleY: 1, duration: 0.5, ease: 'power1.out', onStart: () => {
                gsap.to('.menu-nav', {
                    opacity: 1
                })
                $('.menu-nav').addClass('text-black').removeClass('invert-text')
                $('.info-nav').addClass('hidden')
            }, onReverseComplete: () => {
                $('.menu-nav').removeClass('text-black').addClass('invert-text')
                $('.info-nav').removeClass('hidden')
            }
        })
        .from('.titles', {opacity: 0, y: -50, duration: 0.4, stagger: 0.1}, '<=0.3');

    $('.menu-btn').click(() => {
        // Select all SVGs inside .menu-btn
        let icons = $('.menu-btn').find('svg');
        // Toggle the visibility of the SVGs
        if (showBerger) {
            // Change the state
            $(icons[0]).removeClass('hidden');
            $(icons[1]).addClass('hidden');
            showBerger = false; // Change the state
            menuTl.play();
        } else {
            $(icons[0]).addClass('hidden');
            $(icons[1]).removeClass('hidden');
            showBerger = true; // Change the state
            menuTl.reverse();
        }
    });
})
