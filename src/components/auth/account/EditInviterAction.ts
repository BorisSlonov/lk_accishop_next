import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

// editInviterAction.js
export type EditInviterActionT = {
  error: boolean;
  message: string;
  data?: { inviter: string };
};

export default async function EditInviterAction(inviter: string): Promise<EditInviterActionT> {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
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

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: data.message || 'Something went wrong' };
    }

    return { error: false, message: 'Success', data };
  } catch (error) {
    return { error: true, message: 'Something went wrong' };
  }
}
