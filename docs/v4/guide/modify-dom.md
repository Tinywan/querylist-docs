# 元素操作

QueryList不仅可以读取DOM元素的属性值，还可以操作DOM元素。

---

在**DOM解析单元素**章节，我们接触到了`find()`方法，它用于选择DOM元素，返回值为`QL\Dom\Elements`对象，这是QueryList内置的一个DOM元素集合对象，**它拥有几乎所有与jQuery操作DOM完全相同的API**。

熟悉jQuery的同学应该知道jQuery操作DOM的API方法非常的多，QueryList几乎全部支持，下面选择性的讲些一些元素操作的API，大家举一反三。

## 替换元素属性值

`attr()`方法除了可以取DOM元素属性值外，还有第二个参数，用于设置元素属性值。

`text()`方法默认无参调用表示获取元素的纯文本内容，加个参数调用就表示设置元素的内容。

使用场景：比如DOM解析文章时，下载文章中的图片，并替换文章中的图片路径为本地路径。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
use QL\QueryList;

$html =<<<STR
    <div>
     <a href="https://querylist.cc" alt="abc">QueryList</a>
    </div>
STR;

$ql = QueryList::html($html);
// 获取a元素对象
$link = $ql->find('a:eq(0)');

// 设置元素属性值
$link->attr('href','https://baidu.com');
$link->attr('alt','百度');
// 设置元素内容
$link->text('百度一下');

$data = $ql->find('div')->html();
print_r($data);
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
<a href="https://baidu.com" alt="百度">百度一下</a>
```

---

`html()`方法用法与`text()`方法相同，唯一区别是可以用于设置元素的内容为HTML内容。

```php
$link->html('<p>百度一下</p>');
```

输出:

```php
<a href="https://baidu.com" alt="百度"><p>百度一下</p></a>
```

## 追加元素

`append()`方法用于追加元素。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
 use QL\QueryList;

$html =<<<STR
    <div>
     <a href="https://querylist.cc" alt="abc">QueryList</a>
    </div>
STR;

$ql = QueryList::html($html);
// 获取div元素对象
$div = $ql->find('div:eq(0)');
// 向div元素中追加一个img元素
$div->append('<img src="1.jpg" />');

$rt = [];
$rt[] = $div->find('img')->attr('src');
$rt[]= $ql->find('div')->html();

print_r($rt);

```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => 1.jpg
    [1] => <a href="https://querylist.cc" alt="abc">QueryList</a>
    <img src="1.jpg">
)
```

---

## 移除元素

`remove()`方法用于移除元素，常用于移除DOM解析内容中的无关内容，在**内容过滤**章节有详细讲解到。

```php
$ql->find('div')->remove('img');
```

## 替换元素

`replaceWith()`方法用于替换元素。

下面例子替换所有链接为文本。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
 use QL\QueryList;

$html =<<<STR
    <div>
     <a  href="https://qq.com">QQ</a>
     <a class="ql" href="https://querylist.cc" alt="abc">QueryList</a>
     <a  href="https://baidu.com">百度一下</a>
    </div>
STR;

$ql = QueryList::html($html);

$ql->find('a')->map(function($a){
	$text = $a->text();
	$a->replaceWith('<span>'.$text.'</span>');
});

$rt = $ql->find('div')->html();

print_r($rt);
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
<span>QQ</span>
     <span>QueryList</span>
     <span>百度一下</span>
```

---



## 移除元素属性

`removeAttr()`方法可用来移除元素属性。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
use QL\QueryList;

$html =<<<STR
    <div>
     <a  href="https://qq.com" alt="123">QQ</a>
     <a class="ql" href="https://querylist.cc" alt="abc">QueryList</a>
     <a  href="https://baidu.com">百度一下</a>
    </div>
STR;

$ql = QueryList::html($html);

$ql->find('a')->removeAttr('alt');

$rt = $ql->find('div')->html();

print_r($rt);
 
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
<a href="https://qq.com">QQ</a>
     <a class="ql" href="https://querylist.cc">QueryList</a>
     <a href="https://baidu.com">百度一下</a>
```

---

## 获取父元素、临近元素

`parent()`方法用于获取当前元素的父元素。

`next()`和`prev()`方法用于获取当前元素临近的下一个元素和上一个元素。

使用场景：当你想选择的元素没有明显的特征，如：class、id等，此时就可以选择与之相关联的元素，通过关联元素选择到你想要选择的元素。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
 use QL\QueryList;

$html =<<<STR
    <div>
     <a  href="https://qq.com">QQ</a>
     <a class="ql" href="https://querylist.cc" alt="abc">QueryList</a>
     <a  href="https://baidu.com">百度一下</a>
    </div>
STR;

$ql = QueryList::html($html);
// 获取class为 ql 的元素对象
$link = $ql->find('.ql');

$rt = [];
// 获取父元素的内容
$rt['parent'] = $link->parent()->html();
// 获取临近的下一个元素的内容
$rt['next'] = $link->next()->text();
// 获取临近的前一个元素的属性
$rt['prev'] = $link->prev()->attr('href');

print_r($rt);
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [parent] => <a href="https://qq.com">QQ</a>
     <a class="ql" href="https://querylist.cc" alt="abc">QueryList</a>
     <a href="https://baidu.com">百度一下</a>
    [next] => 百度一下
    [prev] => https://qq.com
)
```

---