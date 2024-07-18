'use client';

import { useFormState } from 'react-dom';

import PendingSubmitButton from '../PendingSubmitButton';
import requestPasswordResetAction from './requestPasswordResetAction';
import Link from 'next/link';
import styles from './ChangePassword.module.css'

type InputErrorsT = {
  email?: string[];
};
type NoErrorFormStateT = {
  error: false;
  message?: string;
};
type ErrorFormStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};

export type RequestPasswordResetFormStateT =
  | NoErrorFormStateT
  | ErrorFormStateT;

const initialState: NoErrorFormStateT = {
  error: false,
};

export default function ForgotPassword() {
  const [state, formAction] = useFormState<
    RequestPasswordResetFormStateT,
    FormData
  >(requestPasswordResetAction, initialState);

  if (!state.error && state.message === 'Success') {
    return (
      <div className='bg-zinc-100 rounded-sm px-4 py-8 mb-8'>
        <h2 className='font-bold text-lg mb-4'>Check your email</h2>
        <p>
          Для сброса пароля перейдите по ссылке из письма на вашей почте
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.h2}>
        Сброс пароля
      </h2>
      <p className='mb-4'>
        Введите вашу почту и мы отправим на нее письмо со ссылкой на сброс пароля. Или  <Link href='/signin' className='underline'>
              войдите.
            </Link>
      </p>
      <form action={formAction} className='my-8'>
        <div className='mb-3'>
          <label htmlFor='email' className='block mb-1'>
            Email *
          </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            className='input'
          />
          {state.error && state?.inputErrors?.email ? (
            <div className='text-red-700' aria-live='polite'>
              {state.inputErrors.email[0]}
            </div>
          ) : null}
        </div>
        <div className='mb-3'>
          <PendingSubmitButton />
        </div>
        {state.error && state.message ? (
          <div className='text-red-700' aria-live='polite'>
            {state.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}
