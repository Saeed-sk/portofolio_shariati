import { Swiper } from "swiper";
import $ from 'jquery';
import { Navigation, Pagination } from "swiper/modules";

$(document).ready(function () {
    // Swiper Initialization
    if ($('.mySwiper').length) {
        let template = $('main').attr('data-template');

        // Check for 'group' template
        if (template === 'group') {
            Swiper.use([Navigation]);
            new Swiper('.mySwiper', {
                slidesPerView: 4,
                spaceBetween: 30,
                speed: 400,
                centeredSlides: true,
                breakpoints: {
                    0: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 10 },
                    1024: { slidesPerView: 5, spaceBetween: 15 },
                },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                initialSlide: 1,
                slideActiveClass: 'slider-active',
            });

            // Check for 'single' template
        } else if (template === 'single') {
            Swiper.use([Pagination, Navigation]);
            new Swiper('.mySwiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                speed: 400,
                centeredSlides: true,
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                slideActiveClass: 'slider-active',
            });
        }
    }

    // PDF Handling for PDF slider
    if ($('.pdf-template').length) {
        const url = $('#pdf-container').data('pdf-url');
        const pdfjsLib = window['pdfjs-dist/build/pdf'];

        if (url) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
            let scale = 0.5;  // Initial scale
            let pdfDoc = null;
            let numPages = 0;

            // Load and render the PDF
            pdfjsLib.getDocument(url).promise.then(pdf => {
                pdfDoc = pdf;
                numPages = pdf.numPages;
                renderPages();
            }).then(() => {
                $('#pdf-container').removeClass('opacity-0');
            });

            // Function to render all pages
            function renderPages() {
                $('#pdf-container').empty(); // Clear previous pages

                // Loop to render all pages
                for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                    pdfDoc.getPage(pageNum).then(page => {
                        const viewport = page.getViewport({ scale: scale });
                        const canvas = $('<canvas></canvas>')[0];
                        const context = canvas.getContext('2d');

                        // Set the canvas size based on the scale
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;

                        // Append the canvas to the container
                        $('#pdf-container').append(canvas);

                        page.render({
                            canvasContext: context,
                            viewport: viewport,
                            annotationMode: 1, // Non-interactive mode
                        }).promise.then(() => {
                            // Remove background or change color (if needed)
                            context.globalCompositeOperation = 'destination-over';
                            context.fillStyle = '#ffffff'; // White background
                            context.fillRect(0, 0, canvas.width, canvas.height);
                        });
                    });
                }
            }

            // Zoom buttons
            $('#zoom-in')?.on('click', function() {
                scale += 0.2;  // Increase scale
                renderPages();
            });

            $('#zoom-out')?.on('click', function() {
                scale = Math.max(0.5, scale - 0.2);  // Decrease scale and prevent it from going below 0.5
                renderPages();
            });
        }
    }
});
