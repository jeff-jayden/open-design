# Open Design 构建优化报告

## 1. 报告范围

本项目包含两个需要分别评价的构建对象：

1. **`ex-app` 示例应用**：位于 `app/ex-app`，属于最终运行在浏览器中的 Web 应用，优化目标是减少首屏下载体积、改善缓存和开发启动速度。
2. **`open-design` 组件库**：源码位于 `packages`，发布产物位于根目录 `dist`，优化目标是减少组件库自身产物、避免重复依赖、支持按需引入、Tree Shaking 和多环境消费。

需要注意：本报告中的“优化前后体积数据”来自 `ex-app` 的两套生产构建。组件库优化主要通过产物结构、依赖外置和发布能力验证，不能把 `ex-app` 的 54.8% 降幅直接表述成组件库本体缩小了 54.8%。

---

## 2. ex-app 示例应用优化

### 2.1 JavaScript 优化

#### Element Plus 按需导入

优化前在 `src/main.baseline.ts` 中全量注册 Element Plus：

```ts
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(App).use(ElementPlus).mount('#app');
```

这种写法会把 Element Plus 大量未使用组件及完整样式带入最终产物。

优化后通过以下工具分析 Vue 模板并自动生成组件导入：

- `unplugin-vue-components`
- `unplugin-auto-import`
- `ElementPlusResolver`

应用入口只保留：

```ts
createApp(App).mount('#app');
```

收益：

- 只构建页面实际使用的 Element Plus 组件。
- 不再全局安装完整 Element Plus 插件。
- 自动生成 `auto-imports.d.ts` 和 `components.d.ts`，保留 TypeScript 类型提示。

#### Terser 生产压缩

优化版使用 Terser 替代默认 esbuild 压缩，并配置：

```ts
compress: {
  drop_console: true,
  drop_debugger: true,
  passes: 2
},
format: {
  comments: false
}
```

作用：

- 执行两轮压缩分析。
- 删除生产环境 `console` 和 `debugger`。
- 删除构建产物中的注释。
- 对条件表达式、不可达代码和重复表达式进行进一步压缩。

代价是构建速度比 esbuild 慢，因此只在生产优化构建中使用。

#### 第三方依赖分包

Rollup 根据模块路径将产物分为：

- `vue`：Vue 运行时及 `@vue/*` 模块。
- `element-plus`：Element Plus 及图标相关代码。
- `vendor`：其他 `node_modules` 依赖。
- `index`：应用自身业务代码。

分包本身不会直接删除代码，主要价值是：

- 业务代码变化时，Vue、Element Plus 文件哈希可以保持稳定。
- 浏览器可以长期缓存第三方依赖。
- 避免所有代码集中到单个超大文件。
- 便于通过构建报告定位第三方依赖体积。

当前实现使用 `manualChunks(id)` 判断已经进入模块图的依赖，没有把 `element-plus` 包根强制设为入口，因此不会因为分包配置反向引入完整组件库。

### 2.2 CSS 优化

#### Element Plus 样式按需导入

优化前直接引入完整样式：

```ts
import 'element-plus/dist/index.css';
```

优化后由 `ElementPlusResolver({ importStyle: 'css' })` 为实际使用的组件生成对应样式导入。

结果：

- Element Plus CSS 从全量主题变成组件级样式集合。
- 示例应用 CSS 从 `377.62 KB` 降至 `175.71 KB`。
- 减少 `201.91 KB`，降幅约 `53.5%`。

#### CSS 独立输出

开启 `cssCodeSplit: true`，让业务样式和 Element Plus 样式保持独立文件：

- `index-*.css`：示例应用与 Open Design 样式。
- `element-plus-*.css`：按需导入的 Element Plus 样式。

这样有利于缓存、分析和后续独立替换主题资源。

### 2.3 gzip 与 Brotli 传输优化

优化版通过 `vite-plugin-compression` 同时生成：

- `.gz`：gzip 预压缩文件。
- `.br`：Brotli 预压缩文件。

只压缩大于 `1 KB` 的文件，避免为极小资源生成收益有限的副本。

实际结果：

- 优化前 JS + CSS gzip 体积：`368.08 KB`。
- 优化后 JS + CSS gzip 体积：`161.68 KB`，降低 `56.1%`。
- 优化后 JS + CSS Brotli 体积：约 `133.53 KB`。
- 优化后 Brotli 相比优化前 gzip 降低约 `63.7%`。

