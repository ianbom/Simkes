<?php

namespace App\Services;

use App\Models\Faskes;
use App\Models\Provinsi;
use App\Models\Kota;
use App\Models\Kecamatan;
use App\Services\FileUploadService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class FaskesService
{
    protected UploadFileService $uploadFileService;

    public function __construct(UploadFileService $uploadFileService)
    {
        $this->uploadFileService = $uploadFileService;
    }

    public function getCreateFormData(): array
    {
        return [
            'provinsi' => Provinsi::select('id', 'nama')->orderBy('nama')->get(),
            'kota' => Kota::select('id', 'nama')->orderBy('nama')->get(),
            'kecamatan' => Kecamatan::select('id', 'nama')->orderBy('nama')->get(),
            'tipeFaskes' => ['Puskesmas', 'Klinik', 'RSIA', 'RSUD', 'Posyandu']
        ];
    }

    public function createFaskes(array $data): Faskes
    {
        return DB::transaction(function () use ($data) {
            if (isset($data['profile_pic']) && $data['profile_pic'] instanceof UploadedFile) {
                $data['profile_pic_url'] = $this->uploadProfilePicture($data['profile_pic']);
                unset($data['profile_pic']);
            }

            return Faskes::create($data);
        });
    }

    /**
     * Upload profile picture
     */
    private function uploadProfilePicture(UploadedFile $file): string
    {
        return $this->uploadFileService->uploadSingleFile(
            $file,
            'faskes/profile',
        );
    }

    /**
     * Get kota by provinsi_id
     */
    public function getKotaByProvinsi(int $provinsiId): \Illuminate\Database\Eloquent\Collection
    {
        return Kota::where('provinsi_id', $provinsiId)
            ->select('id', 'nama')
            ->orderBy('nama')
            ->get();
    }

    /**
     * Get kecamatan by kota_id
     */
    public function getKecamatanByKota(int $kotaId): \Illuminate\Database\Eloquent\Collection
    {
        return Kecamatan::where('kota_id', $kotaId)
            ->select('id', 'nama')
            ->orderBy('nama')
            ->get();
    }


    public function validateLocationHierarchy(int $provinsiId, int $kotaId, int $kecamatanId): bool
    {
        // Check if kota belongs to provinsi
        $kotaExists = Kota::where('id', $kotaId)
            ->where('provinsi_id', $provinsiId)
            ->exists();

        if (!$kotaExists) {
            return false;
        }

        // Check if kecamatan belongs to kota
        $kecamatanExists = Kecamatan::where('id', $kecamatanId)
            ->where('kota_id', $kotaId)
            ->exists();

        return $kecamatanExists;
    }

    public function deleteProfilePicture(string $path): bool
    {
        return $this->uploadFileService->deleteFile($path);
    }
}
