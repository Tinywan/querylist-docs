# Array queryData(Closure $callback = null)

---

语法糖，`queryData()`方法等同于`query()->getData()->all()`



可能你会觉的列表DOM解析的语法有一点点繁琐，如:

```php
$rt = QueryList::get($url)->rules($rules)->query()->getData();
print_r($rt->all());
```

QueryList V4.0.4版本新增了一个`queryData()`语法糖来简化这种操作:

```php
$rt = QueryList::get($url)->rules($rules)->queryData();
print_r($rt);
```

支持使用回调函数在返回数据之前依次处理数据：

```php
$rt = QueryList::get($url)->rules($rules)->queryData(function($item, $key){
    // 补全DOM解析到的相对链接地址
    $item['url'] = 'http://xx.com'.$item['url'];
    return $item;
})
```

> {primary} QueryList之所以这样设计，是为了方便在各个环节挂载插件，如:`query()->downloadImage()->getData()`,获取数据之前 ，先用保存图片的插件把图片下载到本地并替换图片路径为本地路径。
