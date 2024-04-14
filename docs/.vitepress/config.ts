import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
const opDescription = '一个包含通用组件的库'
const opTitle = 'Open-Design'

export default defineConfig({
    title: opTitle,
    description: opDescription,
    lastUpdated: true,

    head: [['link', {rel: "icon", href: "/snowflake.png"}]],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/snowflake.png',
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
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/jeff-jayden/open-design.git'}
        ]
    }
})
