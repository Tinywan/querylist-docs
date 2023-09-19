# Login 模拟登陆扩展

---

Login扩展，可以实现模拟登陆然后DOM解析。

安装:
```bash
composer require jaeger/querylist-ext-login
```
GIT地址:
```bash
https://github.com/jae-jae/QueryList-Ext-Login.git
```
#### 依赖（通过Composer安装的请忽略）
Login扩展依赖`Request扩展`，`Request扩展`安装教程：http://doc.querylist.cc/site/index/doc/21

#### 用法
```php
$login = QueryList::run('Login',[
    'target' => '登陆表单提交的目标地址',
    'method' => 'post',
	//登陆表单需要提交的数据
    'params' => ['username'=>'admin','password'=>'admin'],
    'cookiePath' => 'cookie保存路径'
	//更多参数查看Request扩展
    ]);
//登陆成功后，就可以调用get和post两个方法来抓取登陆后才能抓的页面
$ql = $login->get('页面地址'[,'处理页面的回调函数','传给回调的参数']);
$ql = $login->post('页面地址','post提交的数据数组'[,'处理页面的回调函数','传给回调的参数']);

$data = $ql->setQuery(...)->data;

```
返回值为Login插件对象，这个对象的get和post两个方法的返回值为设置好了html属性的QueryList对象，然后应该调用QueryList的setQuery方法设置DOM解析规则。

```php
//模拟登陆
$login = QueryList::run('Login',[
    'target' => 'http://xxx.com/login',
    'method' => 'post',
    'params' => ['username'=>'admin','password'=>'admin'],
    'cookiePath' => './cookie123.txt'
    ]);

$data = $login->post('http://xxx.com/admin',['key'=>'value'],function($content,$args){
//这里可以对页面做一些格外的处理
//替换页面的所有的yyy为xxx
$content = str_replace('yyy',$args,$content);
return $content;
},'xxx')->setQuery(['title'=>['h1','text']])->data;


```