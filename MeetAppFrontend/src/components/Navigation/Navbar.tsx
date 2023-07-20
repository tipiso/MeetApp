import NavItem from '@/components/Navigation/NavItem';
import Link from 'next/link';
import { navRoutes, routes as appRoutes } from '@/utils/routes';
import { signOut, useSession } from 'next-auth/react';
import Logo from '@/assets/images/Logo.svg';
import Image from 'next/image';

export default function Navbar() {
  const { data } = useSession();

  return (
    <header className="navbar relative z-[0] bg-transparent px-12 pt-12">
      <div className="absolute left-0  top-0 -z-10 h-[782px] w-full max-w-[1440px] bg-grayBg bg-cover bg-no-repeat" />
      <div className="flex-1">
        <Link className="relative h-6 w-32 text-xl normal-case disabled:hover" href={appRoutes.home}>
          <Image fill src={Logo} alt="meetApp logo" />
        </Link>
      </div>
      <nav className="flex-none">
        {data?.user ? (
          <ul className="menu menu-horizontal px-1">
            {navRoutes.map((route) => (
              <NavItem key={route.href} {...route} />
            ))}
            <li className="dropdown" tabIndex={0}>
              <label tabIndex={0}>
                {data?.user?.name}
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </label>
              <ul tabIndex={0} className="w-50 dropdown-content menu rounded-box z-[1] mt-4 bg-base-100 p-2 shadow">
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
    </header>
  );
}
