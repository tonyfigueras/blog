<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // * Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // * Create permissions for view blogs
        Permission::create(['name' => 'view blogs']);
      

        // * create permissions for register blogs
        Permission::create(['name' => 'register blogs']);

        // * Roles
        
        // * - Admin
        Role::create(['name' => 'admin'])->givePermissionTo(
            [
               'register blogs'
                
            ]
        );

        // * - Users
        Role::create(['name' => 'users'])->givePermissionTo(
            [
                'view blogs'
            ]
        );
       

    }
}
