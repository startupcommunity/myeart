<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToCollectives extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('collectives', function (Blueprint $table) {
            $table->tinyInteger('type')->after('name');
            $table->string('location')->after('type');
            $table->dropColumn('category');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('collectives', function (Blueprint $table) {
            $table->dropColumn('type');
            $table->dropColumn('location');
            $table->string('category')->after('name');
        });
    }
}
