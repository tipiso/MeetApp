import NavItem from '@/components/Navigation/NavItem';
import Link from 'next/link';
import { routes as appRoutes } from '@/utils/routes';
import { signOut } from 'next-auth/react';

const routes = [{ href: 'users', text: 'Users' }];

export default function Navbar() {
  return (
    <header className="bg-sky-500 flex justify-between p-3">
      <Link href={appRoutes.home}>
        <div>Hotel App</div>
      </Link>
      <nav className="d-flex justify-end">
        {routes.map((route) => (
          <NavItem key={route.href} {...route} />
        ))}
        <div onClick={() => signOut({ callbackUrl: appRoutes.signin })}>Log out</div>
      </nav>
    </header>
  );
}
