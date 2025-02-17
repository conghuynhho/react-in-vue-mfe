import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
const deps = require('./package.json').dependencies;

// const shared = Object.fromEntries(
//   Object.entries(deps).map(([key, value]) => [key, { singleton: true, eager: true, requiredVersion: value }]),
// ) as any;

// console.log('=========shared', shared);

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      // dts: false,
      name: 'reactModule',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/ButtonWebComponent.tsx',
      },
      // shared: {
        // react: {
        //   singleton: true,
        //   eager: true,
        //   requiredVersion: deps.react,
        // },
        // 'react-dom': {
        //   singleton: true,
        //   eager: true,
        //   requiredVersion: deps['react-dom'],
        // },
        // '@mui/material': {
        //   singleton: true,
        //   eager: true,
        //   requiredVersion: deps['@mui/material'],
        // },
        // '@mui/icons-material': {
        //   singleton: true,
        //   eager: true,
        //   requiredVersion: deps['@mui/icons-material'],
        // },
        // '@mui/lab': {
        //   singleton: true,
        //   eager: true,
        //   requiredVersion: deps['@mui/lab'],
        // },
      // },
      // shared
    }),
  ],
})

