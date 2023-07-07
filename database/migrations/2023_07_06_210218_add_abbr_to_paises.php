<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddAbbrToPaises extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('paises', function (Blueprint $table) {
            // agregar campo primero
            $table->string('abbr', 3)->after('id')->nullable();
        });

        // Alemania, Austria, Bélgica, Bulgaria, Chipre, Croacia, Dinamarca, España,
        // Eslovaquia, Eslovenia, Estonia, Finlandia, Francia, Grecia, Hungría, Italia,
        // Irlanda, Letonia, Lituania, Luxemburgo, Malta, Países Bajo, Polonia, Portugal,
        // República Checa, Rumanía y Suecia.
        DB::table('paises')->where('nombre', 'Alemania')->update(['abbr' => 'de']);
        DB::table('paises')->where('nombre', 'Austria')->update(['abbr' => 'at']);
        DB::table('paises')->where('nombre', 'Bélgica')->update(['abbr' => 'be']);
        DB::table('paises')->where('nombre', 'Bulgaria')->update(['abbr' => 'bg']);
        DB::table('paises')->where('nombre', 'Chipre')->update(['abbr' => 'cy']);
        DB::table('paises')->where('nombre', 'Croacia')->update(['abbr' => 'hr']);
        DB::table('paises')->where('nombre', 'Dinamarca')->update(['abbr' => 'dk']);
        DB::table('paises')->where('nombre', 'España')->update(['abbr' => 'es']);
        DB::table('paises')->where('nombre', 'Eslovaquia')->update(['abbr' => 'sk']);
        DB::table('paises')->where('nombre', 'Eslovenia')->update(['abbr' => 'si']);
        DB::table('paises')->where('nombre', 'Estonia')->update(['abbr' => 'ee']);
        DB::table('paises')->where('nombre', 'Finlandia')->update(['abbr' => 'fi']);
        DB::table('paises')->where('nombre', 'Francia')->update(['abbr' => 'fr']);
        DB::table('paises')->where('nombre', 'Grecia')->update(['abbr' => 'gr']);
        DB::table('paises')->where('nombre', 'Hungría')->update(['abbr' => 'hu']);
        DB::table('paises')->where('nombre', 'Italia')->update(['abbr' => 'it']);
        DB::table('paises')->where('nombre', 'Irlanda')->update(['abbr' => 'ie']);
        DB::table('paises')->where('nombre', 'Letonia')->update(['abbr' => 'lv']);
        DB::table('paises')->where('nombre', 'Lituania')->update(['abbr' => 'lt']);
        DB::table('paises')->where('nombre', 'Luxemburgo')->update(['abbr' => 'lu']);
        DB::table('paises')->where('nombre', 'Malta')->update(['abbr' => 'mt']);
        DB::table('paises')->where('nombre', 'Países Bajo')->update(['abbr' => 'nl']);
        DB::table('paises')->where('nombre', 'Polonia')->update(['abbr' => 'pl']);
        DB::table('paises')->where('nombre', 'Portugal')->update(['abbr' => 'pt']);
        DB::table('paises')->where('nombre', 'República Checa')->update(['abbr' => 'cz']);
        DB::table('paises')->where('nombre', 'Rumanía')->update(['abbr' => 'ro']);
        DB::table('paises')->where('nombre', 'Suecia')->update(['abbr' => 'se']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('paises', function (Blueprint $table) {

            // eliminar campo
            $table->dropColumn('abbr');
        });
    }
}
