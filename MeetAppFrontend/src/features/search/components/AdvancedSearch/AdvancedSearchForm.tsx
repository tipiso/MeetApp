import { FormProvider } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';

import { Input } from '@/components/Forms/Input';
import { SearchIcon } from '@/assets/images/icons';
import { SelectInput } from '@/components/Forms/SelectInput';
import { useGetHobbies } from '@/features/search/hooks';
import Loader, { LoaderSizes } from '@/components/Loader';
import { useMemo } from 'react';
import MultiSelect from '@/components/Forms/MultiSelect';
import Button from '@/components/Button';
import { ColorTypeEnum, genderFilterOptions, initialPagination } from '@/utils/constants';
import { useAdvancedSearchForm } from '@/features/search/hooks/useSearchForm';
import { getValuesFromSelectOptions } from '@/utils/helpers';
import Results from './Results';

const AdvancedSearchForm = () => {
  const { trigger, methods, data, defaultValues, pagination, getPage } = useAdvancedSearchForm();
  const { data: hobbies, isLoading } = useGetHobbies();
  const wasFetched = Array.isArray(data);

  const hobbiesMap = useMemo(() => hobbies?.data.map((h) => ({ value: `${h.id}`, label: h.name })), [hobbies]);

  if (isLoading) return <Loader size={LoaderSizes.lg} />;

  const handleSubmit = async ({ hobbies, ...rest }: typeof defaultValues) => {
    await trigger({
      ...rest,
      pageNumber: initialPagination.currentPage,
      pageSize: initialPagination.pageSize,
      hobbies: getValuesFromSelectOptions(hobbies),
    });
  };

  return (
    <div className="px-10">
      <FormProvider {...methods}>
        <>
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
            <div className="grid w-full grid-cols-1 gap-x-6 pt-2 md:grid-cols-3">
              <MultiSelect label="Choose by type of hobby" name="hobbies" options={hobbiesMap ?? []} />

              <div className="flex w-full">
                <div className="flex-grow">
                  <Input label="Age limits" name="minAge" />
                </div>
                <div className="mt-[46px] h-10 px-2 text-center">-</div>
                <div className="flex-grow">
                  <Input className="mt-9" name="maxAge" />
                </div>
              </div>
              <SelectInput placeholder="All" name="gender" type="text" label="Gender" options={genderFilterOptions} />
            </div>
          </Form>
        </>
        <Results
          users={data}
          wasFetched={wasFetched}
          pagination={pagination}
          formValues={methods.getValues()}
          getPage={getPage}
        />
      </FormProvider>
    </div>
  );
};

export default AdvancedSearchForm;
