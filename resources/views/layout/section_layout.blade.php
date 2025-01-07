<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{env('APP_NAME' , 'Laravel')}}</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
    <!-- Styles / Scripts -->
    @vite([
    'resources/css/font.css',
    'resources/css/quill.snow.css',
    'resources/css/swiper-bundle.min.css',
    'resources/css/app.css',
    'resources/js/section.js',
    'resources/js/navbar.js',
    ])

</head>
<body class="font-sans scroll-smooth bg-gray-100 relative">
<x-menu-component :showInfo="false"/>
@yield('content')
</body>
</html>
