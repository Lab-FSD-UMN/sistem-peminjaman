<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Webconfig;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WebconfigController extends Controller
{


    // Admin function
    public function __invoke(Request $request)
    {
        $webconfigs = Webconfig::all();
        return Inertia('Admin/Webconfig/WebconfigPage', compact('webconfigs'));
    }

    public function UpdateWebconfig(Request $request, Webconfig $webconfig)
    {
        Cache::forget('webconfig');
        $Curr_webconfig = $webconfig->where('title', $request->title)->first();
        if ($request->hasFile('value')) {
            $image = $request->file('value');
            $image_name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . time() . '.' . $image->getClientOriginalExtension();
            Storage::putFileAs(
                'public',
                $request->file('value'),
                $image_name
            );
            $Curr_webconfig->value = $image_name;
        } else {
            $Curr_webconfig->value = $request->value;
        }
        $Curr_webconfig->save();
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
