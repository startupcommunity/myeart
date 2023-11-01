<?php

use App\Enums\ItemStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToOrderItems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->bigInteger('number')->after('id');
            $table->unsignedBigInteger('user_id')->after('artwork_id')->nullable();
            $table->string('photo')->after('price')->nullable();
            $table->tinyInteger('status')->after('photo')->default(ItemStatusEnum::PENDING);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropColumn('photo');
            $table->dropColumn('status');
        });
    }
}
