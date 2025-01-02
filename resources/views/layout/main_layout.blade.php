<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{env('APP_NAME' , 'Laravel')}}</title>

    <!-- Styles / Scripts -->
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite([
    'resources/css/locomotive-scroll.min.css',
    'resources/css/app.css',
    'resources/js/navbar.js',
    'resources/js/home.js',
    ])
    @else
        @vite([
  'resources/css/locomotive-scroll.min.css',
  'resources/css/app.css',
  'resources/js/navbar.js',
  'resources/js/home.js'
  ])
    @endif

</head>

<body class="font-sans scroll-smooth bg-gray-100 ">
<x-menu-component/>
@yield('content')
</body>
</html>
