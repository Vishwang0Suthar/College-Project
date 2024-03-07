/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['m.media-amazon.com', 'images.unsplash.com'], // Replace 'example.com' with the domain from which you're loading images
    },
    webpack: (config, { isServer }) => {
        // Exclude 'child_process' module from client-side bundle
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                child_process: false,
                fs: false,
                net: false,
                tls: false,
                dns: false

            };
        }
        return config;
    }
};

export default nextConfig;

