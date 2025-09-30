<x-superadmin.app>

    <script src="/assets/js/simple-datatables.js"></script>

        <div x-data="provinsiTable">
            <div class="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                <div class="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5">
                        <path d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z" stroke="currentColor" stroke-width="1.5" />
                        <path opacity="0.5" d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </div>
                <span class="ltr:mr-3 rtl:ml-3">Data Provinsi</span>
            </div>

            <div class="panel mt-6">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Daftar Provinsi</h5>
                    <a href="{{ route('superadmin.provinsi.create') }}" class="btn btn-primary">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Tambah Provinsi
                    </a>
                </div>
                <table id="tableProvinsi" class="whitespace-nowrap table-hover">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Provinsi</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($provinsi as $index => $prov)
                            <tr>
                                <td>{{ $index + 1 }}</td>
                                <td>{{ $prov->nama }}</td>
                                <td class="text-center">
                                    <div class="flex justify-center items-center gap-2">
                                        {{-- Tombol Edit --}}
                                        <a href="{{ route('superadmin.provinsi.edit', $prov->id) }}" class="btn btn-sm btn-outline-warning">Edit</a>

                                        {{-- Tombol Hapus --}}
                                        <form action="{{ route('superadmin.provinsi.destroy', $prov->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-sm btn-outline-danger">Hapus</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

    <script>
        document.addEventListener("alpine:init", () => {
            Alpine.data("provinsiTable", () => ({
                init() {
                    const tableOptions = {
                      
                    };

                    // Inisialisasi DataTable
                    const datatable = new simpleDatatables.DataTable('#tableProvinsi', tableOptions);
                }

            }));
        });
    </script>

</x-superadmin.app>
