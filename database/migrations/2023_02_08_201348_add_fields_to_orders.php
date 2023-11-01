<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToOrders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->text('payment_intent_id', 2000)->nullable()->after('status');
            $table->text('payment_intent_client_secret_id', 2000)->nullable()->after('payment_intent_id');
            $table->text('transfer_group', 2000)->nullable()->after('payment_intent_client_secret_id');
            $table->text('source_transaction', 2000)->nullable()->after('transfer_group');
            $table->string('payment_method')->nullable()->after('source_transaction');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('payment_intent_id');
            $table->dropColumn('payment_intent_client_secret_id');
            $table->dropColumn('transfer_group');
            $table->dropColumn('source_transaction');
            $table->dropColumn('payment_method');
        });
    }
}
