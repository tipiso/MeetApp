import { ReactNode } from 'react';
import Button from '../Button';
import { ColorTypeEnum } from '@/utils/constants';

type Props = {
  id: string;
  open: boolean;
  title: string;
  children: ReactNode;
  toggle: () => void;
  onClosed?: () => void;
};

const Modal = ({ id, open, title, children, toggle, onClosed }: Props) => {
  const handleClose = () => {
    toggle();
    onClosed && onClosed();
  };
  console.log(open);
  if (!open) return null;
  return (
    open && (
      <dialog id={id} className="modal" open={open}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="py-4">{children}</div>
          <footer className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Button outline btnType={ColorTypeEnum.SECONDARY} type="button" onClick={handleClose} className="btn">
                Close
              </Button>
            </form>
          </footer>
        </div>
      </dialog>
    )
  );
};

export default Modal;
