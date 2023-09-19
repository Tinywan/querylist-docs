# 内容过滤

---

QueryList自带内容过滤功能:

详情：`Query()`主方法

```php
<?php
require 'QueryList/vendor/autoload.php';
use QL\QueryList;

$html =<<<STR
    <div id="demo">
        xxx
        <span class="tt">yyy</span>
        <span>zzz</span>
        <p>nnn</p>
    </div>
STR;

//只想获取内容:xxx
$data = QueryList::Query($html,array(
        'txt' => array('#demo','text','-span -p') 
    ))->data;
print_r($data);
/**
 结果:
 Array
(
    [0] => Array
        (
            [txt] => xxx
        )

)
 **/

//去掉p标签，但保留p标签的内容
$data = QueryList::Query($html,array(
        'txt' => array('#demo','html','p') 
    ))->data;
print_r($data);
/**
 结果:
 Array
(
    [0] => Array
        (
            [txt] => xxx
        <span class="tt">yyy</span>
        <span>zzz</span>
        nnn
        )

)
 **/

//获取纯文本，但保留p标签
$data = QueryList::Query($html,array(
        'txt' => array('#demo','text','p') 
    ))->data;
print_r($data);
/**
 结果:
 Array
(
    [0] => Array
        (
            [txt] => xxx
        yyy
        zzz
        <p>nnn</p>
        )

)
 */

//去掉class名为tt的元素和p标签，但保留p标签的内容
$data = QueryList::Query($html,array(
        'txt' => array('#demo','html','-.tt p') 
    ))->data;
print_r($data);
/**
 结果:
 Array
(
    [0] => Array
        (
            [txt] => xxx
        
        <span>zzz</span>
        nnn
        )

)
 */
```