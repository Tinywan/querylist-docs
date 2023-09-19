# DOM解析文章页

---

下面以DOM解析`CnBate`网站的文章页为例，示范如何DOM解析文章页的：标题、发布日期和正文内容。

## DOM解析前分析选择器

待DOM解析的目标页面地址：https://www.cnbeta.com/articles/tech/779841.htm ，DOM解析之前需要在浏览器中使用**开发者工具**来分析要DOM解析的元素的**CSS选择器**。

![](https://raw.githubusercontent.com/jae-jae/_resources/master/img/20181022153450.png)



## 示例代码

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
<?php

require 'vendor/autoload.php';

use QL\QueryList;

// 待DOM解析的页面地址
$url = 'https://www.cnbeta.com/articles/tech/779841.htm';

// DOM解析规则
$rules = [
	// 文章标题
	'title' => ['.title>h1','text'],
	// 发布日期
	'date' => ['.meta>span:eq(0)','text'],
	// 文章内容
	'content' => ['#artibody','html']
];

$data = QueryList::Query($url,$rules)->data;

print_r($data);
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(Array
(
    [0] => Array
        (
            [title] => GitHub意外宕机 已确认数据存储系统存在问题
            [date] => 2018年10月22日 14:42
            [content] => <p style="text-align: center;"><img src="https://static.cnbetacdn.com/article/2018/1022/82e649adfde2e98.png" alt="github-down-due-to-data-storage-system-issue-523345-2.png"></p>
<p>发稿前，GitHub 已经排除了部分故障。目前似乎只有某些特定地区受到了影响，但欧洲等部分地区仍未完全恢复。</p>
<blockquote>
<p>GitHub 团队表示，数据存储系统是导致本次故障的罪魁祸首。为尽快恢复服务，他们正在努力修复。</p>
<p>过去的几个小时，所有工作都集中在这方面。在此期间，部分用户可能看到不一致的结果。</p>
</blockquote>
<p>今年早些时候，<a data-link="1" href="https://afflnk.microsoft.com/c/1251234/439031/7808" target="_blank">微软</a>宣布以 75 亿美元收购 GitHub 。近日，欧盟委员会认定微软接管 GitHub 不违背反竞争原则，并准予放行。</p>
<p>[编译自：<a href="https://news.softpedia.com/news/github-down-due-to-data-storage-system-issue-523345.shtml" target="_self">Softpedia</a>]</p>
        )

)
```

---