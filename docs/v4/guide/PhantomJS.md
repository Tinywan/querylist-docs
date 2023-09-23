# PhantomJS 插件

---


使用PhantomJSDOM解析JavaScript动态渲染的页面。这个包基于`jonnyw/php-phantomjs`包。

> PhantomJS: [http://phantomjs.org](http://phantomjs.org/)

> jonnyw/php-phantomjs: [https://github.com/jonnnnyw/php-phantomjs](https://github.com/jonnnnyw/php-phantomjs)

> GitHub: [https://github.com/jae-jae/QueryList-PhantomJS](https://github.com/jae-jae/QueryList-PhantomJS)

## 安装
```php
composer require jaeger/querylist-phantomjs
```
然后还需要去`PhantomJS`官网下载对应你电脑系统的`PhantomJS`二进制文件，放到电脑任意路径，下面会用到这个路径,下载页面直达：[http://phantomjs.org/download.html](http://phantomjs.org/download.html)

### BUG修复
如果运行报下面错：
```bash
PHP Warning: Declaration of JonnyW\PhantomJs\DependencyInjection\ServiceContainer::load() should be compatible with Symfony\Component\DependencyInjection\Container::load($file) in /wwwroot/vendor/jonnyw/php-phantomjs/src/JonnyW/PhantomJs/DependencyInjection/ServiceContainer.php on line 20
```
这是`jonnyw/php-phantomjs`这个包的bug，已提交给作者等待被修复，在作者未修复前，我们可以通过以下2种方式解决：

方法一: 忽略这个警告，这个警告不影响程序的正确运行，可以屏蔽之。

方法二: 手动修改源码，修改文件`vendor/jonnyw/php-phantomjs/src/JonnyW/PhantomJs/DependencyInjection/ServiceContainer.php`中的`load()`函数加个参数并给个默认值:

```php
    public function load($file = null)
    {
        //...
    }
```

## API
-  **browser($url,$debug = false,$commandOpt = [])**:使用浏览器打开连接 ,return **QueryList**
	- $url : 待DOM解析的url或者返回`\JonnyW\PhantomJs\Http\RequestInterface`对象的匿名函数
	- $debug : 是否开启debug调试，打印更多信息
	- $commandOpt : 设置phantomjs命令行参数，详情:http://phantomjs.org/api/command-line.html

## 安装参数

 **QueryList::use(PhantomJs::class,$opt1,$opt2)**
- **$opt1**: PhantomJS二进制文件路径
-  **$opt2**: `browser` 函数别名


## 用法

- Installation Plugin

```php
use QL\QueryList;
use QL\Ext\PhantomJs;

$ql = QueryList::getInstance();
// 安装时需要设置PhantomJS二进制文件路径
$ql->use(PhantomJs::class,'/usr/local/bin/phantomjs');
//or Custom function name
$ql->use(PhantomJs::class,'/usr/local/bin/phantomjs','browser');

// Windows下示例
// 注意：路径里面不能有空格中文之类的
$ql->use(PhantomJs::class,'C:/phantomjs/bin/phantomjs.exe');
```

- Example-1

```php
$html = $ql->browser('https://m.toutiao.com')->getHtml();
print_r($html);

$data = $ql->browser('https://m.toutiao.com')->find('p')->texts();
print_r($data->all());

// 更多选项可以查看文档: http://phantomjs.org/api/command-line.html
$ql->browser('https://m.toutiao.com',true,[
	// 使用http代理
	'--proxy' => '192.168.1.42:8080',
    '--proxy-type' => 'http'
])

```
- Example-2

```php
$data = $ql->browser(function (\JonnyW\PhantomJs\Http\RequestInterface $r){
    $r->setMethod('GET');
    $r->setUrl('https://m.toutiao.com');
    $r->setTimeout(10000); // 10 seconds
    $r->setDelay(3); // 3 seconds
    return $r;
})->find('p')->texts();

print_r($data->all());
```
- Example-3

```php
$data = $ql->browser(function (\JonnyW\PhantomJs\Http\RequestInterface $r){
    $r->setMethod('GET');
    $r->setUrl('https://m.toutiao.com');
    $r->setTimeout(10000); // 10 seconds
    $r->setDelay(3); // 3 seconds
    return $r;
},true,[
    // cookie 文件格式：Netscape HTTP Cookie File
    // 可以使用 Chrome 插件 EditThisCookie 倒出这种格式的 cookie 文件
    '--cookies-file' => '/path/to/cookies.txt'
])->rules([
    'title' => ['p','text'],
    'link' => ['a','href']
])->query()->getData();

print_r($data->all());
```

