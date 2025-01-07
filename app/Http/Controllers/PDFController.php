<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\PDF;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class PDFController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $pdf = PDF::query()->where('image_id', $id)->first();
        if ($pdf && file_exists('files/' . $pdf->url)) {
            return Response::make(file_get_contents('files/' . $pdf->url), 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline; filename="' . $pdf->url . '"',
            ]);
        } else {
            abort(404, 'File not found.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $pdf = PDF::query()->where('image_id', $id)->first();
        $filePath = 'files/' . $pdf->url;

        return Response::make(file_get_contents($filePath), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="your-file.pdf"',
            'Cache-Control' => 'no-store',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function streamPDF($id)
    {
        $pdf = PDF::query()->firstWhere('id', $id);
        $path = public_path("files/{$pdf->url}");

        if (!file_exists($path)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $fileContents = file_get_contents($path);
        $base64PDF = base64_encode($fileContents);

        return response()->json(['pdf' => $base64PDF]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PDF $pDF)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PDF $pDF)
    {
        //
    }
}
