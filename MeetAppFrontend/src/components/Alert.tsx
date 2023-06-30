import { toast, ToastContainer } from 'react-toastify';
import { ColorTypeEnum } from '@/utils/constants';
import 'react-toastify/dist/ReactToastify.css';
import cx from 'classnames';

export const Alert = () => {
  return <ToastContainer autoClose={4000} draggable={false} hideProgressBar={true} closeOnClick={false} icon={false} />;
};

export const alert = (message: string, type: ColorTypeEnum) => {
  const classes = cx('Toastify__toast', {});

  return toast(message, {
    className: classes,
  });
};
