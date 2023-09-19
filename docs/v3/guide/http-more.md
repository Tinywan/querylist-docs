# 对于更复杂的http网络操作

---

`QueryList`本身内置的网络操作非常简单，`QueryList`关注于DOM选择;对于更复杂的网络操作可以选择使用`Request扩展`，它可以简单的实现：携带cookie、伪造来路、伪造浏览器等功能，但如果觉的它依旧不能满足你的需求，下面有几个可以参考的方案:


## 1.自己用curl封装一个http请求
例:
```php
function getHtml($url)
{
			$ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_AUTOREFERER, true);
            curl_setopt($ch, CURLOPT_REFERER, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);
			return $result;
}
$rules = array(
//DOM解析规则
);
//获取页面源码
$html = getHtml('http://xxx.com');
//DOM解析
$data = QueryList::Query($html,$rules)->data;

```
## 2.使用第三方http包
`QueryList`可以无缝与任意第三放http包配合使用,下面以`guzzlehttp/guzzle`包为例,`Guzzle`是一个PHP的HTTP客户端，用来轻而易举地发送请求，并集成到我们的WEB服务上。

> `Guzzle`中文手册:[http://guzzle-cn.readthedocs.io/zh_CN/latest/](http://guzzle-cn.readthedocs.io/zh_CN/latest/ "http://guzzle-cn.readthedocs.io/zh_CN/latest/")

### 安装
```php
//安装QueryList
composer require jaeger/querylist
//安装Guzzle
composer require guzzlehttp/guzzle
```
### 使用
```php
<?php
require 'vendor/autoload.php';

//实例化一个Http客户端
$client = new GuzzleHttp\Client(['base_uri' => 'https://phphub.org']);

$jar = new \GuzzleHttp\Cookie\CookieJar();

//发送一个Http请求
$response = $client->request('GET', '/categories/6', [
    'headers' => [
        'User-Agent' => 'testing/1.0',
        'Accept'     => 'application/json',
        'X-Foo'      => ['Bar', 'Baz']
    ],
    'form_params' => [
        'foo' => 'bar',
        'baz' => ['hi', 'there!']
    ],
    // 'cookies' => $jar,
    'timeout' => 3.14,
    // 'proxy' => 'tcp://localhost:8125',
    // 'cert' => ['/path/server.pem', 'password'],
]);

$body = $response->getBody();

//获取到页面源码
$html = (string)$body;


//DOM解析规则
$rules = array(
    //文章标题
    'title' => ['.media-heading a','text'],
    //文章链接
    'link' => ['.media-heading a','href'],
    //文章作者名
    'author' => ['.img-thumbnail','alt']
);
//列表选择器
$rang = '.topic-list>li';
//DOM解析
$data = \QL\QueryList::Query($html,$rules,$rang)->data;
//查看DOM解析结果
print_r($data);

```
结果:
```php
Array
(
    [0] => Array
        (
            [title] => 好友动态的实现原理
            [link] => https://phphub.org/topics/2750
            [author] => luo975974740
        )

    [1] => Array
        (
            [title] => 打造完美的 Ubuntu16.04 开发环境【持续更新】
            [link] => https://phphub.org/topics/2723
            [author] => liuwantao
        )

    //省略........

     [19] => Array
        (
            [title] => [Laravel 5.3 新功能] 10. 全文搜索方案 Laravel Scout 介绍
            [link] => https://phphub.org/topics/2673
            [author] => monkey
        )
)
```