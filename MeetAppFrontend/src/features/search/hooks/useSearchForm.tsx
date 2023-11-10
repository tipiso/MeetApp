import { useForm } from 'react-hook-form';
import { useMatches } from '@/features/search/hooks/index';
import{ Option } from '@/components/Forms/MultiSelect';

const defaultValues = {
  searchString: '',
  minAge: '',
  maxAge: '',
  hobbies: [] as Option[],
  gender: '',
};

/** Needs RHF context */
export default function useSearchForm() {
  const methods = useForm({
    defaultValues,
  });

  const { data, isMutating, trigger, pagination, getPage } = useMatches();

  return { methods, data, isMutating, trigger, defaultValues, pagination, getPage };
}
