import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dts from 'vite-plugin-dts'; // install vite-plugin-dts

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ command }) => ({
    plugins: [vue(),
        dts({
            outputDir: 'dist',
            insertTypesEntry: true, // creates dist/index.d.ts automatically
            include: ['src/**/*.vue', 'src/**/*.ts'], // include Vue and TS files
        })],
    build: command === "build" ? {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "VueLayouts",
            fileName: (format) => `vue-layouts.${format}.js`
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: { vue: "Vue" }
            }
        },
    } : {},
    root: command === "serve" ? "playground" : ".", // use playground as root during dev
}));
