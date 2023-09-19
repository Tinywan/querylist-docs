# Elements find($selector)

---

通过jQuery选择器选择DOM元素，用法同jQuery的find()方法。

## 返回值
返回值为`QL\Dom\Elements`类型，具体用法查看Elements类型文档。

## 用法

---

```php
$ql = QueryList::get('http://www.baidu.com/s?wd=QueryList');

//获取所有h3标签下的a标签的文本
$data = $ql->find('h3>a')->texts();
print_r($data->all());

//获取页面中所有图片地址
$data = $ql->find('img')->attrs('src');
print_r($data->all());
```

DOM解析结果:
```php
Array
(
    [0] => QueryList|基于phpQuery的无比强大的PHPDOM解析工具
    [1] => QueryList|基于phpQuery的无比强大的PHPDOM解析工具
    [2] => 介绍- QueryList指导文档
    [3] => QueryList一个基于phpQuery的无比强大的DOM解析工具 - ThinkPHP框架
    [4] => PHP 用QueryList抓取网页内容 - wb145230 - 博客园
    [5] => thomasw/querylist · GitHub
    [6] => thinkPHP3.2中使用QueryListDOM解析演示 - ThinkPHP框架
    [7] => JAE/QueryList - 码云
    [8] => QueryListDOM解析器2.0版本,附QueryList入门教程 - ThinkPHP框架
)
Array
(
    [0] => //www.baidu.com/img/bd_logo1.png
    [1] => //www.baidu.com/img/baidu_jgylogo3.gif
    [2] =>
    [3] =>
    [4] =>
    [5] =>
    [6] =>
    [7] => http://i9.baidu.com/it/u=2964320798,1238330152&fm=85&s=BF8A7A23632258B4A854E4DB0300E0B1
)
```