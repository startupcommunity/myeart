<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserSocialNetworksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_social_networks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('facebook', 200)->nullable();
            $table->string('instagram', 200)->nullable();
            $table->string('twitter', 200)->nullable();
            $table->string('linkedin', 200)->nullable();
            $table->string('behance', 200)->nullable();
            $table->string('pinterest', 200)->nullable();
            $table->string('youtube', 200)->nullable();
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
        Schema::dropIfExists('user_social_networks');
    }
}
