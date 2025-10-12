<x-admin-faskes.app>

    <script src="/assets/js/simple-datatables.js"></script>

    <div x-data="faskesUserTable">
        <div class="flex items-center p-3 overflow-x-auto panel whitespace-nowrap text-primary">
            <div class="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                {{-- SVG Icon --}}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5">
                    <path
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="currentColor" stroke-width="1.5" />
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor"
                        stroke-width="1.5" />
                </svg>
            </div>
            <span class="ltr:mr-3 rtl:ml-3">Data Pengguna Faskes</span>
        </div>

        <div class="mt-6 panel">
            <div class="flex items-center justify-between mb-5">
                <h5 class="text-lg font-semibold dark:text-white-light">Daftar Pengguna Faskes</h5>
                <a href="{{ route('superadmin.faskes-user.create') }}" class="btn btn-primary">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2">
                        <path
                            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                            stroke="currentColor" stroke-width="1.5" />
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor"
                            stroke-width="1.5" />
                    </svg>
                    Tambah Pengguna
                </a>
            </div>


            <div class="table-responsive">
                <table id="tableFaskesUser" class="whitespace-nowrap table-hover">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>NIK</th>
                            <th>Role</th>
                            <th>Faskes</th>
                            <th>Status</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($petugas as $index => $user)
                            <tr>
                                <td>{{ $index + 1 }}</td>
                                <td>
                                    <div class="flex items-center">
                                        @if ($user->profile_pic_url)
                                            <img src="{{ $user->profile_pic_url }}" alt="{{ $user->name }}"
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
                                            <div class="font-medium">{{ $user->name }}</div>
                                            @if ($user->no_telp)
                                                <div class="text-xs text-gray-500">{{ $user->no_telp }}</div>
                                            @endif
                                        </div>
                                    </div>
                                </td>
                                <td>{{ $user->email }}</td>
                                <td>{{ $user->nik ?? '-' }}</td>
                                <td>
                                    @if ($user->role === 'Admin Faskes')
                                        <span class="badge bg-primary">{{ $user->role }}</span>
                                    @elseif($user->role === 'Petugas Faskes')
                                        <span class="badge bg-info">{{ $user->role }}</span>
                                    @else
                                        <span class="badge bg-secondary">{{ $user->role }}</span>
                                    @endif
                                </td>
                                <td>
                                    @if ($user->faskes)
                                        <div class="font-medium">{{ $user->faskes->nama }}</div>
                                        <div class="text-xs text-gray-500">{{ $user->faskes->tipe_faskes }}</div>
                                    @else
                                        <span class="text-gray-400">-</span>
                                    @endif
                                </td>
                                <td>
                                    @if ($user->status_user === 'Aktif')
                                        <span class="badge bg-success">Aktif</span>
                                    @elseif($user->status_user === 'Nonaktif')
                                        <span class="badge bg-warning">Nonaktif</span>
                                    @elseif($user->status_user === 'Meninggal')
                                        <span class="badge bg-danger">Meninggal</span>
                                    @endif
                                </td>
                                <td class="text-center">
                                    <div class="flex items-center justify-center gap-2">
                                        <a href="{{ route('superadmin.faskes-user.show', $user->id) }}"
                                            class="btn btn-sm btn-outline-info" title="Detail">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                                    stroke="currentColor" stroke-width="1.5" />
                                                <path
                                                    d="M12.0012 21C16.3193 21 20.0012 17.3181 20.0012 13C20.0012 8.68188 16.3193 5 12.0012 5C7.68307 5 4.00122 8.68188 4.00122 13C4.00122 17.3181 7.68307 21 12.0012 21Z"
                                                    stroke="currentColor" stroke-width="1.5" />
                                            </svg>
                                        </a>
                                        <a href="{{ route('superadmin.faskes-user.edit', $user->id) }}"
                                            class="btn btn-sm btn-outline-warning" title="Edit">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M15.2869 3.15178C14.3755 2.24025 12.8706 2.24025 11.9592 3.15178L4.83421 10.2768C4.65571 10.4553 4.7054 10.7431 4.9417 10.8477L8.11953 12.1884C8.20613 12.2153 8.27698 12.2862 8.30393 12.3728L9.64462 15.5506C9.74918 15.7869 10.037 15.8366 10.2155 15.6581L17.3405 8.53312C18.252 7.62158 18.252 6.11667 17.3405 5.20513L15.2869 3.15178Z"
                                                    stroke="currentColor" stroke-width="1.5" />
                                                <path
                                                    d="M11.3214 16.0004L11.1736 16.1481L11.8509 17.7481C12.1321 18.3082 12.7066 18.6846 13.3448 18.6846H18.3448C18.8968 18.6846 19.3448 19.1326 19.3448 19.6846C19.3448 20.2366 18.8968 20.6846 18.3448 20.6846H13.3448C11.8868 20.6846 10.5657 19.7946 9.85075 18.4731L9.17345 16.8731L3.83421 14.2768C2.8255 13.7725 2.37634 12.5287 2.88064 11.52L5.51954 6.18086L8.73421 9.39553"
                                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>
                                        </a>

                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="8" class="p-4 text-center">Data tidak ditemukan</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

        </div>
    </div>

    <script>
        document.addEventListener("alpine:init", () => {
            Alpine.data("faskesUserTable", () => ({
                init() {
                    const tableOptions = {
                        // searchable: true,
                        // sortable: true,
                        // perPageSelect: [10, 25, 50, 100],
                        // perPage: 25,
                        // labels: {
                        //     placeholder: "Cari pengguna...",
                        //     perPage: "Tampilkan {select} data per halaman",
                        //     noRows: "Tidak ada data yang ditemukan",
                        //     info: "Menampilkan {start} - {end} dari {rows} data"
                        // }
                    };

                    // Inisialisasi DataTable
                    const datatable = new simpleDatatables.DataTable('#tableFaskesUser', tableOptions);
                }
            }));
        });
    </script>

</x-admin-faskes.app>
