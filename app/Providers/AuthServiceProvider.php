<?php

namespace App\Providers;

use App\Models\Artwork;
use App\Policies\ArtworkPolicy;
use App\Policies\CollectivePolicy;
use App\Policies\OrderPolicy;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Artwork::class => ArtworkPolicy::class,
        Order::class => OrderPolicy::class,
        Collective::class => CollectivePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes(function ($router) {
            $router->forAccessTokens();
        });
    }
}
