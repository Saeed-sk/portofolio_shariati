import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [laravel({
        input: [
            'resources/css/app.css',
            'resources/css/font.css',
            'resources/css/swiper-bundle.min.css',
            'resources/css/quill.snow.css',
            'resources/css/locomotive-scroll.min.css',
            'resources/js/app.jsx',
            'resources/js/main.js',
            'resources/js/navbar.js',
            'resources/js/pdf.js',
            'resources/js/home.js'
        ],
        refresh: true,
    }), react(),],
});
