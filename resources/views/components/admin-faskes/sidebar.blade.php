<div :class="{ 'dark text-white-dark': $store.app.semidark }">
    <nav x-data="{ activeDropdown: null }"
        class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
        <div class="bg-white dark:bg-[#0e1726] h-full">
            <div class="flex items-center justify-between px-4 py-3">
                <a href="/" class="flex items-center main-logo shrink-0">
                    <img class="w-8 ml-[5px] flex-none" src="/assets/images/simkesia-logo.png" alt="image" />
                    <span
                        class="text-xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">SIMKESIA</span>
                </a>
                <a href="javascript:;"
                    class="flex items-center w-8 h-8 transition duration-300 rounded-full collapse-icon hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light rtl:rotate-180"
                    @click="$store.app.toggleSidebar()">
                    <svg class="w-5 h-5 m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor"
                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a>
            </div>

            <ul class="perfect-scrollbar relative font-semibold space-y-0.5 h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden p-4 py-0"
                x-data="{ activeDropdown: null }">

                <!-- Dashboard -->
                <li class="menu nav-item">
                    <a href="/admin-faskes/dashboard" class="nav-link group">
                        <div class="flex items-center">
                            <!-- Icon Dashboard -->
                            <svg class="group-hover:!text-primary shrink-0" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.5"
                                    d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                    fill="currentColor" />
                                <path
                                    d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                                    fill="currentColor" />
                            </svg>
                            <span
                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                Dashboard
                            </span>
                        </div>
                    </a>
                </li>


                <!-- Faskes -->
                <h2
                    class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                    <span>Faskes</span>
                </h2>
                <li class="nav-item">
                    <ul>
                        <li class="nav-item">
                            <a href="/admin-faskes/petugas" class="group">
                                <div class="flex items-center">
                                    <!-- Icon Petugas -->
                                    <svg class="group-hover:!text-primary shrink-0" width="20" height="20"
                                        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="7" r="4" />
                                        <path d="M5.5 21a7.5 7.5 0 0113 0" />
                                    </svg>
                                    <span class="ltr:pl-3 rtl:pr-3">Petugas</span>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/admin-faskes/jadwal-ketersediaan" class="group">
                                <div class="flex items-center">
                                    <!-- Icon Jadwal -->
                                    <svg class="group-hover:!text-primary shrink-0" width="20" height="20"
                                        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span class="ltr:pl-3 rtl:pr-3">Jadwal Ketersediaan</span>
                                </div>
                            </a>
                        </li>
                        {{-- <li class="nav-item">
                            <a href="/pengaturan" class="group">
                                <div class="flex items-center">
                                    <!-- Icon Pengaturan -->
                                    <svg class="group-hover:!text-primary shrink-0" width="20" height="20"
                                        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="3" />
                                        <path
                                            d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09c.7 0 1.31-.4 1.51-1a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09c0 .7.4 1.31 1 1.51a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09c0 .7.4 1.31 1 1.51a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                                    </svg>
                                    <span class="ltr:pl-3 rtl:pr-3">Pengaturan</span>
                                </div>
                            </a>
                        </li> --}}
                    </ul>
                </li>

                <!-- Pasien -->
                {{-- <h2
                    class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                    <span>Pasien</span>
                </h2>
                <li class="nav-item">
                    <ul>
                        <li class="nav-item">
                            <a href="/riwayat-ibu" class="group">
                                <div class="flex items-center">
                                    <!-- Icon Riwayat Ibu -->
                                    <svg class="group-hover:!text-primary shrink-0" width="20" height="20"
                                        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path d="M9 11a4 4 0 018 0c0 2-1 4-4 4s-4-2-4-4z" />
                                        <path d="M12 19c3 0 6-2 6-6" />
                                    </svg>
                                    <span class="ltr:pl-3 rtl:pr-3">Riwayat Ibu</span>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/riwayat-anak" class="group">
                                <div class="flex items-center">
                                    <!-- Icon Riwayat Anak -->
                                    <svg class="group-hover:!text-primary shrink-0" width="20" height="20"
                                        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="7" r="4" />
                                        <path d="M5.5 21a7.5 7.5 0 0113 0" />
                                    </svg>
                                    <span class="ltr:pl-3 rtl:pr-3">Riwayat Anak</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </li> --}}

            </ul>
        </div>
    </nav>
</div>
