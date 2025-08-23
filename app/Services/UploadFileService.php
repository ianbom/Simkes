<?php

namespace App\Services;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadFileService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

 public function uploadSingleFile(UploadedFile $file, string $path = 'uploads'): string
    {
        $path = trim($path, '/');

        $filename = $this->generateUniqueFilename($file);

        $filePath = $file->storeAs($path, $filename, 'public');

        return $filePath;
    }

     public function uploadMultipleFiles(array $files, string $path = 'uploads'): array
    {
        $uploadedFiles = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile && $file->isValid()) {
                try {
                    $uploadedFiles[] = $this->uploadSingleFile($file, $path);
                } catch (\Exception $e) {
                    // Log error but continue with other files
                    Log::error('File upload failed: ' . $e->getMessage());
                }
            }
        }

        return $uploadedFiles;
    }

     public function deleteFile(string $filePath): bool
    {
        if (Storage::disk('public')->exists($filePath)) {
            return Storage::disk('public')->delete($filePath);
        }

        return true; // File doesn't exist, consider as deleted
    }

     private function generateUniqueFilename(UploadedFile $file): string
    {
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();

        // Sanitize original name
        $sanitizedName = Str::slug($originalName);

        // Generate unique filename
        return time() . '_' . uniqid() . '_' . $sanitizedName . '.' . $extension;
    }
}
