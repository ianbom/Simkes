export interface NavUser {
    name: string;
    profile_url?: string;
    email: string;
}

export interface NavItems {
    id: string;
    label: string;
    key: string;
    showOnMobile: boolean;
    showOnDesktop: boolean;
    hasDropdown?: boolean;
    dropdownItems?: DropdownItem[];
}
export interface DropdownItem {
    id: string;
    label: string;
    key: string;
}
