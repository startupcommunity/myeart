<?php

/**
 * Gestión de todo lo que tiene que ver con storage
 * - path públicos
 * - path privados
 * @luisandev
 */

return [

  // path para las fotos de portada - linkeados
  'front_photo' => env('APP_URL') . 'storage/img/profile/front/',

  // path para las fotos de perfil - linkeados
  'profile_photo' => env('APP_URL') . 'storage/img/profile/profile/',

  // path publico para la galeria de imagenes
  'artwork_gallery' => env('APP_URL') . 'storage/img/artwork/gallery/',

  // path publico para la imagen de la publicación
  'release_image' => env('APP_URL') . 'storage/img/release/images/',

  // path publico para la imagen del evento
  'event_image' => env('APP_URL') . 'storage/img/event/images/',

  // path privado para las fotos de portada del colectivo
  'collective_front_photo' => env('APP_URL') . 'storage/img/collective/front/',

  // path privado para las fotos de perfil del colectivo
  'collective_profile_photo' => env('APP_URL') . 'storage/img/collective/profile/',

  // archivos ubicados en el storage/public
  'public' => [

    // foto de portada del usuario
    'front_photo' => 'public/img/profile/front/',

    // foto de perfil del usuario
    'profile_photo' => 'public/img/profile/profile/',

    // galeria de imagenes de obras
    'artwork_gallery' => 'public/img/artwork/gallery/',

    // imagen de la publicación
    'release_image' => 'public/img/release/images/',

    // imagen del evento
    'event_image' => 'public/img/event/images/',

    // foto de portada del colectivo
    'collective_front_photo' => 'public/img/collective/front/',

    // foto de perfil del colectivo
    'collective_profile_photo' => 'public/img/collective/profile/',
  ]
];
