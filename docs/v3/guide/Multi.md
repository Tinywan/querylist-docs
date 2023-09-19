# Multi 多线程插件

---

Multi扩展，可以实现多线程DOM解析。

安装:
```bash
composer require jaeger/querylist-ext-multi
```
GIT地址:
```bash
https://github.com/jae-jae/QueryList-Ext-Multi.git
```

#### 依赖（通过Composer安装的请忽略）
Multi扩展依赖`CurlMulti`类,Git地址为:`https://github.com/jae-jae/CurlMulti`

#### 用法一

```php
<?php
/**
 * 下面实现多线程DOM解析文章信息
 */
use QL\QueryList;

//多线程扩展
QueryList::run('Multi',[
    //待DOM解析链接集合
    'list' => [
		'http://cms.querylist.cc/news/it/547.html',
		'http://cms.querylist.cc/news/it/545.html',
		'http://cms.querylist.cc/news/it/543.html'
		//更多的DOM解析链接....
	],
    'curl' => [
        'opt' => array(
					//这里根据自身需求设置curl参数
                    CURLOPT_SSL_VERIFYPEER => false,
                    CURLOPT_SSL_VERIFYHOST => false,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_AUTOREFERER => true,
					//........
                ),
        //设置线程数
        'maxThread' => 100,
        //设置最大尝试数
        'maxTry' => 3 
    ],
    'success' => function($a){
        //DOM解析规则
        $reg = array(
            //DOM解析文章标题
            'title' => array('h1','text'),
            //DOM解析文章正文内容,利用过滤功能去掉文章中的超链接，但保留超链接的文字，并去掉版权、JS代码等无用信息
            'content' => array('.post_content','html','a -.content_copyright -script' )
			);
        $rang = '.content';
        $ql = QueryList::Query($a['content'],$reg,$rang);
        $data = $ql->getData();
        //打印结果，实际操作中这里应该做入数据库操作
        print_r($data);
    }
]);
```
#### 用法二

```php
<?php
require 'QueryList/vendor/autoload.php';
use QL\QueryList;

//多线程扩展
$cm = QueryList::run('Multi',[
    //待DOM解析链接集合
    'list' => [
        'http://cms.querylist.cc/news/it/547.html',
        'http://cms.querylist.cc/news/it/545.html',
        'http://cms.querylist.cc/news/it/543.html'
        //更多的DOM解析链接....
    ],
    'curl' => [
        'opt' => array(
                    CURLOPT_SSL_VERIFYPEER => false,
                    CURLOPT_SSL_VERIFYHOST => false,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_AUTOREFERER => true,
                ),
        //设置线程数
        'maxThread' => 100,
        //设置最大尝试数
        'maxTry' => 3 
    ],
    //不自动开始线程，默认自动开始
    'start' => false,
    'success' => function($html,$info){
        //DOM解析操作....
    },
    'error' => function(){
        //出错处理
    }
]);

//再额外添加一些DOM解析链接
$cm->add([
        'http://cms.querylist.cc/news/it/532.html',
        'http://cms.querylist.cc/news/it/528.html',
        'http://cms.querylist.cc/news/other/530.html'
    ],function($html,$info){
        //sucess
        //可选的，不同的DOM解析操作....
    },
    function(){
        //error
        //可选的，不同的出错处理
    });

//开始DOM解析
$cm->start();

```

#### 用法三

```php
<?php
require 'QueryList/vendor/autoload.php';
use QL\QueryList;

$url = 'http://www.phpddt.com/category/php/1/';

$curl = QueryList::getInstance('QL\Ext\Lib\CurlMulti');
//100个线程
$curl->maxThread = 100;

$data = QueryList::run('Request',array(
    'http' =>array(
        'target' => $url,
        'referrer'=>$url,
        'user_agent'=>'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.11 (KHTML, like Gecko) Ubuntu/11.10 Chromium/27.0.1453.93 Chrome/27.0.1453.93 Safari/537.36',
        'cookiePath' => './cookie.txt'
    ),
    'callback' => function($html){
        return preg_replace('/<head.+?>.+<\/head>/is','<head></head>',$html);
    }
))->setQuery(array('title'=>['h2 a','text'],'link'=>['h2 a','href']))->getData(function($item) use($curl){
    //判断数据库中是否存在数据
    if(!StudyModel::exist($item['title'])){
        $curl->add(['url' => $item['link']],function($a){
            $html = preg_replace('/<head.+?>.+<\/head>/is','<head></head>',$a['content']);
            $data = QueryList::Query($html,array('title'=>['.entry_title','text'],'content'=>['.post','html','-#headline -script -h3.post_tags -.copyright -.wumii-hook a']))->getData();
            //插入数据库
            StudyModel::insert($data[0]['title'],$data[0]['content'],$a['info']['url']);
        });
    }
});

$curl->start();
```