import { defineConfig } from '@vite-pwa/assets-generator';

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  preset: {
    transparent: {
      sizes: [64, 72, 96, 128, 144, 152, 192, 384, 512],
      favicons: [64]
    },
    maskable: {
      sizes: [72, 96, 128, 144, 152, 192, 384, 512]
    },
    apple: {
      sizes: [152]
    }
  },
  images: ['public/vite.svg']
});