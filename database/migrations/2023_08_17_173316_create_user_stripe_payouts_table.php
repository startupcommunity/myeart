<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserStripePayoutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_stripe_payouts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('stripe_payout_id')->nullable();
            $table->string('status')->nullable();
            $table->string('type')->nullable();
            $table->string('currency')->nullable();
            $table->decimal('amount', 12, 2)->nullable();
            $table->unsignedBigInteger('arrival_date')->nullable();
            $table->string('destination')->nullable();
            $table->string('balance_transaction')->nullable();
            $table->unsignedBigInteger('created')->nullable();
            $table->boolean('automatic')->nullable();
            $table->string('statement_descriptor')->nullable();
            $table->string('description')->nullable();
            $table->string('failure_balance_transaction')->nullable();
            $table->string('failure_code')->nullable();
            $table->string('failure_message')->nullable();
            $table->string('method')->nullable();
            $table->string('original_payout')->nullable();
            $table->string('reconciliation_status')->nullable();
            $table->string('reversed_by')->nullable();
            $table->string('source_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_payouts');
    }
}
