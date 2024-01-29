import { useSignalRChatRoom } from '@/services/SignalR/useSignalRChatRoom';
import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';
import { Input } from '@/components/Forms/Input';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import { useRouter } from 'next/router';
import { useMessageThread } from '@/features/messages/index';
import { Message } from '@/features/messages/types';
import { getUsernameFromSession } from '@/utils/helpers';
import { getDateAndTimeFromDate } from '@/utils/parsers';
import Loader, { LoaderSizes } from '@/components/Loader';

type MsgProps = Message & { recipientName: string };

function ChatMessage(props: MsgProps) {
  const isSender = getUsernameFromSession() === props.senderUsername;
  const { dateString, timeString } = getDateAndTimeFromDate(props.messageSent);

  return (
    <div className={classNames(isSender ? 'self-end' : 'self-start', 'max-w-[50%] pt-3')}>
      <span className="text-sm">
        {dateString} {timeString} {!props.dateRead && <span className="text-xs italic text-base-300">(unread)</span>}
      </span>
      <p
        className={classNames(
          isSender ? 'border-secondary bg-secondary text-white' : 'border-gray-200 bg-base-200',
          'rounded-lg py-4 px-2 text-sm',
        )}
      >
        {props.content}
      </p>
    </div>
  );
}

export default function Chat() {
  const methods = useForm({ defaultValues: { newMessage: '' } });
  const query = useRouter().query;
  const recipientName = query.username && typeof query.username === 'string' ? query.username : '';

  const chat = useSignalRChatRoom();
  const mt = useMessageThread(recipientName);

  const handleSubmit = async ({ newMessage }: { newMessage: string }) => {
    try {
      if (recipientName) {
        await chat.sendMessage(recipientName, newMessage);
        methods.reset();
        mt.mutate();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex w-full flex-col pt-10">
      {mt.isLoading ? (
        <Loader size={LoaderSizes.lg} />
      ) : (
        mt.data?.map((m) => <ChatMessage key={m.id} {...m} recipientName={recipientName} />)
      )}
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(handleSubmit)} className="w-full pt-8">
          <div className="relative w-full">
            <Input
              required
              placeholder="Type here"
              name="newMessage"
              type="text"
              submitBtn={
                <Button isLoading={mt.isLoading} disabled={mt.isLoading} btnType={ColorTypeEnum.PRIMARY}>
                  Send
                </Button>
              }
            />
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}
