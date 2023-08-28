<?php

namespace App\Http\Controllers;

use App\Models\Testimony;
use App\Models\Webconfig;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke()
    {
        $webconfig = new Webconfig();
        $webconfig = $webconfig->getAllData();
        $WebconfigData = Webconfig::all();
        // testimony
        // $testimonies = new Testimony();
        // $testimonies = $testimonies->getAllData();
        $TestimonyData = Testimony::all();
        return inertia('Home/HomePage', [
            'WebconfigData' => $WebconfigData,
            'cache' => $webconfig,
            'helper' => fn () => getMessage("Ivan"),
            'testimonies' => $TestimonyData,
        ]);
    }
}