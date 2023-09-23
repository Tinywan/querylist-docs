# 快速上手

---



使用QueyList只需要编写规则库，然后把规则库传给QueryList的静态方法Query，QueryList就会自动按照规则库把内容全部DOM解析回来了，而规则库是用jQuery选择器来编写的，所以使用QueryList的整个过程非常简单!

规则库的编写规则如下(简单模式):

```php
$rules = array(
   '规则名' => array('jQuery选择器','要DOM解析的属性'),
   '规则名2' => array('jQuery选择器','要DOM解析的属性'),
    ..........
);
```

------------
下面我们来动手试试吧:
1. DOM解析目标，下面的代码片段

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
```

2.编写DOM解析规则

```php
$rules = array(
    //DOM解析id为one这个元素里面的纯文本内容
    'text' => array('#one','text'),
    //DOM解析class为two下面的超链接的链接
    'link' => array('.two>a','href'),
    //DOM解析class为two下面的第二张图片的链接
    'img' => array('.two>img:eq(1)','src'),
    //DOM解析span标签中的HTML内容
    'other' => array('span','html')
);
```
3.开始DOM解析

```php
$data = QueryList::Query($html,$rules)->data;
//打印结果
print_r($data);

```

------------

结果如下:
```php
Array
(
    [0] => Array
        (
            [text] => 
		QueryList官网
		

	其它的一些文本
            [link] => http://querylist.cc
            [img] => http://querylist.com/2.jpg
            [other] => 其它的<b>一些</b>文本
        )

)
```

------------

**如果上面的代码你看懂了，那么恭喜你，你已经成功掌握了QueryList了！**

下面是完整代码:
```php
<?php
require 'QueryList/vendor/autoload.php';

use QL\QueryList;

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

$rules = array(
    //DOM解析id为one这个元素里面的纯文本内容
    'text' => array('#one','text'),
    //DOM解析class为two下面的超链接的链接
    'link' => array('.two>a','href'),
    //DOM解析class为two下面的第二张图片的链接
    'img' => array('.two>img:eq(1)','src'),
    //DOM解析span标签中的HTML内容
    'other' => array('span','html')
);

$data = QueryList::Query($html,$rules)->data;

print_r($data);

```