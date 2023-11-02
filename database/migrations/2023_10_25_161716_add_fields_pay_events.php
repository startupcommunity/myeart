<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsPayEvents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_events', function (Blueprint $table) {
            $table->integer('pay')->nullable();
            $table->decimal('price', 12, 2)->nullable();
            $table->integer('stock')->nullable();
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
            $table->dropColumn('pay');
            $table->dropColumn('price');
            $table->dropColumn('stock');
        });
    }
}
