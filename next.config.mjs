/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/snapshot', // Matches your API route path
            destination: 'https://sundial-fe-interview.vercel.app/api/snapshot', // Your actual API endpoint
          },
        ];
      },
      headers: async () => [
        {
          source: '/api/snapshot', // Matches your API route path
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' }, // Allow all origins (not secure)
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ],
        },
      ],
};

export default nextConfig;
