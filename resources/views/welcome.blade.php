<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A Unix permissions calculator for that once-a-year occasion when you need to modify file access.">

    <meta property="og:url" content="{{ config('app.url') }}">
    <meta property="og:type" content="website">
    <meta property="og:description" content="A Unix permissions calculator for that once-a-year occasion when you need to modify file access.">
    <meta property="og:title" content="{{ config('app.name') }}">
    <meta property="og:site_name" content="{{ config('app.name') }}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ config('app.name') }}">
    <meta name="twitter:description" content="A Unix permissions calculator for that once-a-year occasion when you need to modify file access.">

    <title>{{ config('app.name') }}</title>

    <link rel="canonical" href="{{ config('app.url') }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body class="bg-light d-flex min-vh-100">
<div class="d-flex mx-auto col-lg-6 col-md-8 col-sm-12">
    <div class="w-100 mb-auto">
        <p class="mt-5 text-uppercase text-center text-muted font-weight-bold small mb-1">A Unix permissions calculator</p>
        <h1 class="font-serif font-weight-bold text-center">What. The. Chmod.</h1>
        <div id="app">
            <router-view></router-view>
        </div>
    </div>
</div>


<div class="footer fixed-bottom d-none d-lg-block">
    <p class="text-center text-lg-right text-muted pr-4 small">
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
