<x-admin-faskes.app>

    <script src="/assets/js/simple-datatables.js"></script>

    <div x-data="jadwalTable">
        <div class="flex items-center p-3 overflow-x-auto panel whitespace-nowrap text-primary">
            <div class="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                <!-- 🕒 Icon Jadwal -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" class="h-4 w-4">
                    <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
                </svg>
            </div>
            <span class="ltr:mr-3 rtl:ml-3">Jadwal Ketersediaan Petugas Faskes</span>
        </div>

        <div class="mt-6 panel">
            <div class="flex items-center justify-between mb-5">
                <h5 class="text-lg font-semibold dark:text-white-light">Daftar Jadwal Ketersediaan</h5>
            </div>

            <div class="table-responsive">
                <table id="tableJadwal" class="whitespace-nowrap table-hover">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Petugas</th>
                            <th>Tanggal</th>
                            <th>Jam Mulai</th>
                            <th>Jam Selesai</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($jadwalKetersediaan as $index => $jadwal)
                            <tr>
                                <td>{{ $index + 1 }}</td>
                                <td>
                                    <div class="flex items-center">
                                        @if ($jadwal->petugas && $jadwal->petugas->profile_pic_url)
                                            <img src="{{ $jadwal->petugas->profile_pic_url }}"
                                                alt="{{ $jadwal->petugas->name }}"
                                                class="object-cover w-8 h-8 mr-3 rounded-full">
                                        @else
                                            <div
                                                class="flex items-center justify-center w-8 h-8 mr-3 bg-gray-300 rounded-full">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg" class="text-gray-600">
                                                    <path
                                                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                                        stroke="currentColor" stroke-width="1.5" />
                                                    <path
                                                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                                                        stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </div>
                                        @endif
                                        <div>
                                            <div class="font-medium">{{ $jadwal->petugas->name ?? '-' }}</div>
                                            <div class="text-xs text-gray-500">
                                                {{ $jadwal->petugas->role ?? 'Petugas' }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{{ \Carbon\Carbon::parse($jadwal->tanggal)->translatedFormat('d F Y') }}</td>
                                <td>{{ \Carbon\Carbon::parse($jadwal->jam_mulai)->format('H:i') }}</td>
                                <td>{{ \Carbon\Carbon::parse($jadwal->jam_selesai)->format('H:i') }}</td>
                                <td>
                                    @if ($jadwal->status_ketersediaan === 'Tersedia')
                                        <span class="badge bg-success">Tersedia</span>
                                    @else
                                        <span class="badge bg-danger">Penuh</span>
                                    @endif
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="6" class="p-4 text-center">Tidak ada jadwal tersedia</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener("alpine:init", () => {
            Alpine.data("jadwalTable", () => ({
                init() {
                    const datatable = new simpleDatatables.DataTable('#tableJadwal', {
                        searchable: true,
                        sortable: true,
                        perPageSelect: [10, 25, 50],
                        labels: {
                            placeholder: "Cari jadwal...",
                            perPage: "Tampilkan {select} jadwal per halaman",
                            noRows: "Tidak ada jadwal ditemukan",
                            info: "Menampilkan {start} - {end} dari {rows} jadwal"
                        }
                    });
                }
            }));
        });
    </script>

</x-admin-faskes.app>
