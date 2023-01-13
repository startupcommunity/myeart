<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;
use Carbon\Carbon;

class Alert extends Notification
{
    use Queueable;

    public $data, $user;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data)
    {

        $this->data = $data;

        $this->user = User::find($data['user_id']);

    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'user_id' => $this->user->id,
            'user_profile_photo' => $this->user->profile_photo ? : '/img/avatar.png',
            'user_username' => $this->user->username? : $this->user->email,
            'type' => $this->data['type'],
            'message' => $this->data['message'],
            'url' => $this->data['url'],
            'created_at' => Carbon::now()
        ];
    }
}
