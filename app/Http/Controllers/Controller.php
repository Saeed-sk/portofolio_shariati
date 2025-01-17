<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;

abstract class Controller
{
    protected string $defaultPath = 'files/';

    protected function saveFile($file, $type): string
    {
        // Define storage path for files using Laravel Storage system
        $dir = '';
        if ($type == 'image') {
            $dir = 'home/images';
        } elseif ($type == 'video') {
            $dir = 'home/videos';
        } elseif ($type == 'pdf') {
            $dir = 'sections/pdfs';
        } elseif ($type == 'section') {
            $dir = 'sections/images';
        } elseif ($type == 'background') {
            $dir = 'sections/backgrounds';
        }

        // Generate a unique file name to avoid collision (you can use UUID or unique hash)
        $fileName = time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();

        // Check if the directory exists, otherwise create it
        if (!empty($file)) {
            $file->move($this->defaultPath . $dir, $fileName);
        }

        return $dir . '/' . $fileName;
    }

    protected function deleteFile($file): void
    {
        // Check if the directory exists, otherwise create it
        if (File::exists($this->defaultPath . $file->url)) {

            File::delete($this->defaultPath . $file->url);
        }
    }
}
