<?php

use App\Enums\ReleaseTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTypeToUserReleases extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_releases', function (Blueprint $table) {
            $table->tinyInteger('type')
                ->default(ReleaseTypeEnum::ARTIST)
                ->after('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_releases', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
}
