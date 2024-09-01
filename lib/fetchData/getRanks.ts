import { StrapiRankT } from '@/types/strapi/StrapiRankT';

export const getRanks = async (): Promise<StrapiRankT | undefined> => {
    try {
        const result = await fetch(`${process.env.STRAPI_BACKEND_URL}api/ranks/?populate=*`, {
            next: { revalidate: 60 },
        });

        const ranks = await result.json();

        return ranks.data;
    } catch (error) {
        return;
    }
};


export default getRanks;