注意：生成 `.gz` 和 `.br` 文件不代表浏览器一定会使用它们。部署时还需要在 Nginx、CDN、对象存储或静态服务器中配置 `Accept-Encoding` 内容协商和正确的 `Content-Encoding` 响应头。

### 2.4 开发环境优化

通过 `optimizeDeps` 预构建：

```ts
include: ['vue', 'element-plus/es']
```

作用：

- 使用 esbuild 预先处理依赖。
- 减少开发服务器首次请求时的依赖解析工作。
- 改善冷启动和首次打开页面的速度。
- 将复杂依赖转换为浏览器开发环境容易消费的 ESM。

该配置主要优化开发体验，不影响生产包体积。

### 2.5 构建分析与体积防回退

基线版和优化版都使用 Rollup Visualizer 生成分析报告：

```text
app/ex-app/dist-baseline/stats.html
app/ex-app/dist-optimized/stats.html
```

报告包含模块组成、原始体积、gzip 体积和 Brotli 体积，可用于定位大型依赖。

项目还增加了体积预算：

- JS + CSS 原始体积不得超过 `650 KB`。
- JS + CSS gzip 体积不得超过 `170 KB`。

执行：

```bash
pnpm --filter ex-app run build:size-check
```

当前结果：

```text
raw: 594.71 KB / 650 KB budget
gzip: 157.45 KB / 170 KB budget
```

超过预算时脚本会返回失败状态，可以直接接入 CI，防止新增依赖或全量导入导致包体积回退。

### 2.6 ex-app 优化结果

| 指标 | 未优化 | 优化后 | 减少量 | 降幅 |
| --- | ---: | ---: | ---: | ---: |
| JavaScript（压缩后） | 969.36 KB | 433.26 KB | 536.10 KB | 55.3% |
| CSS（压缩后） | 377.62 KB | 175.71 KB | 201.91 KB | 53.5% |
| JS + CSS | 1,346.98 KB | 608.97 KB | 738.01 KB | 54.8% |
| JS + CSS gzip | 368.08 KB | 161.68 KB | 206.40 KB | 56.1% |

测试环境：Vite 5.4.21，测试日期 2026-08-10。同一份业务代码分别使用 baseline 和 optimized 配置构建；依赖或源码更新后，文件哈希和体积会有小幅变化。

---

## 3. open-design 组件库优化

### 3.1 JavaScript 产物与兼容性优化

组件库使用三套 Vite Library Mode 配置输出：

| 产物 | 输出目录 | 使用场景 |
| --- | --- | --- |
| ESM | `dist/es` | Vite、Webpack 等现代构建工具 |
| CommonJS | `dist/lib` | Node.js `require` 和旧工具链 |
| UMD | `dist/umd` | 浏览器通过 `<script>` 直接使用 |

不同消费环境可以选择对应格式，不需要由使用者再次转换完整组件库。

#### 运行时依赖 external

ESM 和 CJS 统一外置以下真实运行时依赖：

```ts
[
  'vue',
  'async-validator',
  '@popperjs/core',
  '@element-plus/icons-vue',
  'element-plus',
  'lodash-es',
  'lodash-unified'
]
```

同时删除了源码没有使用的 `axios` external 配置。

收益：

- 避免 Vue、Element Plus、lodash 等依赖被重复打入组件库。
- 避免业务项目同时出现多个 Vue 实例。
- 由最终应用统一决定依赖版本和打包策略。
- 让组件库产物聚焦自身组件代码。

UMD 版本外置体积较大的 Vue、Element Plus 和 Element Plus Icons，并映射为浏览器全局变量。这样可以减小 UMD 文件，但浏览器直接使用时必须先加载这些依赖。

#### 保留模块结构与 Tree Shaking

ESM 和 CJS 使用：

```ts
preserveModules: true
```

它不会把所有组件合并为单个大文件，而是保留 Button、Form、Tooltip 等模块结构。

收益：

- 支持按组件或子路径导入。
- 为下游 Vite/Webpack 提供更细粒度的 Tree Shaking 输入。
- 用户只使用部分组件时，不必把全部组件代码加入业务产物。
- 单个组件变化不会要求所有模块重新生成同一个大文件。

#### Vue 模板编译优化

移除了原来人为关闭的配置：

```ts
hoistStatic: false
cacheHandlers: false
```

恢复 Vue 默认生产优化后，编译器可以执行静态节点提升和事件处理器缓存，减少组件渲染阶段的重复对象创建与计算。

