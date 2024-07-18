import Link from 'next/link';

export default function ConfirmationMessage() {
  return (
    <div className='bg-zinc-100 rounded-sm px-4 py-8 mb-8'>
      <h2 className='font-bold text-lg mb-4'>Подтверждение почты</h2>
      <p>
        Для подтверждения регистрации перейдите по ссылке из письма
      </p>
      <h3 className='font-bold my-4'>No email found?</h3>
      <p>
        Если вы не видите пиьсьмо, пожалуйста, проверьте спам
      </p>
      <p>
        или{' '}
        <Link href='/confirmation/newrequest' className='underline'>
          запросить новое письмо
        </Link>
      </p>
    </div>
  );
}
