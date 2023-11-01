<?php

use App\Enums\UserReleaseStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToReleases extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_releases', function (Blueprint $table) {
            $table->text('text', 2000)->after('user_id');
            $table->string('location', 255)->after('text')->nullable();
            $table->string('image', 255)->after('location');
            $table->tinyInteger('status')->default(UserReleaseStatus::PUBLISHED)->after('image');
            $table->softDeletes();
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
            $table->dropColumn('text');
            $table->dropColumn('location');
            $table->dropColumn('image');
            $table->dropColumn('status');
            $table->dropColumn('deleted_at');
        });
    }
}
