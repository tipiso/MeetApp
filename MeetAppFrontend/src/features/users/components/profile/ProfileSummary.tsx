import { routes } from '@/utils/routes';
import React, { useMemo } from 'react';
import { User } from '@/features/users/types';
import Breadcrumbs from '@/components/BreadCrumbs';
import Image from 'next/image';
import UserInfoBlock from '../UserInfoBlock';

type Props = {
  user?: User;
};

export default function ProfileSummary({ user }: Props) {
  const breadcrumbs = useMemo(
    () => [
      { text: 'Home', link: routes.home },
      { text: 'Search', link: routes.search },
      { active: true, text: user?.knownAs ?? '', link: `${routes.userProfile}/${user?.knownAs ?? ''}` },
    ],
    [user],
  );

  return (
    <aside className="col-span-3 bg-gray-100 px-4 pt-16">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="pt-6 pb-3 text-2xl font-bold">{user?.knownAs} Profile</h1>
      <Image className="w-full rounded-lg" src={user?.photoUrl ?? ''} width={340} height={340} alt="user profile" />
      <div className="pt-4">
        <UserInfoBlock label="Full Name" content={user?.knownAs ?? ''} />
        <UserInfoBlock label="Location" content={`${user?.city} (${user?.country})`} />
        <UserInfoBlock label="Age" content={`${user?.age}`} />
        <UserInfoBlock label="Gender" content={`${user?.gender}`} />
      </div>
    </aside>
  );
}
