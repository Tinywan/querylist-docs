# 插件开发指导

---

讲解前先列出最后的整体目录结构，假定`www`目录为当前的项目目录:
```bash
www
├── querylist
│   ├── Ext
│   │   └── Hello.php
│   ├── QueryList.php
│   └── vendor
│       
└── testHello.php
```


##一.下载QueryList项目到本地
安装querylist

```shell
composer create-project jaeger/querylist
```

然后到`querylist`目录去执行下面命令安装`AQuery`,`AQuery`为所有插件的基类，插件必须继承`AQuery`并实现`run()`方法.

```shell
composer require jaeger/querylist-ext-aquery
```

##二.在`querylist`目录下新建Ext目录

`querylist/Ext`目录可用于存放`QueryList`扩展

##三.在`querylist/Ext`目录下新建扩展文件Hello.php

```php
<?php
/**
 * QueryList的Hello扩展演示
 */
namespace QL\Ext;
class Hello extends AQuery
{
    /**
     * 必须要实现run()方法
     */
    public function run(array $args)
    {
        //getInstance()方法用于获取任意类的实例，默认获取QueryList实例
        $ql = $this->getInstance();
        //设置QueryList对象的html属性
        $ql->html = $this->getHtml($args['url']);
        //返回QueryList对象
        return $ql;
    }

    /**
     * 自定义一个抓取网页源码的方法
     */
    public function getHtml($url)
    {
      return file_get_contents($url);
    }
}
```
这样一个简单的QueryList插件就开发好了，现在在项目目录新建一个`testHello.php`文件来测试一下`Hello`插件工作是否正常:
```php
<?php
require 'querylist/vendor/autoload.php';
use QL\QueryList;

$ql = QueryList::run('Hello',[
    'url' => 'http://www.baidu.com'
    ]);

$data = $ql->setQuery([
    'title'=>['title','text']
    ])->data;

print_r($data);


```

输出结果:
```php
Array
(
    [0] => Array
        (
            [title] => 百度一下，你就知道
        )

)
```

## 下面附加一些现有的插件源码来加强理解

下面是`Request`扩展的源码:
```php
<?php
namespace QL\Ext;
/**
 * @Author: Jaeger <hj.q@qq.com>
 * @version         1.0
 * 网络操作扩展
 */
class Request extends AQuery
{
    protected function hq(array $args)
    {
        $args = array(
            'http' => isset($args['http'])?$args['http']:$args,
            'callback' => isset($args['callback'])?$args['callback']:'',
            'args' =>  isset($args['args'])?$args['args']:''
            );
        $http = $this->getInstance('QL\Ext\Lib\Http');
        $http->initialize($args['http']);
        $http->execute();
        if(!empty($args['callback'])){
            $http->result = call_user_func($args['callback'],$http->result,$args['args']);
        }
        return $http;
    }
    public function run(array $args)
    {
        $http = $this->hq($args);
        $ql = $this->getInstance();
        $ql->html = $http->result;
        return $ql;
    }
}
```
扩展之间还可以继承，下面的`Login`扩展继承了`Request`扩展并重写了`run()`方法:
```php
<?php
namespace QL\Ext;
/**
 * @Author: Jaeger <hj.q@qq.com>
 * @version         1.0
 * 模拟登陆扩展
 */
class Login extends Request
{
    private $http;
    public $html;
    public function run(array $args)
    {
        $this->http = $this->hq($args);
        $this->html = $this->http->result;
        return $this;
    }
    public function get($url,$callback = null,$args = null)
    {
        $result = $this->http->get($url);
        return $this->getQL($result,$callback,$args);
    }
    public function post($url,$data=array(),$callback = null,$args = null)
    {
        $result = $this->http->post($url,$data);
        return $this->getQL($result,$callback,$args);
    }
    private function getQL($html,$callback = null,$args = null)
    {
        if(is_callable($callback)){
            $result = call_user_func($callback,$result,$args);
        }
        $ql = $this->getInstance();
        $ql->html = $html;
        return $ql;
    }
}
```