# setQuery( ) 方法

返回值:`QueryList对象`

---

重新设置选择器，不会再次重复的取抓取一遍目标页面源码，用于重复DOM解析同一个页面多处的内容。

原型:
```php
setQuery(array $rules, $range = '',$outputEncoding = null, $inputEncoding = null,$removeHead = false)
```

参数解释同`Query`

---
### 用法
```php
<?php

require 'vendor/autoload.php';

use QL\QueryList;

$html =<<<STR
<div class="xx">
    <span>
        xxxxxxxx
    </span>
    <img src="/path/to/1.jpg" alt="">
</div>
STR;

//DOM解析文本
$ql = QueryList::Query($html,array(
        'txt' => array('span:eq(0)','text')
    ));

print_r($ql->data);

//DOM解析图片
$ql->setQuery(array(
        'image' => array('.xx img','src') 
    ));

print_r($ql->data);
/**
DOM解析结果:
Array
(
    [0] => Array
        (
            [txt] => xxxxxxxx
        )

)
Array
(
    [0] => Array
        (
            [image] => /path/to/1.jpg
        )

)
**/
```
