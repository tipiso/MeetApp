import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';

const defaultValues = {
  searchString: '',
};

const SearchForm = () => {
  const methods = useForm({
    defaultValues,
  });

  const handleSubmit = async (data: typeof defaultValues) => {
    console.log('submit', data);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-wrap gap-x-2.5 pt-6">
        <div className="flex w-full items-center pt-16"></div>
      </Form>
    </FormProvider>
  );
};

export default SearchForm;
