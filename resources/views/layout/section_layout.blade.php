<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{env('APP_NAME' , 'Laravel')}}</title>

    <!-- Styles / Scripts -->
    @vite([
    'resources/css/font.css',
    'resources/css/quill.snow.css',
    'resources/css/swiper-bundle.min.css',
    'resources/css/app.css',
    'resources/js/main.js',
    'resources/js/navbar.js',
     'resources/js/pdf.js',
    ])

</head>
<body class="font-sans scroll-smooth bg-gray-100 relative">
<x-menu-component :showInfo="false"/>
@yield('content')
</body>
</html>
