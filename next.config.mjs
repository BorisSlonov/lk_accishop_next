/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'admin.accishop.ru',
                port: '', // Leave empty if no specific port is required
                pathname: '/uploads/**', // Adjust the pathname to match your image paths
            },
        ],
    },
};

export default nextConfig;
