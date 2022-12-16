<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToUserEvents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_events', function (Blueprint $table) {
            $table->string('name', 255);
            $table->string('image', 255);
            $table->tinyInteger('mode');
            $table->date('init_date');
            $table->time('init_time');
            $table->string('location')->nullable();
            $table->string('phone_number')->nullable();
            $table->text('description', 2000)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_events', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->dropColumn('image');
            $table->dropColumn('mode');
            $table->dropColumn('init_date');
            $table->dropColumn('init_time');
            $table->dropColumn('location');
            $table->dropColumn('phone_number');
            $table->dropColumn('description');
        });
    }
}
