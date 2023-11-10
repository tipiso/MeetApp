import { FormProvider } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';

import { Input } from '@/components/Forms/Input';
import { SearchIcon } from '@/assets/images/icons';
import useSearchForm from '@/features/search/hooks/useSearchForm';
import { SelectInput } from '@/components/Forms/SelectInput';
import { useGetHobbies } from '@/features/search/hooks';
import Loader, { LoaderSizes } from '@/components/Loader';
import { useMemo } from 'react';
import MultiSelect from '@/components/Forms/MultiSelect';
import Button from '@/components/Button';
import { ColorTypeEnum, initialPagination, sexOptions } from '@/utils/constants';
import SuggestionCard from './SuggestionCard';
import Pagination from '@/components/Pagination/Pagination';

const AdvancedSearchForm = () => {
  const { trigger, methods, data, defaultValues, isMutating, pagination, getPage } = useSearchForm();
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
  console.log(data, isMutating, wasFetched);
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
            <div className="grid w-full grid-cols-3 gap-x-6 pt-2">
              <MultiSelect label="Choose by type of hobby" name="hobbies" options={hobbiesMap ?? []} />

              <div className="flex w-full justify-items-stretch">
                <Input label="Age limits" name="minAge" />
                <div className="mt-[46px] h-10 flex-grow px-2 text-center">-</div>
                <Input className="mt-9" name="maxAge" />
              </div>
              <SelectInput placeholder="All" name="gender" type="text" label="Gender" options={sexOptions} />
            </div>
          </Form>
        </>
        {wasFetched && (
          <div>
            {data && data.length ? (
              <>
                <p className="text-2xl font-bold">Search results ({data.length})</p>
                <div className="grid-cols-3 grid gap-6 pt-6">
                  {data.map((u) => (
                    <SuggestionCard key={u.id} className="max-w-[400px]" imgWidth={250} imgHeight={230} user={u} />
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
