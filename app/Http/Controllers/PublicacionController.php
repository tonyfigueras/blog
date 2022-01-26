<?php

namespace App\Http\Controllers;

use App\Models\Publicacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Carbon;


class PublicacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function index(Request $request)
    {
        $search = $request->params;

        foreach($search as $searchs){
             $seh = $searchs;
        }
      

      $Publicacion = Publicacion::where(function($q) use ($seh) {
        $q->where('titulo', 'like', "%$seh%")
            ->orWhere('resumen', 'LIKE', "%$seh%")
            ->orWhere('categoria', 'LIKE', "%$seh%")
            ->orWhere('autor', 'LIKE', "%$seh%")
            ->orWhere('fecha_publicacion', 'LIKE', "%$seh%");

    })->orderBy('created_at', 'desc')->paginate(5);
         return response($Publicacion, 200);
    }

    

    public function add(Request $request)
    {
    
      $Publicacion = new Publicacion();
      $Publicacion->resumen = $request->resumen;
      $Publicacion->titulo = $request->titulo;
      $Publicacion->texto = $request->texto;
      $Publicacion->categoria = $request->categoria;
      $Publicacion->fecha_publicacion = $request->fecha_publicacion;
      $Publicacion->autor = $request->autor;
      $Publicacion->save();
      return response()->json(['status'=>'success','data'=>$Publicacion]);


    }

    
    public function delete($id){

        $Publicacion = Publicacion::where('id', $id)->delete();

       
        return response()->json(['status'=>'success','data'=>$Publicacion]);
     }
   
    public function edit(Request $request, $id)
    {
        $Publicacion = Publicacion::where('id',$id)->first();
        $Publicacion->resumen = $request->resumen;
        $Publicacion->titulo = $request->titulo;
        $Publicacion->texto = $request->texto;
        $Publicacion->categoria = $request->categoria;
        $Publicacion->fecha_publicacion = $request->fecha_publicacion;
        $Publicacion->autor = $request->autor;
        $Publicacion->save();


      return response()->json(['status'=>'success','data'=>$Publicacion]);
    }

    
}
