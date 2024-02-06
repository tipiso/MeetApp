import { ReactElement, useMemo } from 'react';
import Layout from '@/components/Layouts/CleanLayout';
import Breadcrumbs from '@/components/BreadCrumbs';
import { routes } from '@/utils/routes';
import Image from 'next/image';
import Tabs, { useTabs } from '@/components/Tabs';
import { ProfilePageTabsKeys, profileTabs } from '@/utils/constants';
import ProfileTabs from '@/features/users/components/profile/ProfileTabs';
import UserInfoBlock from '@/features/users/components/UserInfoBlock';
import TabAction from '@/features/users/components/profile/TabAction';
import useStore from '@/store/store';

const CurrentUserPage = () => {
  const user = useStore((state) => state.user);

  const preparedTabs = useMemo(() => profileTabs.filter((t) => t.key !== ProfilePageTabsKeys.CHAT), []);
  const tabsOpts = useTabs({ tabs: preparedTabs });

  const breadcrumbs = useMemo(
    () => [
      { text: 'Home', link: routes.home },
      { text: 'Search', link: routes.search },
      { active: true, text: user.knownAs ?? '', link: `${routes.currentUserProfile}` },
    ],
    [user],
  );

  return (
    <div className="grid w-full grid-cols-10 px-16">
      <div className="col-span-3 bg-gray-100 px-4 pt-16">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className="pt-6 pb-3 text-2xl font-bold">{user.knownAs} Profile</h1>
        <Image className="rounded-lg pb-4" src={user.photoUrl ?? ''} width={340} height={340} alt="user profile" />
        <UserInfoBlock label="Full Name" content={user.knownAs ?? ''} />
        <UserInfoBlock label="Location" content={`${user.city} (${user.country})`} />
        <UserInfoBlock label="Age" content={`${user.age}`} />
        <UserInfoBlock label="Gender" content={`${user.gender}`} />
      </div>
      <div className="col-span-7 pl-12 pt-16">
        <div className="flex items-center justify-between">
          <Tabs active={tabsOpts.active} setActive={tabsOpts.updateActiveTab} tabs={preparedTabs} />
          <TabAction active={tabsOpts.active} displayInviteBtn={false} />
        </div>
        <ProfileTabs
          userId={user.id}
          hobbies={user.hobbys}
          introduction={user.introduction}
          active={tabsOpts.active}
          photos={user.photos}
        />
      </div>
    </div>
  );
};

CurrentUserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

CurrentUserPage.secured = true;

export default CurrentUserPage;
