'use client';

import { FormEvent, useState } from 'react';
import editInviterAction, { EditInviterActionT } from './EditInviterAction';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  inviter: string;
};

export default function EditInviter({ inviter }: Props) {
  const [edit, setEdit] = useState(false);
  const [newInviter, setNewInviter] = useState(inviter);
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const { update } = useSession();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    // validate newInviter
    if (newInviter === '' || newInviter.length != 9) {
      setError('Код пригласителя должен содержать 9 знаков');
      setLoading(false);
      return;
    }

    // call server action
    const actionResponse: EditInviterActionT = await editInviterAction(newInviter);

    // handle error
    if (actionResponse.error) {
      setError(actionResponse.message);
      setMessage(actionResponse.message);
      setLoading(false);
      return;
    }

    // handle success
    // inviter is updated in DB and getCurrentUser fetch was updated with revalidateTag
    if (!actionResponse.error && actionResponse.message === 'Success' && actionResponse.data) {
      // inform user of success
      setError(null);
      setMessage('Пригласитель обновлен');
      setLoading(false);

      // update NextAuth token
      await update({ inviter: actionResponse.data.inviter });
      // refresh server components
      router.refresh();
    }
  }

  return (
    <div className='mb-2'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='inviter' className='block italic'>
          Inviter:
        </label>
        <div className='flex gap-1'>
          {!edit && <div>{inviter ? inviter : 'Нет пригласител'}</div>}
          {edit && (
            <>
              <input
                type='text'
                className='input'
                required
                name='inviter'
                id='inviter'
                value={newInviter}
                onChange={(e) => setNewInviter(e.target.value)}
              />
              <button
                type='submit'
                className={`bg-blue-400 px-3 py-1 rounded-md disabled:bg-sky-200 disabled:text-gray-400 disabled:cursor-wait`}
                disabled={loading}
                aria-disabled={loading}
              >
                {loading ? 'сохраняем' : 'сохранить'}
              </button>
            </>
          )}
          <button
            type='button'
            onClick={() => {
              setEdit((prev) => !prev);
              setError(null);
              setMessage(null);
              setNewInviter(inviter);
            }}
            className='underline ml-1'
          >
            {edit ? 'закрыть' : 'изменить'}
          </button>
        </div>
        {edit && error && (
          <div className='text-red-700' aria-live='polite'>
            Something went wrong: {error}
          </div>
        )}
        {edit && !error && message ? (
          <div className='text-green-700' aria-live='polite'>
            {message}
          </div>
        ) : null}
      </form>
    </div>
  );
}
