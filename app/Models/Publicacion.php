<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Publicacion extends Model
{
   
    protected $table = "publicaciones";
    protected $fillable = [
        'resumen','texto', 'autor', 'fecha_publicacion', 'categoria', 'titulo'
    ];
    
   
}
