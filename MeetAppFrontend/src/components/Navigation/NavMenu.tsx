import React from 'react';
import { User } from '@/features/users/types';
import MessagesIcon from '@/assets/images/MessagesIcon.svg';
import FriendsIcon from '@/assets/images/FriendsIcon.svg';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import { NavIcon } from '@/components/Navigation/NavIcon';
import NavbarMessagesBox from '@/features/messages/components/NavbarMessagesBox';
import Avatar from '@/features/users/components/Avatar';
import { routes } from '@/utils/routes';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

type Props = {
  user?: User;
};

export default function NavMenu({ user }: Props) {
  return (
    <nav className="flex-none">
      {user && user ? (
        <ul className="menu menu-horizontal flex items-center px-1">
          <Popover>
            <PopoverTrigger>
              <NavIcon img={FriendsIcon} imgAlt="Friends icon" />
            </PopoverTrigger>
            <PopoverContent>
              <div>List of invites</div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>
              <NavIcon img={MessagesIcon} imgAlt="Messages icon" />
            </PopoverTrigger>
            <PopoverContent>
              <NavbarMessagesBox />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className=" h-12 ">
              <div className="avatar p-0" tabIndex={0}>
                {user?.photoUrl && <Avatar imgUrl={user.photoUrl} name={user.knownAs} width={50} height={50} />}
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <ul tabIndex={0} className="w-50 dropdown-content menu rounded-box z-[1] mt-4 bg-base-100 p-2 shadow">
                <li className="text-black">
                  <Link href={routes.userProfile.replace(':username', user.userName)} className="text-sm font-bold">
                    My Profile
                  </Link>
                </li>
                <li className="text-black" onClick={() => signOut({ callbackUrl: routes.home })}>
                  <a>Log out</a>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </ul>
      ) : (
        <Link href={routes.signin} className="text-sm font-bold">
          Log In
        </Link>
      )}
    </nav>
  );
}
