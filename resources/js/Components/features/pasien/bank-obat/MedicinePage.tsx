// ('use client');
// import { Button } from '@/Components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
// import { Link } from '@inertiajs/react';

// import { Input } from '@/Components/ui/input';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/Components/ui/select';
// import { medicinesData } from '@/data/medicine';
// import {
//     Clock,
//     Heart,
//     RefreshCcw,
//     Shield,
//     SlidersHorizontal,
// } from 'lucide-react';

// const getSafetyBadge = (safety: string) => {
//     switch (safety) {
//         case 'safe':
//             return (
//                 <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
//                     <Shield className="w-3 h-3" />
//                     Aman
//                 </span>
//             );
//         case 'caution':
//             return (
//                 <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
//                     <Clock className="w-3 h-3" />
//                     Hati-hati
//                 </span>
//             );
//         case 'consult':
//             return (
//                 <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
//                     <Heart className="w-3 h-3" />
//                     Konsultasi
//                 </span>
//             );
//         default:
//             return null;
//     }
// };

// const MedicinePage = () => {
//     return (
//         <div>
//             <div
//                 className="relative py-8 overflow-hidden"
//                 style={{
//                     backgroundImage: "url('assets/images/story-bg2.png')",
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     backgroundRepeat: 'no-repeat',
//                 }}
//             >
//                 <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     <div className="mb-8">
//                         <h1 className="mb-2 text-3xl font-bold text-gray-900">
//                             Bank Obat
//                         </h1>
//                         <p className="text-gray-600">
//                             Temukan obat aman untuk Bunda & si kecil, lengkap
//                             dengan aturan pemakaian nya.
//                         </p>
//                     </div>
//                     <Card className="mb-6 bg-white rounded-xl">
//                         <CardHeader>
//                             <div className="flex items-center justify-between">
//                                 <CardTitle className="flex items-center gap-4 text-lg">
//                                     <div className="flex items-center">
//                                         <SlidersHorizontal
//                                             size={20}
//                                             className="mr-2 text-sky-600"
//                                         />
//                                         Filter Obat
//                                     </div>
//                                 </CardTitle>
//                                 <Button variant="outline" size="sm">
//                                     <RefreshCcw className="w-4 h-4 mr-2" />
//                                     Reset Filter
//                                 </Button>
//                             </div>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="grid grid-cols-1 divide-y divide-gray-300 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
//                                 <div className="py-4 sm:py-0 sm:pr-6">
//                                     <label className="block mb-2 text-sm font-medium text-gray-700">
//                                         Kategori Obat
//                                     </label>
//                                     <Select>
//                                         <SelectTrigger className="w-full border-gray-400">
//                                             <SelectValue placeholder="Semua Kategori" />
//                                         </SelectTrigger>
//                                         <SelectContent className="bg-white border border-gray-200">
//                                             <SelectItem value="all">
//                                                 Semua Kategori
//                                             </SelectItem>
//                                             <SelectItem value="vitamin">
//                                                 Vitamin
//                                             </SelectItem>
//                                             <SelectItem value="mineral">
//                                                 Mineral
//                                             </SelectItem>
//                                             <SelectItem value="analgesik">
//                                                 Analgesik
//                                             </SelectItem>
//                                             <SelectItem value="pencernaan">
//                                                 Pencernaan
//                                             </SelectItem>
//                                             <SelectItem value="suplemen">
//                                                 Suplemen
//                                             </SelectItem>
//                                             <SelectItem value="anti-mual">
//                                                 Anti-mual
//                                             </SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                                 <div className="py-4 sm:px-6 sm:py-0">
//                                     <label className="block mb-2 text-sm font-medium text-gray-700">
//                                         Jenis Obat
//                                     </label>
//                                     <Select>
//                                         <SelectTrigger className="w-full border-gray-400">
//                                             <SelectValue placeholder="Semua Kategori" />
//                                         </SelectTrigger>
//                                         <SelectContent className="bg-white border border-gray-200">
//                                             <SelectItem value="all">
//                                                 Semua Kategori
//                                             </SelectItem>
//                                             <SelectItem value="vitamin">
//                                                 Vitamin
//                                             </SelectItem>
//                                             <SelectItem value="mineral">
//                                                 Mineral
//                                             </SelectItem>
//                                             <SelectItem value="analgesik">
//                                                 Analgesik
//                                             </SelectItem>
//                                             <SelectItem value="pencernaan">
//                                                 Pencernaan
//                                             </SelectItem>
//                                             <SelectItem value="suplemen">
//                                                 Suplemen
//                                             </SelectItem>
//                                             <SelectItem value="anti-mual">
//                                                 Anti-mual
//                                             </SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                                 <div className="py-4 sm:py-0 sm:pl-6">
//                                     <label className="block mb-2 text-sm font-medium text-gray-700">
//                                         Pencarian Obat
//                                     </label>
//                                     <Input
//                                         type="text"
//                                         placeholder="Cari berdasarkan nama obat..."
//                                         className="w-full"
//                                     />
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//             <div className="relative px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                     {medicinesData.map((medicine) => (
//                         <Card
//                             key={medicine.id}
//                             className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md group hover:-translate-y-1 hover:shadow-xl"
//                         >
//                             <div className="relative h-48 overflow-hidden">
//                                 <img
//                                     src={medicine.image}
//                                     alt={medicine.name}
//                                     className="object-contain w-full h-full transition-transform duration-300 line-clamp-1 group-hover:scale-105"
//                                 />
//                                 <div className="absolute right-3 top-3">
//                                     {getSafetyBadge(medicine.safety)}
//                                 </div>
//                                 <div className="absolute bottom-3 left-3">
//                                     <span className="px-2 py-1 text-xs font-medium text-gray-700 rounded-full bg-white/90 backdrop-blur-sm">
//                                         {medicine.category}
//                                     </span>
//                                 </div>
//                             </div>
//                             <CardContent className="p-6">
//                                 <div className="flex items-start justify-between mb-3">
//                                     <h3 className="text-lg font-bold text-gray-900 transition-colors line-clamp-1 group-hover:text-sky-600">
//                                         {medicine.name}
//                                     </h3>
//                                     <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
//                                         {medicine.type}
//                                     </span>
//                                 </div>

