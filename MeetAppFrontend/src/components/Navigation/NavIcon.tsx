import Link from 'next/link';
import Image from 'next/image';

type Props = {
  route?: string;
  img: string;
  imgAlt: string;
};

export function NavIcon({ route, img, imgAlt }: Props) {
  const iconBody = (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
      <Image src={img} alt={imgAlt} priority />
    </div>
  );

  if (route) {
    return (
      <Link className="pr-3" href={route}>
        {iconBody}
      </Link>
    );
  }

  return <div className="pr-3">{iconBody}</div>;
}
