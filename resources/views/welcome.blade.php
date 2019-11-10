<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>

        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    </head>
    <body class="bg-light">
        <div id="app">
            <router-view></router-view>
        </div>

        <div class="footer mt-5">
            <p class="text-center text-muted">
                <span>&copy; {{ now()->format('Y') }}</span>
                <a href="/" class="text-decoration-none">whatthechmod.com</a>
            </p>
        </div>

        <script src="{{ asset('/js/app.js') }}"></script>
    </body>
</html>