### 3.2 组件库 CSS 优化

组件主题采用独立构建链：

```text
SCSS → Dart Sass → PostCSS → cssnano → dist/theme-chalk
```

#### 组件级样式输出

Gulp 会分别编译 `button.scss`、`form.scss`、`input.scss` 等文件，而不是只输出一个完整 CSS。

收益：

- 消费者可以只加载使用组件的样式。
- 避免按需使用组件时仍加载完整主题。
- JS 构建和主题构建相互独立。

同时提供：

- `dist/theme-chalk/*.css`：组件级主题文件。
- `dist/umd/index.css`：UMD 场景使用的完整主题文件。

#### cssnano 压缩

主题构建接入：

```ts
cssnano({ preset: 'default' })
```

用于删除空白、合并可合并规则、压缩颜色和值表达式、移除无用注释，降低发布 CSS 体积。

为了排除 Sass 和其他 PostCSS 插件的影响，使用同一份 SCSS 源码和完全相同的 `Sass → PostCSS` 流程，仅切换是否启用 cssnano，得到以下对照数据。

##### 完整主题 index.css

| 口径 | 未使用 cssnano | 使用 cssnano | 减少量 | 降幅 |
| --- | ---: | ---: | ---: | ---: |
| 原始 CSS | 36,804 B | 32,637 B | 4,167 B | 11.3% |
| gzip 后 | 5,820 B | 5,353 B | 467 B | 8.0% |
| Brotli 后 | 4,900 B | 4,582 B | 318 B | 6.5% |

完整主题原始 CSS 从约 `36.80 KB` 降至 `32.64 KB`，降低约 `11.3%`。

##### 全部组件主题文件

统计范围包括 `button.css`、`form.css`、`input.css`、`index.css` 等全部 13 个 CSS 文件：

| 口径 | 未使用 cssnano | 使用 cssnano | 减少量 | 降幅 |
| --- | ---: | ---: | ---: | ---: |
| 原始 CSS 总量 | 115,616 B | 102,014 B | 13,602 B | 11.8% |
| gzip 后总量 | 25,055 B | 22,518 B | 2,537 B | 10.1% |
| Brotli 后总量 | 20,196 B | 18,529 B | 1,667 B | 8.3% |

cssnano 对全部组件样式的原始体积优化约为 `11.8%`，即减少约 `13.60 KB`；经过 gzip 后仍额外降低约 `10.1%`。

gzip/Brotli 本身也会压缩空白和重复字符串，因此 cssnano 在传输体积上的增量收益小于原始 CSS 降幅，这是正常现象。这里的 gzip/Brotli 数字用于评价 cssnano 对同一份 CSS 的影响，不表示组件库发布目录会附带 `.gz` 或 `.br` 文件。

#### 样式 sideEffects 声明

组件包增加：

```json
"sideEffects": [
  "**/*.css",
  "**/*.scss"
]
```

这样下游构建工具可以安全移除未使用的 JavaScript，同时不会误删具有副作用的样式导入。

### 3.3 类型声明与发布结构优化

`vite-plugin-dts` 只在 ESM 构建执行一次，不再由 ESM 和 CJS 重复生成声明，减少完整构建时间。

同时配置：

- `entryRoot: 'packages'`，修正声明文件多出一层 `packages` 的问题。
- 排除测试文件和 `_test_` 目录声明。
- 同步输出到 `dist/es` 和 `dist/types`。

实际类型入口：

```text
dist/es/index.d.ts
dist/types/index.d.ts
```

与包中的 `types: "es/index.d.ts"` 保持一致。

### 3.4 Package Exports 优化

组件包通过 `main`、`module`、`types` 和 `exports` 区分：

- `import` 使用 ESM。
- `require` 使用 CommonJS。
- TypeScript 使用声明文件。
- `./es/*` 与 `./lib/*` 支持子路径导入。

这可以避免构建工具猜测入口，并提高 Node.js、TypeScript 和不同打包工具解析结果的一致性。

### 3.5 组件库目前没有实施的 gzip/Brotli

组件库发布目录目前没有生成 `.gz` 或 `.br` 文件，这是有意区别于 `ex-app` 的地方：

- npm 组件库通常由最终业务应用重新打包。
- 最终应用或 CDN 才能确定实际合并、分包和传输策略。
- 在 npm 包中附带每个模块的 `.gz`、`.br` 通常只会增加安装包体积，业务服务器也不会直接使用这些文件。

