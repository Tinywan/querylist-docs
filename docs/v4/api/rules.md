# QueryList rules(array $rules)

> 最后更新日期：2020-04-03

---

- [](#anchor)

设置DOM解析规则。当没有设置`range()`时称为多元素DOM解析，设置了`range()`后称为列表DOM解析。

- DOM解析规则格式

```php
//DOM解析规则
$rules = array(
   '规则名' => array('jQuery选择器','要DOM解析的属性'[,"标签过滤列表"][,"回调函数"]),
   '规则名2' => array('jQuery选择器','要DOM解析的属性'[,"标签过滤列表"][,"回调函数"]),
    ..........
);

//注:方括号括起来的参数可选
```

- 规则解释

| 字段         | 类型    | 必填 | 注释                 |
| :----------- | :------ | :--- | -------------------- |
| 规则名       | string  | 是   | 任意不重复字符串     |
| jQuery选择器 | string  | 是   | 要选择的元素选择器   |
| 要DOM解析的属性 | string  | 是   | 任意html元素属性     |
| 标签过滤列表 | string  | 否   | 设置要过滤的内容     |
| 回调函数     | Closure | 否   | 用于对数据做额外处理 |

- 例子

```php
//DOM解析规则
$rules = [
	//DOM解析img标签的src属性，也就是DOM解析页面中的图片链接
	'name1' => ['img','attr(src)'],
    // 等价于 attr(src)
    'name1_1' => ['img','src'],
	//DOM解析class为content的div的纯文本内容，
	//并移除内容中的a标签内容，移除id为footer标签的内容，保留img标签
	'name2' => ['div.content','text','-a -#footer img'],
	//DOM解析第二个div的html内容，并在内容中追加了一些自定义内容
	'name3' => ['div:eq(1)','html','',function($content){
		$content += 'some str...';
		return $content;
	}]
];

```

## 规则字段解释

下面单独解释几个复杂的字段。

### 1.要DOM解析的属性
值为以下几种:
- **text**:返回当前选中标签下面的纯文本
- **html**:返回当前选中标签下面的html片段
- **htmlOuter**:返回当前选中的标签的外部html片段 (V4.2.0新增)
- **texts**:返回当前选中的多个标签下面的纯文本  (V4.2.0新增)
- **htmls**:返回当前选中的多个标签下面的html片段  (V4.2.0新增)
- **htmlOuters**:返回当前选中的多个标签的外部html片段  (V4.2.0新增)
- **attr(HTML标签属性)**: 获取标签属性值，如src、href、name、data-src等任意HTML标签属性名，支持通配符`*`匹配标签所有属性 (V4.2.5新增)
- **[HTML标签属性]**: 等价于`attr(HTML标签属性)`
- **attrs(HTML标签属性)**: 返回当前选中的多个标签的属性值 (V4.2.5新增)


### 2.标签过滤列表
设置此选项可用来过滤不想要的内容，多个值之间用空格隔开，有如下2条规则:

---
1. 当标签名前面添加减号(-)时（此时标签可以为任意的jQuery选择器），表示移除该标签以及标签内容。
2. 当标签名前面没有减号(-)时，当 [要DOM解析的属性] 值为`text`时表示需要保留的HTML标签以及内容，为`html`时表示要过滤掉的HTML标签但保留内容。

---

- 例子

如下面这段html：
```php
<div class="article">
	这是中文内容，<a href="http://querylist.cc">这里有个链接</a>
	<div class="ad1">
		这里有一段广告
	</div>
	<div class="ad2">
		这里还有一段广告
	</div>
</div>
```
获取class为`article`的元素内部内容，但是不想要那几段广告文字,那么此时就可以设置DOM解析规则为:
```php
//DOM解析规则
$rules = [
	'content' => ['.article','html','-.ad1 -.ad2']
];
```
意思就是：DOM解析class为`article`的元素内部的html内容，并去掉class为`ad1`和class为`ad2`的元素内容。

现在获取到的内容就为:
```php
这是中文内容，<a href="http://querylist.cc">这里有个链接</a>
```

实际DOM解析中我们一般并不想DOM解析别人的外链，想去掉内容中的链接，此时如果过滤器改为`-.ad1 -.ad2 -a`,DOM解析到的内容就为:
```php
这是中文内容，
```
链接是去掉了，但实际上我们是想保存链接文字内容的，所以过滤器应该改为:`-.ad1 -.ad2 a`,这样DOM解析到的内容就为:
```php
这是中文内容，这里有个链接
```

## 用法
---

- 例一

```php
$html=<<<STR
<div class="content">
	<div>
		<a href="https://querylist.cc/1.html">这是链接一</a>
		<span>这是文字一</span>
	</div>

	<div>
		<a href="https://querylist.cc/2.html">这是链接二</a>
		<span>这是文字二</span>
	</div>

	<div>
		<a href="https://querylist.cc/1.html">这是链接三</a>
		<span>这是文字三</span>
	</div>
</div>
STR;

//DOM解析规则
$rules = [
	//DOM解析a标签的href属性
	'link' => ['a','href'],
	//DOM解析a标签的text文本
	'link_text' => ['a','text'],
	//DOM解析span标签的text文本
	'txt' => ['span','text']
];

$ql = QueryList::html($html)
    ->rules($rules)
    ->range('.content>div')
    ->query();
$data = $ql->getData();
print_r($data->all());

```
DOM解析结果:
```php
Array
(
    [0] => Array
        (
            [link] => https://querylist.cc/1.html
            [link_text] => 这是链接一
            [txt] => 这是文字一
        )

    [1] => Array
        (
            [link] => https://querylist.cc/2.html
            [link_text] => 这是链接二
            [txt] => 这是文字二
        )

    [2] => Array
        (
            [link] => https://querylist.cc/1.html
            [link_text] => 这是链接三
            [txt] => 这是文字三
        )

)

```

---

- 例二 （V4.2.0版本）

```php
use QL\QueryList;

$html=<<<STR
<div class="content">
    <div>
        <a href="https://querylist.cc/1.html">这是链接1.0</a>
        <a href="https://querylist.cc/1.html">这是链接1.1</a>
        <span>这是文字1.0</span>
        <span>这是文字1.1</span>
        <span>这是文字1.2</span>
    </div>

    <div>
        <a href="https://querylist.cc/2.html">这是链接二</a>
        <span>这是文字二</span>
    </div>

    <div>
        <a href="https://querylist.cc/1.html">这是链接三</a>
        <span>这是文字三</span>
    </div>
</div>
STR;

//DOM解析规则
$rules = [
    //DOM解析该切片下的所有a标签的href属性
    'links' => ['a','attrs(href)'],
    // 下面写法等价于 attrs(href)
    'links2' => ['a','htmlOuters','',function($arr){
        $links = [];
        foreach ($arr as $item) {
            $links[] = pq($item)->attr('href');
        }
        return $links;
    }],
    //DOM解析该切片下的a标签的外部HTML
    'a_html' => ['a','htmlOuter'],
    //DOM解析该切片下的所有span标签的text文本
    'txt' => ['span','texts']
];

$data = QueryList::html($html)
    ->rules($rules)
    ->range('.content>div')
    ->queryData();
// 释放所有文档内存占用
QueryList::destructDocuments();
print_r($data);
```
DOM解析结果：
```php
Array
(
    [0] => Array
        (
            [links] => Array
                (
                    [0] => https://querylist.cc/1.html
                    [1] => https://querylist.cc/1.html
                )
            [links2] => Array
                (
                    [0] => https://querylist.cc/1.html
                    [1] => https://querylist.cc/1.html
                )

            [a_html] => <a href="https://querylist.cc/1.html">这是链接1.0</a><a href="https://querylist.cc/1.html">这是链接1.1</a>
            [txt] => Array
                (
                    [0] => 这是文字1.0
                    [1] => 这是文字1.1
                    [2] => 这是文字1.2
                )

        )

    [1] => Array
        (
            [links] => Array
                (
                    [0] => https://querylist.cc/2.html
                )

            [a_html] => <a href="https://querylist.cc/2.html">这是链接二</a>
            [txt] => Array
                (
                    [0] => 这是文字二
                )

        )

    [2] => Array
        (
            [links] => Array
                (
                    [0] => https://querylist.cc/1.html
                )

            [a_html] => <a href="https://querylist.cc/1.html">这是链接三</a>
            [txt] => Array
                (
                    [0] => 这是文字三
                )

        )

)

```
