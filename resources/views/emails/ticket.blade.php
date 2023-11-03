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
                            <img src="data:image/png;base64,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" alt="QR Code"/>
                        <p>

                        </p>
                            <img src='{{ $qrCode }}' alt="QR Code"/>
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
