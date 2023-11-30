<?php

namespace App\Http\Controllers;

use App\Models\Testimony;
use App\Models\Webconfig;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function __invoke()
    {
        $webconfig = new Webconfig();
        $webconfig = $webconfig->getAllData();
        $WebconfigData = Webconfig::all();

        return inertia('About/AboutPage', [
            'WebconfigData' => $WebconfigData,
            'cache' => $webconfig,
            // 'helper' => fn () => getMessage("Ivan"),
        ]);
    }
}