<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProvinceAndLocationtoArtworks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('artworks', function (Blueprint $table) {
            $table->string('target', 255)->after('date_created')->nullable();
            $table->string('province', 255)->after('target')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // drop columns
        Schema::table('artworks', function (Blueprint $table) {
            $table->dropColumn('target');
            $table->dropColumn('province');
        });
    }
}
