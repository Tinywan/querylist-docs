# getData( ) 方法

返回值:`array`

---

获取DOM解析结果数据的结果数据，并可以进一步处理结果。

原型:

```php
getData($callback = null)
```

#### 参数: $callback
类型:`callback`
默认值:`null`

可以通过这个回调函数进一步处理结果，替换内容、补全链接，下载图片等等；
**并且还可以在这个回调函数用使用QueyList进行嵌套无限级DOM解析**。

---
### 用法
DOM解析所有图片链接，DOM解析目标：
```php
$html =<<<STR
    <div class="xx">
        <img data-src="/path/to/1.jpg" alt="">
    </div>
    <div class="xx">
        <img data-src="/path/to/2.jpg" alt="">
    </div>
    <div class="xx">
        <img data-src="/path/to/3.jpg" alt="">
    </div>
STR;
```
原始DOM解析代码:
```php
$data = QueryList::Query($html,array(

        'image' => array('.xx>img','data-src')

    ))->getData(function($item){

        return $item;

    });

print_r($data);
/**
DOM解析结果:
Array
(
    [0] => Array
        (
            [image] => /path/to/1.jpg
        )

    [1] => Array
        (
            [image] => /path/to/2.jpg
        )

    [2] => Array
        (
            [image] => /path/to/3.jpg
        )

)
**/
```
#### 添加需求
输出的数组变成*一维数组*，改造DOM解析代码:
```php
$data = QueryList::Query($html,array(

        'image' => array('.xx>img','data-src')

    ))->getData(function($item){

        return $item['image'];

    });

print_r($data);
/**
DOM解析结果:
Array
(
    [0] => /path/to/1.jpg
    [1] => /path/to/2.jpg
    [2] => /path/to/3.jpg
)
**/
```
#### 继续添加需求
补全图片链接，改造DOM解析代码:
```php
$baseUrl = 'http://xxxx.com';

$data = QueryList::Query($html,array(

        'image' => array('.xx>img','data-src')

    ))->getData(function($item) use($baseUrl){

        return $baseUrl.$item['image'];

    });

print_r($data);
/**
DOM解析结果:
Array
(
    [0] => http://xxxx.com/path/to/1.jpg
    [1] => http://xxxx.com/path/to/2.jpg
    [2] => http://xxxx.com/path/to/3.jpg
)
**/
```

#### 完整代码
```php
<?php

require 'vendor/autoload.php';

use QL\QueryList;

$html =<<<STR
    <div class="xx">
        <img data-src="/path/to/1.jpg" alt="">
    </div>
    <div class="xx">
        <img data-src="/path/to/2.jpg" alt="">
    </div>
    <div class="xx">
        <img data-src="/path/to/3.jpg" alt="">
    </div>
STR;


$baseUrl = 'http://xxxx.com';

$data = QueryList::Query($html,array(

        'image' => array('.xx>img','data-src')

    ))->getData(function($item) use($baseUrl){

        return $baseUrl.$item['image'];

    });

print_r($data);
```