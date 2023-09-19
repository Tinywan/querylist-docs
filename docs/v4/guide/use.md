# 使用插件

使用插件实现无限可能。

---

QueryList使用`use()`方法来注册插件。

>  目前收录的一些QueryList插件: <https://github.com/jae-jae/QueryList-Community>

## 用法

有两种用法

<larecipe-badge type="primary" circle class="mr-3 mb-2">1</larecipe-badge>

注册单个插件，可携带安装参数。

```php
$ql = QueryList::getInstance();
$ql->use(My\MyPlugin::class);
//或者，带安装参数
$ql->use(My\MyPlugin::class,$arg1,$arg2,$arg3);
```

<larecipe-badge type="primary" circle class="mr-3 mb-2">2</larecipe-badge>

同时注册多个插件，不能携带安装参数。

```php
$ql = QueryList::getInstance();
$ql->use([
 My\MyPlugin::class,
 My\MyPlugin2::class,
 Other\OtherPlugin::class
]);
```



## 例子

`PhantomJS`插件用于DOM解析Javascript动态渲染的网页内容，插件项目地址：https://github.com/jae-jae/QueryList-PhantomJS

### 安装插件

在QueryList项目中执行composer命令:

```shell
composer require jaeger/querylist-phantomjs
```

### 使用插件

此插件注册时需要携带2个参数，一个参数是`PhantomJS`二进制文件路径，另一个可选参数是注册的函数名称。

```php
use QL\QueryList;
use QL\Ext\PhantomJs;

$ql = QueryList::getInstance();
```

注册插件，使用默认函数名称，此插件的默认函数名称为`browser`

```php
$ql->use(PhantomJs::class,'/usr/local/bin/phantomjs');
// 使用插件
$html = $ql->browser('https://m.toutiao.com')->getHtml();
print_r($html);
```

注册插件，使用自定义函数名称`chrome`

```php
$ql->use(PhantomJs::class,'/usr/local/bin/phantomjs','chrome');
// 使用插件
$html = $ql->chrome('https://m.toutiao.com')->getHtml();
print_r($html);
```

