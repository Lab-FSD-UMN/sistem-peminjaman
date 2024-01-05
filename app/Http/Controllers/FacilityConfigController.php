<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Facility;
use App\Models\Webconfig;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FacilityConfigController extends Controller
{


    // Admin function
    public function __invoke(Request $request)
    {
        $facilities = Facility::all();
        return Inertia('Admin/Facility/FacilityConfigPage', compact('facilities'));
    }

    public function UpdateFacilityconfig(Request $request, Facility $facility)
    {
        Cache::forget('facility');
        $Curr_facility = $facility->where('kode', $request->kode)->first();
        if ($request->hasFile('value')) {
            $image = $request->file('value');
            $image_name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . time() . '.' . $image->getClientOriginalExtension();
            Storage::putFileAs(
                'public',
                $request->file('value'),
                $image_name
            );
            $Curr_facility->value = $image_name;
        } else {
            $Curr_facility->value = $request->value;
        }
        $Curr_facility->save();
        return redirect()->back();
    }


    private function uploadImage($image)
    {
        if ($image) {
            $image_name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . time() . '.' . $image->getClientOriginalExtension();
            Storage::putFileAs(
                'public',
                $image,
                $image_name
            );

            return $image_name;
        }

        return null;
    }
}
