import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';

import { Input } from '@/components/Forms/Input';
import SuggestionsList from '@/features/search/components/SuggestionsList';
import FriendsList from '@/features/search/components/FriendsList';
import SearchIcon from '@/assets/images/SearchIcon.svg';
import Image from 'next/image';
import useSearchForm from '@/features/search/hooks/useSearchForm';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import { routes } from '@/utils/routes';

const SearchForm = () => {
  const { trigger, methods, data, defaultValues, isMutating } = useSearchForm();

  const handleSubmit = async (data: typeof defaultValues) => {
    await trigger(data.searchString);
  };

  useEffect(() => {
    trigger('');
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="px-10">
        <Form onSubmit={methods.handleSubmit(handleSubmit)} className="w-full pb-8">
          <div className="relative">
            <Input
              required
              placeholder="Search for friends"
              name="searchString"
              type="text"
              icon={<Image src={SearchIcon} alt="search icon" />}
            />
          </div>
        </Form>
      </div>
      <SuggestionsList data={data} isLoading={isMutating} />
      <div className="flex justify-center pt-4 pb-8">
        <Button href={routes.advancedSearch} btnType={ColorTypeEnum.SECONDARY}>
          Check more
        </Button>
      </div>
      <FriendsList />
    </FormProvider>
  );
};

export default SearchForm;
