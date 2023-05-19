import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";

const domain = "https://ysulyma.github.io";
const repo = "epiplexis";
const path = "/gng/1-coordinate-geometry/3-plotting/three-plotting";

const base = `${domain}/${repo}${path}/dist`;

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
});
