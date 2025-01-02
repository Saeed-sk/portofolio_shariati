<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Home;
use App\Models\Section;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index()
    {
        $images = Home::where('type', 'image')->where('status', 'active')->get();
        $video = Home::firstWhere('type', 'video');
        return view('main', ['images' => $images, 'video' => $video]);
    }

    public function contact()
    {
        $section = Section::query()->where('template', 'contact')->with('images')->first();
        return view('contact_us', ['section' => $section]);
    }

    public function section($id)
    {
        $section = Section::query()->where('id', $id)->with('images')->first();
        if ($section['template'] === 'single') {
            return view('sections.single', ['section' => $section]);
        } else {
            return view('sections.group', ['section' => $section]);
        }
    }

    public function contactCreate(Request $request)
    {
        $validate = $request->validate([
            'name' => 'string|required|max:255',
            'email' => 'string|required|max:255',
            'message' => 'string|required|max:255',
        ]);

        $old = Contact::query()->where('email', $validate['email'])->first();
        if ($old) {
            $old->update([
                'name' => $validate['name'],
                'message' => $validate['message'],
            ]);
        } else {
            Contact::query()->create([
                'name' => $validate['name'],
                'email' => $validate['email'],
                'message' => $validate['message'],
            ]);
        }
        session()->flash('success', 'Your message was sent successfully.');
        return redirect()->back();
    }

    public function commands()
    {
        return redirect()->back();
    }
}
