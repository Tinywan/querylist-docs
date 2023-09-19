# 插件开发 - 理论篇

`QueryList`支持安装插件来帮助丰富你的DOM解析功能，目前收录的一些QueryList插件: <https://github.com/jae-jae/QueryList-Community>

如果大家在使用的过程中有在QueryList的基础上添加一些自己的功能，不妨做成一个QueryList插件，这样可以给其它QueryList使用者提供帮助，并且在其它人的使用反馈中的提升插件的质量。

接下来会以开发一个`MyHttp`扩展为例，一步一步的开发一个扩展，并且发布给他人使用。

## 前言
我们知道可以轻松通过`bind`绑定自定义方法到QueryList对象，从而用来扩展QueryList的功能，像下面这样:
```php
//注册一个myHttp方法到QueryList对象
QueryList::bind('myHttp',function ($url){
    $html = file_get_contents($url);
    $this->setHtml($html);
    return $this;
});
```
遇到比较复杂的扩展情况，代码量比较多，如果都写到这里的话就很不优雅了，所以有一个优雅的做法，像下面这样：
```php
QueryList::bind('myHttp',function(){
  return new MyHttp($this);
})
```
把代码独立到一个class中去，然后在这里引用，这样就优雅多了，而且移植性也强了，下次如果其他项目里面也需要用到，只需要把这个class拷贝过去，然后`bind`一下就行了。

但这样写还是不够完美，如果把你封装的功能开源给别人使用，你还得告诉别人该如何`bind`，用起来还是比较麻烦，有没有更简单的方法呢？当然有，那就是你替用户把`bind`过程也写好，这样用户只需要引入你的扩展文件就可以使用了。

## 实现
下面来看具体实现:
```php
class MyHttp
{
    protected $ql;
    
    public function __construct($ql)
    {
        $this->ql = $ql;
    }
    
    //定义一个静态的install方法，用于安装你的扩展功能
    public static function install(QueryList $queryList)
    {
        //在这个方法中实现你的`bind`
        $queryList->bind('myHttp',function($url){
            return (new MyHttp($this))->get($url);
        });
	 }

	 //定义一个http get方法
    public function get($url)
    {
        $html = file_get_contents($url);
       $this->ql->setHtml($html);
        return $this->ql;
	 }
	 
}
```

这样用户使用你的扩展功能只需要这样调用即可：
```php
MyHttp::install($ql);
```
用户不用关心任何细节。

## 插件
根据上面的推导，我们实际上就推导出插件的写法了，上面的`MyHttp`就是一个独立的插件了。
QueryList实现了一个`use`方法用于安装插件:
```php
QueryList::use(MyHttp::class);
//相当于执行了:MyHttp::install($ql);
```

QueryList插件需要实现`QL\Contracts\PluginContract`这个接口,接口源码:
```php
<?php
namespace QL\Contracts;

use QL\QueryList;

interface PluginContract
{
    public static function install(QueryList $queryList,...$opt);
}
```

所以上面的`MyHttp`需要改成下面这样:
```php
<?php

use QL\Contracts\PluginContract;
use QL\QueryList;

class MyHttp implements PluginContract
{
    protected $ql;

    public function __construct($ql)
    {
        $this->ql = $ql;
    }

    //定义一个静态的install方法，用于安装你的扩展功能
    public static function install(QueryList $queryList,...$opt)
    {
        //在这个方法中实现你的`bind`
        $queryList->bind('myHttp',function($url){
            return (new MyHttp($this))->get($url);
        });
	 }

	 //定义一个http get方法
    public function get($url)
    {
        $html = file_get_contents($url);
        $this->ql->setHtml($html);
        return $this->ql;
	 }
	 
}
```

一个完整的插件就这么诞生了!

然后你就可以这样使用：
```php
$ql = QueryList::use(MyHttp::class);
$ql->myHttp('https://querylist.cc');
echo $ql->getHtml();
```

### 插件安装参数
---
插件安装的时候可以让用户指定一些个性化参数，比喻提供让用户自定义`bind`的名字:
```php
public static function install(QueryList $queryList,...$opt)
{
        //接受用户自定义name,默认name:'myHttp'
        $name = $opt[0] ?? 'myHttp';
        $queryList->bind($name,function($url){
            return (new MyHttp($this))->get($url);
        });
}
```
然后用法就变成这样了：
```php
$ql = QueryList::use(MyHttp::class,'httpGet');

$ql->httpGet('https://querylist.cc');

echo $ql->getHtml();
```
### 复杂情况
编写一个高级的插件可能就不止一个class文件，也不止`bind`一个方法；这些情况QueryList都是支持的，对于多个class文件，只要主文件实现`QL\Contracts\PluginContract`接口即可，也可以同时`bind`多个方法：
```php
public static function install(QueryList $queryList,...$opt)
{
        $name1 = $opt[0] ?? 'myHttpGet';
		$name2 = $opt[1] ?? 'myHttpPost';
		
        $queryList->bind($name,function($url){
            return (new MyHttp($this))->get($url);
        });
		
		$queryList->bind($name2,function($url,$params = []){
            return (new MyHttp($this))->post($url,$params);
        });
}
```
使用:
```php
$ql = QueryList::use(MyHttp::class,'httpGet','httpPost');

$ql->httpGet('https://querylist.cc');

$ql->httpPost('https://querylist.cc',['param' => 'val']);

echo $ql->getHtml();
```

### 互相依赖
---
一个插件可以依赖另一个插件，一个`bind`也可以依赖另一个`bind`:
```php
public static function install(QueryList $queryList,...$opt)
{
		//安装一个其它的插件
        $queryList->use(Curl::class);
		
        $queryList->bind('myHttpGet',function($url){
			// 使用刚刚安装的插件
            return $this->curl()->get($url);
        });
		
		$queryList->bind('getAndEncode',function($url){
			//使用上一个bind的功能
			$html = $this->myHttpGet($url)->getHtml()
            $html = iconv('GBK','UTF-8',$html);
			$this->setHtml($html);
			return $this;
        });
}

```

### 版本号约定
---
希望大家有一个规范的插件版本号，建议插件大版本号与QueryList大版本号对应，比喻你的插件的第一个版本号可以取为:`4.0.0`,然后更新的时候大版本号保持不变，依次递增小版本号。

## 快速上手
查看现有的QueryList插件源码是一个快速上手的好方式,QueryList插件Demo:[https://github.com/jae-jae/QueryList-AbsoluteUrl](https://github.com/jae-jae/QueryList-AbsoluteUrl)

## 提交你的插件
欢迎提交你的插件，让更多人发现和使用:[查看提交说明](https://github.com/jae-jae/QueryList-Community/blob/master/CONTRIBUTING.md)

> QueryList插件列表:[https://github.com/jae-jae/QueryList-Community](https://github.com/jae-jae/QueryList-Community)


## 总结
说了这么多总结起来其开发一个QueryList插件非常简单，只需要实现一个`install`方法即可，然后在`install`方法中调用`bind`方法注入你的扩展功能即可。
最后就可以做成Composer包然后推送到GitHub和Packagist上面，方便的通过Composer安装。