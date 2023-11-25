<?php

namespace App\Http\Controllers;

use App\Models\Testimony;
use App\Models\Webconfig;
use Illuminate\Http\Request;

class FacilityController extends Controller
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
        return inertia('Facility/FacilityPage', [
            'WebconfigData' => $WebconfigData,
            'cache' => $webconfig,
            'helper' => fn () => getMessage("Ivan"),
            'testimonies' => $TestimonyData,
        ]);
    }
}