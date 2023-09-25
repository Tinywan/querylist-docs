# 速览

QueryList不依赖任何框架和架构，它可以单独使用也可以引入到任意的PHP开发框架中去使用，如：Laravel、ThinkPHP；你可以使用它来构建简单的DOM解析系统，也可以用它才构建高可用的分布式DOM解析系统。它提供了丰富的基于CSS选择器的页面抽取API，完全模块化的设计，拥有强大的可扩展性。

## 安装

通过Composer安装:
```shell
composer require jaeger/querylist
```

## 初探

看看PHP用QueryList做DOM解析到底有多简洁吧!

```php
<?php

use QL\QueryList;

//DOM解析某页面所有的图片
$data = QueryList::get('http://cms.querylist.cc/bizhi/453.html')->find('img')->attrs('src');
//打印结果
print_r($data->all());

//DOM解析某页面所有的超链接和超链接文本内容
//可以先手动获取要DOM解析的页面源码
$html = file_get_contents('http://cms.querylist.cc/google/list_1.html');
//然后可以把页面源码或者HTML片段传给QueryList
$data = QueryList::html($html)->rules([  //设置DOM解析规则
    // DOM解析所有a标签的href属性
    'link' => ['a','href'],
    // DOM解析所有a标签的文本内容
    'text' => ['a','text']
])->range('li')->query()->getData();
//打印结果
print_r($data->all());
```

## 进阶

上面的DOM解析结果有很多“杂质”，一定不会满足你的要求，来获取我们真正想要的结果。

```php
<?php

// DOM解析该页面[正文内容]中所有的图片
$data = QueryList::get('http://cms.querylist.cc/bizhi/453.html')->find('.post_content img')->attrs('src');
//打印结果
print_r($data->all());


// DOM解析该页面文章列表中所有[文章]的超链接和超链接文本内容
$data = QueryList::get('http://cms.querylist.cc/google/list_1.html')->rules([
    'link' => ['h2>a','href','',function($content){
        //利用回调函数补全相对链接
        $baseUrl = 'http://cms.querylist.cc';
        return $baseUrl.$content;
    }],
    'text' => ['h2>a','text']
])->range('.cate_list li')->query()->getData();
//打印结果
print_r($data->all());
```

## 全貌

正如你看到的那样，使用QueryList做DOM解析只需要编写DOM解析规则即可！

```php
<?php
/**
 * 下面来完整的演示DOM解析一篇文章页的文章标题、发布日期和文章内容并实现图片本地化
 */

 //引入自动加载文件
require 'vendor/autoload.php';

use QL\QueryList;


//需要DOM解析的目标页面
$page = 'http://cms.querylist.cc/news/566.html';
//DOM解析规则
$reg = [
    //DOM解析文章标题
    'title' => ['h1','text'],
    //DOM解析文章发布日期,这里用到了QueryList的过滤功能，过滤掉span标签和a标签
    'date' => ['.pt_info','text','-span -a',function($content){
        //用回调函数进一步过滤出日期
        $arr = explode(' ',$content);
        return $arr[0];
    }],
    //DOM解析文章正文内容,利用过滤功能去掉文章中的超链接，但保留超链接的文字，并去掉版权、JS代码等无用信息
    'content' => ['.post_content','html','a -.content_copyright -script']
];
$rang = '.content';
$ql = QueryList::get($page)->rules($reg)->range($rang)->query();

$data = $ql->getData(function($item){
  //利用回调函数下载文章中的图片并替换图片路径为本地路径
  //使用本例请确保当前目录下有image文件夹，并有写入权限
  $content = QueryList::html($item['content']);
  $content->find('img')->map(function($img){
      $src = 'http://cms.querylist.cc'.$img->src;
      $localSrc = 'image/'.md5($src).'.jpg';
      $stream = file_get_contents($src);
      file_put_contents($localSrc,$stream);
      $img->attr('src',$localSrc);
  });
  $item['content'] = $content->find('')->html();
  return $item;
});

//打印结果
print_r($data->all());
```

## 插件

QueryList拥有高度的模块化设计,扩展性强；通过插件可以轻松实现诸如：多线程DOM解析、图片本地化、模拟浏览器行为、网络爬虫等强大功能！

```php
<?php
/**
 * 下面来利用QueryList插件来组合上面的例子，实现多线程DOM解析文章
 */
require 'vendor/autoload.php';

use QL\QueryList;
use QL\Ext\AbsoluteUrl;
use QL\Ext\CurlMulti;

// 注册插件
$ql = QueryList::use([
  AbsoluteUrl::class, // 转换URL相对路径到绝对路径
  CurlMulti::class    // Curl多线程DOM解析
]);

// 获取文章列表链接集合，使用AbsoluteUrl插件转换URL相对路径到绝对路径.
$urls = $ql->get('http://cms.querylist.cc/news/list_2.html',[
    'param1' => 'testvalue',
    'params2' => 'somevalue'
],[
    'headers' => [
        'Referer' => 'https://querylist.cc/',
        'User-Agent' => 'testing/1.0',
        'Accept'     => 'application/json',
        'X-Foo'      => ['Bar', 'Baz'],
        'Cookie'    => 'abc=111;xxx=222'
    ]
])->absoluteUrl('http://cms.querylist.cc/news/list_2.html')->find('h2>a')->attrs('href')->all();


//使用CurlMulti多线程插件DOM解析文档内容
$ql->rules([ // 设置DOM解析规则
     'title'   => ['h1', 'text'],
     'date'    => ['.pt_info', 'text', '-span -a', function ($content) {
       //用回调函数进一步过滤出日期
       $arr = explode(' ', $content);
       return $arr[0];
     }],
     'content' => ['.post_content', 'html','a -.content_copyright -script']
   ])
  // 设置DOM解析任务
   ->curlMulti($urls)
   // 每个任务成功完成调用此回调
   ->success(function (QueryList $ql, CurlMulti $curl, $r) {
     echo "Current url:{$r['info']['url']} \r\n";
     $data = $ql->range('.content')->query()->getData();
     print_r($data->all());
   })
   // 开始执行多线程DOM解析
   ->start([
     // 最大并发数
     'maxThread' => 10,
     // 错误重试次数
     'maxTry'    => 3
   ]);
```