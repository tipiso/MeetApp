import { ReactElement, useMemo } from 'react';
import Layout from '@/components/Layouts/CleanLayout';
import Tabs, { useTabs } from '@/components/Tabs';
import { ProfilePageTabsKeys, profileTabs } from '@/utils/constants';
import ProfileTabs from '@/features/users/components/profile/ProfileTabs';
import TabAction from '@/features/users/components/profile/TabAction';
import useStore from '@/store/store';
import ProfileSummary from '@/features/users/components/profile/ProfileSummary';
import MainLayout from '@/components/Layouts/MainLayout';

const CurrentUserPage = () => {
  const user = useStore((state) => state.user);

  const preparedTabs = useMemo(() => profileTabs.filter((t) => t.key !== ProfilePageTabsKeys.CHAT), []);
  const tabsOpts = useTabs({ tabs: preparedTabs });

  return (
    <div className="grid w-full grid-cols-10 px-16">
      <ProfileSummary user={user} />
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
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

CurrentUserPage.secured = true;

export default CurrentUserPage;
