'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { StrapiErrorT } from '@/types/strapi/StrapiError';
import { revalidateTag } from 'next/cache';

type ActionErrorT = {
  error: true;
  message: string;
};
type ActionSuccessT = {
  error: false;
  message: 'Success';
  data: {
    inviter: string;
  };
};
export type EditInviterActionT = ActionErrorT | ActionSuccessT;

export default async function editInviterAction(
  inviter: string
): Promise<EditInviterActionT> {
  const session = await getServerSession(authOptions);
  try {
    const strapiResponse = await fetch(
      process.env.STRAPI_BACKEND_URL + 'api/user/updateInviter',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.strapiToken}`,
          'X-Secret-Key': `${process.env.ORDER_SECRET}`
        },
        body: JSON.stringify({
          inviter,
        }),
        cache: 'no-cache',
      }
    );

    if (!strapiResponse.ok) {
      const response: ActionErrorT = {
        error: true,
        message: '',
      };
      const contentType = strapiResponse.headers.get('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        const data: StrapiErrorT = await strapiResponse.json();
        response.message = data.error.message;
      } else {
        response.message = strapiResponse.statusText;
      }
      return response;
    }

    revalidateTag('strapi-users-me');
    const data = await strapiResponse.json();
    return {
      error: false,
      message: 'Success',
      data: {
        inviter: data.inviter as string,
      },
    };
  } catch (error: any) {
    return {
      error: true,
      message: 'message' in error ? error.message : error.statusText,
    };
  }
}
