<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Utils\Payment\Stripe;
use Illuminate\Console\Command;

class UpdateAllPayoutConnectedAccount extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:payout-connected-account';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Actualiza los pagos a manuales de las cuentas conectadas a Stripe';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // stripe
        $stripe = new Stripe();
        // get all users
        $users = User::all();
        // progress bar
        $bar = $this->output->createProgressBar(count($users));
        // start
        $bar->start();

        // update all users
        foreach ($users as $user) {
            if ($user->stripe_account_id) {
                $stripe->updateConnectedAccount(
                    $user->stripe_account_id,
                    ['settings' => ['payouts' => ['schedule' => ['interval' => 'manual']]]]
                );
            }
        }

        // finish
        $bar->finish();
    }
}
