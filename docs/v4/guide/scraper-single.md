# DOM解析单元素

学习DOM解析单个网页元素的属性值或内容。

___


- [实战 - DOM解析IT之家文章页](#anchor3)

QueryList有个`find()`方法，用于DOM解析单个元素，它通过**jQuery选择器**选择DOM元素，用法同jQuery的`find()`方法。


## 获取单个元素的单个属性

如果你有使用过jQuery的经验，就会发现下面的写法与jQuery的写法是一致的。

### 设置待DOM解析的HTML片段



```php
use QL\QueryList;

$html = <<<STR
<div id="one">
    <div class="two">
        <a href="http://querylist.cc">QueryList官网</a>
        <img src="http://querylist.com/1.jpg" alt="这是图片" abc="这是一个自定义属性">
        <img class="second_pic" src="http://querylist.com/2.jpg" alt="这是图片2">
        <a href="http://doc.querylist.cc">QueryList文档</a>
    </div>
    <span>其它的<b>一些</b>文本</span>
</div>        
STR;
$ql = QueryList::html($html);
```

### 获取第一张图片的属性

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
$rt = [];
//获取第一张图片的链接地址
//下面四种写法完全等价
$rt[] = $ql->find('img')->attr('src');
$rt[] = $ql->find('img')->src;
$rt[] = $ql->find('img:eq(0)')->src;
$rt[] = $ql->find('img')->eq(0)->src;

//获取第一张图片的alt属性
$rt[] = $ql->find('img')->alt;
//获取第一张图片的abc属性，注意这里获取定义属性的写法与普通属性的写法是一样的
$rt[] = $ql->find('img')->abc;

print_r($rt);

```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => http://querylist.com/1.jpg
    [1] => http://querylist.com/1.jpg
    [2] => http://querylist.com/1.jpg
    [3] => http://querylist.com/1.jpg
    [4] => 这是图片
    [5] => 这是一个自定义属性
)

```



---

### 获取第二张图片的属性

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
 $rt = [];
//获取第二张图片的alt属性
$rt[] = $ql->find('img')->eq(1)->alt;
//等价下面这句话
$rt[] = $ql->find('img:eq(1)')->alt;
//也等价下面这句话，通过class选择图片
$rt[] = $ql->find('.second_pic')->alt;

print_r($rt);

```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => 这是图片2
    [1] => 这是图片2
    [2] => 这是图片2
)

```



---

### 获取元素的所有属性

属性匹配支持通配符`*`,表示匹配当前元素的所有属性。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
$rt = [];
$rt[] = $ql->find('img:eq(0)')->attr('*');
$rt[] = $ql->find('a:eq(1)')->attr('*');

print_r($rt);

```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => Array
        (
            [src] => http://querylist.com/1.jpg
            [alt] => 这是图片
            [abc] => 这是一个自定义属性
        )

    [1] => Array
        (
            [href] => http://doc.querylist.cc
        )

)
```



---

### 获取元素内的html内容或text内容

text内容与html内容的区别是，text内容中去掉了所有html标签，只剩下纯文本。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
$rt = [];
// 获取元素下的HTML内容
$rt[] = $ql->find('#one>.two')->html();
// 获取元素下的text内容
$rt[] = $ql->find('.two')->text();

print_r($rt);
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php

Array
(
    [0] => <a href="http://querylist.cc">QueryList官网</a>
        <img src="http://querylist.com/1.jpg" alt="这是图片" abc="这是一个自定义属性">
        <img src="http://querylist.com/2.jpg" alt="这是图片2">
        <a href="http://doc.querylist.cc">QueryList文档</a>
    [1] => QueryList官网
        QueryList文档
)
```



---


## 获取多个元素的单个属性

`map()`方法用于遍历多个元素的集合，`find()`方法返回的其实是多个元素的集合，这一点与jQuery也是一致的。



> {info} QueryList中凡是涉及到集合的地方返回的都是`Collection`集合对象，这个对象有个`all()`方法，用于把当前对象转成数组，所以你会发现下面很多写法都是`$data->all() 。`

### 获取class为two的元素下的所有图片的alt属性

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
$data1 = $ql->find('.two img')->map(function($item){
    return $item->alt;
});
// 等价下面这句话
$data2 = $ql->find('.two img')->attrs('alt');

print_r($data1->all());
print_r($data2->all());
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => 这是图片
    [1] => 这是图片2
)
Array
(
    [0] => 这是图片
    [1] => 这是图片2
)
```



---

### 获取选中元素的所有html内容和text内容

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
$texts = $ql->find('.two>a')->texts();
$htmls = $ql->find('#one span')->htmls();

print_r($texts->all());
print_r($htmls->all());

```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => QueryList官网
    [1] => QueryList文档
)
Array
(
    [0] => 其它的<b>一些</b>文本
)

```



---


## 实战 - DOM解析IT之家文章页

![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LAmB2ogFw3OY-4SNqia%2F-LBq1eOXjQbjQP4kTaLm%2F-LBq3VhFcPGgi68ss4Ly%2FWX20180506-232749.png?alt=media&token=43388ddb-9254-4e76-b1cd-f3fa1d1e96dd)



如图DOM解析IT之家文章页的：文章标题、作者和正文内容。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

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

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [title] => 巴基斯坦一城镇温度达50.2度：创下全球4月历史温度新高
    [author] => 白猫
    [content] => <p><a class="s_tag" href="https://www.ithome.com/" target="_blank">IT之家</a>5月6日消息 4月份就遇到超过50度的极端天气显然是不可想象的，不过这的的确确发生在我们的周围，目前在巴基斯坦的一个城镇，有气象观测站显示该地的温度最高达到50.2度，打破了全球有记录以来的四月最高温。</p>
<p><img src="//img.ithome.com/images/v2/t.png" w="600" h="400" class="lazy" title="巴基斯坦一城镇温度达50.2度：创下全球4月历史温度新高" data-original="https://img.ithome.com/newsuploadfiles/2018/3/20180323_103720_572.png" width="600" height="400"></p>
<p>根据天空新闻的报道，在位于巴基斯坦南部的纳瓦布沙在周一（4月30日）的时候出现了高达50.2度的气温，气象学家表示这或许是人类有史以来遇到的四月份最高的温度。</p>
<p>法国气象局的气象学家卡比奇安在推特上表示，巴基斯坦的这个小城镇不但是有史以来亚洲遇到的最高的四月气温，更有可能是全球四月的最高温，而也有网友表示由于过于炎热的天气，当地已经有不少人因为中暑而丧命。</p>
<p>全球极端天气专家克里斯托弗伯特也表示，四月份就达到50摄氏度极其罕见，纳瓦布沙的温度或将是人类有史以来遇到的温度最高的四月。农业学家表示巴基斯坦过高的温度会严重影响未来粮食的收割。</p>
)

```



---