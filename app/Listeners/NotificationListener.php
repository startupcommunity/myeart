<?php

namespace App\Listeners;

use App\Events\NotificationEvent;
use App\Notifications\Alert;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\User;

class NotificationListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(NotificationEvent $event)
    {

        $user = User::find($event->data['notifiable_id']);

        $user->notify(New Alert($event->data));
    }
}