因此，gzip/Brotli 预压缩属于 `ex-app` 或最终部署项目的优化，不属于当前 open-design npm 组件库发布优化。

---

## 4. 优化点分类总表

| 优化对象 | 分类 | 具体手段 | 主要收益 |
| --- | --- | --- | --- |
| ex-app | JS | Element Plus 组件按需导入 | 删除未使用组件代码 |
| ex-app | JS | Terser 两轮压缩 | 减少生产 JS 体积 |
| ex-app | JS | Vue/Element Plus/vendor 分包 | 提高长期缓存利用率 |
| ex-app | CSS | Element Plus 样式按需导入 | CSS 降低 53.5% |
| ex-app | CSS | CSS 独立分包 | 改善缓存与资源分析 |
| ex-app | 传输 | gzip + Brotli 预压缩 | gzip 传输体积降低 56.1% |
| ex-app | 开发体验 | optimizeDeps | 改善开发冷启动与依赖加载 |
| ex-app | 质量保障 | Visualizer + 体积预算 | 分析依赖并防止体积回退 |
| open-design | JS | ESM/CJS/UMD 多格式输出 | 兼容不同消费环境 |
| open-design | JS | external 运行时依赖 | 避免重复打包和 Vue 多实例 |
| open-design | JS | preserveModules | 支持按需引入与 Tree Shaking |
| open-design | JS | Vue 默认编译优化 | 静态提升与处理器缓存 |
| open-design | CSS | 组件级 SCSS 构建 | 支持样式按需加载 |
| open-design | CSS | cssnano | 完整主题降低 11.3%，全部组件样式降低 11.8%，gzip 后降低 10.1% |
| open-design | CSS | sideEffects | 防止样式被 Tree Shaking 误删 |
| open-design | 类型 | DTS 只生成一次 | 缩短构建并统一类型入口 |
| open-design | 发布 | Package Exports | 明确 ESM/CJS/类型和子路径入口 |

---

## 5. 如何复现与验证

### 对比 ex-app 优化前后

```bash
pnpm --filter ex-app run build:compare
```

输出：

```text
app/ex-app/dist-baseline
app/ex-app/dist-optimized
```

### 检查体积预算

```bash
pnpm --filter ex-app run build:size-check
```

### 检查示例应用类型

```bash
pnpm --filter ex-app run type-check
```

### 构建 open-design 组件库

```bash
pnpm run build
```

将依次生成 CJS、ESM、UMD 和主题产物。

---

## 6. 后续可继续优化

### ex-app

- 当应用增加路由或大型功能面板后，使用动态 `import()` 进行路由级和功能级懒加载。
- 在实际 CDN/Nginx 中启用 `.br`、`.gz` 内容协商。
- 将体积预算命令加入 GitHub Actions，做到每次提交自动检查。
- 使用 Lighthouse/Web Vitals 补充首屏加载、LCP、INP 等运行时指标，而不只比较构建体积。

当前 ex-app 是单页表单演示，页面中的大多数组件首屏就需要展示。此时强行使用动态导入只会增加请求和状态管理复杂度，因此暂未为了“看起来有懒加载”而拆分首屏必需代码。

### open-design 组件库

- 替换 Gulp Sass 使用的 legacy JS API，消除 Dart Sass 弃用警告。
- 修复 Tooltip、Text Ellipsis 等组件现有 TypeScript 诊断。
- 在 CI 中让类型声明错误直接导致发布失败。
- 增加发布前的 npm 包内容检查和 ESM/CJS 消费测试。
- 根据组件数量增长情况，考虑生成更友好的组件级 exports，而不是依赖宽泛的通配符路径。

---

## 7. 简历表述

> 负责 Vue 3 组件库及示例应用的工程化与构建优化：组件库基于 Vite/Rollup 输出 ESM、CJS、UMD 多格式产物，通过依赖 external、preserveModules、Package Exports 和 sideEffects 支持按需引入与 Tree Shaking，并使用 Sass/PostCSS/cssnano 构建组件级主题，使完整主题 CSS 降低 11.3%、全部组件样式降低 11.8%；示例应用通过 Element Plus 组件与样式按需导入、Terser 压缩、第三方依赖分包及 gzip/Brotli 预压缩，将 JS/CSS 总体积降低 54.8%，gzip 传输体积降低 56.1%，同时建立 Bundle 可视化分析和体积预算机制防止构建体积回退。
