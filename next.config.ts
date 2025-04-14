/** @type {import('next').NextConfig} */

import { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: ['roshan-personalwebsite.s3.ap-south-1.amazonaws.com',
            'pragya-personalwebsite.s3.ap-south-1.amazonaws.com',
      'miro.medium.com'],
  },
};

export default nextConfig;
