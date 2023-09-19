# 向回调函数中传参数

---

##传参方法
可以使用`use`来向任何回调函数中传参数。
>注意:只有高版本PHP才支持此语法，如果报错就说明你装的PHP版本太低。

##示例

```php
<?php
require 'QueryList/vendor/autoload.php';
use QL\QueryList;

$html =<<<STR
    <div id="demo">
        xxx
        <a href="/yyy">链接一</a>
        <a href="/zzz">链接二</a>
    </div>
STR;

$baseUrl = 'http://xxx.com';

//获取id为demo的元素下的最后一个a链接的链接和文本
//并补全相对链接

//方法一
$data = QueryList::Query($html,array(
        'link' => array('#demo a:last','href','',function($content) use($baseUrl){
            return $baseUrl.$content;
        }),
        'name' => array('#demo a:last','text') 
    ))->data;
print_r($data);

//方法二
$data = QueryList::Query($html,array(
        'link' => array('#demo a:last','href'),
        'name' => array('#demo a:last','text') 
    ))->getData(function($item) use($baseUrl){
    $item['link'] = $baseUrl.$item['link'];
    return $item;
});
print_r($data);
/**
 结果
 Array
(
    [0] => Array
        (
            [link] => http://xxx.com/zzz
            [name] => 链接二
        )

)
 */
```
