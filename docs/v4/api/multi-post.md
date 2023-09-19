# MultiRequestService multiPost($urls)

---



基于`GuzzleHttp`的并发POST请求。

`MultiRequestService`对象方法列表:
- `concurrency()`：设置并发数
- `withOptions()`：设置GuzzleHttp的一些其他选项
- `withHeaders()`: 设置HTTP Header
- `success()`: HTTP success回调函数
- `error()`: HTTP error回调函数
- `send()`: 发送请求


## 用法

用法同`multiGet()`.
```php
use GuzzleHttp\Psr7\Response;
use QL\QueryList;

$requests = [
    new Request('POST','http://httpbin.org/post',[
        'Content-Type' => 'application/x-www-form-urlencoded',
        'User-Agent' => 'g-http'
    ],http_build_query([
        'name' => 'php'
    ])),
    new Request('POST','http://httpbin.org/post',[
        'Content-Type' => 'application/x-www-form-urlencoded',
        'User-Agent' => 'g-http'
    ],http_build_query([
        'name' => 'go'
    ])),
    new Request('POST','http://httpbin.org/post',[
        'Content-Type' => 'application/x-www-form-urlencoded',
        'User-Agent' => 'g-http'
    ],http_build_query([
        'name' => 'c#'
    ]))
];
QueryList::multiPost($requests)
     ->success(...)
     ->send();
```