import {defineConfig} from 'vitepress'
import minimist from "minimist";
import {
    containerPreview,
    componentPreview,
} from "@vitepress-demo-preview/plugin";
import {fileURLToPath, URL} from "node:url";

// https://vitepress.dev/reference/site-config
const opDescription = '一个包含通用组件的库'
const opTitle = 'Open-Design'
const argv = minimist(process.argv.slice(2));
const build = argv.build || false;

// @ts-ignore
export default defineConfig({
    base: build ? '/open-design/' : '/',
    title: opTitle,
    description: opDescription,
    lastUpdated: true,

    head: [['link', {rel: "icon", href: "/openDesign.png"}]],

    vite: {
        plugins: [],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("../../src", import.meta.url)),
            },
        },
    },

    markdown: {
        config(md) {
            md.use(containerPreview);
            md.use(componentPreview);
        },
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/openDesign.png',
        search: {
            provider: "local",
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                                buttonText: "搜索文档",
                                buttonAriaLabel: "搜索文档",
                            },
                            modal: {
                                noResultsText: "无法找到相关结果",
                                resetButtonTitle: "清除查询条件",
                                footer: {
                                    selectText: "选择",
                                    navigateText: "切换",
                                },
                            },
                        },
                    },
                },
            },
        },

        editLink: {
            pattern: 'https://github.com/jeff-jayden/open-design.git',
            text: '为此页提供修改建议'
        },

        lastUpdated: {
            text: 'Last updated',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        nav: [
            {text: '首页', link: '/'},
            {text: '组件', link: '/components/index', activeMatch: '/components/'},
            {text: '指南', link: '/guide/install', activeMatch: '/guide/'},
        ],

        sidebar: {
            "/guide/": [
                {
                    text: "指南",
                    items: [
                        {text: "安装", link: "/guide/install"},
                        {text: "快速开始", link: "/guide/quickstart"},
                    ],
                },
            ],
            '/components/': [
                {
                    text: '组件总览',
                    items: [
                        {
                            text: '组件总览', link: '/components/index'
                        }
                    ]
                },
                {
                    text: '基本组件',
                    items: [
                        {
                            text: 'Button', link: '/components/Button'
                        }
                    ]
                },
                {
                    text: '表单组件',
                    items: [
                        {
                            text: 'Input', link: '/components/Input'
                        },
                        {
                            text: 'Form', link: '/components/Form'
                        },
                        {
                            text: 'Switch', link: '/components/Switch'
                        },
                        {
                            text: 'Select', link: '/components/Select'
                        }
                    ]
                },
                {
                    text: '数据展示',
                    items: [
                        {
                            text: 'Collapse',link: '/components/Collapse'
                        }
                    ]
                },
                {
                    text: '导航组件',
                    items: [
                        {
                            text: 'DropDown',link: '/components/DropDown'
                        }
                    ]
                },
                {
                    text: '反馈组件',
                    items: [
                        {
                            text: 'Message', link: '/components/Message'
                        },
                        {
                            text: 'Tooltip', link: '/components/Tooltip'
                        }
                    ]
                }
            ]
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/jeff-jayden/open-design.git'}
        ]
    }
})
