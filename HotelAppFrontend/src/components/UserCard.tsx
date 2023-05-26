import { User } from '@/types/users';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  user: User;
};
export default function UserCard({ user }: Props) {
  return (
    <Link as="div" href="#" className="card w-80 bg-base-100 shadow-xl">
      <figure>
        <Image src={user.photoUrl} alt={`User ${user.userName} Image`} width={200} height={300} />
      </figure>
      <div className="card-body">
        <h2 className="card-title mx-auto">{user.userName}</h2>
      </div>
    </Link>
  );
}
