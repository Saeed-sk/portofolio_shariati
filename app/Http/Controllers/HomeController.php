<?php

namespace App\Http\Controllers;

use App\Models\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    protected function validate(Request $request)
    {

        if ($request->type == 'image') {
            return $request->validate([
                'id' => $request->method() === 'PUT' ? 'required|exists:homes,id' : 'nullable',
                'type' => 'required|in:image,video',
                'alt' => 'required|string',
                'file' => $request->hasFile('file') || $request['id'] === null ? 'required|file|mimes:jpg,jpeg,png,webp|max:10240' : 'nullable',
                'color' => ['required', 'regex:/^(linear-gradient|radial-gradient)\((.+)\)$/i'],
                'content' => 'required|string',
                'status' => 'required|in:active,inactive',
            ], [
                'color.regex' => 'فرمت وارد شده برای رنگ معتبر نیست. لطفاً از گرادینت (مانند linear-gradient یا radial-gradient) استفاده کنید.',
            ]);
        } else {
            return $request->validate([
                'alt' => 'required|string',
                'type' => 'required|in:image,video',
                'file' => 'required|file|mimes:mp4,mov,mkv,webm|max:1024000',
            ]);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = Home::where('type', 'image')->get();
        $video = Home::firstWhere('type', 'video');

        return Inertia::render('Admin/Home/index', ['images' => $images, 'video' => $video]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public
    function create(Request $request)
    {
        return Inertia::render('Admin/Home/create', ['type' => $request->type]);
    }

    /**
     * Store a newly created resource in storage.
     */

    public
    function store(Request $request)
    {

        $data = $this->validate($request);
        if ($data['type'] == 'video') {
            $prev = Home::firstWhere('type', 'video');
            if ($prev) {
                $this->deleteFile($prev);
                $prev->delete();
            }
            $path = $this->saveFile($data['file'], 'video');

            Home::query()->create([
                'type' => 'video',
                'url' => $path,
                'alt' => $data['alt'],
            ]);

        } else {
            $path = $this->saveFile($data['file'], 'image');
            Home::query()->create([
                'type' => 'image',
                'url' => $path,
                'alt' => $data['alt'],
                'color' => $data['color'],
                'content' => $data['content'],
                'status' => $data['status'],
            ]);
        }

        return to_route('home.index');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Home $home)
    {
        return Inertia::render('Admin/Home/update', ['home' => $home]);
    }


    /**
     * Update the specified resource in storage.
     */
    public
    function update(Request $request, Home $home)
    {
        $home = Home::firstWhere('id', $request['id']);
        $validate = $this->validate($request);
        $path = null;

        if ($request->hasFile('file')) {
            $this->deleteFile($home);
            $path = $this->saveFile($validate['file'], 'image');
        }

        $home->update([
            'type' => 'image',
            'url' => $path ?? $home->url,
            'alt' => $validate['alt'],
            'color' => $validate['color'],
            'content' => $validate['content'],
            'status' => $validate['status'],
        ]);

        return to_route('home.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public
    function destroy(Home $home)
    {
        if (empty($home->url)) {
            return to_route('home.index');
        }
        $this->deleteFile($home);
        $home->delete();
        return to_route('home.index');
    }
}
