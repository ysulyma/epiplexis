import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";
import svgr from "vite-plugin-svgr";

const domain = "https://ysulyma.github.io";
const repo = "epiplexis";
const path = "/what-study/topology-demo";

const base = `${domain}/${repo}${path}/dist`;

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        dimensions: false,
        ref: true,
      },
    }),
  ],
});
