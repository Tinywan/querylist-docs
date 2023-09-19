# QL\Dom\Elements

---

- ](#anchor)

该对象拥有所有phpQuery的方法，也就是说拥有几乎所有与jQuery操作DOM完全相同的API。

下面列几个常用的API，具体解释可以查看jQuery手册:
- **[HTML属性]** 快捷获取html属性 
- **map()** 元素遍历
- **each()** 循环元素，回调函数return false可以终止循环 （V4.2.0版本）
- **attr()** 获取html属性
- **html()** 获取元素的html内容
- **htmlOuter()** 获取元素的外部html内容
- **text()** 获取元素的text内容
- **attrs()** 获取多个元素的html属性
- **htmls()** 获取多个元素的html内容
- **htmlOuters()** 获取多个元素的外部html内容 (V4.2.0版本)
- **texts()** 获取多个元素的text内容
- **children()** 获取孩子节点

要DOM解析的html:
```php
$html = <<<STR
<div id="one">
    <div class="two">
        <a href="http://querylist.cc">QueryList官网</a>
        <img src="http://querylist.com/1.jpg" alt="这是图片" abc="这是一个自定义属性">
        <img src="http://querylist.com/2.jpg" alt="这是图片2">
    </div>
    <span>其它的<b>一些</b>文本</span>
</div>        
STR;

$ql = QueryList::html($html);

```

## [HTML属性] 获取html属性
快速获取选中元素的任意属性，同`attr()`方法.
```php
//获取第一张图片的链接地址
$ql->find('img')->src;
//等价下面这句话
$ql->find('img:eq(0)')->src;
//也等价下面这句话
$ql->find('img')->eq(0)->src;

//获取第一张图片的abc属性
$ql->find('img')->abc;

//获取第二张图片的alt属性
$ql->find('img')->eq(1)->alt;
//等价下面这句话
$ql->find('img:eq(1)')->alt;

```

## map() 元素遍历
返回值为Collection集合对象，回调函数返回值会修改结果集合
```php
$data = $ql->find('img')->map(function($item){
	return $item->alt;
});

print_r($data->all());
```
输出:
```php
Array
(
    [0] => 这是图片
    [1] => 这是图片2
)
```

## each() 循环元素
该函数不会影响DOM解析结果
```php
$data = $ql->find('img')->each(function($item, $index){
    echo $index.'=>'.$item->alt.PHP_EOL;
    if($index == 0) {
        return false; // 终止
    }
})->attrs('src');

print_r($data->all());
```
输出:
```php
0=>这是图片
Array
(
    [0] => http://querylist.com/1.jpg
    [1] => http://querylist.com/2.jpg
)

```

## attr() 获取html属性

获取选中元素的任意属性.
```php
//获取第一张图片的链接地址
$ql->find('img')->attr('src');

//获取第一张图片的abc属性
$ql->find('img')->attr('abc');

//获取class为two的元素下的第一个a标签的href属性
$ql->find('.two>a')->attr('href');

```

## attrs() 获取多个元素的html属性
返回值为Collection集合对象
```php
//获取所有的图片链接
$data = $ql->find('img')->attrs('src');
print_r($data->all());
```
输出:
```php
Array
(
    [0] => http://querylist.com/1.jpg
    [1] => http://querylist.com/2.jpg
)
```

## htmls() 获取多个元素的html内容
返回值为Collection集合对象
```php
$data = $ql->find('#one')->append('<div>追加内容</div>')->find('div')->htmls();
print_r($data->all());
```
输出:
```php
Array
(
    [0] => <a href="http://querylist.cc">QueryList官网</a>
        <img src="http://querylist.com/1.jpg" alt="这是图片" abc="这是一个自定义属性"><img src="http://querylist.com/2.jpg" alt="这是图片2">
    [1] => 追加内容
)
```

## htmlOuters() 获取多个元素的外部html内容
返回值为Collection集合对象
```php
$data = $ql->find('img')->htmlOuters();

print_r($data->all());
```
输出:
```php
Array
(
    [0] => <img src="http://querylist.com/1.jpg" alt="这是图片" abc="这是一个自定义属性">
    [1] => <img src="http://querylist.com/2.jpg" alt="这是图片2">
)

```

## children() 获取孩子节点
```php
//获取class为two元素下的所有img孩子节点
$data = $ql->find('.two')->children('img')->attrs('alt');
print_r($data->all());

//获取class为two元素下的所有孩子节点
$data = $ql->find('.two')->children()->map(function ($item){
    //用is判断节点类型
    if($item->is('a')){
        return $item->text();
    }elseif($item->is('img'))
    {
        return $item->alt;
    }
});
print_r($data->all());
```
输出:
```php
Array
(
    [0] => 这是图片
    [1] => 这是图片2
)

Array
(
    [0] => QueryList官网
    [1] => 这是图片
    [2] => 这是图片2
)
```
