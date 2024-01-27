import Link from 'next/link';
import { routes } from '@/utils/routes';
import { signOut } from 'next-auth/react';
import LogoLight from '@/assets/images/LogoLight.svg';
import MessagesIcon from '@/assets/images/MessagesIcon.svg';
import FriendsIcon from '@/assets/images/FriendsIcon.svg';
import Image from 'next/image';
import { NavIcon } from '@/components/Navigation/NavIcon';
import { getUsernameFromSession } from '@/utils/helpers';
import { useGetUser } from '@/features/users/hooks';
import { Popover } from '../Popover';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import NavbarMessagesBox from '@/features/messages/components/NavbarMessagesBox';
import Avatar from '@/features/users/components/Avatar';

type Props = {
  hideRoutes?: boolean;
};

export default function Navbar({ hideRoutes }: Props) {
  const username = getUsernameFromSession();
  const { data: user } = useGetUser(username);

  return (
    <header className="navbar z-10 bg-neutral px-12 text-neutral-content">
      <div className="flex-1">
        <Link className="relative h-6 w-32 text-xl normal-case disabled:hover" href={routes.home}>
          <Image fill src={LogoLight} alt="meetApp logo" />
        </Link>
      </div>
      {!hideRoutes && (
        <nav className="flex-none">
          {user && user ? (
            <ul className="menu menu-horizontal flex items-center px-1">
              <NavIcon route={routes.matches} img={FriendsIcon} imgAlt="Friends icon" />
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
                      <Link href={routes.userProfile.replace(':username', username)} className="text-sm font-bold">
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
      )}
    </header>
  );
}
