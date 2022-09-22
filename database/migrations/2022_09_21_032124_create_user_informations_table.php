<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserInformationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_informations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('perfil')->nullable();
            $table->date('fecha_nacimiento')->nullable();
            $table->integer('sexo')->nullable();
            $table->string('asociacion_arte')->nullable();
            $table->string('consejeria_ayuntamiento')->nullable();
            $table->string('galeria')->nullable();
            $table->string('asociacion_turismo')->nullable();
            $table->string('adjunto')->nullable();
            $table->unsignedBigInteger('user_id');           
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('pais_id');           
            $table->foreign('pais_id')->references('id')->on('paises');
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
        Schema::dropIfExists('user_informations');
    }
}
