/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
<<<<<<< HEAD
    domains: [
      "localhost",
      "res.cloudinary.com",
      "via.placeholder.com",
      "i.ibb.co",
      "i.ibb.co.com",
    ],
=======
    domains: ["localhost","res.cloudinary.com",'via.placeholder.com','i.ibb.co','i.ibb.co.com'],
>>>>>>> 02e6e572dec343b7d129c5749c313969010a9b9c
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
        port: "",
      },
    ],
  },
};

export default nextConfig;
