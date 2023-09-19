# QueryList API手册

---

## 方法调用

QueryList中的大部分方法均可以同时支持静态调用和动态调用。

### 示例

```php
QueryList::html($html)->rules($rules)->range($range)->query();
QueryList::rules($rules)->html($html)->range($range)->query();
QueryList::range($range)->rules($rules)->html($html)->query();
```
---

## 默认插件

默认插件无需额外安装，默认已经集成到项目里面去了。

### 覆写默认插件

默认插件也是通过`bind`方法注册到QueryList中去的，所以也可以被覆写。

```php
//覆写默认的get方法
QueryList::config()->bind('get',function($url){
   $html = file_get_contents($url);
   $this->setHtml($html);
   return $this;
})

QueryList::get('https://querylist.cc')->...
```

