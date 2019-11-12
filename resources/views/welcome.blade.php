<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- todo: add meta tags --}}

    <title>{{ config('app.name') }}</title>

    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body class="bg-light vh-100 d-flex">
<div class="d-flex mx-auto col-md-6">
    <div class="w-100 mb-auto">
        <p class="mt-5 text-uppercase text-center text-muted font-weight-bold small mb-1">A Unix permissions calculator</p>
        <h1 class="font-serif font-weight-bold text-center mb-5">What. The. Chmod.</h1>
        <div id="app">
            <router-view></router-view>
        </div>
    </div>
</div>


<div class="footer position-absolute fixed-bottom">
    <p class="text-right text-muted pr-4 small">
        <span>&copy; {{ now()->format('Y') }}</span>
        <a href="/" class="text-decoration-none" rel="noopener">whatthechmod.com</a>
    </p>
</div>

<script src="{{ asset('/js/app.js') }}"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-80244014-4"></script>
<script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());

    gtag('config', 'UA-80244014-4');
</script>

</body>
</html>
