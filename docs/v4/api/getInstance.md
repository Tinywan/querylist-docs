# QueryList static getInstance()

---



静态方法，用于获取QueryList单一实例。

**注意**:此方法获取到的是全局共享的单一QueryList实例，意味着如果涉及到想要多QueryList共存的场景就需要通过`new QueryList()`的方式来获取QueryList实例，QueryList内置的所有静态方法都是通过`new QueryList`方式来创建QueryList实例的。

## 用法

---

- 基本用法

```php
$ql = QueryList::getInstance();

$data = $ql->get('http://www.baidu.com/s?wd=QueryList')->find('h3 a')->texts();

print_r($data->all());
```
输出:
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


```

- 错误示范

可能某些情况下你需要共存多个QueryList实例，如下列设置了2个QueryList对象，但是你都是通过`getInstance()`获取QueryList实例的，所以下面2个对象其实是同一个对象,所以打印结果相同。
```php
$url1 = "https://www.baidu.com/";
$url2 = "https://www.bing.com/";

$ql1 = QueryList::getInstance()->get($url1);
$ql2 = QueryList::getInstance()->get($url2);

$title1 = $ql1->find('title')->text();
$title2 = $ql2->find('title')->text();

echo $title1."\r\n".$title2;
```
打印结果:
```php
微软 Bing 搜索 - 国内版
微软 Bing 搜索 - 国内版
```
---

正确写法:
```php
$url1 = "https://www.baidu.com/";
$url2 = "https://www.bing.com/";

$ql1 = (new QueryList)->get($url);
$ql2 = (new QueryList)->get($url2);

$title1 = $ql1->find('title')->text();
$title2 = $ql2->find('title')->text();

print_r($title1);
print_r($title2);
```
打印结果:
```php
百度一下，你就知道
微软 Bing 搜索 - 国内版
```
## 释放资源占用，避免内存溢出

```
$ql1 = QueryList::getInstance()->get($url1);
// ...

// 销毁所有文档，释放内存
QueryList::destructDocuments();
```
