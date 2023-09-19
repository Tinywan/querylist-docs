# getHtml( ) 方法

返回值:`string`

---

获取目标页面源码，主要用于调试。

原型:

```php
getHtml($rel = true)
```

#### 参数: $rel
类型:`bool`
默认值:`true`

当参数为`true`时，返回phpQuery最终看到的HTML源码；
当参数为`false`时，返回传给phpQuery之前的HTML源码。