/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com",
                protocol: "http"
            },
            {
                hostname: "picsum.photos",
                protocol: "https"
            }
        ]
    }
};

export default nextConfig;
