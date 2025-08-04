import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        jsxInject: `import { h, Fragment } from 'preact'`
    },
    build: {
        target: ['es2015', 'chrome60', 'firefox60', 'safari11'],
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name]-[hash].js`,
                chunkFileNames: `assets/[name]-[hash].js`,
                assetFileNames: `assets/[name]-[hash].[ext]`
            }
        }
    },
    server: {
        open: true,
    },
    resolve: {
        alias: {
            'react': 'preact/compat',
            'react-dom': 'preact/compat'
        }
    }
})