# AbsoluteUrl 插件


转换URL相对路径到绝对路径.

> GitHub:[https://github.com/jae-jae/QueryList-AbsoluteUrl](https://github.com/jae-jae/QueryList-AbsoluteUrl)

## 安装
```bash
composer require jaeger/querylist-absolute-url
```

## API
-  **absoluteUrl($baseUrl)**: 转换页面所有Url为绝对路径,return **QueryList**
-  **absoluteUrlHelper($baseUrl,$relativeUrl)**:  单链接转换帮助函数,return **string**

## 安装选项

 **QueryList::use(AbsoluteUrl::class,$opt1,$opt2)**
- **$opt1**:`absoluteUrl` 函数别名。
- **$opt2**:`absoluteUrlHelper` 函数别名。

## 用法

- 安装插件

```php
use QL\QueryList;
use QL\Ext\AbsoluteUrl;

$ql = QueryList::getInstance();
$ql->use(AbsoluteUrl::class);
//或者自定义函数名
$ql->use(AbsoluteUrl::class,'absoluteUrl','absoluteUrlHelper');
```

- 转换所有连接

```php
$data = $ql->get('https://toutiao.io/')
	->absoluteUrl('https://toutiao.io/')
    ->find('a')->attrs('href');
    
print_r($data);
```
输出:
```php
Array
(
    [0] => https://toutiao.io/
    [1] => https://toutiao.io/explore
    [2] => https://toutiao.io/posts/hot/7
    [3] => https://toutiao.io/contribute
    [4] => https://toutiao.io/account/subscriptions
	//....
)
```

- 使用转换帮助函数

```php
$data = $ql->rules([
    'link' => ['h3>a','href']
])->range('.post')->get('https://toutiao.io/')->query()->getData(function ($item) use($ql){
	//使用帮助函数单独转换某个链接
    $item['link'] = $ql->absoluteUrlHelper('https://toutiao.io/',$item['link']);
    return $item;
});

print_r($data);
```
输出:
```php
Array
(
    [0] => Array
        (
            [link] => https://toutiao.io/
        )
    [1] => Array
        (
            [link] => https://toutiao.io/explore
        )
    [2] => Array
        (
            [link] => https://toutiao.io/posts/hot/7
        )
    [3] => Array
        (
            [link] => https://toutiao.io/contribute
        )
    [4] => Array
        (
            [link] => https://toutiao.io/account/subscriptions
        )
    //...
)
```
