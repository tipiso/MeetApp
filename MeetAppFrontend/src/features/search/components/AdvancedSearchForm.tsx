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
import SuggestionCard from './SuggestionCard';
import Pagination from '@/components/Pagination/Pagination';
import { useAdvancedSearchForm } from '@/features/search/hooks/useSearchForm';

const AdvancedSearchForm = () => {
  const { trigger, methods, data, defaultValues, isMutating, pagination, getPage } = useAdvancedSearchForm();
  const { data: hobbies, isLoading } = useGetHobbies();
  const wasFetched = Array.isArray(data);

  const hobbiesMap = useMemo(() => hobbies?.data.map((h) => ({ value: `${h.id}`, label: h.name })), [hobbies]);

  if (isLoading) return <Loader size={LoaderSizes.lg} />;

  const handleSubmit = async ({ hobbies, ...rest }: typeof defaultValues) => {
    await trigger({
      ...rest,
      pageNumber: initialPagination.currentPage,
      pageSize: initialPagination.pageSize,
      hobbies: hobbies ? hobbies.map((h) => h.value) : [],
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
        {wasFetched && (
          <div>
            {data && data.length ? (
              <>
                <p className="text-2xl font-bold">Search results ({data.length})</p>
                <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
                  {data.map((u) => (
                    <SuggestionCard key={u.id} imgWidth={250} imgHeight={230} user={u} />
                  ))}
                </div>
              </>
            ) : (
              <p>No results</p>
            )}
            {pagination.totalPage > 1 && (
              <Pagination handlePageChange={getPage} formValues={methods.getValues()} {...pagination} />
            )}
          </div>
        )}
      </FormProvider>
    </div>
  );
};

export default AdvancedSearchForm;
