import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await fetch(
      process.env.STRAPI_BACKEND_URL + 'api/user/me',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.strapiToken}`,
        },
        body: JSON.stringify({ inviter: req.body.inviter }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ message: data.message || 'Something went wrong' });
    }

    return res.status(200).json({ message: 'Success', data });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
