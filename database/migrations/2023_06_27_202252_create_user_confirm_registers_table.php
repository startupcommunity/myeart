<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserConfirmRegistersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_confirm_registers', function (Blueprint $table) {
            $table->id();
            $table->string('token')->unique();
            $table->unsignedBigInteger('user_id')->unique();
            $table->boolean('is_confirm')->default(false);
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
        Schema::dropIfExists('user_confirm_registers');
    }
}
