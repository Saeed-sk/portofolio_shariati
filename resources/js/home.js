import LocomotiveScroll from 'locomotive-scroll';
import ScrollTrigger from "gsap/ScrollTrigger";
import {gsap} from "gsap";
import $ from "jquery";


$(document).ready(function () {
    let scrollerElement = document.querySelector("#main-container");

    const video = $('#my-video')[0];

    video.oncanplay = function () {
        gsap.from(scrollerElement, {
            opacity: 0, duration: 0.5,
            onStart: () => {
                video.play();
                $('.loading-wrapper').addClass('hidden');
                $('#main-container').removeClass('hidden')
            }
        });
        gsap.to('.info-nav', {opacity: 0, duration: 0.1});
        gsap.to('.menu-nav', {opacity: 0, duration: 0.1});
    };


    // Select the video element using vanilla JavaScript instead of jQuery
    gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin


    const locoScroll = new LocomotiveScroll({
        el: scrollerElement,
        smooth: true,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    locoScroll.on("scroll", ScrollTrigger.update); // Update ScrollTrigger on scroll

    let height = $(window).height();

    ScrollTrigger.scrollerProxy("#main-container", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // We don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        }, // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: scrollerElement.style.transform ? "transform" : "fixed"
    });


    gsap.to(".main-wrapper", {
        scrollTrigger: {
            trigger: "#main-container", scroller: "#main-container", scrub: true, start: "top top", end: "+=" + height
        }, ease: "none", y: height,
        onComplete: () => {
            gsap.to('.info-nav', {opacity: 1, duration: 0.5});
            gsap.to('.menu-nav', {opacity: 1, duration: 0.5});
        },
        onReverseComplete: () => {
            gsap.to('.info-nav', {opacity: 0, duration: 0.5});
            gsap.to('.menu-nav', {opacity: 0, duration: 0.5});
        }
    });

    gsap.to('.video-wrapper', {
        scrollTrigger: {
            trigger: "#main-container", scroller: "#main-container", scrub: true, start: "top top", end: "+=" + height
        }, ease: "none", y: -height, zIndex: 200
    })

    locoScroll.on('scroll', (args) => {
        let scrollPercentage = (args.scroll.y / args.limit.y) * 100;
        $('.scroll-percent').text(`${scrollPercentage.toFixed(0)}%`)
    })

    let background = $('#background');
    gsap.utils.toArray('.image-container').forEach((container, index) => {
        if (index === 0) {
            let color = $(container).find('img').attr('data-color');
            gsap.to(background, {background: color});
        }
        // Set up ScrollTrigger for each image-container
        gsap.to(container, {
            scrollTrigger: {
                scroller: "#main-container", trigger: container, scrub: true, start: "bottom 75%", // Enter the container 100px before it reaches the bottom of the viewport
                end: "bottom top-=400",  // Leave the container 100px before it reaches the top of the viewport
                onEnter: () => {
                    $(container).find('figure').addClass('active-animation');
                    let color = $(container).find('img').attr('data-color');
                    gsap.to(background, {background: color});
                    let text = $(container).find('h2');
                    gsap.to(text, {opacity: 1, delay: 1});
                }, onLeave: () => {
                    // gsap.to(container, {opacity: 0, duration: 2});
                }, onEnterBack: () => {
                    // gsap.to(container, {opacity: 1, duration: 2});
                    let color = $(container).find('img').attr('data-color');
                    gsap.to(background, {background: color});
                }, onLeaveBack: () => {
                    // gsap.to(container, {opacity: 0, duration: 2.5});
                }
            }
        });
    });

// 4. Update ScrollTrigger after page load
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh(); // Recalculate trigger points
})
