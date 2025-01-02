<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Image;
use App\Models\Link;
use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    protected function infoValidate(Request $request)
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'template' => 'required|in:info',
            'file' => $request->hasFile('file') ? 'required|file|mimes:jpeg,png,jpg,gif,webp|max:2048' : '',
            'alt' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
    }

    protected function contactValidate(Request $request)
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'template' => 'required|in:contact',
            'file' => $request->hasFile('file') ? 'required|file|mimes:jpeg,png,jpg,gif,webp|max:2048' : '',
            'alt' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
    }

    protected function saveImage($image, $section, $value): void
    {
        // Save image file to its directory
        $path = $this->saveFile($image, 'section');

        // Create a record in the `images` table
        $image = $section->images()->create([
            'url' => $path,
            'alt' => $value['alt'],
            'content' => $value['content'],
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $section = Section::query()->where('template', 'contact')->with('images')->first();
        return Inertia::render('Admin/Contact/index', ['section' => $section]);
    }


    public function infoIndex()
    {
        $links = Link::query()->where('template', 'info')->whereNot('name', 'code')->get();
        $section = Section::query()->where('template', 'info')->with('images')->first();
        return Inertia::render('Admin/Info/index', ['section' => $section, 'links' => $links]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function contactStore(Request $request)
    {

        $validated = $this->contactValidate($request);
        $section = Section::query()->where('template', 'contact')->with('images')->first();
        if ($section) {
            $section->update([
                'title' => $request->title,
                'template' => 'contact',
            ]);
            if ($request->hasFile('file')) {
                $image = $section->images()->first();
                if ($image) {
                    $this->deleteFile($image);
                    $section->images()->delete();
                }
                $this->saveImage($request->file('file'), $section, $validated);
            } else {
                $section->images()->first()->update([
                    'alt' => $validated['alt'],
                    'content' => $validated['content'],
                ]);
            }
        } else {
            $section = Section::create([
                'title' => $request->title,
                'template' => 'contact',
                'content' => $validated['content'],
            ]);
            $this->saveImage($request->file('file'), $section, $validated);
        }

        return to_route('contact.index');
    }

    public function infoUpdate(Request $request)
    {

        $validated = $this->infoValidate($request);
        $section = Section::query()->where('template', 'info')->with('images')->first();
        if ($section) {
            $section->update([
                'title' => $request->title,
                'template' => 'info',
            ]);
            if ($request->hasFile('file')) {
                $image = Image::query()->firstWhere('section_id', $section->id);
                if ($image) {
                    $this->deleteFile($image);
                    $image->delete();
                }

                $this->saveImage($validated['file'], $section, $validated);
            } else {
                $section->images()->first()->update([
                    'alt' => $validated['alt'],
                    'content' => $validated['content'],
                ]);
            }
        } else {
            $section = Section::create([
                'title' => $request->title,
                'template' => 'info',
            ]);
            $this->saveImage($request->file('file'), $section, $validated);
        }

        return to_route('info.index');
    }

    public function message()
    {
        return Inertia::render('Admin/Message/index', ['messages' => Contact::query()->paginate(25)]);
    }

    public function messageDestroy($id)
    {
        $item = Contact::query()->firstWhere('id', $id);
        if ($item) {
            $item->delete();
        }
        return to_route('message.index');
    }
}
