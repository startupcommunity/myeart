<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProfileRequest;
use App\Models\Artistic_activitys;
use App\Models\UserInformations;
use Illuminate\Http\Request;
// use Validator;
use App\Models\User;
use App\Utils\AppStorage;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserInformationsController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(CreateProfileRequest $request)
    {
        try {
            DB::beginTransaction();

            $user = $request->user();
            if ($request->artistic_list) {
                foreach ($request->artistic_list as $item) {
                    $user->userArtistic()->attach($item);
                }
            }

            UserInformations::create([
                'user_id' => $user->id,
                'perfil' => $request->perfil,
                'fecha_nacimiento' => $request->date,
                'sexo' => $request->sexo,
                'pais_id' => $request->pais,
                'asociacion_arte' => $request->asociacion_arte,
                'consejeria_ayuntamiento' => $request->consejeria_ayuntamiento,
                'galeria' => $request->galeria,
                'asociacion_turismo' => $request->asociacion_turismo,
            ]);

            $isFile = $request->hasFile('imagen');

            if ($isFile) {
                $croppedFile = request()->file('imagen');
                $name = 'front-photo-' . date('Ymdhis');

                // actualizar imagen del storage
                $filename = AppStorage::updateFile(
                    $croppedFile,
                    $user->profile_photo,
                    config('storage.public.profile_photo'),
                    $name,
                );

                $user->update(['profile_photo' => $filename]);
            }

            DB::commit();

            return response()->json(['status' => 200, 'message' => 'Proceso finalizado']);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json($e, 422);
        }
    }

    public function getAll(Request $request)
    {
        $user = $request->user();
        $users = User::select(
            "users.*",
            DB::raw('DATE_FORMAT(users.created_at, "%Y-%m-%d %H:%i") as created_up'),
            DB::raw('DATE_FORMAT(users.updated_at, "%Y-%m-%d %H:%i") as updated_up')
        )->where("id", "!=", $user->id)->get();
        return $users;
    }

    public function getUser($id)
    {
        $user = User::where('id', $id)->first();
        return $user;
    }

    public function addOrUpdateUser(Request $request)
    {
        if ($request->id) {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:80',
                'username' => 'required|string|max:50',
                'email' => 'required|email',
                'password' => 'nullable|min:6',
            ]);
        } else {
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
        if ($request->id) {
            $user = User::where('id', $request->id)->first();
        }
        $user->username = $request->username;
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->password) {
            $user->password = bcrypt($request->password);
        }
        $user->save();

        if ($request->id) {
            return response()->json([
                'message' => 'Se actualizo el usuario'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Se registro el usuario'
            ], 200);
        }
    }
    public function deleteUser($id)
    {
        $user = User::where('id', $id)->first();
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
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:5000'
        ];
    }

    /**
     * Devuelve los datos del usuario logueado
     */
    public function getAuthUser(Request $request)
    {
        $data =  $request->user()->load([
            'profile',
            'followingArtists',
            'socialNetwork',
            'favoriteReleases',
            'shoppingCart.artwork',
            'unreadNotifications',
            'notifications',
        ]);

        // agregar conversaciones
        $data['conversations'] = $data->conversations()->with(['messages.user'])->get();

        // dd($data['conversations']->toArray());
        return $data;
    }
}
