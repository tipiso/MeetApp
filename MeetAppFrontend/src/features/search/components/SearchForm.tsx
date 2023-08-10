import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';
import { Input } from '@/components/Forms/Input';
import { useState } from 'react';
import { useMatches } from '@/features/search/hooks';

const defaultValues = {
  searchString: '',
};

const SearchForm = () => {
  const [shouldFetch, setShouldFetch] = useState(false);

  const methods = useForm({
    defaultValues,
  });

  const { data, isLoading } = useMatches(shouldFetch, methods.getValues().searchString);

  const handleSubmit = async (data: typeof defaultValues) => {
    setShouldFetch(true);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleSubmit)} className="w-full px-10">
        <div className="relative mb-6">
          <Input required placeholder="Search for friends" name="searchString" type="text" />
        </div>
      </Form>
    </FormProvider>
  );
};

export default SearchForm;
