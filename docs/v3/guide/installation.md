# 安装

使用QueryList,从学习安装开始。

---



## 环境要求
```bash
PHP >= 5.3
```

## 安装QueryList

`QueryList` V3 支持2种安装方式：使用Composer安装和手动安装。

###使用Composer安装

执行Composer安装命令：

```bash
composer require jaeger/querylist:V3.2.1
```

在项目中使用QueryList,只需要引入`vendor/autoload.php`文件就可以使用QueryList及其所有插件了（如果安装了插件的话）。

```php
<?php
require 'vendor/autoload.php';

use QL\QueryList;

$hj = QueryList::Query('http://mobile.csdn.net/',array(
    "url"=>array('.unit h1 a','href')
));
$data = $hj->getData(function($x){
    return $x['url'];
});
print_r($data);
```

### 手动安装

手动从Github上获取文件,手动只下载`QueryList.php`和`phpQuery.php`这两个文件即可:

* QueryList V3地址:`https://github.com/jae-jae/QueryList/tree/V3.2.1`

* phpQuery GIT地址:`https://github.com/jae-jae/phpQuery-single`

在项目中使用QueryList,将下载的`phpQuery.php`和`QueryList.php`这两个文件复制到项目中去，然后手动引入这两个文件就可以了。

```php
<?php
require 'phpQuery.php';
require 'QueryList.php';

use QL\QueryList;

$hj = QueryList::Query('http://mobile.csdn.net/',array("url"=>array('.unit h1 a','href')));

$data = $hj->getData(function($x){
    return $x['url'];
});

print_r($data);
```

##### 手动安装QueryList插件
- 假设QueryList所在目录为:
  `path/to/QueryList/`
- 则插件目录应该为:
  `path/to/QueryList/Ext/`
>所有插件都依赖一个基类`AQuery`,也存放在插件目录，下载地址:
>https://github.com/jae-jae/QueryList-Ext-AQuery
- 插件所依赖的类库存放目录为:
  `path/to/QueryList/Ext/Lib/`
  目录不存在的话手动创建这些目录即可。
  然后需要手动引入需要用到的插件文件，就可以使用插件了。