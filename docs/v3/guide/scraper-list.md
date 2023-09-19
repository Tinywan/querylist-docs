# DOM解析列表页

---

DOM解析列表页需要用到`Query()`方法的第三个参数:`区域选择器`或者叫做`切片选择器`，指先按照该规则对HTML内容进行切片 ，然后再分别再在这些切片里面进行相关的选择。 当DOM解析列表的时候，建议设置这个参数。

---

下面以DOM解析`CnBate`网站的首页文章列表为例，示范如何DOM解析文章列表的文章：标题、链接地址、缩略图、简介。

## DOM解析前分析选择器

待DOM解析的目标页面地址：https://www.cnbeta.com ，DOM解析之前需要在浏览器中使用**开发者工具**来分析要DOM解析的元素的**CSS选择器**。

![](https://raw.githubusercontent.com/jae-jae/_resources/master/img/20181022155738.png)



## 示例代码

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
<?php

require 'vendor/autoload.php';

use QL\QueryList;

// 待DOM解析的页面地址
$url = 'https://www.cnbeta.com/';

// DOM解析规则
$rules = [
	// 文章标题
	'title' => ['a:eq(0)','text'],
	// 文章链接地址
	'link' => ['a:eq(0)','href'],
	// 文章缩略图
	'img' => ['img:eq(0)','src'],
	// 文章简介
	'summary' => ['p:eq(0)','text']
];

// 切片选择器
$range = '.items-area>.item';

$data = QueryList::Query($url,$rules,$range)->data;

print_r($data); 
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => Array
        (
            [title] => 看NASA火箭发射系统如何在1分钟内释放出45万加仑的水
            [link] => https://www.cnbeta.com/articles/science/779871.htm
            [img] => https://static.cnbetacdn.com/thumb/mini/article/2018/1022/2313d68aa837a59.png
            [summary] => 据外媒报道，NASA将这个称为是“点火超压保护和降噪冲水散热系统(Ignition Overpressure Protection and Sound Suppression water deluge system)”，那么它究竟是怎么样的呢？请看下面这段视频：
        )

    [1] => Array
        (
            [title] => 日本最具价值科技初创公司创始人：“机器人管家”五年内将能进入市场
            [link] => https://www.cnbeta.com/articles/tech/779869.htm
            [img] => https://static.cnbetacdn.com/thumb/mini/article/2018/1022/d272d6fd91a56cd.png
            [summary] => 据外媒报道，当你想到机器人--那种可能在家里满足你一切需求的机器人--你往往认为那是遥远的未来，你肯定不会想到它能在五年之后出现。日本最具价值的科技初创公司Preferred Networks创始人Toru Nishikawa表示：“我们希望在五年内将这种机器人推向市场并看到它们被使用。十年太长了，不能再等了。”
        )

    [2] => Array
        (
            [title] => YY CEO李学凌自曝在身体植入芯片：为了深度了解自己
            [link] => https://www.cnbeta.com/articles/tech/779867.htm
            [img] => https://static.cnbetacdn.com/thumb/mini/article/2018/1022/92681d656443196.jpg
            [summary] => 欢聚时代（YY）联合创始人、董事长兼CEO李学凌在朋友圈晒出身体植入芯片的经历，并表示这样可以“更好地了解自己”。李学凌称，这是里程碑的一天，未来会有更多的人在身体里植入芯片。李学凌还描述了植入芯片的过程：“很高速地弹射出去，啪的一声就打进去了，没有一点的疼感。”
        )
    
    // ...
    
 ）
```

---
