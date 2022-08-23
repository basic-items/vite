import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import qiankun from 'vite-plugin-qiankun';
import { resolve } from "path";

const { name } = require('./package');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  let variable = {}
  Object.keys(env).forEach(key => {
    const val = env[key]
    if (['true', 'false'].includes(val)) {
      variable[key] = val === 'true' ? true : false
    } else {
      variable[key] = val
    }
  })
  console.log('variable.base', variable.base)
  return {
    base: variable.VITE_base,
    plugins: [
      vue(),
      vueJsx(),
      vueSetupExtend(),
      AutoImport({
        /** 改造目标 */
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        /**
         * 自动导入目录下的模块导出
         * 默认只扫描目录下的一级模块
         */
        dirs: [
          // './composables', // 仅根模块
          // './composables/**', // 所有嵌套模块
        ],
        /**
         * 生成对应 .d.ts 文件的文件路径
         * 当 `t​​ypescript` 在本地安装时，默认为 './auto-imports.d.ts'
         * 设置 `false`为将禁用
         */
        dts: './auto-imports.d.ts',
        /** 自定义解析器，与 `unplugin-vue-components` 兼容 */
        resolvers: [],
        /** 生成对应的 .eslintrc-auto-import.json 文件 */
        eslintrc: {
          enabled: false, // 默认 `false`
          filepath: './.eslintrc-auto-import.json', // 默认 `./.eslintrc-auto-import.json`
          globalsPropValue: true, // 默认 `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        /** 进口登记 */
        imports: [
          'vue',
          'vue-router',
          {
            'naive-ui': [
              'NInput',
              'NButton',
              'NSwitch',
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ],
          },
        ],
      }),
      Components({
        /** 生成“components.d.ts”全局声明 */
        dts: true,
        /** 搜索子目录 */
        deep: true,
        /** 允许子目录作为组件的命名空间前缀 */
        directoryAsNamespace: false,
        /**
         * 忽略命名空间前缀的子目录路径
         * 当 `directoryAsNamespace: true` 时有效
         */
        globalNamespaces: [],
        /** 用于搜索组件的目录的相对路径 */
        dirs: ['src/components'],
        /** 组件的有效文件扩展名 */
        extensions: ['vue'],
        /**
         * 自动导入指令
         * 默认值：Vue 3 为 `true`，Vue 2 为 `false`
         * 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认禁用。
         * 要安装 Babel，请运行：`npm install -D @babel/parser`
         */
        directives: true,
        /** 解析前变换路径 */
        importPathTransform: v => {
          return v
        },
        /** 允许组件覆盖其他同名组件 */
        allowOverrides: false,
        /** 用于转换目标的过滤器 */
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        /** TypeScript 不友好的在此导入 */
        types: [{
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        }],
        /** 组件的解析器 */
        resolvers: [NaiveUiResolver()],
      }),
      qiankun('vue3Vite', { useDevMode: true })
    ],
    resolve: {
      extensions: ['.js', 'ts', '.tsx', '.jsx', '.vue', '.styl', '.json'],
      alias: {
        '@': resolve('src'),
        '@api': resolve('src/api'),
        '@img': resolve('src/assets/img'),
        '@config': resolve('src/config'),
        '@mixins': resolve('src/mixins'),
        '@router': resolve('src/router'),
        '@store': resolve('src/store'),
        '@utils': resolve('src/utils'),
        '@layout': resolve('src/layout'),
        '@const': resolve('src/modules/constant.ts'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 9010,
      cors: true,
      proxy: {
        '^/genesis-license': {
          target: 'http://10.0.6.31:3000/',
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(/^\/xxxx/, ''),
        }
      },
    },
    optimizeDeps: {
      include: []
    },
    build: {
      outDir: 'license',
      terserOptions: {
        drop_console: true,
        drop_debugger: true,
      },
      commonjsOptions: {
        include: [/node_modules/]
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
    define: {
      'process.env': variable
    }
  }
})
