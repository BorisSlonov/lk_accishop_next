import { StrapiCurrentUserT } from '@/types/strapi/StrapiCurrentUserT';
import fetcher from './fetcher';

export async function getCurrentUser(token: string) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Secret-Key': `${process.env.ORDER_SECRET}`
    },
    next: { tags: ['strapi-users-me'] },
  };

  // Set parameters to include the 'populate' query parameter for orders and rank
  const parameters = {
    populate: ['orders', 'rank'],
  };

  // Adjust the fetcher call to include the 'populate' query parameter
  const user: StrapiCurrentUserT = await fetcher('/users/me', parameters, options);

  return user;
}
