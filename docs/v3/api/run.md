# run( ) 方法

返回值:`需查看对应的插件文档`

---

运行QueryList扩展

原型:

```php
run($class,$args = array())
```

### 参数: $class
类型:`string`

插件名称

### 参数: $args
类型:`array`

传递给插件的参数

**例:**
```php
$login = QueryList::run('Login',[
    'target' => 'http://xxx.com/login.php',
    'method' => 'post',
    'params' => ['username'=>'admin','password'=>'admin'],
    'cookiePath' => './cookie123.txt'
    ]);
//........
```