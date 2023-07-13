import { api } from '@/utils/axios';
import { registerUrl } from '@/utils/url';
import { login } from '@/services/Auth/login';
import { transformErrorsToStringArr } from '@/utils/helpers';

type RegisterPayload = {
  username: string;
  password: string;
  confirmPassword: string;
};
const register = async (data: RegisterPayload) => {
  try {
    const response = await api.post(registerUrl, data);
    if (response.status === 200) {
      await login({ username: data.username, password: data.password });
      return true;
    }
  } catch (e) {
    const axiosError = e as any;
    let formError;

    if (axiosError.response?.status === 400) {
      if (axiosError.response && axiosError.response.data && typeof axiosError.response.data != 'string') {
        formError = transformErrorsToStringArr(axiosError.response.data.errors);
      } else {
        formError = axiosError.response.data;
      }
      return formError;
    }
  }
};

export { register };
