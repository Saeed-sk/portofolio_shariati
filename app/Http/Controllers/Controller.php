<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;

abstract class Controller
{
    protected function saveFile($file, $type): string
    {
        // Define storage path for files using Laravel Storage system
        $dir = '';
        if ($type == 'image') {
            $dir = 'home/images';
        } elseif ($type == 'video') {
            $dir = 'home/videos';
        }elseif ($type == 'pdf') {
            $dir = 'sections/pdfs';
        }elseif ($type == 'section') {
            $dir = 'sections/images';
        }

        // Generate a unique file name to avoid collision (you can use UUID or unique hash)
        $fileName = time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();

        // Check if the directory exists, otherwise create it
        if (!empty($file)) {
            $file->move('storage/' . $dir, $fileName);
        }

        return $dir . '/' . $fileName;
    }

    protected function deleteFile($file): void
    {
        // Check if the directory exists, otherwise create it
        if (File::exists('storage/' . $file->url)) {

            File::delete('storage/' . $file->url);
        }
    }
}
