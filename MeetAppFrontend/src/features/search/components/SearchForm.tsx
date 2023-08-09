import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';
import { Input } from '@/components/Forms/Input';

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
      <Form onSubmit={methods.handleSubmit(handleSubmit)} className="w-full px-10">
        <div className="relative mb-6">
          <Input required placeholder="Search for friends" name="searchString" type="text" />
        </div>
      </Form>
    </FormProvider>
  );
};

export default SearchForm;
