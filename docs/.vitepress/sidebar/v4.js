export default {
    '/v4/guide/': [
        {
            text: 'Get Started',
            items: [
                { text: '介绍', link: '/v4/guide/overview' },
                { text: '示例代码', link: '/v4/guide/example' },
                { text: '安装', link: '/v4/guide/installation' },
                { text: '在框架中使用', link: '/v4/guide/integration' },
                { text: '常见问题FAQ', link: '/v4/guide/faq' },
                { text: '更新日志', link: '/v4/guide/changelog' }
            ]
        },
        {
            text: '基础',
            items: [
                { text: 'HTTP客户端', link: '/v4/guide/http-client' },
                { text: 'DOM解析单元素', link: '/v4/guide/scraper-single' },
                { text: 'DOM解析列表', link: '/v4/guide/scraper-list' },
                { text: '内容过滤', link: '/v4/guide/content-filiter' },
                { text: '处理乱码', link: '/v4/guide/content-processing' },
                { text: '处理DOM解析结果', link: '/v4/guide/processing-data' }
            ]
        },
        {
            text: '进阶',
            items: [
                { text: '元素操作', link: '/v4/guide/modify-dom' },
                { text: '功能扩展', link: '/v4/guide/bind' },
                { text: '使用插件', link: '/v4/guide/use' },
                { text: '全局配置', link: '/v4/guide/config' },
                { text: '插件开发一', link: '/v4/guide/extension-development' },
                { text: '插件开发二', link: '/v4/guide/extension-development-2' }
            ]
        },
        {
            text: '技巧',
            items: [
                { text: '表格DOM解析', link: '/v4/guide/table' },
                { text: '递归多级DOM解析', link: '/v4/guide/multi-level' },
                { text: '忽略HTTP错误', link: '/v4/guide/ignore-http-error' }
            ]
        },
        {
            text: '插件推荐',
            items: [
                { text: 'AbsoluteUrl', link: '/v4/guide/AbsoluteUrl' },
                { text: 'Puppeteer', link: '/v4/guide/Puppeteer' },
                { text: 'PhantomJS', link: '/v4/guide/PhantomJS' },
                { text: 'CurlMulti', link: '/v4/guide/CurlMulti' },
                { text: 'Baidu', link: '/v4/guide/Baidu' },
                { text: 'Google', link: '/v4/guide/Google' },
                { text: '获取更多插件', link: '/v4/guide/more-plugin' }
            ]
        }
    ],
    '/v4/api/': [
        {
            "text": "Get Started",
            "items": [
                {
                    "text": "API手册",
                    "link": "/v4/api/overview"
                },
                {
                    "text": "phpQuery选择器",
                    "link": "/v4/api/phpQuery"
                },
                {
                    "text": "jQuery选择器",
                    "link": "/v4/api/jQuery"
                }
            ]
        },
        {
            "text": "基础API",
            "items": [
                {
                    "text": "html",
                    "link": "/v4/api/html"
                },
                {
                    "text": "getHtml",
                    "link": "/v4/api/getHtml"
                },
                {
                    "text": "rules",
                    "link": "/v4/api/rules"
                },
                {
                    "text": "range",
                    "link": "/v4/api/range"
                },
                {
                    "text": "removeHead",
                    "link": "/v4/api/removeHead"
                },
                {
                    "text": "query",
                    "link": "/v4/api/query"
                },
                {
                    "text": "getData",
                    "link": "/v4/api/getData"
                },
                {
                    "text": "queryData",
                    "link": "/v4/api/queryData"
                },
                {
                    "text": "getInstance",
                    "link": "/v4/api/getInstance"
                },
                {
                    "text": "destruct",
                    "link": "/v4/api/destruct"
                },
                {
                    "text": "destructDocuments",
                    "link": "/v4/api/destructDocuments"
                },
                {
                    "text": "pipe",
                    "link": "/v4/api/pipe"
                }
            ]
        },
        {
            "text": "特殊API",
            "items": [
                {
                    "text": "find",
                    "link": "/v4/api/find"
                },
                {
                    "text": "Elements对象介绍",
                    "link": "/v4/api/Elements-introduce"
                },
                {
                    "text": "Elements class",
                    "link": "/v4/api/Elements-class"
                }
            ]
        },
        {
            "text": "高级API",
            "items": [
                {
                    "text": "setData",
                    "link": "/v4/api/setData"
                },
                {
                    "text": "bind",
                    "link": "/v4/api/bind"
                },
                {
                    "text": "use",
                    "link": "/v4/api/use"
                },
                {
                    "text": "config",
                    "link": "/v4/api/config"
                }
            ]
        },
        {
            "text": "默认插件",
            "items": [
                {
                    "text": "get",
                    "link": "/v4/api/get"
                },
                {
                    "text": "post",
                    "link": "/v4/api/post"
                },
                {
                    "text": "multiGet",
                    "link": "/v4/api/multi-get"
                },
                {
                    "text": "multiPost",
                    "link": "/v4/api/multi-post"
                },
                {
                    "text": "encoding",
                    "link": "/v4/api/encoding"
                }
            ]
        }
    ],
}