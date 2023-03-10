<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTotalToArtworks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('artworks', function (Blueprint $table) {
            $table->decimal('tax', 12, 2)->after('price')->nullable();
            $table->decimal('total', 12, 2)->after('tax')->nullable();

            // delete in_pause
            $table->dropColumn('in_pause');
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
            $table->dropColumn('tax');
            $table->dropColumn('total');

            // add in_pause
            $table->boolean('in_pause')->after('type')->default(0);
        });
    }
}
