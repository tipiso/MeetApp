import { ReactNode } from 'react';
import Button from '../Button';
import { ColorTypeEnum } from '@/utils/constants';
import classNames from 'classnames';

type Props = {
  id: string;
  open: boolean;
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
  toggle: () => void;
  onClosed?: () => void;
};

const Modal = ({ id, open, title, children, toggle, className, action, onClosed }: Props) => {
  const handleClose = () => {
    toggle();
    onClosed && onClosed();
  };

  if (!open) return null;

  return (
    open && (
      <dialog id={id} className="modal" open={open}>
        <div className={classNames('modal-box', className)}>
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <div className="py-4">{children}</div>
          <footer className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <Button outline btnType={ColorTypeEnum.SECONDARY} type="button" onClick={handleClose} className="btn">
              Close
            </Button>
            {action}
          </footer>
        </div>
      </dialog>
    )
  );
};

export default Modal;
