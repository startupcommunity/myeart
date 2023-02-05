<?php

use App\Enums\PaymentMethodStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentMethodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('bank_id')->nullable();
            $table->string('card_type')->nullable();
            $table->string('card_number')->nullable();
            $table->string('card_expiration')->nullable();
            $table->string('card_cvv')->nullable();
            $table->string('account_number')->nullable();
            $table->string('fullname')->nullable();
            $table->string('bank_name')->nullable();
            $table->tinyInteger('status')->default(PaymentMethodStatusEnum::ACTIVE);
            $table->tinyInteger('default')->default(1)->comment('1: default, 0: not default');
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
        Schema::dropIfExists('payment_methods');
    }
}
