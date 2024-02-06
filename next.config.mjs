/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET:"mhG99MOTkEmAiQsW8ttDKXxTj1YgTgQQ0ACrG9fBI/0=",
      },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'dgalywyr863hv.cloudfront.net',
          },
        ],
      },
};

export default nextConfig;
