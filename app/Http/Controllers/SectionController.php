<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SectionController extends Controller
{
    protected function validate(Request $request)
    {
        return $request->validate([
            'id' => $request->method() === 'PUT' ? 'required|exists:sections,id' : 'nullable',
            'title' => ['required', 'string', 'max:255', $request->method() === 'POST' ? 'unique:sections' : Rule::unique('sections')->ignore($request->id)],
            'template' => 'required|in:single,multiple,pdfTemplate',
            'images' => 'required|array',
            'images.*.content' => $request->template === 'pdfTemplate' ? 'nullable' : 'required|string',
            'images.*.alt' => 'required|string',
            'images.*.file' => 'required|file|mimes:jpeg,png,jpg,gif,avif,webp|max:5120',
            'images.*.background' => 'required|file|mimes:jpeg,png,jpg,gif,avif,webp|max:5120',
            'images.*.pdf' => 'required|file|mimes:pdf|max:5120',
        ]);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sections = Section::query()->where('template', 'single')->orWhere('template', 'multiple')->orWhere('template', 'pdfTemplate')->with('images.pdfs')->latest()->paginate(20);
        return Inertia::render('Admin/Sections/index', ['sections' => $sections]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Sections/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = $this->validate($request);

        // Begin transaction
        DB::beginTransaction();

        // Track uploaded files for rollback
        $uploadedFiles = [];

        try {
            // Save the section data
            $section = Section::create([
                'title' => $request->title,
                'template' => $request->template,
            ]);

            // Save images and their associated PDFs
            foreach ($request->images as $imageData) {
                // Save image file to its directory
                $imagePath = $this->saveFile($imageData['file'], 'image');
                // Create a record in the `images` table
                $image = $section->images()->create([
                    'url' => $imagePath,
                    'alt' => $imageData['alt'],
                    'content' => $imageData['content'],
                ]);

                // Save PDF file to its directory

                $pdfPath = $this->saveFile($imageData['pdf'], 'pdf');
                $backgroundPath =  $this->saveFile($imageData['background'], 'background');
                // Create a record in the `pdfs` table
                $image->pdfs()->create([
                    'url' => $pdfPath,
                    'image_url' => $backgroundPath
                ]);
            }

            // Commit the transaction
            DB::commit();

            // Return success response
            return to_route('sections.index');

        } catch (\Exception $e) {
            // Roll back all changes in the database
            DB::rollBack();

            // Return error response
            return response()->json([
                'error' => 'An error occurred while creating the section.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Section $section)
    {
        $section = $section->load('images.pdfs');

        return Inertia::render('Admin/Sections/Images/index', ['section' => $section]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Section $section)
    {
        $validate = $request->validate([
            'title' => ['required', 'string', 'max:255', Rule::unique('sections')->ignore($section->id)],
            'template' => 'required|in:single,multiple,pdfTemplate',
        ]);

        $section->update([
            'title' => $validate['title'],
            'template' => $validate['template'],
        ]);

        return to_route('sections.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        foreach ($section->images as $image) {
            $pdf = $image->pdfs->first();
            if (File::exists('files/' . $pdf->image_url)) {
                File::delete('files/' . $pdf->image_url);
            }
            $this->deleteFile($pdf);

            $image->pdfs()->delete();

            $this->deleteFile($image);

            $image->delete();
        }


        $section->delete();


        return to_route('sections.index');
    }
}
