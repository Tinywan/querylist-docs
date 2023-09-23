# QueryList get($url,$args = null,$otherArgs = [])

---



Http get插件，用来轻松获取网页。该插件基于`GuzzleHttp`,请求参数与它一致。

> GuzzleHttp 手册: [http://guzzle-cn.readthedocs.io/zh_CN/latest/request-options.html](http://guzzle-cn.readthedocs.io/zh_CN/latest/request-options.html)

## 用法

---

### 基本用法
```php
$ql = QueryList::get('http://httpbin.org/get?param1=testvalue');
echo $ql->getHtml();
```
等价于下面操作：
```php
$html = file_get_contents('http://httpbin.org/get?param1=testvalue');
$ql = QueryList::html($html);
echo $ql->getHtml();
```

### 带url请求参数
```php
$ql->get('http://httpbin.org/get',[
	'param1' => 'testvalue',
	'params2' => 'somevalue'
]);

$ql->get('http://httpbin.org/get','param1=testvalue& params2=somevalue');

echo $ql->getHtml();
```
输出:
```php
{
  "args": {
    "param1": "testvalue",
    "params2": "somevalue"
  },
  "headers": {
    "Connection": "close",
    "Host": "httpbin.org",
    "Referer": "http://httpbin.org/get",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  },
  "origin": "112.97.*.*",
  "url": "http://httpbin.org/get?param1=testvalue¶ms2=somevalue"
}
```

### 携带CookieDOM解析需要登录的页面

- 例一

```php
//DOM解析新浪微博需要登录才能访问的页面

$ql = QueryList::get('http://weibo.com',[],[
    'headers' => [
		//填写从浏览器获取到的cookie
        'Cookie' => 'SINAGLOBAL=546064; wb_cmtLike_2112031=1; wvr=6;....'
    ]
]);

//echo $ql->getHtml();

echo $ql->find('title')->text();
//输出: 我的首页 微博-随时随地发现新鲜事
```

- 例二
http插件默认已经开启了cookie功能，当然你也可以手动设置cookie，具体用法可查看GuzzleHttp文档。

```php
$cookieJar = new \GuzzleHttp\Cookie\CookieJar();

$ql = QueryList::get('https://www.baidu.com/',[],[
    'cookies' => $cookieJar
]);
```

### 伪造浏览器请求头部信息
```php
$ql->get('http://httpbin.org/get',[
    'param1' => 'testvalue',
    'params2' => 'somevalue'
],[
    'headers' => [
        'Referer' => 'https://querylist.cc/',
        'User-Agent' => 'testing/1.0',
        'Accept'     => 'application/json',
        'X-Foo'      => ['Bar', 'Baz'],
        'Cookie'    => 'abc=111;xxx=222'
    ]
]);
echo $ql->getHtml();
```
输出:
```php
{
  "args": {
    "param1": "testvalue",
    "params2": "somevalue"
  },
  "headers": {
    "Accept": "application/json",
    "Connection": "close",
    "Cookie": "abc=111;xxx=222",
    "Host": "httpbin.org",
    "Referer": "https://querylist.cc/",
    "User-Agent": "testing/1.0",
    "X-Foo": "Baz"
  },
  "origin": "112.97.*.*",
  "url": "http://httpbin.org/get?param1=testvalue¶ms2=somevalue"
}
```

### 使用Http代理
```php
$ql->get('http://httpbin.org/get',[
    'param1' => 'testvalue',
    'params2' => 'somevalue'
],[
    'proxy' => 'http://222.141.11.17:8118',
	//设置超时时间，单位：秒
    'timeout' => 30,
    'headers' => [
        'Referer' => 'https://querylist.cc/',
        'User-Agent' => 'testing/1.0',
        'Accept'     => 'application/json',
        'X-Foo'      => ['Bar', 'Baz'],
        'Cookie'    => 'abc=111;xxx=222'
    ]
]);
echo $ql->getHtml();
```
输出:
```php
{
  "args": {
    "param1": "testvalue",
    "params2": "somevalue"
  },
  "headers": {
    "Accept": "application/json",
    "Connection": "close",
    "Cookie": "abc=111;xxx=222",
    "Host": "httpbin.org",
    "Proxy-Connection": "Keep-Alive",
    "Referer": "https://querylist.cc/",
    "User-Agent": "testing/1.0",
    "X-Foo": "Baz"
  },
  "origin": "222.141.11.17",
  "url": "http://httpbin.org/get?param1=testvalue¶ms2=somevalue"
}
```

### 使用 HTTP Cache
HTTP缓存功能基于PHP-Cache包，它支持多种缓存驱动，如：文件缓存、Redis缓存，MySQL缓存等,PHP-Cache文档：[http://www.php-cache.com/en/latest/](http://www.php-cache.com/en/latest/)

合理的使用HTTP缓存功能可以避免频繁的去抓取内容未改变的页面，提高DOM解析效率，它会在第一次抓取页面HTML后，将页面HTML缓存下来，下一次再次抓取时直接从缓存中读取HTML内容。

- 使用文件缓存驱动
```php
// 缓存文件夹路径
$cache_path = __DIR__.'/temp/';
$ql =  = QueryList::get($url,null,[
            'cache' => $cache_path,
            'cache_ttl' => 600 // 缓存有效时间，单位：秒，可以不设置缓存有效时间
        ]);
```
- 使用其它缓存驱动
以使用Predis缓存驱动为例，首先安装Predis缓存适配器
```shell
composer require cache/predis-adapter
```
使用Predis缓存驱动：
```php
use Cache\Adapter\Predis\PredisCachePool;

$client = new \Predis\Client('tcp:/127.0.0.1:6379');
$pool = new PredisCachePool($client);

$ql =  = QueryList::get($url,null,[
            'cache' => $pool,
            'cache_ttl' => 600 // 缓存有效时间，单位：秒，可以不设置缓存有效时间
        ]);
```

## 更多强大的Http网络操作
`GuzzleHTTP`是一款功能非常强大的Http客户端，你需要的Http功能它都有，更多用法可以查看GuzzleHTTP文档：[http://guzzle-cn.readthedocs.io/zh_CN/latest/request-options.html](http://guzzle-cn.readthedocs.io/zh_CN/latest/request-options.html)