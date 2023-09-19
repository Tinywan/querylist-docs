# Baidu 插件



百度搜索引擎,DOM解析百度搜索结果。

> GitHub: [https://github.com/jae-jae/QueryList-Rule-Baidu](https://github.com/jae-jae/QueryList-Rule-Baidu)

## 安装
```php
composer require jaeger/querylist-rule-baidu
```

## API
- Baidu **baidu($pageNumber = 10)**:获取百度搜索引擎

class **Baidu**:
- Baidu **search($keyword)**:设置搜索关键词
- Baidu **setHttpOpt(array $httpOpt = [])**：设置HTTP选项,查看: [GuzzleHttp options](http://docs.guzzlephp.org/en/stable/request-options.html)
- int **getCount()**:获取搜索结果总条数
- int **getCountPage()**:获取搜索结果总页数
- Collection **page($page = 1,$realURL = false)**:获取搜索结果

## 用法
- Installation Plugin

```php
use QL\QueryList;
use QL\Ext\Baidu;

$ql = QueryList::getInstance();
$ql->use(Baidu::class);
//or Custom function name
$ql->use(Baidu::class,'baidu');
```
- Example-1

```php
$baidu = $ql->baidu(15); // 设置每页搜索15条结果
$searcher = $baidu->search('QueryList');
$count = $searcher->getCount(); // 获取搜索结果总条数
$data = $searcher->page(1);
$data = $searcher->page(2);

$searcher = $baidu->search('php');
$countPage = $searcher->getCountPage();  // 获取搜索结果总页数
for ($page = 1; $page <= $countPage; $page++)
{
    $data = $searcher->page($page);
}
```

- Example-2

```php
$searcher = $ql->baidu()->search('QueryList');
$data = $searcher->setHttpOpt([
    // 设置http代理
    'proxy' => 'http://222.141.11.17:8118',
   // Set the timeout time in seconds
    'timeout' => 30,
])->page(1);
```

- Example-3

```php
$baidu = $ql->baidu(3)
$searcher = $baidu->search('QueryList');

$data = $searcher->page(1);
print_r($data->all());

// Get real url
$data = $searcher->page(1,true);
print_r($data->all());
```
Out:

```php
Array
(
    [0] => Array
        (
            [title] => QueryList|基于phpQuery的无比强大的PHPDOM解析工具
            [link] => http://www.baidu.com/link?url=qRAXrUIcrxuLQ4Pn_rL25HvpDwugxgLkmwB74wTBuLflWaDTNY1d27gdxMwddbfn
        )
    [1] => Array
        (
            [title] => 介绍- QueryList指导文档
            [link] => http://www.baidu.com/link?url=NgoB517LCcb7tt37_x74uF0N-8pfhSemhA5qoB0SHf8HY9P_MwKbN80nf9zvd3V5
        )
    [2] => Array
        (
            [title] => PHP 用QueryList抓取网页内容 - wb145230 - 博客园
            [link] => http://www.baidu.com/link?url=kDkpY9eZ6CsiT1SWomRWEYPauHseHn2FseSdPnsOoulWCkD3DK6QMT75urFGHLyeG_M9yTD0BCm-s5jGQRi_S_
        )

)

Array
(
    [0] => Array
        (
            [title] => QueryList|基于phpQuery的无比强大的PHPDOM解析工具
            [link] => http://www.querylist.cc/
        )
    [1] => Array
        (
            [title] => 介绍- QueryList指导文档
            [link] => http://doc.querylist.cc/
        )
    [2] => Array
        (
            [title] => PHP 用QueryList抓取网页内容 - wb145230 - 博客园
            [link] => http://www.cnblogs.com/wb145230/p/4716403.html
        )
)

```
