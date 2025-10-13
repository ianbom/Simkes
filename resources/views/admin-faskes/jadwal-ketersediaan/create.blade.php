<x-admin-faskes.app>
    <div x-data="jadwalCreate">
        <div class="flex xl:flex-row flex-col gap-2.5">
            <!-- FORM PANEL -->
            <div class="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <!-- Header -->
                <div class="flex justify-between flex-wrap px-4">
                    <div class="mb-6 w-full">
                        <div class="flex items-center text-black dark:text-white shrink-0">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-8 h-8 ltr:mr-3 rtl:ml-3 text-primary">
                                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
                                <path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <h2 class="text-2xl font-bold">Tambah Jadwal Ketersediaan</h2>
                        </div>
                        <p class="text-gray-500 dark:text-gray-400 mt-2">
                            Lengkapi form berikut untuk menambahkan jadwal ketersediaan petugas faskes.
                        </p>
                    </div>
                </div>

                <form action="{{ route('admin.jadwal-ketersediaan.store') }}" method="POST" id="jadwalForm">
                    @csrf

                    <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6">

                    <div class="mt-8 px-4">
                        <h3 class="text-lg font-semibold mb-4">Informasi Jadwal</h3>
                        <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
                            <!-- Kolom Kiri -->
                            <div class="space-y-4">
                                <div>
                                    <label for="petugas_faskes_id" class="form-label">Petugas Faskes <span class="text-red-500">*</span></label>
                                    <select
                                        id="petugas_faskes_id"
                                        name="petugas_faskes_id"
                                        class="form-select @error('petugas_faskes_id') border-red-500 @enderror"
                                        x-model="form.petugas_faskes_id"
                                        required
                                    >
                                        <option value="">Pilih Petugas</option>
                                        @foreach($petugasFaskes as $petugas)
                                            <option value="{{ $petugas->id }}">{{ $petugas->name }}</option>
                                        @endforeach
                                    </select>
                                    @error('petugas_faskes_id')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label for="tanggal" class="form-label">Tanggal <span class="text-red-500">*</span></label>
                                    <input
                                        id="tanggal"
                                        type="date"
                                        name="tanggal"
                                        class="form-input @error('tanggal') border-red-500 @enderror"
                                        x-model="form.tanggal"
                                        required
                                    />
                                    @error('tanggal')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>

                            <!-- Kolom Kanan -->
                            <div class="space-y-4">
                                <div>
                                    <label for="jam_mulai" class="form-label">Jam Mulai <span class="text-red-500">*</span></label>
                                    <input
                                        id="jam_mulai"
                                        type="time"
                                        name="jam_mulai"
                                        class="form-input @error('jam_mulai') border-red-500 @enderror"
                                        x-model="form.jam_mulai"
                                        required
                                    />
                                    @error('jam_mulai')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label for="jam_selesai" class="form-label">Jam Selesai <span class="text-red-500">*</span></label>
                                    <input
                                        id="jam_selesai"
                                        type="time"
                                        name="jam_selesai"
                                        class="form-input @error('jam_selesai') border-red-500 @enderror"
                                        x-model="form.jam_selesai"
                                        required
                                    />
                                    @error('jam_selesai')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- PANEL SAMPING -->
            <div class="xl:w-96 w-full xl:mt-0 mt-6">
                <!-- Ringkasan Jadwal -->
                <div class="panel mb-5">
                    <h3 class="text-lg font-semibold mb-4">Ringkasan Jadwal</h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Petugas:</span>
                            <span x-text="getPetugasName() || '-'" class="font-medium"></span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Tanggal:</span>
                            <span x-text="form.tanggal || '-'" class="font-medium"></span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Jam Mulai:</span>
                            <span x-text="form.jam_mulai || '-'" class="font-medium"></span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Jam Selesai:</span>
                            <span x-text="form.jam_selesai || '-'" class="font-medium"></span>
                        </div>
                    </div>
                </div>

                <!-- Tombol Aksi -->
                <div class="panel">
                    <div class="grid grid-cols-1 gap-4">
                        <button
                            type="submit"
                            form="jadwalForm"
                            class="btn btn-success w-full"
                            :disabled="!isFormValid()"
                            :class="!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0">
                                <path d="M12 5v14m-7-7h14" stroke="currentColor"
                                    stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            Simpan Jadwal
                        </button>

                        <button type="button" @click="resetForm()" class="btn btn-warning w-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0">
                                <path d="M4 12h16M4 12l4-4m-4 4l4 4"
                                    stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Reset Form
                        </button>

                        <a href="{{ route('admin.jadwal-ketersediaan.index') }}" class="btn btn-secondary w-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0">
                                <path d="M15 6l-6 6 6 6"
                                    stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Kembali ke Daftar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener("alpine:init", () => {
            Alpine.data("jadwalCreate", () => ({
                form: {
                    petugas_faskes_id: '',
                    tanggal: '',
                    jam_mulai: '',
                    jam_selesai: ''
                },
                resetForm() {
                    this.form.petugas_faskes_id = '';
                    this.form.tanggal = '';
                    this.form.jam_mulai = '';
                    this.form.jam_selesai = '';
                },
                isFormValid() {
                    return (
                        this.form.petugas_faskes_id &&
                        this.form.tanggal &&
                        this.form.jam_mulai &&
                        this.form.jam_selesai
                    );
                },
                getPetugasName() {
                    const select = document.getElementById("petugas_faskes_id");
                    const option = select.options[select.selectedIndex];
                    return option ? option.text : '';
                }
            }));
        });
    </script>
</x-admin-faskes.app>
