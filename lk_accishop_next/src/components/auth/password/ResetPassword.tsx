'use client';

import { useFormState } from 'react-dom';
import resetPasswordAction from './resetPasswordAction';
import Link from 'next/link';
import PendingSubmitButton from '../PendingSubmitButton';

type Props = {
  code: string | undefined;
};
type InputErrorsT = {
  password?: string[];
  passwordConfirmation?: string[];
};

// option A
/*
type InitialFormStateT = {
  error: false;
  code: string; // we set code to props.code || ''
};
type ErrorFormStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
  code: string;
};
type SuccessFormStateT = {
  error: false;
  message: 'Success';
};

export type ResetPasswordFormStateT =
  | InitialFormStateT
  | ErrorFormStateT
  | SuccessFormStateT;
*/

// option B
export type ResetPasswordFormStateT = {
  error: boolean;
  message?: string;
  inputErrors?: InputErrorsT;
  code?: string;
};

export default function ResetPassword({ code }: Props) {
  const initialState: ResetPasswordFormStateT = {
    error: false,
    code: code || '',
  };
  const [state, formAction] = useFormState<ResetPasswordFormStateT, FormData>(
    resetPasswordAction,
    initialState
  );

  if (!code) return <p>Error, please use the link we mailed you.</p>;
  if (!state.error && 'message' in state && state.message === 'Success') {
    return (
      <div className='bg-zinc-100 rounded-sm px-4 py-8 mb-8'>
        <h2 className='font-bold text-lg mb-4'>Password was reset</h2>
        <p>
          Ваш пароль был сброшен! {' '}
          <Link href='/signin' className='underline'>
            войти
          </Link>{' '}
          с новым паролем
        </p>
      </div>
    );
  }

  return (
    <div className='mx-auto my-8 p-8 max-w-lg bg-zinc-100 rounded-sm'>
      <h2 className='text-center text-2xl text-blue-400 mb-8 font-bold'>
        Сбросить пароль
      </h2>
      <p className='mb-4'>
        Введите новый пароль
      </p>
      <form action={formAction} className='my-8'>
        <div className='mb-3'>
          <label htmlFor='password' className='block mb-1'>
            Пароль
          </label>
          <input
            type='password'
            id='password'
            name='password'
            required
            className='input'
          />
          {state.error && state?.inputErrors?.password ? (
            <div className='text-red-700' aria-live='polite'>
              {state.inputErrors.password[0]}
            </div>
          ) : null}
        </div>
        <div className='mb-3'>
          <label htmlFor='passwordConfirmation' className='block mb-1'>
            Повторите пароль
          </label>
          <input
            type='password'
            id='passwordConfirmation'
            name='passwordConfirmation'
            required
            className='input'
          />
          {state.error && state?.inputErrors?.passwordConfirmation ? (
            <div className='text-red-700' aria-live='polite'>
              {state.inputErrors.passwordConfirmation[0]}
            </div>
          ) : null}
        </div>
        <div className='mb-3'>
          <PendingSubmitButton />
        </div>
        {state.error && state.message ? (
          <div className='text-red-700' aria-live='polite'>
            Error: {state.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}
