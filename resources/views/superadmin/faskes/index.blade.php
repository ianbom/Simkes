<x-superadmin.app>

    <script src="/assets/js/simple-datatables.js"></script>

    <div x-data="sorting">
        <div class="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            <div class="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5">
                    <path d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914C3 11.4234 3 10.8996 3 10.4167Z" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span class="ltr:mr-3 rtl:ml-3">Data Faskes</span>
        </div>

        <div class="panel mt-6">
            <div class="flex items-center justify-between mb-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Daftar Faskes</h5>
                <a href="{{ route('superadmin.faskes.create') }}"
                   class="btn btn-primary">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Tambah Faskes
                </a>
            </div>

            <!-- Filter Section -->
            <div class="mb-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter Tipe Faskes</label>
                    <select id="filterTipe" class="form-select text-white-dark">
                        <option value="">Semua Tipe</option>
                        <option value="Puskesmas">Puskesmas</option>
                        <option value="Klinik">Klinik</option>
                        <option value="RSIA">RSIA</option>
                        <option value="RSUD">RSUD</option>
                        <option value="Posyandu">Posyandu</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter Provinsi</label>
                    <select id="filterProvinsi" class="form-select text-white-dark">
                        <option value="">Semua Provinsi</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter Kota</label>
                    <select id="filterKota" class="form-select text-white-dark">
                        <option value="">Semua Kota</option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button onclick="resetFilters()" class="btn btn-secondary w-full">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ltr:mr-1 rtl:ml-1">
                            <path d="M4 12H20M4 12L8 8M4 12L8 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Reset Filter
                    </button>
                </div>
            </div>

            <div class="datatables">
                <table id="myTable" class="whitespace-nowrap table-hover w-full"></table>
            </div>
        </div>
    </div>

    <!-- View Modal -->
    <div id="viewModal" class="fixed inset-0 bg-[black]/60 z-[999] hidden overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
            <div class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                <div class="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                    <h5 class="font-bold text-lg">Detail Faskes</h5>
                    <button type="button" onclick="closeViewModal()" class="text-white-dark hover:text-dark">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="p-5" id="modalContent">
                    <!-- Content will be loaded here -->
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener("alpine:init", () => {
            Alpine.data("sorting", () => ({
                datatable: null,
                originalData: [],
                init() {
                    const faskesData = @json($faskes);
                    this.originalData = faskesData;

                    // Transform data untuk DataTable
                    this.loadDataTable(faskesData);
                    this.setupFilters();
                },

                loadDataTable(data) {
                    const transformedData = data.map((item, index) => {
                        const profilePic = item.profile_pic_url
                            ? `<img src="/storage/${item.profile_pic_url}" alt="${item.nama}" class="w-10 h-10 rounded-full object-cover">`
                            : '<div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">' + item.nama.charAt(0) + '</div>';

                        const tipeBadge = this.getTipeBadge(item.tipe_faskes);

                        return [
                            index + 1,
                            profilePic,
                            item.nama,
                            tipeBadge,
                            item.provinsi?.nama || '-',
                            item.kota?.nama || '-',
                            item.kecamatan?.nama || '-',
                            item.alamat || '-',
                            `
                                <div class="flex items-center gap-2">
                                    <button onclick="viewFaskes(${item.id})"
                                            class="btn btn-sm btn-outline-info"
                                            title="Lihat Detail">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="currentColor" stroke-width="1.5"/>
                                            <path d="M12.0012 3C7.52302 3 3.73414 6.0571 2.45761 10.2428C2.18439 11.0745 2.18439 11.9255 2.45761 12.7572C3.73414 16.9429 7.52302 20 12.0012 20C16.4794 20 20.2682 16.9429 21.5448 12.7572C21.818 11.9255 21.818 11.0745 21.5448 10.2428C20.2682 6.0571 16.4794 3 12.0012 3Z" stroke="currentColor" stroke-width="1.5"/>
                                        </svg>
                                    </button>
                                    <a href="/superadmin/faskes/${item.id}/edit"
                                       class="btn btn-sm btn-outline-warning"
                                       title="Edit">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.5" d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                            <path d="M17.3009 2.80624L16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9L8.03811 15.0229C7.9492 15.2897 8.01862 15.5837 8.21744 15.7826C8.41626 15.9814 8.71035 16.0508 8.97709 15.9619L10.1 15.5876L11.8354 15.0091C12.3775 14.8284 12.6485 14.7381 12.9035 14.6166C13.2043 14.4732 13.4886 14.2975 13.7513 14.0926C13.9741 13.9188 14.1761 13.7168 14.5801 13.3128L20.5449 7.34795L21.1938 6.69914C22.2687 5.62415 22.2687 3.88124 21.1938 2.80624C20.1188 1.73125 18.3759 1.73125 17.3009 2.80624Z" stroke="currentColor" stroke-width="1.5"/>
                                            <path opacity="0.5" d="M16.6522 3.45508C16.6522 3.45508 16.7333 4.83381 17.9499 6.05034C19.1664 7.26687 20.5451 7.34797 20.5451 7.34797M10.1002 15.5876L8.4126 13.9" stroke="currentColor" stroke-width="1.5"/>
                                        </svg>
                                    </a>
                                    <button onclick="deleteFaskes(${item.id}, '${item.nama}')"
                                            class="btn btn-sm btn-outline-danger"
                                            title="Hapus">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.5" d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                            <path d="M20.5001 6H3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                            <path d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                            <path d="M9.5 11L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                            <path d="M14.5 11L14 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            `
                        ];
                    });

                    // Destroy existing datatable if exists
                    if (this.datatable) {
                        this.datatable.destroy();
                    }

                    this.datatable = new simpleDatatables.DataTable('#myTable', {
                        data: {
                            headings: ["No", "Foto", "Nama Faskes", "Tipe", "Provinsi", "Kota", "Kecamatan", "Alamat", "Aksi"],
                            data: transformedData
                        },
                        searchable: true,
                        perPage: 10,
                        perPageSelect: [10, 20, 30, 50, 100],
                        columns: [{
                            select: 0,
                            sort: "asc"
                        }, {
                            select: 1,
                            sortable: false
                        }, {
                            select: 8,
                            sortable: false
                        }],
                        firstLast: true,
                        firstText: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
                        lastText: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
                        prevText: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
                        nextText: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
                        labels: {
                            perPage: "{select}"
                        },
                        layout: {
                            top: "{search}",
                            bottom: "{info}{select}{pager}",
                        },
                    });
                },

                getTipeBadge(tipe) {
                    const badges = {
                        'Puskesmas': '<span class="badge bg-primary">Puskesmas</span>',
                        'Klinik': '<span class="badge bg-info">Klinik</span>',
                        'RSIA': '<span class="badge bg-success">RSIA</span>',
                        'RSUD': '<span class="badge bg-warning">RSUD</span>',
                        'Posyandu': '<span class="badge bg-secondary">Posyandu</span>'
                    };
                    return badges[tipe] || `<span class="badge bg-dark">${tipe}</span>`;
                },

                setupFilters() {
                    // Populate provinsi filter
                    const provinsiSet = new Set();
                    const kotaSet = new Set();

                    this.originalData.forEach(item => {
                        if (item.provinsi?.nama) provinsiSet.add(JSON.stringify({id: item.provinsi.id, nama: item.provinsi.nama}));
                        if (item.kota?.nama) kotaSet.add(JSON.stringify({id: item.kota.id, nama: item.kota.nama, provinsi_id: item.provinsi?.id}));
                    });

                    const provinsiSelect = document.getElementById('filterProvinsi');
                    Array.from(provinsiSet).forEach(item => {
                        const provinsi = JSON.parse(item);
                        const option = document.createElement('option');
                        option.value = provinsi.nama;
                        option.textContent = provinsi.nama;
                        provinsiSelect.appendChild(option);
                    });

                    // Setup filter event listeners
                    this.setupFilterEventListeners();
                },

                setupFilterEventListeners() {
                    const filterTipe = document.getElementById('filterTipe');
                    const filterProvinsi = document.getElementById('filterProvinsi');
                    const filterKota = document.getElementById('filterKota');

                    [filterTipe, filterProvinsi, filterKota].forEach(filter => {
                        filter.addEventListener('change', () => this.applyFilters());
                    });

                    // Provinsi change event untuk update kota options
                    filterProvinsi.addEventListener('change', () => {
                        this.updateKotaOptions();
                        filterKota.value = '';
                        this.applyFilters();
                    });
                },

                updateKotaOptions() {
                    const provinsiValue = document.getElementById('filterProvinsi').value;
                    const kotaSelect = document.getElementById('filterKota');

                    // Clear existing options except first one
                    kotaSelect.innerHTML = '<option value="">Semua Kota</option>';

                    if (provinsiValue) {
                        const kotaSet = new Set();
                        this.originalData.forEach(item => {
                            if (item.provinsi?.nama === provinsiValue && item.kota?.nama) {
                                kotaSet.add(item.kota.nama);
                            }
                        });

                        Array.from(kotaSet).forEach(kotaNama => {
                            const option = document.createElement('option');
                            option.value = kotaNama;
                            option.textContent = kotaNama;
                            kotaSelect.appendChild(option);
                        });
                    }
                },

                applyFilters() {
                    const filterTipe = document.getElementById('filterTipe').value;
                    const filterProvinsi = document.getElementById('filterProvinsi').value;
                    const filterKota = document.getElementById('filterKota').value;

                    let filteredData = this.originalData.filter(item => {
                        const matchTipe = !filterTipe || item.tipe_faskes === filterTipe;
                        const matchProvinsi = !filterProvinsi || item.provinsi?.nama === filterProvinsi;
                        const matchKota = !filterKota || item.kota?.nama === filterKota;

                        return matchTipe && matchProvinsi && matchKota;
                    });

                    this.loadDataTable(filteredData);
                }
            }));
        });

        // Function untuk view faskes detail
        function viewFaskes(id) {
            const faskesData = @json($faskes);
            const faskes = faskesData.find(item => item.id === id);

            if (!faskes) return;

            const profilePic = faskes.profile_pic_url
                ? `<img src="/storage/${faskes.profile_pic_url}" alt="${faskes.nama}" class="w-20 h-20 rounded-lg object-cover mx-auto mb-4">`
                : '<div class="w-20 h-20 rounded-lg bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-bold mx-auto mb-4">' + faskes.nama.charAt(0) + '</div>';

            const modalContent = `
                <div class="text-center">
                    ${profilePic}
                    <h3 class="text-xl font-bold mb-4">${faskes.nama}</h3>
                </div>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="font-medium">Tipe Faskes:</span>
                        <span class="badge bg-primary">${faskes.tipe_faskes}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Provinsi:</span>
                        <span>${faskes.provinsi?.nama || '-'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Kota:</span>
                        <span>${faskes.kota?.nama || '-'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Kecamatan:</span>
                        <span>${faskes.kecamatan?.nama || '-'}</span>
                    </div>
                    <div>
                        <span class="font-medium">Alamat:</span>
                        <p class="mt-1 text-gray-600">${faskes.alamat || 'Tidak ada alamat'}</p>
                    </div>
                    ${faskes.deskripsi ? `
                    <div>
                        <span class="font-medium">Deskripsi:</span>
                        <p class="mt-1 text-gray-600">${faskes.deskripsi}</p>
                    </div>
                    ` : ''}
                </div>
            `;

            document.getElementById('modalContent').innerHTML = modalContent;
            document.getElementById('viewModal').classList.remove('hidden');
        }

        function closeViewModal() {
            document.getElementById('viewModal').classList.add('hidden');
        }

        // Function untuk delete faskes
        function deleteFaskes(id, nama) {
            if (confirm(`Apakah Anda yakin ingin menghapus faskes "${nama}"?`)) {
                // Create form untuk delete
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = `/superadmin/faskes/${id}`;
                form.style.display = 'none';

                // Add CSRF token
                const csrfToken = document.querySelector('meta[name="csrf-token"]');
                if (csrfToken) {
                    const csrfInput = document.createElement('input');
                    csrfInput.type = 'hidden';
                    csrfInput.name = '_token';
                    csrfInput.value = csrfToken.getAttribute('content');
                    form.appendChild(csrfInput);
                }

                // Add method DELETE
                const methodInput = document.createElement('input');
                methodInput.type = 'hidden';
                methodInput.name = '_method';
                methodInput.value = 'DELETE';
                form.appendChild(methodInput);

                document.body.appendChild(form);
                form.submit();
            }
        }

        // Function untuk reset filters
        function resetFilters() {
            document.getElementById('filterTipe').value = '';
            document.getElementById('filterProvinsi').value = '';
            document.getElementById('filterKota').value = '';

            // Reset kota options
            const kotaSelect = document.getElementById('filterKota');
            kotaSelect.innerHTML = '<option value="">Semua Kota</option>';

            // Reload original data
            const sortingComponent = Alpine.$data(document.querySelector('[x-data="sorting"]'));
            sortingComponent.loadDataTable(sortingComponent.originalData);
        }

        // Close modal when clicking outside
        document.getElementById('viewModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeViewModal();
            }
        });
    </script>

</x-superadmin.app>
