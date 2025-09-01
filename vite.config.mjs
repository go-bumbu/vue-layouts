import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ command }) => ({
    plugins: [vue()],
    build: command === "build" ? {
        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "VueUtilsLibrary",
            fileName: (format) => `vue-utils-library.${format}.js`
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: { vue: "Vue" }
            }
        }
    } : {},
    root: command === "serve" ? "playground" : ".", // use playground as root during dev
}));