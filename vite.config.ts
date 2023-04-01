import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  const proxyPath = env.VITE_APP_BASE_URL.startsWith('/') ? env.VITE_APP_BASE_URL : '/' + env.VITE_APP_BASE_URL

  return {
    server: {
      open: true,
      proxy: {
        [proxyPath]: {
          target: "http://localhost:8090",
          changeOrigin: true,
          rewrite: (path) => path,
        },
      }
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定图标文件夹，绝对路径（NODE代码）
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg-icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})
