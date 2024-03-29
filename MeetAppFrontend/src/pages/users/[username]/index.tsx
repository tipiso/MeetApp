import { ReactElement, useMemo } from 'react';
import { useUserPage } from '@/features/users/hooks';
import UserPageLayout from '@/components/Layouts/UserPageLayout';
import UserForm from '@/features/users/components/forms/FirstLoginUserForm';
import { useGetHobbies } from '@/features/search/hooks';
import { Option } from '@/components/Forms/MultiSelect';
import MainLayout from '@/components/Layouts/MainLayout';

const UserPage = () => {
  const { isLoading, user } = useUserPage();
  const { data: hobbies, isLoading: hobbiesLoading } = useGetHobbies();

  const hobbiesMap = useMemo(() => hobbies?.data.map<Option>((h) => ({ value: `${h.id}`, label: h.name })), [hobbies]);

  if (isLoading || !user || hobbiesLoading) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-4xl font-bold">Tell us about you!</h1>

      <UserForm
        photo={user.photoUrl}
        username={user.userName}
        age={user.age}
        knownAs={user.knownAs}
        interests={user.interests}
        hobbies={hobbiesMap}
        city={user.city}
      />
    </div>
  );
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout hideRoutes>
      <UserPageLayout>{page}</UserPageLayout>
    </MainLayout>
  );
};

UserPage.secured = true;

export default UserPage;
