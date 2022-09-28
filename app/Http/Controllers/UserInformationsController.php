<?php

namespace App\Http\Controllers;
use App\Models\Artistic_activitys;
use App\Models\UserInformations;
use Illuminate\Http\Request;
use DB;
use Validator;
use App\Models\User;
class UserInformationsController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules());
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        try{
            DB::beginTransaction();

            $user = $request->user();
            if($request->artistic_list){
                foreach ($request->artistic_list as $item){ 
                    $user->userArtistic()->attach($item); 
                }
            }
            

            $UserInformations = new UserInformations();
            $UserInformations->user_id = $request->user()->id;
            $UserInformations->perfil = $request->perfil;
            $UserInformations->fecha_nacimiento = $request->date;
            $UserInformations->sexo = $request->sexo;
            $UserInformations->pais_id = $request->pais;
            $UserInformations->asociacion_arte = $request->asociacion_arte;
            $UserInformations->consejeria_ayuntamiento = $request->consejeria_ayuntamiento;
            $UserInformations->galeria = $request->galeria;
            $UserInformations->asociacion_turismo = $request->asociacion_turismo;

            if ($request->imagen) {
                $img_Ruta = public_path('/assets/img/users/'.$request->user()->id);
                $imagen = $request->file('imagen');
                $fecha = date("Ymd");
                $hora = date("H_i_s");

                if(!file_exists($img_Ruta)){
                    if(!mkdir($img_Ruta, 0777, true)) {
                        $error = false;
                        $errorMessage = '¡Lo sentimos no se pudo procesar la ruta de almacenamiento de la imagen!';
                    }
                }

                $image_name = $fecha . $hora . '.' . $imagen->guessClientExtension();
                $ruta_final = $img_Ruta. '/' .$image_name;

                $imagen->move($img_Ruta,$image_name);
                if (!file_exists($ruta_final))
                {
                    $error = false;
                    $errorMessage ="El proceso de carga de la imagen no se completó correctamente.";
                }
                $UserInformations->adjunto = '/assets/img/users/'.$request->user()->id.'/'.$image_name;

                $UserInformations->save();
            }else{
                $UserInformations->save();
            }
            DB::commit();

            return response()->json(['status' => 200,'message' => 'Proceso finalizado']);
        }catch(Exception $e){
            DB::rollBack();
            return response()->json($e,422);
        }
    }

    public function getAll(Request $request){
        $user = $request->user();
        $users = User::select("users.*", DB::raw('DATE_FORMAT(users.created_at, "%Y-%m-%d %H:%i") as created_up'), DB::raw('DATE_FORMAT(users.updated_at, "%Y-%m-%d %H:%i") as updated_up'))->
        where("id","!=",$user->id)->get();
        return $users;
    }

    public function getUser($id){
        $user = User::where('id',$id)->first();
        return $user;
    }

    public function addOrUpdateUser(Request $request){
        $validator;

        if($request->id){
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:80',
                'username' => 'required|string|max:50',
                'email' => 'required|email',
                'password' => 'nullable|min:6',
            ]);
        }else{
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:80',
                'username' => 'required|string|max:50|unique:users',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]);
        }

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = new User();
        if($request->id){
            $user = User::where('id',$request->id)->first();
        }
        $user->username = $request->username;
        $user->name = $request->name;
        $user->email = $request->email;
        if($request->password){$user->password = bcrypt( $request->password );}
        $user->save();

        if($request->id){
            return response()->json([
                'message' => 'Se actualizo el usuario'
            ], 200);
        }else{
            return response()->json([
                'message' => 'Se registro el usuario'
            ], 200);
        }
    }
    public function deleteUser($id){
        $user = User::where('id',$id)->first();
        $user->delete();
        return response()->json([
            'message' => 'Registro eliminado'
        ], 200);;
    }
    /**
     * Get validation rules.
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'perfil' => 'required|integer',
            'date' => 'nullable|date',
            'sexo' => 'nullable|integer',
            'asociacion_arte' => 'nullable|max:50',
            'galeria' => 'nullable|max:50',
            'asociacion_turismo' => 'nullable|max:50',
            'consejeria_ayuntamiento' => 'nullable|max:50',
            'pais' => 'nullable|integer',
            'artistic_list' => 'nullable',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:1999'
        ];
    }
}
