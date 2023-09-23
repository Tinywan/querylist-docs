# Google 插件

---


谷歌搜索引擎，DOM解析谷歌的搜索结果。国内使用这个插件需要使用代理。

> GitHub: [https://github.com/jae-jae/QueryList-Rule-Google](https://github.com/jae-jae/QueryList-Rule-Google)

## 安装

```bash
composer require jaeger/querylist-rule-google
```

## API

- Google **google($pageNumber = 10)**:获取谷歌搜索引擎

class **Google**:
- Google **search($keyword)**:设置搜索关键词
- Google **setHttpOpt(array $httpOpt = [])**：设置HTTP选项,查看: [GuzzleHttp options](http://docs.guzzlephp.org/en/stable/request-options.html)
- int **getCount()**:获取搜索结果总条数
- int **getCountPage()**:获取搜索结果总页数
- Collection **page($page = 1)**:获取搜索结果

## Usage

- Installation Plugin

```php
use QL\QueryList;
use QL\Ext\Google;

$ql = QueryList::getInstance();
$ql->use(Google::class);
//or Custom function name
$ql->use(Google::class,'google');
```
- Example-1

```php
$google = $ql->google(10)
$searcher = $google->search('QueryList');
$count = $searcher->getCount();
$data = $searcher->page(1);
$data = $searcher->page(2);

$searcher = $google->search('php');
$countPage = $searcher->getCountPage();
for ($page = 1; $page <= $countPage; $page++)
{
    $data = $searcher->page($page);
}
```

- Example-2

```php
$searcher = $ql->google()->search('QueryList');
$data = $searcher->setHttpOpt([
    // Set the http proxy
    'proxy' => 'http://222.141.11.17:8118',
   // Set the timeout time in seconds
    'timeout' => 30,
])->page(1);
print_r($data->all());
```

- Example-3

```php
$data= $searcher = $ql->google(3)->search('QueryList')->page(1);
print_r($data->all());
```
Out:

```php
Array
(
    [0] => Array
        (
            [title] => Angular - QueryList
            [link] => https://angular.io/api/core/QueryList
        )
    [1] => Array
        (
            [title] => QueryList | @angular/core - Angularリファレンス - Web Creative Park
            [link] => http://www.webcreativepark.net/angular/querylist/
        )
    [2] => Array
        (
            [title] => Understanding ViewChildren, ContentChildren, and QueryList in ...
            [link] => https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e
        )

)

```

