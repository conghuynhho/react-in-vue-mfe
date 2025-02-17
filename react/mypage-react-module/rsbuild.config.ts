import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
const deps = require('./package.json').dependencies
import { randomUUID } from 'node:crypto'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    pluginReact({
      swcReactOptions: {
        importSource: '@emotion/react',
      },
    }),
    pluginModuleFederation({
      dts: false,
      name: 'reactModule2',
      filename: isProd ? `remoteEntry-${randomUUID()}.js` : 'remoteEntry.js',
      exposes: {
        './Banner': './src/components/Banner/Banner.tsx',
        './Banner2': './src/components/Banner/Banner2.tsx',
      },
      shared: Object.fromEntries(
        Object.entries(deps).map(([key, value]) => [key, { singleton: true, eager: true, requiredVersion: value }]),
      ) as any,
      // shared: {
      //   react: {
      //     singleton: true,
      //     eager: true,
      //     requiredVersion: deps.react,
      //   },
      //   'react-dom': {
      //     singleton: true,
      //     eager: true,
      //     requiredVersion: deps['react-dom'],
      //   },
      // },
    }),
  ],
})
