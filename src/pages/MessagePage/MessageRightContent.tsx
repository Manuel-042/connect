import { twMerge } from 'tailwind-merge'
import Button, { buttonStyles } from '../../components/UI/Button'
import { useParams } from 'react-router-dom';
import {MessageDetail} from '../../features/messages/index';

const MessageRightContent = () => {
  const { user_id, account_id } = useParams();


  return (
    <div className='w-[600px] flex flex-col items-center justify-center max-h-screen overflow-hidden border-r border-gray-700'>
      {user_id && account_id ? (
          <MessageDetail user_id={user_id} account_id={account_id} />
      ) : (
        <div className='w-3/5 flex flex-col items-start gap-2'>
          <h1 className='font-bold text-3xl dark:text-neutral-300'>Select a message</h1>
          <p className='dark:text-neutral-300 opacity-50 text-base'>Choose from your existing conversations, start a new one, or just keep swimming.</p>
          <Button className={twMerge(buttonStyles(), 'cursor-pointer py-3 font-bold mt-2 text-neutral-200')}>New message</Button>
        </div>
      )}
    </div>
  )
}

export default MessageRightContent