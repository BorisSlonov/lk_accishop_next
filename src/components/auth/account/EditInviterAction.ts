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
export type addInviterActionT = ActionErrorT | ActionSuccessT;

export default async function addInviterAction(
  inviter: string
): Promise<addInviterActionT> {
  const session = await getServerSession(authOptions);
  try {
    const strapiResponse = await fetch(
      process.env.STRAPI_BACKEND_URL + 'api/user/me',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.strapiToken}`,
        },
        body: JSON.stringify({
          inviter,
        }),
        cache: 'no-cache',
      }
    );

    // handle strapi error
    if (!strapiResponse.ok) {
      const response: ActionErrorT = {
        error: true,
        message: '',
      };
      // check if response in json-able
      const contentType = strapiResponse.headers.get('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        const data: StrapiErrorT = await strapiResponse.json();
        response.message = data.error.message;
      } else {
        response.message = strapiResponse.statusText;
      }
      return response;
    }

    // handle strapi success
    // this will cause a screen flicker but only in dev mode!!
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
