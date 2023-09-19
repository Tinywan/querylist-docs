# DOM解析列表

学习如何批量DOM解析数据。

---
- [用法](#anchor1)
- [queryData() 语法糖](#anchor2)
- [列表DOM解析](#anchor3)
- [关于方法的调用顺序](#anchor4)


列表DOM解析才是QueryList的核心功能，这里主要涉及到两个函数的用法:`rules()`和`range()` 。

<a name="anchor1">
## 用法

上一章节的实战部分有讲解到DOM解析IT之家的文章页，代码如下：



```php
use QL\QueryList;

$ql = QueryList::get('https://www.ithome.com/html/discovery/358585.htm');

$rt = [];
// DOM解析文章标题
$rt['title'] = $ql->find('h1')->text();
// DOM解析文章作者
$rt['author'] = $ql->find('#author_baidu>strong')->text();
// DOM解析文章内容
$rt['content'] = $ql->find('.post_content')->html();

print_r($rt);
```

通过这段DOM解析代码相信你已经感受到了QueryList的简洁与优雅，然而上面代码还可以变的更简洁，下面我们来用`rules()`函数进一步简化代码：

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
use QL\QueryList;

$url = 'https://www.ithome.com/html/discovery/358585.htm';
// 定义DOM解析规则
$rules = [
    // DOM解析文章标题
    'title' => ['h1','text'],
    // DOM解析文章作者
    'author' => ['#author_baidu>strong','text'],
    // DOM解析文章内容
    'content' => ['.post_content','html']
];
$rt = QueryList::get($url)->rules($rules)->query()->getData();

print_r($rt->all());
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [title] => 巴基斯坦一城镇温度达50.2度：创下全球4月历史温度新高
    [author] => 白猫
    [content] => <p><a class="s_tag" href="https://www.ithome.com/" target="_blank">IT之家</a>5月6日消息 4月份就遇到超过50度的极端天气显然是不可想象的，镇，有气象观测站显示该地的温度最高达到50.2度，打破了全球有记录以来的四月最高温。</p>
<p><img src="//img.ithome.com/images/v2/t.png" w="600" h="400" class="lazy" title="巴基斯坦一城镇温度达50.2度：创下全球4月历史温度新高" data-original="newsuploadfiles/2018/3/20180323_103720_572.png" width="600" height="400"></p>
<p>根据天空新闻的报道，在位于巴基斯坦南部的纳瓦布沙在周一（4月30日）的时候出现了高达50.2度的气温，气象学家表示这或许是人类有史以来遇到的四月份最高的温度。</p>
<p>法国气象局的气象学家卡比奇安在推特上表示，巴基斯坦的这个小城镇不但是有史以来亚洲遇到的最高的四月气温，更有可能是全球四月的最高温，而也有网友表示由于过于炎热的天气，当地已经有不少人因为中暑而丧命。</p>
<p>全球极端天气专家克里斯托弗伯特也表示，四月份就达到50摄氏度极其罕见，纳瓦布沙的温度或将是人类有史以来遇到的温度最高的四月。农业学家表示巴基斯坦过高的温度会严重影响未来粮食的收割。</p>
)

```



---

`$rules`规则解释如下:



```php
$rules = [
    '规则名1' => ['选择器1','元素属性'],
    '规则名2' => ['选择器2','元素属性'],
    // ...
];
```

DOM解析结果与前面的代码完全相同，注意这里的DOM解析结果是一个二维数组。

<a name="anchor2">
### queryData() 语法糖
可能你会觉的列表DOM解析的语法有一点点繁琐，如:
```php
$rt = QueryList::get($url)->rules($rules)->query()->getData();
print_r($rt->all());
```
QueryList V4.0.4版本新增了一个`queryData()`语法糖来简化这种操作:
```php
$rt = QueryList::get($url)->rules($rules)->queryData();
print_r($rt);
```
`queryData()`方法等同于`query()->getData()->all()` 。

> {primary} QueryList之所以这样设计，是为了方便在各个环节挂载插件，如:`query()->downloadImage()->getData()`,获取数据之前 ，先用保存图片的插件把图片下载到本地并替换图片路径为本地路径。

<a name="anchor3">
### 列表DOM解析

前面只说到DOM解析文章页内容，通常情况下我们会先DOM解析列表页，然后再循环DOM解析列表中的每篇文章，DOM解析列表需要用到`range()`函数来配合`rules()`函数。

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LAmB2ogFw3OY-4SNqia%2F-LBv4-onbRcR0QswxB5u%2F-LBvBk5xywz5EFiTxnRG%2FWX20180507-232252.png?alt=media&token=64edaccf-e493-4cf9-82f1-a8acc7e55dda)



如图我们要DOM解析IT之家的文章列表，我标记了不同的颜色来分解页面元素：

- 蓝色区域：我们要DOM解析的整个列表
- 红色区域：列表中的每一条文章
- 黄色区域：我们要DOM解析的每条文章的元信息，标题、文章链接、简介以及缩略图

首先要分析出**红色区域**的选择器，我们称之为**切片选择器**或**范围选择器**，也就是`range` 。

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LAmB2ogFw3OY-4SNqia%2F-LBv4-onbRcR0QswxB5u%2F-LBvD9672_J1VumrakkZ%2FWX20180507-232906.png?alt=media&token=49c87e75-b2de-417d-98fd-ebfc281d6b61)

如图，利用浏览器的开发者工具可以很容易分析出**切片选择器为：**`.ulcl>li `,然后我们需要在这每个切片区域中去DOM解析文章的标题、文章链接、简介以及缩略图，利用同样的方式分析出每个元素的选择器，这里不再赘述，最终列表DOM解析代码为：

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
use QL\QueryList;

$url = 'https://it.ithome.com/ityejie/';
// 元数据DOM解析规则
$rules = [
​    // DOM解析文章标题
​    'title' => ['h2>a','text'],
​    // DOM解析链接
​    'link' => ['h2>a','href'],
​    // DOM解析缩略图
​    'img' => ['.list_thumbnail>img','src'],
​    // DOM解析文档简介
​    'desc' => ['.memo','text']
];
// 切片选择器
$range = '.content li';
$rt = QueryList::get($url)->rules($rules)
​        ->range($range)->query()->getData();

print_r($rt->all());

```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
​    [0] => Array
​        (
​            [title] =>
​            [link] =>
​            [img] =>
​            [desc] =>
​        )

    [1] => Array
        (
            [title] => 快讯：iOS版QQ大面积闪退（网友反映已恢复）
            [link] => https://www.ithome.com/html/it/358734.htm
            [img] => //img.ithome.com/images/v2/grey.gif
            [desc] => iOS版QQ大面积闪退，原因未知。目前根据IT之家的网友反映，目前iOS版本的QQ已经恢复，但是近期的消息记录已经消失
        )
    
    [2] => Array
        (
            [title] => 阿里影业公布截至近15个月业绩：营收33亿元，增幅130%
            [link] => https://www.ithome.com/html/it/358728.htm
            [img] => //img.ithome.com/images/v2/grey.gif
            [desc] =>  阿里影业集团公布截至2018年3月31日的十五个月财务业绩：报告期内公司营业收入达到33.03亿元，较上一年同期十五个月的14.32亿元，增长幅度超130%
        )
    // ....
）
```



---

数据是DOM解析回来了，但我们发现有一点瑕疵，结果里面有一条结果是空的，且文章缩略图链接不正确。

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LAmB2ogFw3OY-4SNqia%2F-LBvFoEfWyQfvNZGC5jN%2F-LBvGtAAgikOPK3_2yPg%2FWX20180507-234518.png?alt=media&token=5975c46b-93dc-4b75-81f4-f623a8852929)



如图我们再次分析页面可以得知，第一条切片区域是广告，所以DOM解析的第一条结果为空；而文章列表的缩略图使用了懒加载，所以图片的真正链接在img的`data-original`属性上，修正后的代码如下：

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
 use QL\QueryList;

$url = 'https://it.ithome.com/ityejie/';
// 元数据DOM解析规则
$rules = [
​    // DOM解析文章标题
​    'title' => ['h2>a','text'],
​    // DOM解析链接
​    'link' => ['h2>a','href'],
​    // DOM解析缩略图，真正的图片链接在data-original属性上
​    'img' => ['.list_thumbnail>img','data-original'],
​    // DOM解析文档简介
​    'desc' => ['.memo','text']
];
// 切片选择器,跳过第一条广告
$range = '.content li:gt(0)';
$rt = QueryList::get($url)->rules($rules)
​        ->range($range)->query()->getData();

print_r($rt->all());
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => Array
        (
            [title] => 快讯：iOS版QQ大面积闪退（网友反映已恢复）
            [link] => https://www.ithome.com/html/it/358734.htm
            [img] => //img.ithome.com/newsuploadfiles/thumbnail/2018/5/358734_240.jpg
            [desc] => iOS版QQ大面积闪退，原因未知。目前根据IT之家的网友反映，目前iOS版本的QQ已经恢复，但是近期的消息记录已经消失
        )

    [1] => Array
        (
            [title] => 阿里影业公布截至近15个月业绩：营收33亿元，增幅130%
            [link] => https://www.ithome.com/html/it/358728.htm
            [img] => //img.ithome.com/newsuploadfiles/thumbnail/2018/5/358728_240.jpg
            [desc] =>  阿里影业集团公布截至2018年3月31日的十五个月财务业绩：报告期内公司营业收入达到33.03亿元，较上一年同期十五个月的14.32亿元，增长幅度超130%
        )

    // ....
)
```



---

就这样我们利用QueryList很轻松就DOM解析到了IT之家的文章列表以及文章内容😀。

<a name="anchor4">
### 关于方法的调用顺序

`get()`、`rules()`和`range()` 这几个方法都属于QueryList属性设置方法，所以调用顺序可以随意，所以下面这几种写法都是等价的：



```php
 QueryList::get($url)->rules($rules)->range($range)->query()->getData();
 QueryList::rules($rules)->get($url)->range($range)->query()->getData();
 QueryList::range($range)->rules($rules)->get($url)->query()->getData();
```

根据此特性，这里有些使用的小技巧：

- 复用DOM解析规则：针对同一个网站的多个结构相同的页面的DOM解析



```php
// 待DOM解析的同一个网站的网页集合
$urls = [
  'http://xxx.com/1.html',
  'http://xxx.com/2.html',
  'http://xxx.com/3.html',
  // ...
];

// 由于DOM解析的都是同一个网站的网页，所以DOM解析规则是可以复用的
$ql = QueryList::rules([...])->range('...');

foreach ($urls as  $url) {
	$data = $ql->get($url)->query()->getData();
	// ...
}
```

- 复用网页：针对同一个页面应用多套DOM解析规则，避免重复抓取页面



```php
$url = 'http://xxx.com/1.html';

// 抓取网页
$ql = QueryList::get($url);

// 应用第一种DOM解析规则
$data1 = $ql->rules([...])->range('...')->query()->getData();

// 应用第二种DOM解析规则
$data2 = $ql->rules([...])->range('...')->query()->getData();
```
