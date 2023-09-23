# 插件开发 - 实战篇






**插件开发**上一篇主要讲解插件开发的基础理论，这一篇通过实战来演示开发一款插件`AbsoluteUrl`,这个插件的作用是转换DOM解析内容中的`<a>`标签链接和`<img>`标签图片链接的相对路径到绝对路径。

比如我们DOM解析回来的内容是这样的：

```html 
这是内容段落一。
<a href="/xxx/a">这是链接1</a>
<img src="/image/1.jpg" />
这是内容段落二。
<a href="/xxx/b">这是链接2</a>
<img src="/image/2.jpg" />

```

DOM解析到的内容中的链接和图片地址都是不全的，所以必须要补全才可以，也就是下面效果:

```html
这是内容段落一。
<a href="http://a.com/xxx/a">这是链接1</a>
<img src="http://a.com/image/1.jpg" />
这是内容段落二。
<a href="http://a.com/xxx/b">这是链接2</a>
<img src="http://a.com/image/2.jpg" />
```

这是一个非常常见的需求，接下来我们开发一款插件来自动实现链接地址的补全。

最终插件目录结构如下：

```shell
QueryList-AbsoluteUrl
├── AbsoluteUrl.php
├── README.md
└── composer.json
```

最终效果参考：https://github.com/jae-jae/QueryList-AbsoluteUrl


## 第一步：创建Composer包，安装依赖

命令行：

```bash
# 创建一个空文件夹
$ mkdir QueryList-AbsoluteUrl
# 进入文件夹
$ cd QueryList-AbsoluteUrl
# 安装QueryList作为开发依赖
$ composer require jaeger/querylist --dev
```

**相对链接转绝对链接**这个功能没必要我们手动实现，有现成的轮子可以直接用，直接引用别人写好的包即可，在Github上找到了一个满足要求的项目：https://github.com/monkeysuffrage/phpuri

```bash
# 安装第三方相对链接转绝对链接的包
$ composer require pguardiario/phpuri
```


## 第二步：创建插件，代码逻辑开发

安装好依赖之后，就可以创建插件的主文件了，由于这个插件比较简单，所以就一个PHP文件:

```bash
$ touch AbsoluteUrl.php
```

插件主文件的初始内容如下:

```php
<?php
    
use QL\Contracts\PluginContract;
use QL\QueryList;

class AbsoluteUrl implements PluginContract
{
    public static function install(QueryList $queryList, ...$opt)
    {
        
    }
}
```

我们需要为插件创建一个命名空间并让Composer自动加载这个文件，接下来修改`composer.json`文件,加入`autoload`选项，这个文件是使用composer安装依赖包时自动生成的：

```json
{
    "require": {
        "pguardiario/phpuri": "^1.0"
    },
    "require-dev": {
        "jaeger/querylist": "^4.0"
    },
    "autoload": {
        "psr-4": {
            "QL\\Ext\\": ""
        }
    }
}
```

我将命名空间`QL\Ext`映射到了当前插件项目根目录，接下来修改插件主文件`AbsoluteUrl.php`,加入命名空间名，并加入一个`convertAll()`的链接转换函数:

```php
<?php

namespace QL\Ext;

use QL\Contracts\PluginContract;
use QL\QueryList;
use phpUri;

class AbsoluteUrl implements PluginContract
{
    public static function install(QueryList $queryList, ...$opt)
    {
        
    }

    public static function convertAll($ql,$url)
    {
        $parser = phpUri::parse($url);
        $ql->find('a')->map(function($item) use ($parser,$ql){
            $relativeUrl = $item->attr('href');
            $absoluteUrl = $parser->join($relativeUrl);
            $item->attr('href',$absoluteUrl);
        });
        $ql->find('img')->map(function($item) use ($parser,$ql){
            $relativeUrl = $item->attr('src');
            $absoluteUrl = $parser->join($relativeUrl);
            $item->attr('src',$absoluteUrl);
        });
       $ql->setHtml($ql->find('')->html());
        return $ql;
    }
}
```

`phpUri`是我们之前引入的链接转换的包，我们在`convertAll()`中遍历了QueryListDOM解析到的内容中的所有`<a>`标签和`<img>`标签，并使用`phpUri`依次转换了相对链接为绝对链接。

最后只需要在`install()`方法中用`bind()`方法把`convertAll()`方法绑定到QueryList对象即可：

```php
public static function install(QueryList $queryList, ...$opt)
{
    $queryList->bind('absoluteUrl',function ($url){
        return AbsoluteUrl::convertAll($this,$url);
    });
}
```

一个QueryList插件就这样大功告成了。

> {warning} 修改`composer.json`文件后，要执行一下`composer update`命令来更新一下自动加载文件，否则修改不会生效。


## 第三步：测试插件

可以直接在插件项目目录新建一个`test.php`文件来测试一下插件:

```php
<?php
    require 'vendor/autoload.php';
	use QL\QueryList;
	use QL\Ext\AbsoluteUrl;

	$ql = QueryList::getInstance();
	$ql->use(AbsoluteUrl::class);

	$data = $ql->get('https://toutiao.io/')
		->absoluteUrl('https://toutiao.io/')
    	->find('a')->attrs('href');
    
	print_r($data);
	
```

在命令行下运行`php test.php`看输出结果是否符合预期，如果发现问题，可以继续修改插件，然后继续测试，直到完全正常工作为止。


## 第四步：发布插件到Packagist

发布插件到`Packagist`的目的是为了方便其它人可以方便的通过Composer安装并使用你的插件，你需要做以下3步：

```php
1. 完善composer.json文件信息，加入包名和你的个人信息
2. 将代码推送到Github仓库
3. 提交Github仓库到Packagist
```

相关教程网上很多，这里就不再赘述了。
