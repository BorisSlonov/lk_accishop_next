'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      className='rounded-md px-4 py-2 text-white'
      onClick={() => signOut()}
    >
      Выйти
    </button>
  );
}
