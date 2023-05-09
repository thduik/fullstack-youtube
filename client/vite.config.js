// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import fs from 'fs/promises';

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
    port: 5234
  }
})


// export default defineConfig(() => ({
//   plugins: [react()],
//   esbuild: {
//     loader: "jsx",
//     include: /src\/.*\.jsx?$/,
//     // loader: "tsx",
//     // include: /src\/.*\.[tj]sx?$/,
//     exclude: [],
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       plugins: [
//         {
//           name: "load-js-files-as-jsx",
//           setup(build) {
//             build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
//               loader: "jsx",
//               contents: await fs.readFile(args.path, "utf8"),
//             }));
//           },
//         },
//       ],
//     },
//   },
// }));


// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   loader: { '.js': 'jsx' }
// })

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     fs: {
//       // Allow serving files from one level up to the project root
//       allow: ['..'],
//     },
//   },
//     optimizeDeps: {
//       esbuildOptions: {
//         loader: {
//           '.js': 'jsx',
//         },
//       },
//     },
//   esbuild: {
//     loader: "jsx",
//     include: [
//       // Business as usual for .jsx and .tsx files
//       "src/**/*.jsx",
//       "src/**/*.tsx",
//       "node_modules/**/*.jsx",
//       "node_modules/**/*.tsx",

//       // Add the specific files you want to allow JSX syntax in
//       "src/LocalJsxInJsComponent.js",
//       "node_modules/bad-jsx-in-js-component/js/BadJSXinJS.js",
//       "node_modules/bad-jsx-in-js-component/ts/BadTSXInTs.ts",

//       // --- OR ---

//       // Add these lines to allow all .js files to contain JSX
//       "src/**/*.js",
//       "node_modules/**/*.js",

//       // Add these lines to allow all .ts files to contain JSX
//       "src/**/*.ts",
//       "node_modules/**/*.ts",
//     ]
//   }
// })


// export default defineConfig(() => ({
//   plugins: [react()],
//   esbuild: {
//     loader: 'jsx',
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       loader: {
//         '.js': 'jsx',
//       },
//     },
//   },
// }))