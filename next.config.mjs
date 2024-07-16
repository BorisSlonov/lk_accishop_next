/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337', // Specify the port if your images are served from a specific port
                pathname: '/uploads/**', // Adjust the pathname to match your image paths
            },
        ],
    },
};

export default nextConfig;