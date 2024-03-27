import { ReactElement, useMemo } from 'react';
import { useUserPage } from '@/features/users/hooks';
import UserPageLayout from '@/components/Layouts/UserPageLayout';
import { useGetHobbies } from '@/features/search/hooks';
import { Option } from '@/components/Forms/MultiSelect';
import MainLayout from '@/components/Layouts/MainLayout';
import EditUserForm from '@/features/users/components/forms/EditUserForm';

const EditUserPage = () => {
  const { isLoading, user } = useUserPage();
  const { data: hobbies, isLoading: hobbiesLoading } = useGetHobbies();

  const hobbiesMap = useMemo(() => hobbies?.data.map<Option>((h) => ({ value: `${h.id}`, label: h.name })), [hobbies]);

  if (isLoading || !user || hobbiesLoading) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-4xl font-bold">Edit your profile</h1>

      <EditUserForm
        country={user.country}
        username={user.userName}
        age={user.age}
        knownAs={user.knownAs}
        interests={user.interests}
        hobbies={hobbiesMap}
        userHobbies={user.hobbys}
        city={user.city}
        introduction={user.introduction}
      />
    </div>
  );
};

EditUserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <UserPageLayout>{page}</UserPageLayout>
    </MainLayout>
  );
};

EditUserPage.secured = true;

export default EditUserPage;
