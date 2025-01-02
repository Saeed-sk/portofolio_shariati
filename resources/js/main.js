import {Swiper} from "swiper";
import $ from 'jquery'
import {Pagination} from "swiper/modules";

$(document).ready(function () {
    if ($('.mySwiper').length) {
        let template = $('main').attr('data-template');
        if (template === 'group') {
            const slider = new Swiper('.mySwiper', {
                slidesPerView: 4,
                spaceBetween: 30,
                speed: 400,
                centeredSlides: true,
                breakpoints: {
                    320: {
                        slidesPerView: 1.5,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                initialSlide: 1,
                slideActiveClass: 'slider-active',
            });

        } else if (template === 'single') {
            Swiper.use([Pagination])
            const slider = new Swiper('.mySwiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                speed: 400,
                centeredSlides: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                slideActiveClass: 'slider-active',
            });
        }
    }
});
