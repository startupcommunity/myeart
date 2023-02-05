<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChargingMethodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('charging_methods', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('stripe_bank_account_id', 255);
            $table->string('country', 10)->default('ES');
            $table->string('currency', 10)->default('EUR');
            $table->string('account_number', 50);
            $table->string('routing_number', 50)->nullable();
            $table->string('account_holder_name', 255)->nullable();
            $table->string('account_holder_type', 50)->default('individual');
            $table->tinyInteger('default')->default(1);

            // soft delete
            $table->softDeletes();
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
        Schema::dropIfExists('charging_methods');
    }
}