//                                 <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">
//                                     {medicine.description}
//                                 </p>
//                                 <Link
//                                     href={`/pasien/bank-obat/${medicine.id}`}
//                                     className="block w-full py-2 font-semibold text-center text-white rounded-md bg-secondary hover:bg-secondary/90"
//                                 >
//                                     Lihat Detail
//                                 </Link>
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MedicinePage;
('use client');
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { medicinesData } from '@/data/medicine';
import { Link } from '@inertiajs/react';
import {
    Clock,
    Heart,
    RefreshCcw,
    Shield,
    SlidersHorizontal,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const getSafetyBadge = (safety: string) => {
    switch (safety) {
        case 'safe':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    <Shield className="h-3 w-3" />
                    Aman
                </span>
            );
        case 'caution':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                    <Clock className="h-3 w-3" />
                    Hati-hati
                </span>
            );
        case 'consult':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    <Heart className="h-3 w-3" />
                    Konsultasi
                </span>
            );
        default:
            return null;
    }
};

const MedicinePage = () => {
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [safetyFilter, setSafetyFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = useMemo(() => {
        const cats = [...new Set(medicinesData.map((m) => m.category))];
        return cats;
    }, []);

    const filteredMedicines = useMemo(() => {
        return medicinesData.filter((medicine) => {
            const matchCategory =
                categoryFilter === 'all' ||
                medicine.category === categoryFilter;

            const matchSafety =
                safetyFilter === 'all' || medicine.safety === safetyFilter;

            const matchSearch =
                searchQuery === '' ||
                medicine.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                medicine.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            return matchCategory && matchSafety && matchSearch;
        });
    }, [categoryFilter, safetyFilter, searchQuery]);

    const handleResetFilters = () => {
        setCategoryFilter('all');
        setSafetyFilter('all');
        setSearchQuery('');
    };

    return (
        <div>
            <div
                className="relative overflow-hidden py-8"
                style={{
                    backgroundImage: "url('assets/images/story-bg2.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Bank Obat
                        </h1>
                        <p className="text-gray-600">
                            Temukan obat aman untuk Bunda & si kecil, lengkap
                            dengan aturan pemakaian nya.
                        </p>
                    </div>
                    <Card className="mb-6 rounded-xl bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-4 text-lg">
                                    <div className="flex items-center">
                                        <SlidersHorizontal
                                            size={20}
                                            className="mr-2 text-sky-600"
                                        />
                                        Filter Obat
                                    </div>
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleResetFilters}
                                >
                                    <RefreshCcw className="mr-2 h-4 w-4" />
                                    Reset Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 divide-y divide-gray-300 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                                <div className="py-4 sm:py-0 sm:pr-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Kategori Obat
                                    </label>
                                    <Select
                                        value={categoryFilter}
                                        onValueChange={setCategoryFilter}
                                    >
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Kategori" />
                                        </SelectTrigger>
                                        <SelectContent className="border border-gray-200 bg-white">
                                            <SelectItem value="all">
                                                Semua Kategori
                                            </SelectItem>
                                            {categories.map((cat) => (
                                                <SelectItem
                                                    key={cat}
                                                    value={cat}
                                                >
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="py-4 sm:px-6 sm:py-0">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Status Keamanan
                                    </label>
                                    <Select
                                        value={safetyFilter}
                                        onValueChange={setSafetyFilter}
                                    >
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Semua Status" />
                                        </SelectTrigger>
                                        <SelectContent className="border border-gray-200 bg-white">
                                            <SelectItem value="all">
                                                Semua Status
                                            </SelectItem>
                                            <SelectItem value="safe">
                                                Aman
                                            </SelectItem>
                                            <SelectItem value="caution">
                                                Hati-hati
                                            </SelectItem>
                                            <SelectItem value="consult">
                                                Konsultasi
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="py-4 sm:py-0 sm:pl-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Pencarian Obat
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Cari berdasarkan nama obat..."
                                        className="w-full"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {filteredMedicines.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-lg text-gray-500">
                            Tidak ada obat yang sesuai dengan filter Anda
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={handleResetFilters}
                        >
                            Reset Filter
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Menampilkan{' '}
                                <span className="font-semibold">
                                    {filteredMedicines.length}
                                </span>{' '}
                                dari{' '}
                                <span className="font-semibold">
                                    {medicinesData.length}
                                </span>{' '}
                                obat
                            </p>
                            {(categoryFilter !== 'all' ||
                                safetyFilter !== 'all' ||
                                searchQuery !== '') && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleResetFilters}
                                    className="text-sky-600 hover:text-sky-700"
                                >
                                    Hapus semua filter
                                </Button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredMedicines.map((medicine) => (
                                <Card
                                    key={medicine.id}
                                    className="group overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={medicine.image}
                                            alt={medicine.name}
                                            className="line-clamp-1 h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute right-3 top-3">
                                            {getSafetyBadge(medicine.safety)}
                                        </div>
                                        <div className="absolute bottom-3 left-3">
                                            <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                                                {medicine.category}
                                            </span>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="mb-3 flex items-start justify-between">
                                            <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-sky-600">
                                                {medicine.name}
                                            </h3>
                                            <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                                                {medicine.type}
                                            </span>
                                        </div>

                                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                            {medicine.description}
                                        </p>
                                        <Link
                                            href={`/pasien/bank-obat/${medicine.id}`}
                                            className="block w-full rounded-md bg-secondary py-2 text-center font-semibold text-white hover:bg-secondary/90"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MedicinePage;
