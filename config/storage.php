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

  // archivos ubicados en el storage/public
  'public' => [

    // foto de portada del usuario
    'front_photo' => 'public/img/profile/front/',

    // foto de perfil del usuario
    'profile_photo' => 'public/img/profile/profile/',
  ]
];
