# HTTP客户端

HTTP客户端用于抓取网页HTML源码。

---







QueuryList推荐使用`GuzzleHttp`来作为HTTP客户端，它功能强大、使用简单、支持异步和并发请求，GuzzleHttp使用文档：[http://guzzle-cn.readthedocs.io/zh_CN/latest/ ](http://guzzle-cn.readthedocs.io/zh_CN/latest/) 。当然，需要强调的是QueryList并不依赖任何一个HTTP客户端，你可以根据自己的喜好来选择HTTP客户端，如使用:`file_get_contents`、`curl`或其它第三方HTTP客户端包。

默认安装好QueryList之后就可以直接使用`GuzzleHttp`了：
```php
$client = new GuzzleHttp\Client();
$res = $client->request('GET', 'https://www.baidu.com/s', [
    'query' => ['wd' => 'QueryList'],
    'headers' => [
        'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        'Accept-Encoding' => 'gzip, deflate, br',
    ]
]);
$html = (string)$res->getBody();

$data = QueryList::html($html)->find('h3')->texts();

```

## QueryList内置的HTTP客户端

为方便使用，QueryList基于`GuzzleHttp`封装了一些HTTP请求接口，并进行了简化，请求参数与`GuzzleHttp`一致，在请求参数上有什么不明白的地方可以直接查看`GuzzleHttp`文档。

目前封装的HTTP接口有:
- `get()`：GET 请求
- `post()`：POST请求
- `postJson()`：POST JSON请求
- `multiGet()`：并发GET请求
-  `multiPost()`：并发POST请求

---


### 用法

`get()`方法和`post()`方法用法和参数完全一致，且共享cookie。



```php
$ql = QueryList::get('http://httpbin.org/get?param1=testvalue&params2=somevalue');
// 等价于
$ql->get('http://httpbin.org/get',[
    'param1' => 'testvalue',
    'params2' => 'somevalue'
]);

// 发送post请求
$ql = QueryList::post('http://httpbin.org/post',[
    'param1' => 'testvalue',
    'params2' => 'somevalue'
]);
```

#### 自定义HTTP Header



```php
$ql = QueryList::get('http://httpbin.org/get',[
    'param1' => 'testvalue',
    'params2' => 'somevalue'
],[
    'headers' => [
        'Referer' => 'https://querylist.cc/',
        'User-Agent' => 'testing/1.0',
        'Accept'     => 'application/json',
        'X-Foo'      => ['Bar', 'Baz'],
        // 携带cookie
        'Cookie'    => 'abc=111;xxx=222'
    ]
]);
```

#### 更多高级参数

还可以携带更多高级参数，如：设置超时时间、设置代理等。



```php
$ql = QueryList::get('http://httpbin.org/get',[
    'param1' => 'testvalue',
    'params2' => 'somevalue'
],[
    // 设置代理
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

$ql->post('http://httpbin.org/post',[
    'param1' => 'testvalue',
    'params2' => 'somevalue'
],[
    'proxy' => 'http://222.141.11.17:8118',
    'timeout' => 30,
    'headers' => [
        'Referer' => 'https://querylist.cc/',
        'User-Agent' => 'testing/1.0',
        'Accept'     => 'application/json',
        'X-Foo'      => ['Bar', 'Baz'],
        'Cookie'    => 'abc=111;xxx=222'
    ]
]);
```
#### 使用 HTTP Cache
HTTP缓存功能基于PHP-Cache包，它支持多种缓存驱动，如：文件缓存、Redis缓存，MySQL缓存等,PHP-Cache文档：[http://www.php-cache.com/en/latest/](http://www.php-cache.com/en/latest/)

合理的使用HTTP缓存功能可以避免频繁的去抓取内容未改变的页面，提高DOM解析效率，它会在第一次抓取页面HTML后，将页面HTML缓存下来，下一次再次抓取时直接从缓存中读取HTML内容。

##### 使用文件缓存驱动

```php
// 缓存文件夹路径
$cache_path = __DIR__.'/temp/';
$ql =  = QueryList::get($url,null,[
            'cache' => $cache_path,
            'cache_ttl' => 600 // 缓存有效时间，单位：秒，可以不设置缓存有效时间
        ]);
```

##### 使用其它缓存驱动

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



#### 并发请求(多线程请求)

简单用法，默认并发数为5

```php
use GuzzleHttp\Psr7\Response;
use QL\QueryList;

$urls = [
    'https://github.com/trending/go?since=daily',
    'https://github.com/trending/html?since=daily',
    'https://github.com/trending/java?since=daily'
];

QueryList::multiGet($urls)
    ->success(function(QueryList $ql,Response $response, $index) use($urls){
    	echo 'Current url: '.$urls[$index]."\r\n";
        $data = $ql->find('h3>a')->texts();
        print_r($data->all());
    })->send();
```

更高级的用法

```php
use GuzzleHttp\Psr7\Response;
use QL\QueryList;

$urls = [
    'https://github.com/trending/go?since=daily',
    'https://github.com/trending/html?since=daily',
    'https://github.com/trending/java?since=daily'
];

$rules = [
  'name' => ['h3>a','text'],
  'desc' => ['.py-1','text']
];
$range = '.repo-list>li';
QueryList::rules($rules)
	->range($range)
    ->multiGet($urls)
    // 设置并发数为2
    ->concurrency(2)
    // 设置GuzzleHttp的一些其他选项
    ->withOptions([
        'timeout' => 60
    ])
    // 设置HTTP Header
    ->withHeaders([
        'User-Agent' => 'QueryList'
    ])
    // HTTP success回调函数
    ->success(function (QueryList $ql, Response $response, $index){
        $data = $ql->queryData();
        print_r($data);
    })
    // HTTP error回调函数
    ->error(function (QueryList $ql, $reason, $index){
        // ...
    })
    ->send();

```

#### **连贯操作**

`post`操作和`get`操作是cookie共享的,意味着你可以先调用`post()`方法登录，然后`get()`方法就可以DOM解析所有登录后的页面。



```php
$ql = QueryList::post('http://xxxx.com/login',[
    'username' => 'admin',
    'password' => '123456'
])->get('http://xxx.com/admin');

$ql->get('http://xxx.com/admin/page');
```

#### 保存 Cookie 到本地

为避免重复登录，可以在第一次登录成功后保存 cookie 信息，方便下次直接使用。

下面演示 GuzzleHttp 保存 cookie 的方法，以下方法仅供参考:

1.第一步：模拟登录

```php
use QL\QueryList;
use GuzzleHttp\Cookie\CookieJar;

$jar = new CookieJar();

$ql = QueryList::post('http://xxx.com/login', [
    'username' => 'admin',
    'password' => 'admin',
],[
    'cookies' => $jar
]);

```

2.第二步：保存 cookie 到本地

```php
$cookieArr = $jar->toArray();
file_put_contents('./xx_cookie.txt', json_encode($cookieArr));
```

3.第三步：使用保存在本地的 cookie

```php
$cookieArr2 = file_get_contents('./xx_cookie.txt');
$cookieArr2 = json_decode($cookieArr2, true);

$jar2 = new CookieJar(false, $cookieArr2);

$ql2 = QueryList::get('http://xxx.com/admin/page',[],[
    'cookies' => $jar2
]);
```



#### 获取抓取到的HTML

使用`getHtml()`方法可以获取到`get()`或`post()`方法返回的HTML内容，通常用于调试打印验证抓取结果等场景。



```php
$ql = QueryList::get('http://httpbin.org/get?param1=testvalue');
echo $ql->getHtml();
```


## 捕获HTTP异常

如果遇到HTTP错误，如:404,500等，QueryList就会抛出HTTP异常，并终止程序。如果你不想出现HTTP异常时程序终止，可以自己捕获异常并处理，更多关于HTTP异常的细节：<http://guzzle-cn.readthedocs.io/zh_CN/latest/quickstart.html#id13>。



```php
use QL\QueryList;
use GuzzleHttp\Exception\RequestException;

try{
    $ql = QueryList::get('https://www.sfasd34234324.com');
}catch(RequestException $e){
    //print_r($e->getRequest());
    echo 'Http Error';
}
```

> {primary} 相关专题：[忽略HTTP异常](ignore-http-error)



## 获取HTTP响应头等信息

如果你想获取HTTP响应头，如响应状态码，QueryList内置的HTTP客户端屏蔽了这部分功能，请直接使用GuzzleHttp来实现。



```php
use GuzzleHttp\Client;

$client = new Client();
$response = $client->get('http://httpbin.org/get');
// 获取响应头部信息
$headers = $response->getHeaders();

print_r($headers);
```


## 自定义HTTP客户端

`GuzzleHttp`是一款功能非常强大的HTTP客户端，你想要的功能它几乎都有；但如果你还是想使用自己熟悉的HTTP客户端如:`curl`，那也是可以的：



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

$html = getHtml('http://httpbin.org/get?param1=testvalue');
// 这种情况下允许你对HTML做一些额外的处理后，然后再把HTML传给QueryList对象
$html = str_replace('xxx','yyy',$html);
$ql = QueryList::html($html);
echo $ql->getHtml();
```

通过其他HTTP客户端获取源码，然后使用`html()`方法来设置html，`html()`方法除了可以接收一个完整的HTML网页外，还支持接收**HTML片段**:



```php
$html = <<<STR
<div id="one">
    <div class="two">
        <a href="http://querylist.cc">QueryList官网</a>
        <img src="http://querylist.com/1.jpg" alt="这是图片">
        <img src="http://querylist.com/2.jpg" alt="这是图片2">
    </div>
    <span>其它的<b>一些</b>文本</span>
</div>        
STR;

$ql = QueryList::html($html);
```



>  {warning} phpQuery有个bug，那就是当HTML中有它无法识别的特殊字符时，HTML就会被截断，导致最终的DOM解析结果不正确，此时可以尝试使用正则或其它方式获取到要DOM解析的内容的HTML片段，把这个HTML片段传给QueryList，从而可以解决这种场景下的问题。
