/// <reference types="vitest" />
import {defineConfig} from 'vite'
import VueMacros from "unplugin-vue-macros";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://cn.vitest.dev/config/file.html
export default defineConfig({
    plugins: [
        VueMacros.vite({
            plugins: {
                vue: vue(),
                vueJsx: vueJsx(),
            },
        })
    ],
    test: {
        globals: true,
        environment: 'jsdom'
    },
})