# 在框架中使用

QueryList无框架依赖，可以灵活的嵌入到任何项目中去。

---




QueryList可以集成到任何框架中去使用，无需做任何修改，直接使用Composer安装到项目中去即可。


## 在使用Composer管理的项目中安装

如果项目框架本身就是使用Composer来管理包的话，直接在项目根目录执行Composer安装命令后，即可在项目控制器中调用QueryList来使用，这种框架有：`Laravel`、`ThinkPHP5`等。

在项目根目录执行composer命令安装QueryList:

```shell
composer require jaeger/querylist
```

然后就可以在控制器中使用QueryList了：

```php
<?php
namespace app\index\controller;
use QL\QueryList;
class Index
{
    public function index()
    {
       //DOM解析某页面所有的图片
       $data = QueryList::get('http://cms.querylist.cc/bizhi/453.html')->find('img')->attrs('src');
       //打印结果
       print_r($data->all());
    }
}
```

## 在非Composer管理的项目中安装

有些项目框架并没有使用Composer来管理包，如：`ThinkPHP3`，在这种项目中也可以使用Composer来安装QueryList，安装需要分二步：

第一步：在项目根目录执行composer命令安装QueryList:

```shell
composer require jaeger/querylist
```

第二步：在项目的**入口文件**中引入Composer的自动加载文件

修改修改项目的入口文件，如：`index.php`

```php
<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用入口文件

if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !');
define('APP_DEBUG',True);
define('APP_PATH','./Application/');

// 在这里引入Composer的自动加载文件
require 'vendor/autoload.php';

// 引入ThinkPHP入口文件
require './ThinkPHP/ThinkPHP.php';

```

然后就可以在项目控制器中调用QueryList，用法与上面例子一样。