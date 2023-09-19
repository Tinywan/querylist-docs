# Request 网络操作扩展

---

Request扩展,可以实现如携带cookie、伪造来路、伪造浏览器等任意复杂的网络请求

安装:
```bash
composer require jaeger/querylist-ext-request
```
GIT地址:
```bash
https://github.com/jae-jae/QueryList-Ext-Request.git
```
#### 依赖（通过Composer安装的请忽略）
Request扩展依赖`Http`类，Git地址为:`https://github.com/jae-jae/Http.git`

手动安装插件教程:`http://doc.querylist.cc/site/index/doc/7`

#### 用法一
```php
$ql = QueryList::run('Request',[
	'http' => [
		'target' => 'DOM解析的目标页面',
		'referrer' => '来源地址',
		'method' => '请求方式，GET、POST等',
		'params' => ['提交的参数'=>'参数值','key'=>'value'],
		//等等其它http相关参数，具体可查看Http类源码
	],
	'callback' => function($html,$args){
		//处理html的回调方法
		return $html;
	},
	'args' => '传给回调函数的参数'
]);

$data = $ql->setQuery(...)->data;
```
#### 用法二
```php
$ql = QueryList::run('Request',[
	'target' => 'DOM解析的目标页面',
	'referrer' => '来源地址',
	'method' => '请求方式，GET、POST等',
	'params' => ['提交的参数'=>'参数值','key'=>'value'],
	//等等其它http相关参数，具体可查看Http类源码
]);

$data = $ql->setQuery(...)->data;
```
返回值为设置好了html属性的QueryList对象，然后应该调用QueryList的setQuery方法设置DOM解析规则。

````php
//HTTP操作扩展
$urls = QueryList::run('Request',[
        'target' => 'http://cms.querylist.cc/news/list_2.html',
        'referrer'=>'http://cms.querylist.cc',
        'method' => 'GET',
        'params' => ['var1' => 'testvalue', 'var2' => 'somevalue'],
        'user_agent'=>'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0',
        'cookiePath' => './cookie.txt',
        'timeout' =>'30'
    ])->setQuery(['link' => ['h2>a','href','',function($content){
    //利用回调函数补全相对链接
    $baseUrl = 'http://cms.querylist.cc';
    return $baseUrl.$content;
}]],'.cate_list li')->getData(function($item){
    return $item['link'];
});
````



