<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLargeToArtworks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('artworks', function (Blueprint $table) {

            // remove
            $table->dropColumn('dimension');

            // add
            $table->double('width', 5, 2)->nullable()->after('price');
            $table->double('large', 5, 2)->nullable()->after('width');
            $table->double('weight', 5, 2)->nullable()->after('large');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('artworks', function (Blueprint $table) {
            // add
            $table->string('dimension', 200);

            // remove
            $table->dropColumn('width');
            $table->dropColumn('large');
            $table->dropColumn('weight');
        });
    }
}
