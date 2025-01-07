<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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
            'template' => 'required|in:single,multiple,pdfTemplate',
            'images' => 'required|array',
            'images.*.content' => 'required|string',
            'images.*.alt' => 'required|string',
            'images.*.file' => 'required|file|mimes:jpeg,png,jpg,gif,avif,webp|max:5120',
            'images.*.pdf' => 'required|file|mimes:pdf|max:5120',
        ]);
    }

    protected function validateImage(Request $request)
    {
        $background = false;
        if ($request->hasFile('background')) {
            $background = true;
        } elseif ($request['type'] !== 'update') {
            $background = true;
        }
        return $request->validate([
            'id' => $request->method() === 'PUT' ? 'required|exists:images,id' : '',
            'content' => $request['template'] !== 'pdfTemplate' ? 'required|string' : 'nullable',
            'alt' => 'required|string|max:255',
            'file' => $request->hasFile('file') || $request['type'] !== 'update' ? 'required|file|mimes:jpeg,png,jpg,gif,avif,webp|max:5120' : '',
            'background' => $background ? 'required|file|mimes:jpeg,png,jpg,gif,avif,webp|max:5120' : 'nullable',
            'pdf' => $request->method() !== 'PUT' ? 'nullable|file|mimes:pdf|max:5120' : 'nullable',
        ]);
    }

    protected function saveImage($input, $section): void
    {
        // Save image file to its directory
        $imagePath = $this->saveFile($input['file'], 'section');

        // Create a record in the `images` table
        $image = $section->images()->create([
            'url' => $imagePath,
            'alt' => $input['alt'],
            'content' => $input['content'],
        ]);

        $pdfPath = $this->saveFile($input['pdf'], 'pdf');
        $bgPdfPath = null;
        if ($section['template'] !== 'pdfTemplate') {
            $bgPdfPath = $this->saveFile($input['background'], 'background');
        }

        // Create a record in the `pdfs` table
        $image->pdfs()->create([
            'url' => $pdfPath,
            'image_url' => $bgPdfPath
        ]);
    }

    protected function updateImages($image, $input): void
    {
        // Define storage paths for files
        $pdfDir = "sections/pdfs";

        // Update image file if provided
        if ($input['file'] !== null) {
            // Delete old image file if exists
            if ($image) {
                $this->deleteFile($image);
            }
            // Store new image and update the model
            $imagePath = $this->saveFile($input['file'], 'section');
            $image->update([
                'url' => $imagePath
            ]);
        }
        $oldPdf = $image->pdfs()->first();
        // Update PDF file if provided

        if ($input['pdf'] !== null) {
            // Check if a PDF exists, then delete it
            $this->deleteFile($oldPdf);
            // Store new PDF and update the model
            $pdfPath = $this->saveFile($input['pdf'], 'pdf');
            $oldPdf->update([
                'url' => $pdfPath,
            ]);
        }

        if ($input['background'] !== null) {
            // Check if a Background exists, then delete it
            if (File::exists('files/' . $oldPdf->image_url)) {
                File::delete('files/' . $oldPdf->image_url);
            }
            // Store new PDF and update the model
            $bgPdfPath = $this->saveFile($input['background'], 'background');
            $oldPdf->update([
                'image_url' => $bgPdfPath,
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        $template = Section::query()->firstWhere('id', $id);
        $template = $template['template'];
        return Inertia::render('Admin/Sections/Images/create', ['id' => $id, 'template' => $template]);
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
        $this->saveImage($validate, $section);
        return redirect()->route('sections.edit', $request->section_id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        $image = $image->load('pdfs');
        $template = $image->load('section');
        $template = $template['section']['template'];
        return Inertia::render('Admin/Sections/Images/update', ['prevData' => $image, 'template' => $template]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validate = $this->validateImage($request);

        $image = Image::query()->with('pdfs')->firstWhere('id', $request->id);
        $image->update([
            'content' => $validate['content'],
            'alt' => $validate['alt'],
        ]);
        // Save image and its associated PDF
        $this->updateImages($image, $validate);

        return redirect()->route('sections.edit', $image->section_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        $section_id = $image->section_id;
        $pdfs = $image->pdfs()->first();

        if (File::exists('files/' . $pdfs->image_url)) {
            File::delete('files/' . $pdfs->image_url);
        }

        $this->deleteFile($pdfs);

        $image->pdfs()->delete();

        $this->deleteFile($image);

        $image->delete();

        return redirect()->route('sections.edit', $section_id);
    }
}
