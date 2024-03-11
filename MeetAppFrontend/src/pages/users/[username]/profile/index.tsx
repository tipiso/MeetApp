import { ReactElement, useEffect, useMemo } from 'react';
import Layout from '@/components/Layouts/CleanLayout';
import { useGetUser } from '@/features/users/hooks';
import Tabs, { useTabs } from '@/components/Tabs';
import { ProfilePageTabsKeys, profileTabs } from '@/utils/constants';
import ProfileTabs from '@/features/users/components/profile/ProfileTabs';
import { useRouter } from 'next/router';
import TabAction from '@/features/users/components/profile/TabAction';
import ProfileSummary from '@/features/users/components/profile/ProfileSummary';
import MainLayout from '@/components/Layouts/MainLayout';

const ProfilePage = () => {
  const router = useRouter();
  const user = useGetUser(router.query.username as string);
  const query = router.query;

  const preparedTabs = useMemo(
    () =>
      user.data?.isLikedByCurrentUser ? profileTabs : profileTabs.filter((t) => t.key !== ProfilePageTabsKeys.CHAT),
    [user.data?.isLikedByCurrentUser],
  );
  const tabsOpts = useTabs({
    tabs: preparedTabs,
  });

  useEffect(() => {
    if (!!query.openTab) {
      const tabToActivate = preparedTabs.find((t) => t.key === query.openTab);
      tabToActivate && tabsOpts.updateActiveTab(tabToActivate);
    } else tabsOpts.updateActiveTab(preparedTabs[0]);
  }, [preparedTabs]);

  return (
    <div className="grid w-full grid-cols-10 px-16">
      <ProfileSummary user={user.data} />
      <div className="col-span-7 pl-12 pt-16">
        <div className="flex items-center justify-between">
          <Tabs active={tabsOpts.active} setActive={tabsOpts.updateActiveTab} tabs={preparedTabs} />
        </div>
        <ProfileTabs
          userId={user.data?.id}
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
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

ProfilePage.secured = true;

export default ProfilePage;
