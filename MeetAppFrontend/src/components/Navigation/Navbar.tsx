import Link from 'next/link';
import { routes, routes as appRoutes } from '@/utils/routes';
import { signOut, useSession } from 'next-auth/react';
import LogoLight from '@/assets/images/LogoLight.svg';
import MessagesIcon from '@/assets/images/MessagesIcon.svg';
import FriendsIcon from '@/assets/images/FriendsIcon.svg';
import Image from 'next/image';
import { getUser } from '@/features/users/hooks';
import { NavIcon } from '@/components/Navigation/NavIcon';
import { useRouter } from 'next/router';

type Props = {
  hideRoutes?: boolean;
};

export default function Navbar({ hideRoutes }: Props) {
  const { data } = useSession();
  const { data: user, isLoading } = getUser(data?.user.name);
  const router = useRouter();

  if (!isLoading && user && !user.photoUrl && !hideRoutes) router.push(routes.user.replace(':username', user.userName));

  return (
    <header className="navbar z-10 bg-neutral px-12 text-neutral-content">
      <div className="flex-1">
        <Link className="relative h-6 w-32 text-xl normal-case disabled:hover" href={appRoutes.home}>
          <Image fill src={LogoLight} alt="meetApp logo" />
        </Link>
      </div>
      {!hideRoutes && (
        <nav className="flex-none">
          {data?.user ? (
            <ul className="menu menu-horizontal flex items-center px-1">
              <NavIcon route={routes.matches} img={FriendsIcon} imgAlt="Friends icon" />
              <NavIcon route={routes.messages} img={MessagesIcon} imgAlt="Messages icon" />
              <li className="dropdown" tabIndex={0}>
                <div className="avatar p-0" tabIndex={0}>
                  <div className="w-12 rounded-full">
                    {user && <Image src={user.photoUrl} width={50} height={50} alt="User main photo minature" />}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="w-50 dropdown-content menu rounded-box z-[1] mt-4 -translate-x-3 bg-base-100 p-2 shadow"
                >
                  <li onClick={() => signOut({ callbackUrl: appRoutes.home })}>
                    <a>Log out</a>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <Link href={appRoutes.signin} className="text-sm font-bold">
              Log In
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
