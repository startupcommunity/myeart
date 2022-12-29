<?php

use App\Enums\StatusInvitationCollectiveEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollectiveInvitationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collective_invitations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('collective_id');
            $table->unsignedBigInteger('user_id');
            $table->tinyInteger('status')->default(StatusInvitationCollectiveEnum::PENDING);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('collective_invitations');
    }
}
