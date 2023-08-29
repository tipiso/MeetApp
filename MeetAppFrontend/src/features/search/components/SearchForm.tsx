import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';
import { Input } from '@/components/Forms/Input';
import { useMatches } from '@/features/search/hooks';
import Loader, { LoaderSizes } from '@/components/Loader';
import Carousel from '@/components/Carousel/Carousel';
import CarouselSuggestionImg from '@/features/search/components/CarouselSuggestionImg';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import { useEffect } from 'react';

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

        <h1 className="mb-4 text-2xl">Catch some suggestions from around Ortar!</h1>
      </div>
      {isMutating ? (
        <Loader size={LoaderSizes.lg} />
      ) : (
        data &&
        data.length && (
          <>
            <Carousel carouselData={data}>
              {data?.map((u) => (
                <Carousel.CarouselItem key={u.id}>
                  <CarouselSuggestionImg user={u} />
                </Carousel.CarouselItem>
              ))}
            </Carousel>
            <div className="flex justify-center pt-4">
              <Button btnType={ColorTypeEnum.SECONDARY}>Check more</Button>
            </div>
          </>
        )
      )}
    </FormProvider>
  );
};

export default SearchForm;
