import Link from 'next/link';
import Image from 'next/image';
import NavMenu from '@/components/Navigation/NavMenu';
import LogoLight from '@/assets/images/LogoLight.svg';
import { routes } from '@/utils/routes';
import useStore from '@/store/store';

type Props = {
  hideRoutes?: boolean;
};

export default function Navbar({ hideRoutes }: Props) {
  const user = useStore((state) => state.user);

  return (
    <header className="navbar z-10 bg-neutral px-12 text-neutral-content">
      <div className="flex-1">
        <Link className="relative h-6 w-32 text-xl normal-case disabled:hover" href={routes.home}>
          <Image fill src={LogoLight} alt="meetApp logo" />
        </Link>
      </div>
      {!hideRoutes && <NavMenu user={user} />}
    </header>
  );
}
