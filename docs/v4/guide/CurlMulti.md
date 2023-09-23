# CurlMulti 插件

---


Curl多线程DOM解析.

php-curlmulti:[https://github.com/ares333/php-curlmulti](https://github.com/ares333/php-curlmulti)

> GitHub:[https://github.com/jae-jae/QueryList-CurlMulti](https://github.com/jae-jae/QueryList-CurlMulti)

## 安装
```bash
composer require jaeger/querylist-curl-multi
```

## API
-  CurlMulti **curlMulti($urls = [])**: 设置待DOM解析的URL集合

-  class **CurlMulti** 
	- CurlMulti **add($urls)**:添加URL任务
	- array **getUrls()**:获取所有URL
	- CurlMulti **success(Closure $callback)**:任务成功的时候调用
	-  CurlMulti **error(Closure $callback)**:任务失败的时候调用
	-  CurlMulti **start(array $opt = [])**:开始执行DOM解析任务，此方法是阻塞的。

## 安装参数

 **QueryList::use(CurlMulti::class,$opt1)**
- **$opt1**:`curlMulti` 函数别名.

## 用法

- 安装插件

```php
use QL\QueryList;
use QL\Ext\CurlMulti;

$ql = QueryList::getInstance();
$ql->use(CurlMulti::class);
//or Custom function name
$ql->use(CurlMulti::class,'curlMulti');
```
- Example-1

DOM解析GitHub排行榜:
```php
$ql->rules([
    'title' => ['h3 a','text'],
    'link' => ['h3 a','href']
])->curlMulti([
    'https://github.com/trending/php',
    'https://github.com/trending/go'
])->success(function (QueryList $ql,CurlMulti $curl,$r){
    echo "Current url:{$r['info']['url']} \r\n";
    $data = $ql->query()->getData();
    print_r($data->all());
})->start();
```
Out:
```php
Current url:https://github.com/trending/php
Array
(
    [0] => Array
        (
            [title] => jupeter / clean-code-php
            [link] => /jupeter/clean-code-php
        )
    [1] => Array
        (
            [title] => laravel / laravel
            [link] => /laravel/laravel
        )
    [2] => Array
        (
            [title] => spatie / browsershot
            [link] => /spatie/browsershot
        )
   //....
)

Current url:https://github.com/trending/go
Array
(
    [0] => Array
        (
            [title] => DarthSim / imgproxy
            [link] => /DarthSim/imgproxy
        )
    [1] => Array
        (
            [title] => jaegertracing / jaeger
            [link] => /jaegertracing/jaeger
        )
    [2] => Array
        (
            [title] => jdkato / prose
            [link] => /jdkato/prose
        )
  //...
)

```

- Example-2

```php
$ql->curlMulti('https://github.com/trending/php')
    ->success(function (QueryList $ql,CurlMulti $curl,$r){
        echo "Current url:{$r['info']['url']} \r\n";
        if($r['info']['url'] == 'https://github.com/trending/php'){
            // append a task
            $curl->add('https://github.com/trending/go');
        }
        $data = $ql->find('h3 a')->texts();
        print_r($data->all());
    })
    ->start();
```
Out:
```php
Current url:https://github.com/trending/php
Array
(
    [0] => jupeter / clean-code-php
    [1] => laravel / laravel
    [2] => spatie / browsershot
   //...
)

Current url:https://github.com/trending/go
Array
(
    [0] => DarthSim / imgproxy
    [1] => jaegertracing / jaeger
    [2] => jdkato / prose
    //...
)
```

- Example-3

```php
$ql->curlMulti([
    'https://github-error-host.com/trending/php',
    'https://github.com/trending/go'
])->success(function (QueryList $ql,CurlMulti $curl,$r){
    echo "Current url:{$r['info']['url']} \r\n";
    $data = $ql->rules([
        'title' => ['h3 a','text'],
        'link' => ['h3 a','href']
    ])->query()->getData();
    print_r($data->all());
})->error(function ($errorInfo,CurlMulti $curl){
    echo "Current url:{$errorInfo['info']['url']} \r\n";
    print_r($errorInfo['error']);
})->start([
    // 最大并发数，这个值可以运行中动态改变。
    'maxThread' => 10,
    // 触发curl错误或用户错误之前最大重试次数，超过次数$error指定的回调会被调用。
    'maxTry' => 3,
    // 全局CURLOPT_*
    'opt' => [
        CURLOPT_TIMEOUT => 10,
        CURLOPT_CONNECTTIMEOUT => 1,
        CURLOPT_RETURNTRANSFER => true
    ],
    // 缓存选项很容易被理解，缓存使用url来识别。如果使用缓存类库不会访问网络而是直接返回缓存。
    'cache' => ['enable' => false, 'compress' => false, 'dir' => null, 'expire' =>86400, 'verifyPost' => false]
]);

```
Out:
```php
Current url:https://github.com/trending/go
Array
(
    [0] => Array
        (
            [title] => DarthSim / imgproxy
            [link] => /DarthSim/imgproxy
        )
    [1] => Array
        (
            [title] => jaegertracing / jaeger
            [link] => /jaegertracing/jaeger
        )
    [2] => Array
        (
            [title] => getlantern / lantern
            [link] => /getlantern/lantern
        )
   //...
)

Current url:https://github-error-host.com/trending/php
Array
(
    [0] => 28
    [1] => Resolving timed out after 1000 milliseconds
)
```

- Example-3

```php
$ql->rules([
    'title' => ['h3 a','text'],
    'link' => ['h3 a','href']
])->curlMulti()->add('https://github.com/trending/go')
    ->success(function (QueryList $ql,CurlMulti $curl,$r){
        echo "Current url:{$r['info']['url']} \r\n";
        $data = $ql->query()->getData();
        print_r($data->all());
})->start()
    ->add('https://github.com/trending/php')
    ->start();
```

###  释放内存占用

多线程插件涉及到大量页面DOM解析，如不合理释放资源，很容易造成内存占用过大：

```php
$ql->rules([
    'title' => ['h3 a','text'],
    'link' => ['h3 a','href']
])->curlMulti([
    'https://github.com/trending/php',
    'https://github.com/trending/go'
])->success(function (QueryList $ql,CurlMulti $curl,$r){
    echo "Current url:{$r['info']['url']} \r\n";
    $data = $ql->query()->getData();
    print_r($data->all());
	// 释放资源
	QueryList::destructDocuments();
})->start();
```
