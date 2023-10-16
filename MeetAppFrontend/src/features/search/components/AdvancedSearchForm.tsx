import { FormProvider } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';

import { Input } from '@/components/Forms/Input';
import SearchIcon from '@/assets/images/SearchIcon.svg';
import Image from 'next/image';
import useSearchForm from '@/features/search/hooks/useSearchForm';
import { SelectInput } from '@/components/Forms/SelectInput';

const AdvancedSearchForm = () => {
  const { trigger, methods, data, defaultValues, isMutating } = useSearchForm();

  const handleSubmit = async (data: typeof defaultValues) => {
    await trigger(data.searchString);
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
              icon={<Image src={SearchIcon} alt="search icon" />}
            />
          </div>
          <div className="grid w-full grid-cols-3 gap-x-6 pt-2">
            <SelectInput name="hobby" options={[]} label="Choose by type of hobby" placeholder="Select hobby" />
            <div className="flex w-full items-end justify-items-stretch">
              <Input label="Age limits" name="minAge" /> <div className="h-10 flex-grow px-2 text-center">-</div>
              <Input className="mt-9" name="maxAge" />
            </div>
            <SelectInput
              required
              placeholder="All"
              name="gender"
              type="text"
              label="Gender"
              options={[
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