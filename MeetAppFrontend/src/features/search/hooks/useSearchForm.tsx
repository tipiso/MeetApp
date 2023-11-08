import { useForm } from 'react-hook-form';
import { useMatches } from '@/features/search/hooks/index';

const defaultValues = {
  searchString: '',
  minAge: '',
  maxAge: '',
  hobbies: [],
  gender: '',
};

/** Needs RHF context */
export default function useSearchForm() {
  const methods = useForm({
    defaultValues,
  });

  const { data, isMutating, trigger } = useMatches();

  return { methods, data, isMutating, trigger, defaultValues };
}
