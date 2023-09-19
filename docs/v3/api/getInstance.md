# getInstance( ) 方法

返回值:`实例对象`

---

获取任意类的单例，QueryList内部方法，开放出来供大家使用。

原型:
```php
getInstance($class,$arg1,$arg2,......)
```

### 参数: $class
类型:`string`

包含命名空间的类名

### 参数:$arg1,$arg2,......

可传递任意多个参数

---
## 用法
运行下面例子需要先安装`Http`库:
```bash
composer require jaeger/http
```
```php
<?php

require 'vendor/autoload.php';

use QL\QueryList;

$http = QueryList::getInstance(QL\Ext\Lib\Http::class);

$html = $http->get('http://www.baidu.com');

print_r($html);

```
