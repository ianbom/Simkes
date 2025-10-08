import { DropdownItem, NavItems, NavUser } from '@/types/navbar/interface';
import { User } from '@/types/user/interface';
import { ChevronDown, Medal, Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ProfileMenuDropdown from './ProfileMenuDropdown';

interface EnhancedNavItems extends NavItems {
    hasDropdown?: boolean;
    dropdownItems?: DropdownItem[];
}

interface NavbarProps {
    navItems: EnhancedNavItems[];
    onNavigate: (page: string) => void;
    currentPage: string;
    onNotificationClick: () => void;
    user?: NavUser;
    profileMenuContent: React.ReactNode;
}

const Navbar = ({
    navItems,
    onNavigate,
    currentPage,
    profileMenuContent,
    user,
}: NavbarProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(
        null,
    );
    // const { notifications } = usePage<PageProps>().props;
    // const unreadCount = notifications?.unread_count || 0;
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [currentPage]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
                setOpenDropdown(null);
                setMobileOpenDropdown(null);
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpenDropdown(null);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleNavItemClick = (key: string, hasDropdown?: boolean) => {
        if (hasDropdown) {
            return;
        }
        onNavigate(key);
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
        setMobileOpenDropdown(null);
    };

    const handleDropdownItemClick = (key: string) => {
        onNavigate(key);
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
        setMobileOpenDropdown(null);
    };

    const toggleDropdown = (itemKey: string) => {
        setOpenDropdown(openDropdown === itemKey ? null : itemKey);
    };

    const toggleMobileDropdown = (itemKey: string) => {
        setMobileOpenDropdown(mobileOpenDropdown === itemKey ? null : itemKey);
    };

    const getIconForNavItem = (key: string) => {
        switch (key) {
            case 'leaderboard':
                return Medal;
            case 'merchandise':
                return ShoppingBag;
            default:
                return null;
        }
    };

    const isCurrentPageInDropdown = (item: EnhancedNavItems) => {
        if (!item.hasDropdown || !item.dropdownItems) return false;
        return item.dropdownItems.some(
            (dropdownItem) => currentPage === dropdownItem.key,
        );
    };

    const isActive = (item: EnhancedNavItems) => {
        return currentPage === item.key || isCurrentPageInDropdown(item);
    };

    return (
        <>
            <nav className="fixed left-0 right-0 top-0 z-50 border-b border-sky-100 bg-white/95 shadow-sm backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div
                            className="group flex cursor-pointer items-center"
                            onClick={() => onNavigate('/homepage')}
                        >
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl">
                                <img
                                    src="/assets/images/simkesia-logo.png"
                                    alt="Logo KawanBumi"
                                    className="h-10 w-10"
                                />
                            </div>
                            <span className="bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-2xl font-bold text-transparent">
                                Simkesia
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div
                            className="hidden space-x-1 md:flex"
                            ref={dropdownRef}
                        >
                            {navItems
                                .filter((item) => item.showOnDesktop)
                                .map((item) => (
                                    <div key={item.id} className="relative">
                                        <button
                                            onClick={() =>
                                                item.hasDropdown
                                                    ? toggleDropdown(item.key)
                                                    : handleNavItemClick(
                                                          item.key,
                                                          item.hasDropdown,
                                                      )
                                            }
                                            className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                                isActive(item)
                                                    ? 'bg-sky-100 text-sky-700 shadow-sm'
                                                    : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600'
                                            }`}
                                        >
                                            {item.label}
                                            {item.hasDropdown && (
                                                <ChevronDown
                                                    size={16}
                                                    className={`ml-1 transition-transform duration-200 ${
                                                        openDropdown ===
                                                        item.key
                                                            ? 'rotate-180'
                                                            : ''
                                                    }`}
                                                />
                                            )}
                                        </button>

                                        {/* Desktop Dropdown */}
                                        {item.hasDropdown &&
                                            item.dropdownItems &&
                                            openDropdown === item.key && (
                                                <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-lg border border-sky-100 bg-white shadow-lg">
                                                    <div className="py-1">
                                                        {item.dropdownItems.map(
                                                            (dropdownItem) => (
                                                                <button
                                                                    key={
                                                                        dropdownItem.id
                                                                    }
                                                                    onClick={() =>
                                                                        handleDropdownItemClick(
                                                                            dropdownItem.key,
                                                                        )
                                                                    }
                                                                    className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-sky-50 hover:text-sky-600 ${
                                                                        currentPage ===
                                                                        dropdownItem.key
                                                                            ? 'bg-sky-50 text-sky-700'
                                                                            : 'text-gray-600'
                                                                    }`}
                                                                >
                                                                    {
                                                                        dropdownItem.label
                                                                    }
                                                                </button>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                ))}
                        </div>

                        <div className="flex items-center space-x-2">
                            {navItems
                                .filter(
                                    (item) =>
                                        !item.showOnDesktop &&
                                        getIconForNavItem(item.key),
                                )
                                .map((item) => {
                                    const IconComponent = getIconForNavItem(
                                        item.key,
                                    );
                                    return IconComponent ? (
                                        <button
                                            key={item.id}
                                            onClick={() =>
                                                handleNavItemClick(
                                                    item.key,
                                                    item.hasDropdown,
                                                )
                                            }
                                            className={`relative hidden rounded-lg p-2 transition-colors md:block ${
                                                currentPage === item.key
                                                    ? 'bg-sky-100 text-sky-600'
                                                    : 'text-gray-500 hover:bg-sky-50 hover:text-sky-600'
                                            }`}
                                            title={item.label}
                                        >
                                            <IconComponent size={20} />
                                        </button>
                                    ) : null;
                                })}
                            {/* <button
                                onClick={onNotificationClick}
                                className="relative p-2 text-gray-500 transition-colors rounded-lg hover:bg-sky-50 hover:text-sky-600"
                                title="Notifikasi"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <Badge className="absolute flex items-center justify-center w-5 h-5 p-0 text-xs text-white bg-red-500 -right-1 -top-1">
                                        {unreadCount > 99 ? '99+' : unreadCount}
                                    </Badge>
                                )}
                            </button> */}
                            <ProfileMenuDropdown
                                user={user as User}
                                menuItems={profileMenuContent}
                            />
                            <button
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
                                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-sky-50 hover:text-sky-600 md:hidden"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X size={20} />
                                ) : (
                                    <Menu size={20} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-sky-100 p-4">
                        <div
                            className="group flex cursor-pointer items-center"
                            onClick={() => {
                                onNavigate('/homepage');
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg">
                                <img
                                    src="/assets/images/simkesia-logo.png"
                                    alt="Logo KawanBumi"
                                    className="h-8 w-8"
                                />
                            </div>
                            <span className="bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-lg font-bold text-transparent">
                                Simkesia
                            </span>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-sky-50 hover:text-sky-600"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <nav className="space-y-2">
                            {navItems
                                .filter((item) => item.showOnMobile)
                                .map((item) => (
                                    <div key={item.id}>
                                        <button
                                            onClick={() =>
                                                item.hasDropdown
                                                    ? toggleMobileDropdown(
                                                          item.key,
                                                      )
                                                    : handleNavItemClick(
                                                          item.key,
                                                          item.hasDropdown,
                                                      )
                                            }
                                            className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                                                isActive(item)
                                                    ? 'bg-sky-100 text-sky-700 shadow-sm'
                                                    : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600'
                                            }`}
                                        >
                                            <span>{item.label}</span>
                                            {item.hasDropdown && (
                                                <ChevronDown
                                                    size={16}
                                                    className={`transition-transform duration-200 ${
                                                        mobileOpenDropdown ===
                                                        item.key
                                                            ? 'rotate-180'
                                                            : ''
                                                    }`}
                                                />
                                            )}
                                        </button>

                                        {/* Mobile Dropdown */}
                                        {item.hasDropdown &&
                                            item.dropdownItems &&
                                            mobileOpenDropdown === item.key && (
                                                <div className="ml-4 mt-1 space-y-1">
                                                    {item.dropdownItems.map(
                                                        (dropdownItem) => (
                                                            <button
                                                                key={
                                                                    dropdownItem.id
                                                                }
                                                                onClick={() =>
                                                                    handleDropdownItemClick(
                                                                        dropdownItem.key,
                                                                    )
                                                                }
                                                                className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                                                                    currentPage ===
                                                                    dropdownItem.key
                                                                        ? 'bg-sky-50 text-sky-700'
                                                                        : 'text-gray-500 hover:bg-sky-50 hover:text-sky-600'
                                                                }`}
                                                            >
                                                                {
                                                                    dropdownItem.label
                                                                }
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                ))}
                        </nav>
                    </div>

                    {user && (
                        <div className="border-t border-sky-100 p-4">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
                                    <span className="text-sm font-medium text-sky-700">
                                        {user.name?.charAt(0)?.toUpperCase() ||
                                            'U'}
                                    </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900">
                                        {user.name}
                                    </p>
                                    <p className="truncate text-xs text-gray-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
