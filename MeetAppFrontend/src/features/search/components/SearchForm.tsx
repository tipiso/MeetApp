import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';

import { Input } from '@/components/Forms/Input';
import { useMatches } from '@/features/search/hooks';
import SuggestionsList from '@/features/search/components/SuggestionsList';
import FriendsList from '@/features/search/components/FriendsList';

const defaultValues = {
  searchString: '',
};

const SearchForm = () => {
  const methods = useForm({
    defaultValues,
  });

  const { data, isMutating, trigger } = useMatches();

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
            <Input required placeholder="Search for friends" name="searchString" type="text" />
          </div>
        </Form>
      </div>
      <SuggestionsList data={data} isLoading={isMutating} />
      <FriendsList />
    </FormProvider>
  );
};

export default SearchForm;
