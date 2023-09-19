# 区域选择器例子

---

`Query()` 方法第三个参数：区域选择器，一般在DOM解析列表的场景下使用。

```php
<?php
require 'querylist/vendor/autoload.php';
use QL\QueryList;

//DOM解析#main下面的li里面的内容

$html =<<<STR
<div id="main">
    <ul>
        <li>
          <h1>这是标题1</h1>
          <span>这是文字1<span>
        </li>
        <li>
          <h1>这是标题2</h1>
          <span>这是文字2<span>
        </li> 
    </ul>
</div>
STR;

//方法一，不推荐
$data = QueryList::Query($html,array(
    'title' => array('#main>ul>li>h1','text'),
    'content' => array('#main>ul>li>span','text')
    ))->data;
print_r($data);


//方法二，设置范围选择器
$data = QueryList::Query($html,array(
    'list' => array('h1','text'),
    'content' => array('span','text')
    ),'#main>ul>li')->data;
print_r($data);

/**
 两种方式的输出结果都相同:
Array
(
    [0] => Array
        (
            [title] => 这是标题1
            [content] => 这是文字1
        
        )

    [1] => Array
        (
            [title] => 这是标题2
            [content] => 这是文字2
        
        )

)

 */

//但方法一有严重的缺陷，例如html变成这样，其它代码不变

$html =<<<STR
<div id="main">
    <ul>
        <li>
          <h1>这是标题1</h1>
        </li>
        <li>
          <h1>这是标题2</h1>
          <span>这是文字2<span>
        </li> 
    </ul>
</div>
STR;

/**
 方法一输出结果,结果已经错位了:
 Array
(
    [0] => Array
        (
            [title] => 这是标题1
            [content] => 这是文字2
        
        )

    [1] => Array
        (
            [title] => 这是标题2
        )

)

方法二输出结果，依旧正确：
Array
(
    [0] => Array
        (
            [list] => 这是标题1
            [content] => 
        )

    [1] => Array
        (
            [list] => 这是标题2
            [content] => 这是文字2
        
        )

)
 */
```