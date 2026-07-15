<?php
namespace App\Http\Responses;

use App\Models\User;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        return redirect()->to(
            auth()->user()->role === User::Admin
                ? '/admin/dashboard'
                : '/'
        );
    }
}
