import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { manualChunksPlugin } from "vite-plugin-webpackchunkname";
import { visualizer } from "rollup-plugin-visualizer";
import AutoImport from "unplugin-auto-import/vite";
import ViteMonacoPlugin from "vite-plugin-monaco-editor";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs-extra";

const HTMLparams = {
  minify: true,
  pages: [
    {
      entry: "src/pages/Edit/index.tsx",
      template: "index.html",
      filename: "Edit.html",
      title: "amis-edit-react",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
    {
      entry: "src/pages/Preview/index.tsx",
      template: "index.html",
      filename: "Preview.html",
      title: "amis-preview-react",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  ],
};
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd()); // 获取.env文件里定义的环境变量
  const analysPlugins: any[] =
    mode === "analys"
      ? [
          visualizer({
            emitFile: false,
            filename: "stats.html",
            gzipSize: true,
            open: true,
          }),
        ]
      : [];
  return defineConfig({
    plugins: [
      react(),
      ViteMonacoPlugin({}),
      AutoImport({
        imports: ["react", "react-router-dom"],
        dts: "src/type/auto-import.d.ts", // 路径下自动生成文件夹存放全局指令
        eslintrc: {
          // 开启eslint校验
          enabled: true,
        },
      }),
      manualChunksPlugin(),
      {
        apply: "build",
        writeBundle: async () => {
          const distDir = path.resolve(__dirname, "./AmisUtils");
          let exist = fs.existsSync(distDir);
          if (!exist) {
            fs.mkdirSync(distDir);
          } else {
            fs.removeSync(distDir);
            fs.mkdirSync(distDir);
          }
          fs.copy(
            path.resolve(__dirname, "./src/pages/AmisUtils"),
            path.resolve(__dirname, "./AmisUtils"),
            () => {
              console.log("复制成功");
              fs.removeSync(path.resolve(__dirname, "./src/pages/AmisUtils"));
            }
          );
        },
      },
      // createHtmlPlugin(HTMLparams),
    ].concat(analysPlugins),
    base: mode === "production" ? "./" : "/AmisUtils/",
    root: mode === "production" ? "src/pages" : "",
    build: {
      assetsInlineLimit: 4096,
      // assetsDir: "static",
      cssCodeSplit: true,
      emptyOutDir: true,
      sourcemap: false,
      // manifest: true, //开启manifest
      rollupOptions: {
        input: {
          edit: path.resolve(__dirname, "src/pages/edit.html"),
          preview: path.resolve(__dirname, "src/pages/preview.html"),
        },
        // output: {
        //   // dir: "AmisUtils",
        //   chunkFileNames: "static/js/[name]-[hash].js",
        //   entryFileNames: "static/js/[name].js",
        //   assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        //   manualChunks(id: string) {
        //     if (id.includes("amis")) {
        //       return "amis"; //代码宰割为第三方包
        //     } else if (id.includes("node_modules")) {
        //       return "vendor";
        //     }
        //   },
        // },
      },

      outDir: "AmisUtils",
    },
    define: {
      "process.env": process.env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 8888,
      host: true,
      proxy: {
        "/amisApi": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: false, // 解决代理https协议报错问题
          headers: {
            "Access-Control-Allow-Origin": "*",
            cookie:
              "X-Uaa-Csrf=RR8UGf6oTbz8I8GZ8m67q4; x-token-random=1073470.6915378917; JSESSIONID=1DEB9AF5A259A545DEE55D475C904A7B; SESSION=N2Q0ODcwZjItNjFjOS00ZWQxLWI4YmUtNTQ0NjcwNGNlMTky",
          },
          rewrite: (path: string) => path.replace(/^\/amisApi/, "/amisApi"),
        },
      },
    },
    css: {
      preprocessorOptions: {
        // 全局样式引入
        scss: {
          additionalData: `@import "@/assets/styles/global.scss";`,
        },
      },
    },
  });
};
