import { FormProvider } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';

import { Input } from '@/components/Forms/Input';
import { SearchIcon } from '@/assets/images/icons';
import useSearchForm from '@/features/search/hooks/useSearchForm';
import { SelectInput } from '@/components/Forms/SelectInput';
import { useGetHobbies } from '@/features/search/hooks';
import Loader, { LoaderSizes } from '@/components/Loader';
import { useMemo } from 'react';
import MultiSelect, { Option } from '@/components/Forms/MultiSelect';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';

const AdvancedSearchForm = () => {
  const { trigger, methods, data, defaultValues, isMutating } = useSearchForm();
  const { data: hobbies, isLoading } = useGetHobbies();

  const hobbiesMap = useMemo(() => hobbies?.data.map((h) => ({ value: `${h.id}`, label: h.name })), [hobbies]);

  if (isLoading) return <Loader size={LoaderSizes.lg} />;

  const handleSubmit = async ({ hobbies, ...rest }: typeof defaultValues) => {
    await trigger({
      ...rest,
      hobbies: hobbies ? (hobbies as Option[]).map((h) => h.value) : [],
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="px-10">
        <Form onSubmit={methods.handleSubmit(handleSubmit)} className="flex w-full flex-wrap pb-8">
          <div className="relative w-full">
            <Input
              required
              placeholder="Search by first name, last name, additional information"
              name="searchString"
              type="text"
              submitBtn={
                <Button btnType={ColorTypeEnum.PRIMARY}>
                  <SearchIcon />
                </Button>
              }
            />
          </div>
          <div className="grid w-full grid-cols-3 gap-x-6 pt-2">
            <MultiSelect label="Choose by type of hobby" name="hobbies" options={hobbiesMap ?? []} />

            <div className="flex w-full justify-items-stretch">
              <Input label="Age limits" name="minAge" />
              <div className="mt-[46px] h-10 flex-grow px-2 text-center">-</div>
              <Input className="mt-9" name="maxAge" />
            </div>
            <SelectInput
              placeholder="All"
              name="gender"
              type="text"
              label="Gender"
              options={[
                { label: 'All', value: '' },
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
            />
          </div>
        </Form>
      </div>
    </FormProvider>
  );
};

export default AdvancedSearchForm;
