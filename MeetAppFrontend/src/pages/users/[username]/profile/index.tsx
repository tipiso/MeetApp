import { ReactElement } from 'react';
import Layout from '@/components/Layouts/CleanLayout';
import Breadcrumbs from '@/components/BreadCrumbs';
import { routes } from '@/utils/routes';
import { useGetUser } from '@/features/users/hooks';
import { getUsernameFromSession } from '@/utils/helpers';
import Image from 'next/image';
import Tabs, { useTabs } from '@/components/Tabs';
import { profileTabs } from '@/utils/constants';
import ProfileTabs from '@/features/users/components/ProfileTabs/ProfileTabs';
import UserInfoBlock from '@/features/users/components/UserInfoBlock';
import { useRouter } from 'next/router';
import TabAction from '@/features/users/components/ProfileTabs/TabAction';

const ProfilePage = () => {
  const router = useRouter();
  const tabsOpts = useTabs({ tabs: profileTabs });
  const user = useGetUser(router.query.username as string);

  const isCurrentUserProfile = getUsernameFromSession() === router.query.username;

  return (
    <div className="grid w-full grid-cols-10 px-16">
      <div className="col-span-3 bg-gray-100 px-4 pt-16">
        <Breadcrumbs
          breadcrumbs={[
            { text: 'Home', link: routes.home },
            { text: 'Search', link: routes.search },
            { active: true, text: user.data?.knownAs ?? '', link: `${routes.userProfile}/${user.data?.knownAs ?? ''}` },
          ]}
        />
        <h1 className="pt-6 pb-3 text-2xl font-bold">{user.data?.knownAs} Profile</h1>
        <Image
          className="rounded-lg pb-4"
          src={user.data?.photoUrl ?? ''}
          width={340}
          height={340}
          alt="user profile"
        />
        <UserInfoBlock label="Full Name" content={user.data?.knownAs ?? ''} />
        <UserInfoBlock label="Location" content={`${user.data?.city} (${user.data?.country})`} />
        <UserInfoBlock label="Age" content={`${user.data?.age}`} />
        <UserInfoBlock label="Gender" content={`${user.data?.gender}`} />
      </div>
      <div className="col-span-7 pl-12 pt-16">
        <div className="flex items-center justify-between">
          <Tabs active={tabsOpts.active} setActive={tabsOpts.updateActiveTab} tabs={profileTabs} />
          <TabAction active={tabsOpts.active} isCurrentUserProfile={isCurrentUserProfile} />
        </div>
        <ProfileTabs
          hobbies={user.data?.hobbys}
          introduction={user.data?.introduction}
          active={tabsOpts.active}
          photos={user.data?.photos}
        />
      </div>
    </div>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

ProfilePage.secured = true;

export default ProfilePage;
