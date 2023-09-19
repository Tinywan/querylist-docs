# MultiRequestService multiGet($urls)

---

- [用法](#anchor)

基于`GuzzleHttp`的并发GET请求。

`MultiRequestService`对象方法列表:
- `concurrency()`：设置并发数
- `withOptions()`：设置GuzzleHttp的一些其他选项
- `withHeaders()`: 设置HTTP Header
- `success()`: HTTP success回调函数
- `error()`: HTTP error回调函数
- `send()`: 发送请求

<a name="anchor">
## 用法

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

为每个URL设置不同请求参数

```php
use GuzzleHttp\Psr7\Response;
use QL\QueryList;

$requests = [
    new Request('GET','http://httpbin.org/post',[
        'User-Agent' => 'QueryList'
    ]),
    new Request('GET','http://httpbin.org/post',[
        'User-Agent' => 'QueryList/3.0'
    ]),
    new Request('GET','http://httpbin.org/post',[
        'User-Agent' => 'QueryList/4.0'
    ])
];
QueryList::multiGet($requests)
     ->success(...)
     ->send();
```

