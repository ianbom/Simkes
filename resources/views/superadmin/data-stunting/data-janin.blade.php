<x-superadmin.app>
    <script src="/assets/js/simple-datatables.js"></script>

    <!-- Leaflet CSS & JS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <div x-data="stuntingJaninTable">
        <div class="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            <div class="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                </svg>
            </div>
            <span class="ltr:mr-3 rtl:ml-3 font-semibold">Data Janin Berisiko per Faskes</span>
        </div>

        <!-- Peta Persebaran Janin Berisiko -->
        <div class="panel mt-6">
            <h5 class="font-semibold text-lg dark:text-white-light mb-5">🗺️ Peta Persebaran Janin Berisiko per Faskes</h5>
            <div id="mapJanin" style="height: 500px; width: 100%; border-radius: 8px;"></div>
        </div>

        <!-- Tabel Statistik -->
        <div class="panel mt-6">
            <h5 class="font-semibold text-lg dark:text-white-light mb-5">📊 Statistik Janin Berisiko</h5>

            <div class="table-responsive">
                <table id="tableJanin" class="whitespace-nowrap table-hover w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Faskes</th>
                            <th>Alamat</th>
                            <th class="text-center">Jumlah Janin Berisiko</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($janinTidakNormal as $index => $item)
                            <tr>
                                <td>{{ $index + 1 }}</td>
                                <td class="font-semibold">{{ $item->nama }}</td>
                                <td>{{ $item->alamat ?? '-' }}</td>
                                <td class="text-center font-bold text-red-600">
                                    {{ $item->jumlah_janin_tidak_normal }}
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

        <!-- Info Card -->
        <div class="panel mt-6">
            <div class="mb-5">
                <h5 class="font-semibold text-lg dark:text-white-light mb-3">ℹ️ Kriteria Janin Berisiko</h5>
                <div class="space-y-2 text-sm">
                    <div class="flex items-start">
                        <span class="text-warning mr-2">•</span>
                        <span>Taksiran Berat Janin kurang dari 2500 gram</span>
                    </div>
                    <div class="flex items-start">
                        <span class="text-warning mr-2">•</span>
                        <span>Panjang Janin kurang dari 45 cm</span>
                    </div>
                    <div class="flex items-start">
                        <span class="text-warning mr-2">•</span>
                        <span>Denyut Jantung Janin di luar rentang normal (110-160 bpm)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener("alpine:init", () => {
            Alpine.data("stuntingJaninTable", () => ({
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

                    new simpleDatatables.DataTable('#tableJanin', tableOptions);

                    // Inisialisasi Peta Leaflet
                    this.initMap();
                },

                initMap() {
                    // Data dari Laravel
                    const janinData = @json($janinTidakNormal);

                    // Set koordinat pusat (Surabaya sebagai default)
                    const centerLat = -7.2575;
                    const centerLng = 112.7521;

                    // Buat peta
                    this.map = L.map('mapJanin').setView([centerLat, centerLng], 12);

                    // Tambahkan tile layer (OpenStreetMap)
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        maxZoom: 19
                    }).addTo(this.map);

                    // Tambahkan marker untuk setiap faskes
                    janinData.forEach((faskes, index) => {
                        if (faskes.latitude && faskes.longitude) {
                            // Tentukan warna marker berdasarkan jumlah janin berisiko
                            let markerColor = '#22c55e'; // hijau (rendah)
                            if (faskes.jumlah_janin_tidak_normal > 10) {
                                markerColor = '#ef4444'; // merah (tinggi)
                            } else if (faskes.jumlah_janin_tidak_normal > 5) {
                                markerColor = '#f59e0b'; // orange (sedang)
                            } else if (faskes.jumlah_janin_tidak_normal === 0) {
                                markerColor = '#3b82f6'; // biru (tidak ada kasus)
                            }

                            // Custom icon dengan warna
                            const customIcon = L.divIcon({
                                className: 'custom-marker',
                                html: `<div style="
                                    background-color: ${markerColor};
                                    width: 35px;
                                    height: 35px;
                                    border-radius: 50%;
                                    border: 3px solid white;
                                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: white;
                                    font-weight: bold;
                                    font-size: 13px;
                                ">${faskes.jumlah_janin_tidak_normal}</div>`,
                                iconSize: [35, 35],
                                iconAnchor: [17.5, 17.5]
                            });

                            // Buat marker
                            const marker = L.marker([faskes.latitude, faskes.longitude], {
                                icon: customIcon
                            }).addTo(this.map);

                            // Status berdasarkan jumlah
                            let statusText = 'Tidak Ada Kasus';
                            let statusColor = '#3b82f6';
                            if (faskes.jumlah_janin_tidak_normal > 10) {
                                statusText = 'Tinggi';
                                statusColor = '#ef4444';
                            } else if (faskes.jumlah_janin_tidak_normal > 5) {
                                statusText = 'Sedang';
                                statusColor = '#f59e0b';
                            } else if (faskes.jumlah_janin_tidak_normal > 0) {
                                statusText = 'Rendah';
                                statusColor = '#22c55e';
                            }

                            // Buat popup
                            const popupContent = `
                                <div style="min-width: 220px;">
                                    <h6 style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">
                                        ${faskes.nama}
                                    </h6>
                                    <p style="margin: 4px 0; font-size: 12px;">
                                        <strong>Alamat:</strong><br>${faskes.alamat || '-'}
                                    </p>
                                    <div style="margin-top: 10px; padding: 10px; background: #fef3c7; border-radius: 6px; text-align: center;">
                                        <strong style="color: #92400e; font-size: 18px;">
                                            ${faskes.jumlah_janin_tidak_normal}
                                        </strong><br>
                                        <span style="font-size: 11px; color: #78350f;">Janin Berisiko</span>
                                    </div>
                                    <div style="margin-top: 8px; padding: 6px; background: ${statusColor}; color: white; border-radius: 4px; text-align: center; font-size: 12px; font-weight: bold;">
                                        Status: ${statusText}
                                    </div>
                                </div>
                            `;

                            marker.bindPopup(popupContent);
                        }
                    });

                    // Auto fit bounds jika ada data
                    if (janinData.length > 0) {
                        const validCoords = janinData.filter(f => f.latitude && f.longitude);
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
                        div.style.padding = '12px';
                        div.style.borderRadius = '8px';
                        div.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

                        div.innerHTML = `
                            <div style="font-weight: bold; margin-bottom: 10px; font-size: 12px;">
                                Tingkat Risiko
                            </div>
                            <div style="margin: 5px 0; font-size: 11px;">
                                <span style="display: inline-block; width: 15px; height: 15px; background: #3b82f6; border-radius: 50%; margin-right: 5px;"></span>
                                Tidak Ada (0)
                            </div>
                            <div style="margin: 5px 0; font-size: 11px;">
                                <span style="display: inline-block; width: 15px; height: 15px; background: #22c55e; border-radius: 50%; margin-right: 5px;"></span>
                                Rendah (1-5)
                            </div>
                            <div style="margin: 5px 0; font-size: 11px;">
                                <span style="display: inline-block; width: 15px; height: 15px; background: #f59e0b; border-radius: 50%; margin-right: 5px;"></span>
                                Sedang (6-10)
                            </div>
                            <div style="margin: 5px 0; font-size: 11px;">
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
