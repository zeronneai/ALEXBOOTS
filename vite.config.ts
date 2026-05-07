import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api/shopify': {
            target: `https://${env.VITE_SHOPIFY_STORE_DOMAIN}`,
            changeOrigin: true,
            rewrite: () => '/api/2024-01/graphql.json',
            headers: {
              'X-Shopify-Storefront-Access-Token':
                env.SHOPIFY_PRIVATE_TOKEN || env.VITE_SHOPIFY_STOREFRONT_TOKEN,
            },
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
