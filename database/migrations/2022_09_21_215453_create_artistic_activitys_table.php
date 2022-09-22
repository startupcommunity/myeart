<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtisticActivitysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artistic_activitys', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre',50);
            $table->string('icon',20);
            $table->longText('descripcion');
            $table->boolean('activo')->default(1);
            $table->timestamps();
        });
        
        Schema::create('artistic_activitys_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('artistic_activitys_id')->nullable();
            $table->foreign('artistic_activitys_id')->references('id')->on('artistic_activitys')->onDelete('cascade');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('artistic_activitys');
    }
}
