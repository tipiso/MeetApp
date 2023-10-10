import Link from 'next/link';
import Image from 'next/image';

type Props = {
  route: string;
  img: string;
  imgAlt: string;
};

export function NavIcon({ route, img, imgAlt }: Props) {
  return (
    <Link className="pr-3" href={route}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
        <Image src={img} alt={imgAlt} />
      </div>
    </Link>
  );
}
