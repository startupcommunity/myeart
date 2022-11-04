<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" value="{{ csrf_token() }}" />

    {{--  title  --}}
    <title>{{ config('app.name') }}</title>

    {{--  path secure rul  --}}
    <meta name="secure-url" content="{{ secure_url('/') }}" />

    {{--  paths  --}}
    <meta name="front-photo" content="{{ config('storage.front_photo') }}" />
    <meta name="profile-photo" content="{{ config('storage.profile_photo') }}" />
    <meta name="artwork-gallery" content="{{ config('storage.artwork_gallery') }}" />

    <!-- CDNs de Font-Awesome -->
    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />
    <script src="{{ mix('js/app.js') }}" type="text/javascript" defer></script>
</head>

<body>
    <div id="app">

    </div>
</body>

</html>
