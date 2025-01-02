<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ImageController extends Controller
{
    protected function validate(Request $request)
    {
        return Validator::make($request->all(), [
            'id' => $request->method() === 'PUT' ? 'required|exists:sections,id' : 'nullable',
            'title' => ['required', 'string', 'max:255', $request->method() === 'POST' ? 'unique:sections' : Rule::unique('sections')->ignore($request->id)],
            'template' => 'required|in:single,multiple',
            'images' => 'required|array',
            'images.*.content' => 'required|string',
            'images.*.alt' => 'required|string',
            'images.*.file' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048',
            'images.*.pdf' => 'required|file|mimes:pdf|max:5120',
        ]);
    }

    protected function validateImage(Request $request)
    {
        return $request->validate([
            'id' => $request->method() === 'PUT' ? 'required|exists:images,id' : '',
            'content' => 'required|string',
            'alt' => 'required|string|max:255',
            'file' => $request->hasFile('file') || $request['type'] !== 'update' ? 'required|file|mimes:jpeg,png,jpg,gif|max:5120' : '',
            'pdf' => $request->method() !== 'PUT' ? 'nullable|file|mimes:pdf|max:5120' : '',
        ]);
    }

    protected function saveImage($image, $section, $pdf): void
    {
        // Save image file to its directory
        $imagePath = $this->saveFile($image['file'], 'section');

        // Create a record in the `images` table
        $image = $section->images()->create([
            'url' => $imagePath,
            'alt' => $image['alt'],
            'content' => $image['content'],
        ]);

        $pdfPath = $this->saveFile($pdf, 'pdf');

        // Create a record in the `pdfs` table
        $image->pdfs()->create([
            'url' => $pdfPath,
        ]);
    }

    protected function updateImages($image, $imageFile = null, $pdf = null): void
    {
        // Define storage paths for files
        $pdfDir = "sections/pdfs";

        // Update image file if provided
        if ($imageFile !== null) {
            // Delete old image file if exists
            if ($image) {
                $this->deleteFile($image);
            }
            // Store new image and update the model
            $imagePath = $this->saveFile($imageFile, 'section');
            $image->update([
                'url' => $imagePath,
                'alt' => $image['alt'],  // Consider dynamically setting alt text if needed
            ]);
        }

        // Update PDF file if provided
        if ($pdf !== null) {
            // Check if a PDF exists, then delete it
            $oldPdf = $image->pdfs()->first();
            if ($oldPdf) {
                $this->deleteFile($oldPdf);
                $oldPdf->delete();
            }

            // Store new PDF and update the model
            $pdfPath = $this->saveFile($pdf, 'pdf');
            $image->pdfs()->create([
                'url' => $pdfPath,
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        return Inertia::render('Admin/Sections/Images/create', ['id' => $id]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $this->validateImage($request);

        // Get section model
        $section = Section::query()->firstWhere('id', $request->section_id);
        // Save image and its associated PDF
        $this->saveImage($validate, $section, $validate['pdf']);
        return redirect()->route('sections.edit', $request->section_id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        $image = $image->load('pdfs');
        return Inertia::render('Admin/Sections/Images/update', ['prevData' => $image]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validate = $this->validateImage($request);

        $image = Image::query()->with('pdfs')->firstWhere('id', $request->id);
        $image->update([
            'content' => $request['content'],
            'alt' => $request['alt'],
        ]);
        // Save image and its associated PDF
        $this->updateImages($image, $validate['file'] ?? null, $validate['pdf'] ?? null);

        return redirect()->route('sections.edit', $image->section_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        $section_id = $image->section_id;
        $this->deleteFile($image->pdfs()->first());

        $image->pdfs()->delete();

        $this->deleteFile($image);

        $image->delete();

        return redirect()->route('sections.edit', $section_id);
    }
}
