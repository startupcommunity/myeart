<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNumberTransactiontoUserToStripePayouts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_stripe_payouts', function (Blueprint $table) {
            $table->string('number_transaction')->after('stripe_payout_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_stripe_payouts', function (Blueprint $table) {
            $table->dropColumn('number_transaction');
        });
    }
}
