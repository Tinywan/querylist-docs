# 内容过滤

从DOM解析内容中移除掉多余无用内容。

---

- [单元素DOM解析场景](#anchor1)
- [列表DOM解析场景](#anchor2)

很多时候我们DOM解析回来的内容中会包含一些"杂质"，如果只是想要移除或替换内容中的某些关键词，直接用字符串替换函数就可以轻松解决，但往往实际情况没这么简单，下面就是一个典型的例子：



```php
$html =<<<STR
    <div id="content">

		<span class="tt">作者：xxx</span>

        这是正文内容段落1.....

        <span>这是正文内容段落2</span>

        <p>这是正文内容段落3......</p>

        <span>这是广告</span>
        <p>这是版权声明！</p>
    </div>
STR;
```

如上，正文内容中包含了**作者信息**、**广告**、**版权声明**等这些无用信息，我们需要从正文内容中过滤掉这些内容，这些内容是变化的，每篇文章都不一样，所以是无法直接用字符串替换函数去除的，QueryList提供了非常简单的去除方式，通过CSS选择器定位需要去除的内容，下面分别通过**单元素DOM解析**和**列表DOM解析**两种场景来讲解内容过滤。

<a name="anchor1">
## 单元素DOM解析场景

前面的单元素DOM解析篇章中有讲解到`find()`方法，这个方法返回的是一个`Elements`对象，这个对象拥有几乎所有与**jQuery操作DOM完全相同的API**，如果你对jQuery熟悉的话，就知道jQuery有一个`remove()`方法，用于移除元素，同样`Elements`对象也拥有这个方法，利用这个方法可以很容易的移除我们不需要的内容：

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
 use QL\QueryList;

$html =<<<STR
    <div id="content">

		<span class="tt">作者：xxx</span>

        这是正文内容段落1.....

        <span>这是正文内容段落2</span>

        <p>这是正文内容段落3......</p>

        <span>这是广告</span>
        <p>这是版权声明！</p>
    </div>
STR;

// DOM解析正文内容
$eles = QueryList::html($html)->find('#content');
// 选择正文内容中要移除的元素，并移除
$eles->find('.tt,span:last,p:last')->remove();
//获取纯净的正文内容
$content = $eles->html();

print_r($content);
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
这是正文内容段落1.....

        <span>这是正文内容段落2</span>

        <p>这是正文内容段落3......</p>
```

---

<a name="anchor2">
## 列表DOM解析场景

在前面的列表DOM解析篇章中有讲解到`rules()`这个方法，它的参数是接收一个二维数组的DOM解析规则，我们前面学到的DOM解析规则形态是下面这样的:



```php
$rules = [
    '规则名1' => ['选择器1','元素属性'],
    '规则名2' => ['选择器2','元素属性'],
    // ...
];
```

下面是它的另一种形态:



```php
$rules = [
    '规则名1' => ['选择器1','元素属性','内容过滤选择器'],
    '规则名2' => ['选择器2','元素属性','内容过滤选择器'],
    // ...
];
```

**内容过滤选择器**参数就是用来过滤内容的，同时这种场景下也可以结合`find()`方法的`remove()`方法来过滤内容，下面来分别讲解。

### 第一种方法：使用内容过滤选择器参数

内容过滤选择器参数不光可以定义**要移除的内容**还可以定义**要保留的内容**，多个值之间用空格隔开，有如下2条规则:

1. 内容移除规则：选择器名前面添加减号(-)，表示移除该标签以及标签内容。
2. 内容保留规则：选择器名前面没有减号(-)（此时选择器只能为HTML标签名，不支持其他选择器），当要DOM解析的[元素属性] 值为`text`时表示需要保留的HTML标签以及内容，为`html`时表示要过滤掉的HTML标签但保留内容。

这2条规则可以混合使用，下面代码用到了内容移除规则：

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
use QL\QueryList;

$html =<<<STR
    <div id="content">

		<span class="tt">作者：xxx</span>

        这是正文内容段落1.....

        <span>这是正文内容段落2</span>

        <p>这是正文内容段落3......</p>

        <span>这是广告</span>
        <p>这是版权声明！</p>
    </div>
STR;

// DOM解析规则
$rules = [
     //设置了内容过滤选择器
	'content' => ['#content','html','-.tt -span:last -p:last']
];

$rt = QueryList::rules($rules)->html($html)->query()->getData();

print_r($rt->all()); 
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => Array
        (
            [content] => 这是正文内容段落1.....

        <span>这是正文内容段落2</span>

        <p>这是正文内容段落3......</p>
        )

)
```

---

DOM解析结果与前面代码完全相同。

下面顺便演示一下内容保留规则的使用，请仔细观察DOM解析结果来加深理解：

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
use QL\QueryList;

$html =<<<STR
    <div id="content">

		<span class="tt">作者：xxx</span>

        这是正文内容段落1.....

        <span>这是正文内容段落2</span>

        <p>这是正文内容段落3......</p>
        
        <a href="http://querylist.cc">QueryList官网</a>

        <span>这是广告</span>
        <p>这是版权声明！</p>
    </div>
STR;


$rules = [
    // 移除内容中所有的超链接，但保留超链接的内容，并移除内容中所有p标签，但保留p标签的内容
	'content_html' => ['#content','html','a p'],
	// 保留内容中的超链接，以及保留p标签及内容
    'content_text' => ['#content','text','a p'],
];


$rt = QueryList::rules($rules)->html($html)->query()->getData();

print_r($rt->all()); 
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => Array
        (
            [content_html] => <span class="tt">作者：xxx</span>

        这是正文内容段落1.....

        <span>这是正文内容段落2</span>

        这是正文内容段落3......

        QueryList官网

        <span>这是广告</span>
        这是版权声明！
        
            [content_text] => 作者：xxx

        这是正文内容段落1.....

        这是正文内容段落2

        <p>这是正文内容段落3......</p>

        <a href="http://querylist.cc">QueryList官网</a>

        这是广告
        <p>这是版权声明！</p>
        )

)
```

---

### 第二种方式：结合remove()方法

QueryList的`getData()`方法接收一个回调函数作为参数，这个回调函数用于遍历DOM解析结果，并对结果进行处理，我们可以利用这个回调函数来过滤内容。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
 use QL\QueryList;

$html =<<<STR
    <div id="content">

		<span class="tt">作者：xxx</span>

        这是正文内容段落1.....

        <span>这是正文内容段落2</span>

        <p>这是正文内容段落3......</p>

        <span>这是广告</span>
        <p>这是版权声明！</p>
    </div>
STR;


$rules = [
	'content' => ['#content','html']
];


$rt = QueryList::rules($rules)
    ->html($html)
    ->query()
    ->getData(function($item){
        $ql = QueryList::html($item['content']);
        $ql->find('.tt,span:last,p:last')->remove();
        $item['content'] = $ql->find('')->html();
        return $item;
    });

print_r($rt->all());

```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => Array
        (
            [content] => 这是正文内容段落1.....

        <span>这是正文内容段落2</span>

        <p>这是正文内容段落3......</p>
        )

)
```

---

