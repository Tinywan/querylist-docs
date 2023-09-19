# 在框架中使用

QueryList无框架依赖，可以灵活的嵌入到任何项目中去。

---

以TinkPHP3.2.3为例，进行讲解。

## 方法一:通过composer自动安装
直接在ThinkPHP根目录执行命令:
```bash
 composer require jaeger/querylist
```
就安装好了QueryList了，然后在index.php中引入composer的自动加载文件:
```php
<?php
// 应用入口文件

//........

//加上下面这一句话，用于自动加载QueryList
require 'vendor/autoload.php';

// 引入ThinkPHP入口文件
require './ThinkPHP/ThinkPHP.php';

// 亲^_^ 后面不需要任何代码了 就是如此简单
```
只需这两步就可以在你的框架中任意使用QueryList了：
```php
<?php
namespace Home\Controller;
use Think\Controller;
use QL\QueryList;

class IndexController extends Controller {
    public function index(){
        //DOM解析某页面所有的图片
        $data = QueryList::Query('http://cms.querylist.cc/bizhi/453.html',['image' => ['img','src']])->data;
        //打印结果
        print_r($data);
    }
}
```


## 方法二：手动安装
#### 1.下载
QueryList下载地址:https://github.com/jae-jae/QueryList/tree/V3.2.1

phpQuery下载地址:https://github.com/jae-jae/phpQuery-single

#### 2.安装
根据TP官方教程:[http://document.thinkphp.cn/manual_3_2.html#lib_extend](http://document.thinkphp.cn/manual_3_2.html#lib_extend "http://document.thinkphp.cn/manual_3_2.html#lib_extend")
>假设你的网站根目录为 www

先列出安装好后的目录结构:
```bash
www
└── ThinkPHP
    ├── Library
    │   ├── QL
    │   │   ├── phpQuery.php
    │   │   └── QueryList.class.php
```

安装过程:

```bash
1.下载`QueryList.php`和`phpQuery.php`这两个文件。

2.在` www/ThinkPHP/Library`下新建`QL`目录。

3.将下载好的`QueryList.php`和`phpQuery.php`这两个文件复制到` www/ThinkPHP/Library/QL`目录。

4.重命名`QueryList.php`为`QueryList.class.php`。
```

然后就可以在你的框架中任意使用QueryList了，但是运行你会发现提示没有找到`phpQuery`，此时有两个解决方案:

**方案一:**在每次使用QueryList之前手动引入`phpQuery`

**方案二:**修改QueryList源码,加上下面这句话:
```php
require 'phpQuery.php';
```
这样就不用每次手动引入`phpQuery`了

#### 3.用例

```php
<?php
namespace Home\Controller;
use Think\Controller;
use QL\QueryList;

class IndexController extends Controller {
    public function index(){
        //DOM解析某页面所有的超链接
        $data = QueryList::Query('http://cms.querylist.cc/bizhi/453.html',['link' => ['a','href']])->data;
        //打印结果
        print_r($data);
    }
}
```
#### 4.附上ThinkPHP手动安装好QueryList的压缩包
看完教程依旧不懂的话，可以下载我打包好的压缩包，解压看看:
下载地址:http://source.querylist.cc/Querylist-demo/thinkphp3.2.3_QueryList3_custom.zip