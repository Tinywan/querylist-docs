export default {
    '/v3/guide/': [
        {
            text: 'Get Started',
            items: [
                { text: '介绍', link: '/v3/guide/overview' },
                { text: '安装', link: '/v3/guide/installation' },
                { text: '在框架中使用', link: '/v3/guide/integration' },
                { text: '快速上手', link: '/v3/guide/start' },
                { text: 'DOM解析文章页', link: '/v3/guide/scraper-single' },
                { text: 'DOM解析列表页', link: '/v3/guide/scraper-list' }
            ]
        },
        {
            text: '技巧',
            items: [
                { text: '内容过滤', link: '/v3/guide/content-filiter' },
                { text: '回调函数中传参数', link: '/v3/guide/callback' },
                { text: '递归多级DOM解析', link: '/v3/guide/multi-level' },
                { text: 'DOM解析乱码解决方案', link: '/v3/guide/content-processing' },
                { text: '区域选择器例子', link: '/v3/guide/range' },
                { text: '更复杂的HTTP操作', link: '/v3/guide/http-more' }
            ]
        },
        {
            text: '插件',
            items: [
                { text: '插件开发指导', link: '/v3/guide/extension-development' },
                { text: 'Request', link: '/v3/guide/Request' },
                { text: 'Login', link: '/v3/guide/Login' },
                { text: 'Multi', link: '/v3/guide/Multi' },
                { text: 'DImage', link: '/v3/guide/DImage' }
            ]
        }
    ],
    '/v3/api/': [
        {
            text: 'Get Started',
            items: [
                { text: 'API手册', link: '/v3/api/overview' },
                { text: 'QueryList选择器', link: '/v3/api/jQuery' }
            ]
        },
        {
            text: 'API',
            items: [
                { text: 'Query', link: '/v3/api/Query' },
                { text: 'setLog', link: '/v3/api/setLog' },
                { text: 'setQuery', link: '/v3/api/setQuery' },
                { text: 'getData', link: '/v3/api/getData' },
                { text: 'getHtml', link: '/v3/api/getHtml' },
                { text: 'run', link: '/v3/api/run' },
                { text: 'getInstance', link: '/v3/api/getInstance' },
                { text: 'data、html', link: '/v3/api/data_html' }
            ]
        }
    ],
}