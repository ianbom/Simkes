'use client';

import { Faskes } from '@/types/faskes/interface';
import { router } from '@inertiajs/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
    faskes: Faskes[];
}

const FaskesMap: React.FC<Props> = ({ faskes }) => {
    const defaultCenter: [number, number] = [-7.3, 112.7];
    const zoom = 9;
    return (
        <div className="relative z-0 h-[75vh] w-full rounded-xl border border-gray-200 shadow-lg">
            <MapContainer
                center={defaultCenter}
                zoom={zoom}
                scrollWheelZoom
                className="w-full h-full rounded-xl"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                />

                {faskes.map((item) => (
                    <Marker
                        key={item.id}
                        position={[item.latitude, item.longitude]}
                        icon={DefaultIcon}
                    >
                        <Popup>
                            <div className="w-48 space-y-2">
                                {/* <img
                                    src={item.profile_pic_url}
                                    alt={item.nama}
                                    className="block object-cover w-16 h-16 mx-auto rounded-md"
                                /> */}

                                {/* Info faskes */}
                                <div>
                                    <strong className="block text-base font-semibold text-gray-900">
                                        {item.nama}
                                    </strong>
                                    <span
                                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-white ${
                                            item.tipe_faskes === 'Puskesmas'
                                                ? 'bg-green-500'
                                                : item.tipe_faskes === 'Klinik'
                                                  ? 'bg-blue-500'
                                                  : item.tipe_faskes === 'RSIA'
                                                    ? 'bg-pink-500'
                                                    : item.tipe_faskes ===
                                                        'RSUD'
                                                      ? 'bg-purple-500'
                                                      : 'bg-orange-500'
                                        } `}
                                    >
                                        {item.tipe_faskes}
                                    </span>
                                    <p className="text-xs text-gray-500 line-clamp-2">
                                        {item.alamat}
                                    </p>
                                </div>

                                {/* Tombol detail */}
                                <button
                                    onClick={() =>
                                        router.visit(
                                            `/pasien/faskes/${item.id}`,
                                        )
                                    }
                                    className="w-full px-3 py-2 text-xs font-medium text-white transition rounded-md bg-sky-600 hover:bg-sky-700"
                                >
                                    Lihat Detail
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default FaskesMap;
