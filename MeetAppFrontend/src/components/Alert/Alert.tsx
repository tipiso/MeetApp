import { toast, ToastContainer } from 'react-toastify';
import { ColorTypeEnum } from '@/utils/constants';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Alert.module.css';
import cx from 'classnames';

export const Alert = () => {
  return <ToastContainer autoClose={4000} draggable={false} hideProgressBar={true} closeOnClick={false} icon={false} />;
};

export const alert = (message: string, type: ColorTypeEnum) => {
  const classes = cx('Toastify__toast alert', styles.Toastify__toast, {
    [styles.warning]: type === ColorTypeEnum.WARNING,
    [styles.error]: type === ColorTypeEnum.DANGER,
    [styles.success]: type === ColorTypeEnum.SUCCESS,
    [styles.info]: type === ColorTypeEnum.INFO,
  });

  return toast(message, {
    className: classes,
  });
};
