<x-superadmin.app>
    <script src="/assets/js/simple-datatables.js"></script>

    <!-- Leaflet CSS & JS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <div x-data="stuntingTable">
        <div class="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            <div class="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5">
                    <path d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914C3 11.4234 3 10.8996 3 10.4167Z" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span class="ltr:mr-3 rtl:ml-3 font-semibold">Data Stunting Anak per Faskes</span>
        </div>

        <!-- Peta Persebaran Stunting -->
        <div class="panel mt-6">
            <h5 class="font-semibold text-lg dark:text-white-light mb-5">🗺️ Peta Persebaran Stunting per Faskes</h5>
            <div id="mapStunting" style="height: 500px; width: 100%; border-radius: 8px;"></div>
        </div>

        <!-- Tabel Statistik -->
        <div class="panel mt-6">
            <h5 class="font-semibold text-lg dark:text-white-light mb-5">📊 Statistik Stunting Anak</h5>

            <div class="table-responsive">
                <table id="tableStunting" class="whitespace-nowrap table-hover w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Faskes</th>
                            <th>Alamat</th>
                            <th class="text-center">Jumlah Anak Stunting</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($stuntingAnak as $index => $item)
                            <tr>
                                <td>{{ $index + 1 }}</td>
                                <td class="font-semibold">{{ $item->nama }}</td>
                                <td>{{ $item->alamat ?? '-' }}</td>
                                <td class="text-center font-bold text-red-600">
                                    {{ $item->jumlah_stunting }}
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4" class="text-center py-4 text-gray-500">
                                    Tidak ada data ditemukan
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener("alpine:init", () => {
            Alpine.data("stuntingTable", () => ({
                map: null,

                init() {
                    // Inisialisasi DataTable
                    const tableOptions = {
                        searchable: true,
                        perPageSelect: [5, 10, 25, 50],
                        labels: {
                            placeholder: "Cari data...",
                            perPage: "{select} data per halaman",
                            noRows: "Tidak ada data untuk ditampilkan",
                            info: "Menampilkan {start} - {end} dari {rows} data"
                        }
                    };

                    new simpleDatatables.DataTable('#tableStunting', tableOptions);

                    // Inisialisasi Peta Leaflet
                    this.initMap();
                },

                initMap() {
                    // Data dari Laravel
                    const stuntingData = @json($stuntingAnak);

                    // Set koordinat pusat (Surabaya sebagai default)
                    const centerLat = -7.2575;
                    const centerLng = 112.7521;

                    // Buat peta
                    this.map = L.map('mapStunting').setView([centerLat, centerLng], 12);

                    // Tambahkan tile layer (OpenStreetMap)
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        maxZoom: 19
                    }).addTo(this.map);

                    // Tambahkan marker untuk setiap faskes
                    stuntingData.forEach((faskes, index) => {
                        if (faskes.latitude && faskes.longitude) {
                            // Tentukan warna marker berdasarkan jumlah stunting
                            let markerColor = '#22c55e'; // hijau (rendah)
                            if (faskes.jumlah_stunting > 10) {
                                markerColor = '#ef4444'; // merah (tinggi)
                            } else if (faskes.jumlah_stunting > 5) {
                                markerColor = '#f59e0b'; // orange (sedang)
                            }

                            // Custom icon dengan warna
                            const customIcon = L.divIcon({
                                className: 'custom-marker',
                                html: `<div style="
                                    background-color: ${markerColor};
                                    width: 30px;
                                    height: 30px;
                                    border-radius: 50%;
                                    border: 3px solid white;
                                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: white;
                                    font-weight: bold;
                                    font-size: 12px;
                                ">${faskes.jumlah_stunting}</div>`,
                                iconSize: [30, 30],
                                iconAnchor: [15, 15]
                            });

                            // Buat marker
                            const marker = L.marker([faskes.latitude, faskes.longitude], {
                                icon: customIcon
                            }).addTo(this.map);

                            // Buat popup
                            const popupContent = `
                                <div style="min-width: 200px;">
                                    <h6 style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">
                                        ${faskes.nama}
                                    </h6>
                                    <p style="margin: 4px 0; font-size: 12px;">
                                        <strong>Alamat:</strong><br>${faskes.alamat || '-'}
                                    </p>
                                    <p style="margin: 8px 0; padding: 8px; background: #fee2e2; border-radius: 4px; text-align: center;">
                                        <strong style="color: #dc2626; font-size: 16px;">
                                            ${faskes.jumlah_stunting}
                                        </strong><br>
                                        <span style="font-size: 11px; color: #991b1b;">Anak Stunting</span>
                                    </p>
                                </div>
                            `;

                            marker.bindPopup(popupContent);
                        }
                    });

                    // Auto fit bounds jika ada data
                    if (stuntingData.length > 0) {
                        const validCoords = stuntingData.filter(f => f.latitude && f.longitude);
                        if (validCoords.length > 0) {
                            const bounds = validCoords.map(f => [f.latitude, f.longitude]);
                            this.map.fitBounds(bounds, { padding: [50, 50] });
                        }
                    }

                    // Tambahkan legenda
                    this.addLegend();
                },

                addLegend() {
                    const legend = L.control({ position: 'bottomright' });

                    legend.onAdd = function() {
                        const div = L.DomUtil.create('div', 'info legend');
                        div.style.background = 'white';
                        div.style.padding = '10px';
                        div.style.borderRadius = '8px';
                        div.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

                        div.innerHTML = `
                            <div style="font-weight: bold; margin-bottom: 8px; font-size: 12px;">
                                Tingkat Stunting
                            </div>
                            <div style="margin: 4px 0; font-size: 11px;">
                                <span style="display: inline-block; width: 15px; height: 15px; background: #22c55e; border-radius: 50%; margin-right: 5px;"></span>
                                Rendah (0-5)
                            </div>
                            <div style="margin: 4px 0; font-size: 11px;">
                                <span style="display: inline-block; width: 15px; height: 15px; background: #f59e0b; border-radius: 50%; margin-right: 5px;"></span>
                                Sedang (6-10)
                            </div>
                            <div style="margin: 4px 0; font-size: 11px;">
                                <span style="display: inline-block; width: 15px; height: 15px; background: #ef4444; border-radius: 50%; margin-right: 5px;"></span>
                                Tinggi (>10)
                            </div>
                        `;

                        return div;
                    };

                    legend.addTo(this.map);
                }
            }));
        });
    </script>
</x-superadmin.app>
