import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// import * as path from "path";
import typescript2 from 'rollup-plugin-typescript2'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'url'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                {
                    'element-plus': ['ElMessage', 'ElMessageBox'],
                },
            ],
            eslintrc: {
                enabled: true,
            },
            resolvers: [ElementPlusResolver()],
            vueTemplate: true,
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            directives: true,
            exclude: [],
            version: 3,
            dts: 'components.d.ts',
        }),
        libInjectCss(),
        dts({
            insertTypesEntry: true,
        }),
        typescript2({
            check: false,
            include: ['src/components/**/*.{vue,ts}', 'lib/**/*.{vue,ts}'],
            tsconfigOverride: {
                compilerOptions: {
                    outDir: 'dist',
                    sourceMap: true,
                    declaration: true,
                    declarationMap: true,
                },
            },
            exclude: ['vite.config.ts'],
        }),
    ],
    build: {
        copyPublicDir: false,
        cssCodeSplit: true,
        target: 'esnext',
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: fileURLToPath(new URL('lib/main.ts', import.meta.url)),
            name: 'TabtabUI',
            formats: ['es'],
            fileName: (format) => `tabtab-ui.${format}.js`,
        },
        rollupOptions: {
            // make sure to externalize deps that should not be bundled
            // into your library
            // input: {
            //     main: fileURLToPath(new URL('src/main.ts', import.meta.url)),
            // },
            external: ['vue'],
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: '[name].js',
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('src', import.meta.url)),
            '@lib': fileURLToPath(new URL('lib', import.meta.url)),
            '@types': fileURLToPath(new URL('src/types', import.meta.url)),
        },
    },
})
