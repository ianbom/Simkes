
import { Weight } from 'lucide-react';
import { useState, useMemo } from 'react';
import GrafikBalita from './GrafikBalita';



const ChildGraphPage = ({ child, growth, allChilds }) => {
    const [activeTab, setActiveTab] = useState('weight');

    const handleSelectChild = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value
    if (selectedId && selectedId !== String(child?.id)) {
      router.get(route('view.perkembanganAnak', selectedId))
    }
  }

    return (
        <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
            <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="p-6 mb-6 bg-white shadow-sm rounded-2xl">
                    <h1 className="mb-6 text-2xl font-bold text-gray-800">
                        Grafik Pertumbuhan Anak
                    </h1>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              {/* Info Anak */}
              <div className="p-4 bg-white border border-purple-100 shadow-sm rounded-xl lg:col-span-2">
                <div className="flex flex-col h-full gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center bg-purple-200 rounded-full h-14 w-14">
                      <span className="text-2xl font-bold text-purple-600">
                        {child?.nama?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-semibold text-gray-800">
                        {child?.nama || 'Nama Anak'}
                      </h3>
                      <p className="text-sm text-blue-500">
                        {child?.tanggal_lahir || 'Tanggal Lahir'}
                      </p>
                    </div>
                  </div>

                        {/* Dropdown Pilih Anak */}
                  {allChilds && allChilds.length > 1 && (
                          <div className="mt-2">
                            <label
                              htmlFor="childSelect"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Pilih Anak
                            </label>
                            <select
                              id="childSelect"
                              value={child?.id || ''}
                              onChange={(e) => {
                                const selectedChildId = e.target.value;
                                // router.get(route('pasien.view.perkembanganAnak', selectedChildId));
                                window.location.href = route('pasien.view.perkembanganAnak', selectedChildId);
                              }}
                              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            >
                              {allChilds.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.nama}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                    </div>
                  </div>

                  {/* Metric Cards */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:col-span-2">
                    {/* Tinggi Badan */}
                    <button
                      className={`rounded-xl p-4 text-left transition-all duration-200 ${
                        activeTab === 'height'
                          ? 'bg-sky-700'
                          : 'border-2 border-sky-200 bg-sky-50 hover:bg-sky-100'
                      }`}
                      onClick={() => setActiveTab('height')}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
                            activeTab === 'height' ? 'bg-white' : 'bg-sky-50'
                          }`}
                        >
                          <svg
                            className="w-10 h-10 text-cyan-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                          </svg>
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            activeTab === 'height'
                              ? 'font-semibold text-white'
                              : 'text-cyan-600'
                          }`}
                        >
                          Tinggi Badan
                        </span>
                      </div>
                    </button>

                    {/* Berat Badan */}
                    <button
                      className={`rounded-xl p-4 text-left transition-all duration-200 ${
                        activeTab === 'weight'
                          ? 'bg-sky-700'
                          : 'border-2 border-sky-200 bg-sky-50 hover:bg-sky-100'
                      }`}
                      onClick={() => setActiveTab('weight')}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
                            activeTab === 'weight' ? 'bg-white' : 'bg-sky-50'
                          }`}
                        >
                          <Weight
                            className={`h-8 w-8 ${
                              activeTab === 'weight'
                                ? 'text-sky-600'
                                : 'text-sky-600'
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            activeTab === 'weight'
                              ? 'font-semibold text-white'
                              : 'text-blue-600'
                          }`}
                        >
                          Berat Badan
                        </span>
                      </div>
                    </button>

                    {/* Lingkar Kepala */}
                    <button
                      className={`rounded-xl p-4 text-left transition-all duration-200 ${
                        activeTab === 'headCircumference'
                          ? 'bg-sky-700'
                          : 'border-2 border-sky-200 bg-sky-50 hover:bg-sky-100'
                      }`}
                      onClick={() => setActiveTab('headCircumference')}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${
                            activeTab === 'headCircumference'
                              ? 'bg-white'
                              : 'bg-sky-50'
                          }`}
                        >
                          <svg
                            className="w-10 h-10 text-teal-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z"
                            />
                          </svg>
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            activeTab === 'headCircumference'
                              ? 'font-semibold text-white'
                              : 'text-teal-600'
                          }`}
                        >
                          Lingkar Kepala
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

            </div>

            {/* Chart Section */}

            <GrafikBalita
                growth={growth}
                child={child}
                activeTab={activeTab}
            />


            </div>
        </div>
    );
};

export default ChildGraphPage;

