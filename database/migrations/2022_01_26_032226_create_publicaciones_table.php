<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePublicacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Publicaciones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('fecha_publicacion')->nullable();
            $table->string('categoria')->nullable();
            $table->string('titulo')->nullable();
            $table->string('autor')->nullable();
            $table->text('texto')->nullable();
            $table->text('resumen')->nullable();
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
        Schema::dropIfExists('Publicaciones');
    }
}
