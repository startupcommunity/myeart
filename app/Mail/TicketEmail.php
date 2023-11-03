<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;


use BaconQrCode\Writer;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\ImagickImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Encoder\Encoder;
use BaconQrCode\Common\ErrorCorrectionLevel;

class TicketEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(public User $user)
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        $renderer = new ImageRenderer(
            new RendererStyle(400),
            new ImagickImageBackEnd()
        );
        //$writer = new Writer($renderer);
        //$output = $writer->writeString('https://www.example.com');
        
        //$qrCodeBase64 = base64_encode($output);
        $renderer = new RendererStyle(400);
        $writer = new Writer(new Png(), $renderer);

        // Define el contenido del QR
        $content = 'https://www.example.com';

        // Define el path donde se guardará la imagen, en el disco público.
        $path = 'qrcodes/event-ticket.png';

        // Guarda la imagen en el sistema de archivos público
        Storage::disk('public')->put($path, $writer->writeString($content));

        // Obtiene la URL pública para acceder a la imagen.
        $qrCodeUrl = Storage::disk('public')->url($path);
        return $this->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
            ->subject('Ticket de evento - Myeart ' . env('APP_NAME'))
            ->view('emails.ticket')->with(['qrCode'=> $qrCodeUrl]);
    }
}
