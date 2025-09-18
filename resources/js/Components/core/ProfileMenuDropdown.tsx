import { User } from '@/types/user/interface';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
interface Props {
    user?: User;
    menuItems: React.ReactNode;
}

const ProfileMenuDropdown = ({ user, menuItems }: Props) => {
    const userName = user?.name?.trim() || 'Guest';
    const userInitial = userName ? userName.charAt(0).toUpperCase() : 'G';
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-full transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={
                                user?.profile_pic_url
                                    ? `/storage/${user.profile_pic_url}`
                                    : undefined
                            }
                            alt={userName}
                        />
                        <AvatarFallback className="bg-sky-100 text-sm font-semibold text-sky-700">
                            {userInitial}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
                {menuItems}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileMenuDropdown;
