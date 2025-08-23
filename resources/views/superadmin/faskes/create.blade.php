<x-superadmin.app>
    <div x-data="faskesCreate">
        <div class="flex xl:flex-row flex-col gap-2.5">
            <!-- Main Form Panel -->
            <div class="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <!-- Header -->
                <div class="flex justify-between flex-wrap px-4">
                    <div class="mb-6 w-full">
                        <div class="flex items-center text-black dark:text-white shrink-0">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 ltr:mr-3 rtl:ml-3">
                                <path d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914C3 11.4234 3 10.8996 3 10.4167Z" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <h2 class="text-2xl font-bold">Tambah Faskes Baru</h2>
                        </div>
                        <p class="text-gray-500 dark:text-gray-400 mt-2">
                            Lengkapi form berikut untuk menambahkan fasilitas kesehatan baru
                        </p>
                    </div>
                </div>

                <form action="{{ route('superadmin.faskes.store') }}" method="POST" enctype="multipart/form-data" id="faskesForm">
                    @csrf

                    <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6">

                    <!-- Basic Information -->
                    <div class="mt-8 px-4">
                        <h3 class="text-lg font-semibold mb-4">Informasi Dasar</h3>
                        <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
                            <!-- Left Column -->
                            <div class="space-y-4">
                                <div>
                                    <label for="nama" class="form-label">Nama Faskes <span class="text-red-500">*</span></label>
                                    <input
                                        id="nama"
                                        type="text"
                                        name="nama"
                                        class="form-input @error('nama') border-red-500 @enderror"
                                        placeholder="Masukkan nama faskes"
                                        value="{{ old('nama') }}"
                                        x-model="form.nama"
                                        required
                                    />
                                    @error('nama')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label for="tipe_faskes" class="form-label">Tipe Faskes <span class="text-red-500">*</span></label>
                                    <select
                                        id="tipe_faskes"
                                        name="tipe_faskes"
                                        class="form-select @error('tipe_faskes') border-red-500 @enderror"
                                        x-model="form.tipe_faskes"
                                        required
                                    >
                                        <option value="">Pilih Tipe Faskes</option>
                                        @foreach($tipeFaskes as $tipe)
                                            <option value="{{ $tipe }}" {{ old('tipe_faskes') == $tipe ? 'selected' : '' }}>{{ $tipe }}</option>
                                        @endforeach
                                    </select>
                                    @error('tipe_faskes')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label for="provinsi_id" class="form-label">Provinsi <span class="text-red-500">*</span></label>
                                    <select
                                        id="provinsi_id"
                                        name="provinsi_id"
                                        class="form-select @error('provinsi_id') border-red-500 @enderror"
                                        x-model="form.provinsi_id"
                                        @change="loadKota()"
                                        required
                                    >
                                        <option value="">Pilih Provinsi</option>
                                        @foreach($provinsi as $prov)
                                            <option value="{{ $prov->id }}" {{ old('provinsi_id') == $prov->id ? 'selected' : '' }}>{{ $prov->nama }}</option>
                                        @endforeach
                                    </select>
                                    @error('provinsi_id')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label for="kota_id" class="form-label">Kota <span class="text-red-500">*</span></label>
                                    <select
                                        id="kota_id"
                                        name="kota_id"
                                        class="form-select @error('kota_id') border-red-500 @enderror"
                                        x-model="form.kota_id"
                                        @change="loadKecamatan()"
                                        :disabled="!form.provinsi_id"
                                        required
                                    >
                                        <option value="">Pilih Kota</option>
                                        @foreach($kota as $kot)
                                            <option value="{{ $kot->id }}" {{ old('kota_id') == $kot->id ? 'selected' : '' }}>{{ $kot->nama }}</option>
                                        @endforeach
                                    </select>
                                    @error('kota_id')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>

                            <!-- Right Column -->
                            <div class="space-y-4">
                                <div>
                                    <label for="kecamatan_id" class="form-label">Kecamatan <span class="text-red-500">*</span></label>
                                    <select
                                        id="kecamatan_id"
                                        name="kecamatan_id"
                                        class="form-select @error('kecamatan_id') border-red-500 @enderror"
                                        x-model="form.kecamatan_id"
                                        :disabled="!form.kota_id"
                                        required
                                    >
                                        <option value="">Pilih Kecamatan</option>
                                        @foreach($kecamatan as $kec)
                                            <option value="{{ $kec->id }}" {{ old('kecamatan_id') == $kec->id ? 'selected' : '' }}>{{ $kec->nama }}</option>
                                        @endforeach
                                    </select>
                                    @error('kecamatan_id')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label for="alamat" class="form-label">Alamat Lengkap</label>
                                    <textarea
                                        id="alamat"
                                        name="alamat"
                                        class="form-textarea @error('alamat') border-red-500 @enderror"
                                        rows="3"
                                        placeholder="Masukkan alamat lengkap faskes"
                                        x-model="form.alamat"
                                    >{{ old('alamat') }}</textarea>
                                    @error('alamat')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label for="profile_pic" class="form-label">Foto Profil</label>
                                    <div class="relative">
                                        <input
                                            id="profile_pic"
                                            type="file"
                                            name="profile_pic"
                                            class="form-input @error('profile_pic') border-red-500 @enderror"
                                            accept="image/*"
                                            @change="handleImagePreview($event)"
                                        />
                                        <p class="text-xs text-gray-500 mt-1">Format: JPG, PNG, GIF (Max: 2MB)</p>
                                    </div>
                                    @error('profile_pic')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror

                                    <!-- Image Preview -->
                                    <div x-show="imagePreview" class="mt-3">
                                        <img :src="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-lg border">
                                        <button type="button" @click="removeImagePreview()" class="text-red-500 text-sm mt-1 hover:underline">
                                            Hapus gambar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6">

                    <!-- Additional Information -->
                    <div class="px-4">
                        <h3 class="text-lg font-semibold mb-4">Informasi Tambahan</h3>
                        <div>
                            <label for="deskripsi" class="form-label">Deskripsi Faskes</label>
                            <textarea
                                id="deskripsi"
                                name="deskripsi"
                                class="form-textarea @error('deskripsi') border-red-500 @enderror"
                                rows="4"
                                placeholder="Masukkan deskripsi, layanan yang tersedia, jam operasional, dll."
                                x-model="form.deskripsi"
                            >{{ old('deskripsi') }}</textarea>
                            <p class="text-xs text-gray-500 mt-1">Opsional: Jelaskan tentang faskes, layanan, jam operasional, dll.</p>
                            @error('deskripsi')
                                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>

                </form>
            </div>

            <!-- Action Panel -->
            <div class="xl:w-96 w-full xl:mt-0 mt-6">
                <!-- Form Summary -->
                <div class="panel mb-5">
                    <h3 class="text-lg font-semibold mb-4">Ringkasan Form</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Nama Faskes:</span>
                            <span x-text="form.nama || '-'" class="font-medium"></span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Tipe:</span>
                            <span x-text="form.tipe_faskes || '-'" class="font-medium"></span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Provinsi:</span>
                            <span x-text="getProvinsiName() || '-'" class="font-medium"></span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Kota:</span>
                            <span x-text="getKotaName() || '-'" class="font-medium"></span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Kecamatan:</span>
                            <span x-text="getKecamatanName() || '-'" class="font-medium"></span>
                        </div>
                    </div>
                </div>

                <!-- Form Validation Status -->
                <div class="panel mb-5">
                    <h3 class="text-lg font-semibold mb-4">Status Validasi</h3>
                    <div class="space-y-2">
                        <div class="flex items-center" :class="form.nama ? 'text-green-600' : 'text-red-600'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" x-show="form.nama"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" x-show="!form.nama"/>
                            </svg>
                            <span>Nama Faskes</span>
                        </div>
                        <div class="flex items-center" :class="form.tipe_faskes ? 'text-green-600' : 'text-red-600'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" x-show="form.tipe_faskes"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" x-show="!form.tipe_faskes"/>
                            </svg>
                            <span>Tipe Faskes</span>
                        </div>
                        <div class="flex items-center" :class="form.provinsi_id ? 'text-green-600' : 'text-red-600'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" x-show="form.provinsi_id"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" x-show="!form.provinsi_id"/>
                            </svg>
                            <span>Provinsi</span>
                        </div>
                        <div class="flex items-center" :class="form.kota_id ? 'text-green-600' : 'text-red-600'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" x-show="form.kota_id"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" x-show="!form.kota_id"/>
                            </svg>
                            <span>Kota</span>
                        </div>
                        <div class="flex items-center" :class="form.kecamatan_id ? 'text-green-600' : 'text-red-600'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" x-show="form.kecamatan_id"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" x-show="!form.kecamatan_id"/>
                            </svg>
                            <span>Kecamatan</span>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="panel">
                    <div class="grid grid-cols-1 gap-4">
                        <button
                            type="submit"
                            form="faskesForm"
                            class="btn btn-success w-full"
                            :disabled="!isFormValid()"
                            :class="!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0">
                                <path d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 11.6585 22 11.4878 21.9848 11.3142C21.9142 10.5049 21.586 9.71257 21.0637 9.09034C20.9516 8.95687 20.828 8.83317 20.5806 8.58578L15.4142 3.41944C15.1668 3.17206 15.0431 3.04835 14.9097 2.93631C14.2874 2.414 13.4951 2.08581 12.6858 2.01515C12.5122 2 12.3415 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355Z" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M17 22V21C17 19.1144 17 18.1716 16.4142 17.5858C15.8284 17 14.8856 17 13 17H11C9.11438 17 8.17157 17 7.58579 17.5858C7 18.1716 7 19.1144 7 21V22" stroke="currentColor" stroke-width="1.5"/>
                                <path opacity="0.5" d="M7 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            Simpan Faskes
                        </button>

                        <button
                            type="button"
                            @click="resetForm()"
                            class="btn btn-warning w-full"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0">
                                <path d="M4 12H20M4 12L8 8M4 12L8 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Reset Form
                        </button>

                        <a href="{{ route('superadmin.faskes.index') }}" class="btn btn-secondary w-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0">
                                <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
            Alpine.data('faskesCreate', () => ({
                form: {
                    nama: '',
                    tipe_faskes: '',
                    provinsi_id: '',
                    kota_id: '',
                    kecamatan_id: '',
                    alamat: '',
                    deskripsi: ''
                },
                kotaList: [],
                kecamatanList: [],
                provinsiData: @json($provinsi),
                imagePreview: null,

                init() {
                    // Set old values if any
                    this.form.nama = "{{ old('nama') }}";
                    this.form.tipe_faskes = "{{ old('tipe_faskes') }}";
                    this.form.provinsi_id = "{{ old('provinsi_id') }}";
                    this.form.kota_id = "{{ old('kota_id') }}";
                    this.form.kecamatan_id = "{{ old('kecamatan_id') }}";
                    this.form.alamat = "{{ old('alamat') }}";
                    this.form.deskripsi = "{{ old('deskripsi') }}";

                    // Load kota and kecamatan if provinsi/kota already selected
                    if (this.form.provinsi_id) {
                        this.loadKota();
                    }
                    if (this.form.kota_id) {
                        this.loadKecamatan();
                    }
                },

                // async loadKota() {
                //     if (!this.form.provinsi_id) {
                //         this.kotaList = [];
                //         this.kecamatanList = [];
                //         this.form.kota_id = '';
                //         this.form.kecamatan_id = '';
                //         return;
                //     }

                //     try {
                //         const response = await fetch(`/api/kota/${this.form.provinsi_id}`);
                //         const data = await response.json();
                //         this.kotaList = data;

                //         // Reset kota and kecamatan
                //         if (!this.form.kota_id) {
                //             this.form.kota_id = '';
                //         }
                //         this.kecamatanList = [];
                //         this.form.kecamatan_id = '';
                //     } catch (error) {
                //         console.error('Error loading kota:', error);
                //         this.kotaList = [];
                //     }
                // },

                // async loadKecamatan() {
                //     if (!this.form.kota_id) {
                //         this.kecamatanList = [];
                //         this.form.kecamatan_id = '';
                //         return;
                //     }

                //     try {
                //         const response = await fetch(`/api/kecamatan/${this.form.kota_id}`);
                //         const data = await response.json();
                //         this.kecamatanList = data;

                //         // Reset kecamatan
                //         if (!this.form.kecamatan_id) {
                //             this.form.kecamatan_id = '';
                //         }
                //     } catch (error) {
                //         console.error('Error loading kecamatan:', error);
                //         this.kecamatanList = [];
                //     }
                // },

                getProvinsiName() {
                    if (!this.form.provinsi_id) return '';
                    const provinsi = this.provinsiData.find(p => p.id == this.form.provinsi_id);
                    return provinsi ? provinsi.nama : '';
                },

                getKotaName() {
                    if (!this.form.kota_id) return '';
                    const kota = this.kotaList.find(k => k.id == this.form.kota_id);
                    return kota ? kota.nama : '';
                },

                getKecamatanName() {
                    if (!this.form.kecamatan_id) return '';
                    const kecamatan = this.kecamatanList.find(k => k.id == this.form.kecamatan_id);
                    return kecamatan ? kecamatan.nama : '';
                },

                isFormValid() {
                    return this.form.nama &&
                           this.form.tipe_faskes &&
                           this.form.provinsi_id &&
                           this.form.kota_id &&
                           this.form.kecamatan_id;
                },

                handleImagePreview(event) {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.imagePreview = e.target.result;
                        };
                        reader.readAsDataURL(file);
                    }
                },

                removeImagePreview() {
                    this.imagePreview = null;
                    document.getElementById('profile_pic').value = '';
                },

                resetForm() {
                    if (confirm('Apakah Anda yakin ingin mereset semua data form?')) {
                        this.form = {
                            nama: '',
                            tipe_faskes: '',
                            provinsi_id: '',
                            kota_id: '',
                            kecamatan_id: '',
                            alamat: '',
                            deskripsi: ''
                        };
                        this.kotaList = [];
                        this.kecamatanList = [];
                        this.imagePreview = null;
                        document.getElementById('faskesForm').reset();
                    }
                }
            }));
        });
    </script>
</x-superadmin.app>
