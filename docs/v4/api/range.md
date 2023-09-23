# QueryList range($selector)

> 最后更新日期：2020-05-31

---



`区域选择器`或者叫做`切片选择器`,指先按照该规则对HTML内容进行切片 ，然后再分别再在这些切片里面进行相关的选择。
当DOM解析列表的时候，必须设置这个参数。

## 用法

---

- 例一
DOM解析百度搜索结果，观察下面两种写法的结果差异：

第一种写法：没有用到[区域选择器]，多元素DOM解析
```php
$data = QueryList::get('http://www.baidu.com/s?wd=QueryList', null, [
        'headers' => [
            'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
            'Accept-Encoding' => 'gzip, deflate, br',
        ]
    ])->rules([
    'title'=>array('h3','texts'),
    'link'=>array('h3>a','htmlOuters','',function($arr){
        $hrefs = [];
        foreach ($arr as $item) {
            $hrefs[] = pq($item)->attr('href');
        }
        return $hrefs;
    })
])->queryData();

print_r($data);
```
DOM解析结果：
```php
Array
(
    [title] => Array
        (
            [0] => QueryList|优雅的渐进式PHPDOM解析框架
            [1] => QueryList V3 中文文档 - QueryList文档
            [2] => MediaQueryList - Web API 接口参考 | MDN
            // ....
        )

    [link] => Array
        (
            [0] => http://www.baidu.com/link?url=yuvEDdAkZWe8wyGOFTJITx61zutLGpGvJWGbh_tqA0PSbv8yemd1duFOpnIERfoF
            [1] => http://www.baidu.com/link?url=s8OGldWakzJFeaCOFi7GBjhoFs2LWaGkMqc9B5WL45STnRLWW7vos5zBiGq2yJgr
            [2] => http://www.baidu.com/link?url=EBJZbvtQ6HE2fU8jW3oqROwJ0VHFrmaaT7XjsJPX8X2cQapV_0JrMeroWFh_IDxN0wDscH1MHUBL-YHsiRYRGxD-ZVRxFpxqYFS_ogYQQR_
            // ...
        )

)

```

第二种写法:用选择器'h3'对内容切片，然后分别在这些切片中执行DOM解析规则，列表DOM解析
```php
$data = QueryList::get('http://www.baidu.com/s?wd=QueryList', null, [
    'headers' => [
        'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        'Accept-Encoding' => 'gzip, deflate, br',
    ]
])->rules([
    // 获取当前切片的整个text内容
    'title'=>array('','texts'),
    // 获取当前切片下的a标签链接
    'link'=>array('a','href')
])->range('h3')->queryData();

print_r($data);

```
DOM解析结果：
```php
Array
(
    [0] => Array
        (
            [title] => Array
                (
                    [0] => QueryList|优雅的渐进式PHPDOM解析框架
                )

            [link] => http://www.baidu.com/link?url=QTDUpxZjRRPTjF5GiyTIofATJ4QZQhqIr7wc5uANVJ9WJCXLtzsTw-BLgzJnjcBW
        )

    [1] => Array
        (
            [title] => Array
                (
                    [0] => QueryList V3 中文文档 - QueryList文档
                )

            [link] => http://www.baidu.com/link?url=eRFe8K-KLTeG6HHPWR2a0GpBxiDK5NsTwBaz4pfkOcn0XWb4HaPQR-p3E-VOHP5u
        )

    [2] => Array
        (
            [title] => Array
                (
                    [0] => MediaQueryList - Web API 接口参考 | MDN
                )

            [link] => http://www.baidu.com/link?url=5N_nrwzF5egDe42PUZFqZfopqWdAlDhzJSftLagzA8tR49ItagnaDovbpFcBkubCZwyRilLi6iuYosz0ucPggENJTvuOD34d2uD3ley9cZK
        )

    [3] => Array
        (
            [title] => Array
                (
                    [0] => QueryList: QueryList是一个基于phpQuery的简洁、优雅的PHPDOM解析...
                )

            [link] => http://www.baidu.com/link?url=EtXGhEQ_1F7yGcrSe7Gh9iLUvCwyKmCqHEXdQYtkG971Susm7P5woYamImQUCGOl
        )

    // ...

)
```

- 例二

```php
<?php
require 'querylist/vendor/autoload.php';
use QL\QueryList;

//DOM解析#main下面的li里面的内容
$html =<<<STR
<div id="main">
    <ul>
        <li>
          <h1>这是标题1</h1>
        </li>
        <li>
          <h1>这是标题2</h1>
          <span>这是文字2<span>
        </li> 
    </ul>
</div>
STR;

// 不设置 range，多元素DOM解析
$data = QueryList::html($html)->rules([
	    'title' => array('#main>ul>li>h1','text'),
	    'content' => array('#main>ul>li>span','text')
    ])->query()->getData();
print_r($data->all());

// 设置 range，列表DOM解析
$data = QueryList::html($html)->rules([
	    'list' => array('h1','text'),
	    'content' => array('span','text')
    ])->range('#main>ul>li')->query()->getData();

print_r($data->all());

/**
 输出结果:
Array
(
    [title] => 这是标题1这是标题2
    [content] => 这是文字2
        
)
Array
(
    [0] => Array
        (
            [list] => 这是标题1
            [content] => 
        )

    [1] => Array
        (
            [list] => 这是标题2
            [content] => 这是文字2
        
        )

)

 */
 
```

- 例三: 演示如何获取切片元素自身的内容

```php
<?php
require 'querylist/vendor/autoload.php';
use QL\QueryList;

$html =<<<STR
<div>
    <a href="http://xxx.com/1.html" alt="link1">
    	链接1
    	<span>文本1<span>
    </a>
	<a href="http://xxx.com/2.html" alt="link2">
		链接2
		<span>文本2<span>
	</a>
	<a href="http://xxx.com/3.html" alt="link3">
		链接3
		<span>文本3<span>
	</a>	
</div>
STR;

$data = QueryList::html($html)->rules([
	'a_link' => ['','href'],
	'a_text' => ['', 'text','-span'],
	'a_alt' => ['', 'alt'],
	'span' => ['span', 'text']
])->range('a')->queryData();

print_r($data);
/**
 输出结果:
Array
(
    [0] => Array
        (
            [a_link] => http://xxx.com/1.html
            [a_text] => 链接1
            [a_alt] => link1
            [span] => 文本1
        )
    [1] => Array
        (
            [a_link] => http://xxx.com/2.html
            [a_text] => 链接2
            [a_alt] => link2
            [span] => 文本2
        )
    [2] => Array
        (
            [a_link] => http://xxx.com/3.html
            [a_text] => 链接3
            [a_alt] => link3
            [span] => 文本3
        )
)
 **/
```
