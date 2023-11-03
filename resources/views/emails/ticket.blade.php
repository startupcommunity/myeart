@extends('emails.layouts.main')

@section('content')
    <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
        <tr>
            <td valign="top" class="bg_white" style="padding: 1em 2.5em;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td class="logo" style="text-align: center;">
                            <h1>
                                <a href="{{ env('APP_URL') }}">
                                    <img src="{{ config('storage.img-production') }}" alt="{{ config('app.name') }}"
                                        width="160px">
                                </a>
                            </h1>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td valign="middle" class="hero hero-2 bg_white" style="padding: 4em 0;">
                <div style="padding: 2rem; text-align: center;">
                    <h1>
                        ¡Hola {{ $user->name }}!
                        <br>
                    </h1>
                    <h5>
                        <p>
                            Aqui esta tu ticket del evento.
                        </p>
                        <p>
                            asas {{ $qrCode }}
                        </p>
                            <img src="{{ rawurlencode($qrCode) }}" alt="QR Code"/>
                        <p>
                            
                        </p>
                    </h5>
                </div>
            </td>
        </tr>
        <tr>
            <td class="bg_white">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                        <td class="bg_white email-section">
                            <div class="heading-section" style="text-align: center; padding: 0 30px;">
                                <p>
                                    Si este correo es para ti y no lo solicitaste, por favor ignóralo.
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
@endsection
