<x-superadmin.app>
    <div x-data="faskesUserCreate">
        <div class="flex xl:flex-row flex-col gap-2.5">
            <!-- Main Form Panel -->
            <div class="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <!-- Header -->
                <div class="flex justify-between flex-wrap px-4">
                    <div class="mb-6 w-full">
                        <div class="flex items-center text-black dark:text-white shrink-0">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 ltr:mr-3 rtl:ml-3">
                                <path d="M18.75 9.42V6.75C18.75 3.89911 16.3509 1.5 13.5 1.5H10.5C7.64911 1.5 5.25 3.89911 5.25 6.75V9.42C3.77 10.3 3 11.88 3 13.5C3 16.81 5.69 19.5 9 19.5H15C18.31 19.5 21 16.81 21 13.5C21 11.88 20.23 10.3 18.75 9.42Z" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M8 12.5L10.5 15L16 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <h2 class="text-2xl font-bold">Tambah Pengguna Faskes Baru</h2>
                        </div>
                        <p class="text-gray-500 dark:text-gray-400 mt-2">
                            Lengkapi form berikut untuk menambahkan pengguna faskes baru
                        </p>
                    </div>
                </div>

                <form action="{{ route('superadmin.faskes-user.store') }}" method="POST" id="faskesUserForm">
                    @csrf

                    <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6">

                    <!-- User Information -->
                    <div class="mt-8 px-4">
                        <h3 class="text-lg font-semibold mb-4">Informasi Pengguna</h3>
                        <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
                            <!-- Left Column -->
                            <div class="space-y-4">
                                <div>
                                    <label for="name" class="form-label">Nama Lengkap <span class="text-red-500">*</span></label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        class="form-input @error('name') border-red-500 @enderror"
                                        placeholder="Masukkan nama lengkap"
                                        value="{{ old('name') }}"
                                        x-model="form.name"
                                        required
                                    />
                                    @error('name')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label for="email" class="form-label">Email <span class="text-red-500">*</span></label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        class="form-input @error('email') border-red-500 @enderror"
                                        placeholder="Masukkan alamat email"
                                        value="{{ old('email') }}"
                                        x-model="form.email"
                                        required
                                    />
                                    @error('email')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label for="nik" class="form-label">NIK <span class="text-red-500">*</span></label>
                                    <input
                                        id="nik"
                                        type="text"
                                        name="nik"
                                        class="form-input @error('nik') border-red-500 @enderror"
                                        placeholder="Masukkan NIK (16 digit)"
                                        value="{{ old('nik') }}"
                                        x-model="form.nik"
                                        maxlength="16"
                                        required
                                    />
                                    @error('nik')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>

                            <!-- Right Column -->
                            <div class="space-y-4">
                                <div>
                                    <label for="password" class="form-label">Password <span class="text-red-500">*</span></label>
                                    <div class="relative">
                                        <input
                                            id="password"
                                            :type="showPassword ? 'text' : 'password'"
                                            name="password"
                                            class="form-input @error('password') border-red-500 @enderror pr-10"
                                            placeholder="Masukkan password"
                                            x-model="form.password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            @click="showPassword = !showPassword"
                                            class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            <svg x-show="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400">
                                                <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="currentColor" stroke-width="1.5"/>
                                                <path d="M12.0012 21C16.3193 21 20.0012 17.3181 20.0012 13C20.0012 8.68188 16.3193 5 12.0012 5C7.68307 5 4.00122 8.68188 4.00122 13C4.00122 17.3181 7.68307 21 12.0012 21Z" stroke="currentColor" stroke-width="1.5"/>
                                            </svg>
                                            <svg x-show="showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400">
                                                <path d="M2 2L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0000 12.0000 15.0000C10.3431 15.0000 9.00004 13.6569 9.00004 12C9.00004 11.1764 9.33846 10.4303 9.86572 9.86572" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                    @error('password')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label for="role" class="form-label">Role <span class="text-red-500">*</span></label>
                                    <select
                                        id="role"
                                        name="role"
                                        class="form-select @error('role') border-red-500 @enderror"
                                        x-model="form.role"
                                        required
                                    >
                                        <option value="">Pilih Role</option>
                                        <option value="Admin Faskes" {{ old('role') == 'Admin Faskes' ? 'selected' : '' }}>Admin Faskes</option>
                                        <option value="Petugas Faskes" {{ old('role') == 'Petugas Faskes' ? 'selected' : '' }}>Petugas Faskes</option>
                                    </select>
                                    @error('role')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label for="faskes_id" class="form-label">Fasilitas Kesehatan <span class="text-red-500">*</span></label>
                                    <select
                                        id="faskes_id"
                                        name="faskes_id"
                                        class="form-select @error('faskes_id') border-red-500 @enderror"
                                        x-model="form.faskes_id"
                                        required
                                    >
                                        <option value="">Pilih Faskes</option>
                                        @foreach($faskes as $fask)
                                            <option value="{{ $fask->id }}" {{ old('faskes_id') == $fask->id ? 'selected' : '' }}>{{ $fask->nama }}</option>
                                        @endforeach
                                    </select>
                                    @error('faskes_id')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>
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
                            <span class="text-gray-600">Nama:</span>
                            <span x-text="form.name || '-'" class="font-medium"></span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Email:</span>
                            <span x-text="form.email || '-'" class="font-medium"></span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">NIK:</span>
                            <span x-text="form.nik || '-'" class="font-medium"></span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Role:</span>
                            <span x-text="getRoleName() || '-'" class="font-medium"></span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Faskes:</span>
                            <span x-text="getFaskesName() || '-'" class="font-medium text-xs"></span>
                        </div>
                    </div>
                </div>

                <!-- Form Validation Status -->
                <div class="panel mb-5">
                    <h3 class="text-lg font-semibold mb-4">Status Validasi</h3>
                    <div class="space-y-2">
                        <div class="flex items-center" :class="form.name ? 'text-green-600' : 'text-red-600'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" x-show="form.name"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" x-show="!form.name"/>
                            </svg>
                            <span>Nama Lengkap</span>
                        </div>
                        <div class="flex items-center" :class="form.email && isValidEmail(form.email) ? 'text-green-600' : 'text-red-600'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" x-show="form.email && isValidEmail(form.email)"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" x-show="!form.email || !isValidEmail(form.email)"/>
                            </svg>
                            <span>Email</span>
                        </div>
                        <div class="flex items-center" :class="form.nik && form.nik.length >= 16 ? 'text-green-600' : 'text-red-600'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" x-show="form.nik && form.nik.length >= 16"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" x-show="!form.nik || form.nik.length < 16"/>
                            </svg>
                            <span>NIK</span>
                        </div>
                        <div class="flex items-center" :class="form.password && form.password.length >= 6 ? 'text-green-600' : 'text-red-600'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" x-show="form.password && form.password.length >= 6"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" x-show="!form.password || form.password.length < 6"/>
                            </svg>
                            <span>Password</span>
                        </div>
                        <div class="flex items-center" :class="form.role ? 'text-green-600' : 'text-red-600'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" x-show="form.role"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" x-show="!form.role"/>
                            </svg>
                            <span>Role</span>
                        </div>
                        <div class="flex items-center" :class="form.faskes_id ? 'text-green-600' : 'text-red-600'">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" x-show="form.faskes_id"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" x-show="!form.faskes_id"/>
                            </svg>
                            <span>Faskes</span>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="panel">
                    <div class="grid grid-cols-1 gap-4">
                        <button
                            type="submit"
                            form="faskesUserForm"
                            class="btn btn-success w-full"
                            :disabled="!isFormValid()"
                            :class="!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0">
                                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                            Simpan Pengguna
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

                        <a href="{{ route('superadmin.faskes-user.index') }}" class="btn btn-secondary w-full">
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
            Alpine.data('faskesUserCreate', () => ({
                form: {
                    name: '',
                    email: '',
                    nik: '',
                    password: '',
                    role: '',
                    faskes_id: ''
                },
                showPassword: false,
                faskesData: @json($faskes),

                init() {
                    // Set old values if any
                    this.form.name = "{{ old('name') }}";
                    this.form.email = "{{ old('email') }}";
                    this.form.nik = "{{ old('nik') }}";
                    this.form.role = "{{ old('role') }}";
                    this.form.faskes_id = "{{ old('faskes_id') }}";
                },

                getRoleName() {
                    const roles = {
                        'admin': 'Admin Faskes',
                        'operator': 'Operator',
                        'dokter': 'Dokter'
                    };
                    return roles[this.form.role] || '';
                },

                getFaskesName() {
                    if (!this.form.faskes_id) return '';
                    const faskes = this.faskesData.find(f => f.id == this.form.faskes_id);
                    return faskes ? faskes.name : '';
                },

                isValidEmail(email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(email);
                },

                isFormValid() {
                    return this.form.name &&
                           this.form.email &&
                           this.isValidEmail(this.form.email) &&
                           this.form.nik &&
                           this.form.nik.length >= 16 &&
                           this.form.password &&
                           this.form.password.length >= 6 &&
                           this.form.role &&
                           this.form.faskes_id;
                },

                resetForm() {
                    if (confirm('Apakah Anda yakin ingin mereset semua data form?')) {
                        this.form = {
                            name: '',
                            email: '',
                            nik: '',
                            password: '',
                            role: '',
                            faskes_id: ''
                        };
                        this.showPassword = false;
                        document.getElementById('faskesUserForm').reset();
                    }
                }
            }));
        });
    </script>
</x-superadmin.app>
