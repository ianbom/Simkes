import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/Components/ui/dropdown-menu';
import { User } from '@/types/user/interface';
import {
    Baby,
    HeartPulse,
    LogOut,
    SquareActivity,
    Stethoscope,
    User as UserIcon,
    Video,
} from 'lucide-react';
import { router } from '@inertiajs/react';

interface Props {
    user?: User;
    onProfileClick: () => void;
    onLogoutClick: () => void;
    child: any;
    pregnant: any;
}

export function getProfileMenuContent({
    user,
    onLogoutClick,
    child,
    pregnant,
}: Props): React.ReactNode {

    const handleNavigate = (routeName: string, id?: number) => {
        if (id) {
            router.visit(route(routeName, id));
        }
    };

    const hasChild = !!child;
    const hasPregnant = !!pregnant;

    return (
        <>
            <div className="px-3 py-2.5">
                <p className="text-sm font-semibold text-gray-900">
                    {user?.name || 'Guest'}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">{user?.email}</p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                Profil
            </DropdownMenuLabel>

            <DropdownMenuItem
                onClick={() => (location.href = `/pasien/profil`)}
                className="flex cursor-pointer items-center gap-2"
            >
                <UserIcon className="h-4 w-4" />
                <span>Profil Saya</span>
            </DropdownMenuItem>

            <DropdownMenuLabel className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                Riwayat
            </DropdownMenuLabel>

            <DropdownMenuItem
                onClick={() => (location.href = `/pasien/history/checkup-kehamilan`)}
                className="flex cursor-pointer items-center gap-2"
            >
                <SquareActivity className="h-4 w-4" />
                <span>Checkup Kehamilan</span>
            </DropdownMenuItem>

            <DropdownMenuItem
                onClick={() => (location.href = `/pasien/history/checkup-balita`)}
                className="flex cursor-pointer items-center gap-2"
            >
                <Stethoscope className="h-4 w-4" />
                <span>Checkup Balita</span>
            </DropdownMenuItem>

            <DropdownMenuItem
                onClick={() => (location.href = `/pasien/history/konsultasi-online`)}
                className="flex cursor-pointer items-center gap-2"
            >
                <Video className="h-4 w-4" />
                <span>Konsultasi Online</span>
            </DropdownMenuItem>

            <DropdownMenuLabel className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                Perkembangan
            </DropdownMenuLabel>

            {/* 🩷 Perkembangan Janin */}
            <DropdownMenuItem
                onClick={() => hasPregnant && handleNavigate('pasien.view.perkembanganKehamilan', pregnant.id)}
                disabled={!hasPregnant}
                className={`flex items-center gap-2 ${
                    hasPregnant
                        ? 'cursor-pointer hover:bg-gray-100'
                        : 'opacity-50 cursor-not-allowed'
                }`}
            >
                <HeartPulse className="h-4 w-4" />
                <span>Perkembangan Janin</span>
            </DropdownMenuItem>

            {/* 👶 Perkembangan Balita */}
            <DropdownMenuItem
                onClick={() => hasChild && handleNavigate('pasien.view.perkembanganAnak', child.id)}
                disabled={!hasChild}
                className={`flex items-center gap-2 ${
                    hasChild
                        ? 'cursor-pointer hover:bg-gray-100'
                        : 'opacity-50 cursor-not-allowed'
                }`}
            >
                <Baby className="h-4 w-4" />
                <span>Perkembangan Balita</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
                onClick={onLogoutClick}
                className="flex cursor-pointer items-center gap-2 text-red-600 focus:bg-red-50 focus:text-red-600"
            >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </DropdownMenuItem>
        </>
    );
}
