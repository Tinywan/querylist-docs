# setLog( ) 方法

---

设置日志记录,记录DOM解析日志

原型:
```php
setLog($handler)
```

#### 参数: $handler
类型:`string` 或 `StreamHandler`

参数可以是日志文件路径字符串，或者`Monolog`的`StreamHandler`类型处理句柄

---
### 用法
本项目使用的日志系统为`Monolog`,需要额外安装:
```bash
composer require monolog/monolog
```

see `Monolog` [documents](https://github.com/Seldaek/monolog/blob/HEAD/doc/02-handlers-formatters-processors.md) .

安装好`Monolog`后就可以使用QueryList的日志功能了:
**1.简单用法，记录DOM解析日志到一个文本文件**
```php
require 'vendor/autoload.php';
use QL\QueryList;

//设置日志文件路径
QueryList::setLog('./log/ql.log');

//获取DOM解析对象
$hj = QueryList::Query('http://www.baidu.com/s?wd=QueryList',array(
    'title'=>array('h3','text'),
    'link'=>array('h3>a','href')
));
//输出结果：二维关联数组
print_r($hj->data);

```
输出的日志文件`ql.log`格式:
```bash
[2017-04-20 11:57:10] QueryList.INFO: Get data successfully {"page":"http://www.baidu.com/s?wd=QueryList","count":10} []
[2017-04-20 11:57:30] QueryList.INFO: Get data successfully {"page":"http://www.baidu.com/s?wd=QueryList","count":10} []
```
**2.高级用法**
Monolog可以把你的日志发送到文件，sockets，收件箱，数据库和各种web服务器上
```php
require 'vendor/autoload.php';
use QL\QueryList;

//设置日志处理方式
$logHandler = new \Monolog\Handler\StreamHandler('./log/ql.log',\Monolog\Logger::INFO);

QueryList::setLog($logHandler);

//获取DOM解析对象
$hj = QueryList::Query('http://www.baidu.com/s?wd=QueryList',array(
    'title'=>array('h3','text'),
    'link'=>array('h3>a','href')
));
//输出结果：二维关联数组
print_r($hj->data);
```