import { useSignalRChatRoom } from '@/services/SignalR/useSignalRChatRoom';
import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';
import { Input } from '@/components/Forms/Input';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import { useRouter } from 'next/router';

type MsgProps = {
  sender: string;
  recipient: string;
};

function ChatMessage(props: MsgProps) {
  const alignSelf = 'self-end';
  return (
    <div className={classNames(alignSelf)}>
      <span className="text-sm">20/08/2023 20:20</span>
      <p className="rounded-lg border-gray-200 bg-base-200 py-4 px-2 text-sm">Hi How are you?</p>
    </div>
  );
}

export default function Chat() {
  const methods = useForm({ defaultValues: { newMessage: '' } });
  const query = useRouter().query;

  const chat = useSignalRChatRoom();

  const handleSubmit = async ({ newMessage }: { newMessage: string }) => {
    try {
      if (query.username && typeof query.username === 'string' ) {
        await chat.sendMessage(query.username, newMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(chat);
  return (
    <div className="flex w-full flex-col pt-4">
      {/* <ChatMessage /> */}
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(handleSubmit)} className="w-full pb-8">
          <div className="relative w-full">
            <Input
              required
              placeholder="Type here"
              name="newMessage"
              type="text"
              submitBtn={<Button btnType={ColorTypeEnum.PRIMARY}>Send</Button>}
            />
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}
