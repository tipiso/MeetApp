import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';
import { Input } from '@/components/Forms/Input';
import { useState } from 'react';
import { useMatches } from '@/features/search/hooks';
import Carousel from '@/components/Carousel';

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
      <div className="px-10">
        <Form onSubmit={methods.handleSubmit(handleSubmit)} className="w-full pb-8">
          <div className="relative">
            <Input required placeholder="Search for friends" name="searchString" type="text" />
          </div>
        </Form>

        <h1 className="mb-4 text-2xl">Catch some suggestions from around Ortar!</h1>
      </div>
      {data && data.length && (
        <Carousel carouselData={data}>
          {data?.map((u) => (
            <Carousel.CarouselItem id={`${u.id}`}>
              <img className="w-full rounded-lg p-4" src={u.photoUrl} />
            </Carousel.CarouselItem>
          ))}
        </Carousel>
      )}
    </FormProvider>
  );
};

export default SearchForm;
