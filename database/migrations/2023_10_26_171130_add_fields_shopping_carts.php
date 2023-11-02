<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsShoppingCarts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('shopping_carts', function (Blueprint $table) {
            $table->integer('event_id')->nullable();
            $table->integer('artwork_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('shopping_carts', function (Blueprint $table) {
            $table->dropColumn('event_id');
            $table->integer('artwork_id')->change();
        });
    }
}
